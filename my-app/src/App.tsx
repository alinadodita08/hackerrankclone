import { useState } from 'react'
import Editor from '@monaco-editor/react';
import './App.css'


function App() {
  const [code, setCode] = useState('')
  const [output, setOutput] = useState([''])
  const [error, setError] = useState([''])

  async function hanleClick() {
    const payload = {
        language: "python",
        version: "3.9.4",
        files: [
            {
                name: "hello.py",
                content: code
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
    setOutput(data.run.stdout.split('\n'));
  }
  return (
    <>
      <button onClick={hanleClick}>Submit</button>
      <Editor height="50vh" defaultLanguage="python" defaultValue="# some comment" onChange={(value)=>setCode(value ?? "")} />
      <div className='terminal'>
        <div className='terminal-header'>Terminal</div>
        <div className='terminal-body'>
        {output.map((line, index) => ( <p key={index}>{line}</p>))}
        </div>
      </div>
      
    </>

  )
}

export default App
