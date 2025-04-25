import { useState } from 'react'
import Editor from '@monaco-editor/react';
import './App.css'

const languages = [
  { language: 'python', version: '3.9.4' },
  { language: 'bash', version: '5.2.0' },
  { language: 'clojure', version: '1.10.3' },
  { language: 'dart', version: '3.0.1' },
  { language: 'elixir', version: '1.11.3' },
  { language: 'emojicode', version: '1.0.2' },
  { language: 'erlang', version: '23.0.0' },
  { language: 'go', version: '1.16.2' },
  { language: 'haskell', version: '9.0.1' },
  { language: 'java', version: '15.0.2' },
  { language: 'julia', version: '1.8.5' },
  { language: 'kotlin', version: '1.8.20' },
  { language: 'lisp', version: '2.1.2' },
  { language: 'lua', version: '5.4.4' },
  { language: 'php', version: '8.2.3' },
  { language: 'python', version: '3.12.0' },
  { language: 'ruby', version: '3.0.1' },
  { language: 'rust', version: '1.68.2' },
  { language: 'scala', version: '3.2.2' },
  { language: 'typescript', version: '5.0.3' },
  { language: 'zig', version: '0.10.1' },
];


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
      <button onClick={hanleClick} className='submit-code'>Submit</button>
      <select className='language-select' onChange={(e) => setCode(e.target.value)}>
        {languages.map((lang, index) => (
          <option key={index} value={lang.language}>
            {lang.language} ({lang.version})
          </option>
        ))}
        </select>
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
