# FastAPI Proxy Server

This is a simple FastAPI proxy server that forwards GET and POST requests to a target API endpoint.

## Features

- Proxies both GET and POST requests
- Preserves headers and query parameters
- Handles request and response bodies
- CORS middleware enabled for cross-origin requests

## Installation

1. Install the required dependencies:

```bash
pip install -r requirements.txt
```

## Usage

1. Start the proxy server:

```bash
python app.py
```

This will start the server on `http://localhost:8000`

2. Send requests to the proxy server instead of directly to the target API:

Instead of:
```
http://lk.ominds.ru:2000/api/v2/execute
```

Use:
```
http://localhost:8000/api/v2/execute
```

## Configuration

You can modify the `TARGET_API_URL` in `app.py` to change the target API endpoint.

## Example

```python
import requests

payload = {
    "language": "typescript",
    "version": "5.0.3",
    "files": [
        {
            "name": "hello.ts",
            "content": "console.log('hello world');"
        }
    ],
    "stdin": "Alina"
}

headers = {'Content-Type': 'application/json'}
response = requests.post('http://localhost:8000/api/v2/execute', json=payload, headers=headers)
print(response.json())
```