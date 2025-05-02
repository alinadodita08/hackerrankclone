# python -m fastapi dev .\app.py
#python  -m uvicorn app:app --host 0.0.0.0 --port 8000

from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
import httpx
import uvicorn

app = FastAPI()

# Configure CORS middleware to allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

# Target API URL
TARGET_API_URL = "http://lk.ominds.ru:2000"

# Create a client for making requests
client = httpx.AsyncClient(base_url=TARGET_API_URL)


@app.api_route("/{path:path}", methods=["GET", "POST"])
async def proxy(request: Request, path: str):
    # Construct the target URL
    target_url = f"{path}"

    # Get request headers
    headers = dict(request.headers)
    # Remove host header to avoid conflicts
    headers.pop("host", None)

    # Get query parameters
    params = dict(request.query_params)

    try:
        # Get request body for POST requests
        body = await request.body()
        
        # Make the request to the target API
        response = await client.request(
            method=request.method,
            url=target_url,
            headers=headers,
            params=params,
            content=body or None,
        )

        # Create a response with the same status code, headers, and content
        return Response(
            content=response.content,
            status_code=response.status_code,
            headers=dict(response.headers),
        )
    except httpx.RequestError as exc:
        # Handle request errors
        return Response(
            content=f"Error communicating with the target API: {str(exc)}".encode(),
            status_code=500,
        )


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)