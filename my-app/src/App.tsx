// import { useState } from 'react'
import Editor from '@monaco-editor/react';

function App() {
  async function hanleClick() {
    const payload = {
        language: "python",
        version: "3.9.4",
        files: [
            {
                name: "hello.ts",
                content: "print('Alina' * 10)"
            }
        ],
        stdin: "Alina",
        compile_timeout: 10000,
        run_timeout: 3000,
        compile_cpu_time: 10000,
        run_cpu_time: 3000,
        compile_memory_limit: -1,
        run_memory_limit: -1
    };

    const headers = {
        'Content-Type': 'application/json'
    };

    const res = await fetch('http://localhost:8000/api/v2/execute', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
    });
    const data = await res.json();
    console.log(data);
  }
  return (
    <>
      <Editor height="50vh" defaultLanguage="python" defaultValue="// some comment" />
      <button onClick={hanleClick}>Submit</button>
    </>

  )
}

export default App
