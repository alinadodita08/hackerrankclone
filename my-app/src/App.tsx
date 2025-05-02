import { useState } from 'react'
import Editor from '@monaco-editor/react';
import MyTerminal from './components/terminal';
import './App.css'
import Description from './components/description';


const languages = [
  { language: 'python', version: '3.9.4', filename: 'main.py' },
  { language: 'bash', version: '5.2.0', filename: 'script.sh' },
  { language: 'clojure', version: '1.10.3', filename: 'main.clj' },
  { language: 'dart', version: '3.0.1', filename: 'main.dart' },
  { language: 'elixir', version: '1.11.3', filename: 'main.ex' },
  { language: 'emojicode', version: '1.0.2', filename: 'main.emojic' },
  { language: 'erlang', version: '23.0.0', filename: 'main.erl' },
  { language: 'go', version: '1.16.2', filename: 'main.go' },
  { language: 'haskell', version: '9.0.1', filename: 'main.hs' },
  { language: 'java', version: '15.0.2', filename: 'Main.java' },
  { language: 'julia', version: '1.8.5', filename: 'main.jl' },
  { language: 'kotlin', version: '1.8.20', filename: 'Main.kt' },
  { language: 'lisp', version: '2.1.2', filename: 'main.lisp' },
  { language: 'lua', version: '5.4.4', filename: 'main.lua' },
  { language: 'php', version: '8.2.3', filename: 'main.php' },
  // { language: 'python', version: '3.12.0', filename: 'main.py' }, // Note: Duplicate python, keeping filename consistent
  { language: 'ruby', version: '3.0.1', filename: 'main.rb' },
  { language: 'rust', version: '1.68.2', filename: 'main.rs' },
  { language: 'scala', version: '3.2.2', filename: 'Main.scala' },
  { language: 'typescript', version: '5.0.3', filename: 'main.ts' },
  { language: 'zig', version: '0.10.1', filename: 'main.zig' },
];

interface Language {
  language: string;
  version: string;
  filename: string;
}
// strings, number, boolean, null, undefined, object, array, function

function App() {
  const [code, setCode] = useState('')
  const [output, setOutput] = useState([''])
  const [error, setError] = useState([''])
  const [language, setLanguage] = useState<Language>(languages[0])


  async function hanleClick() {
    const payload = {
      language: language.language,
      version: language.version,
      files: [
        {
          name: language.filename,
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

  function handleLanguageChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedLanguage = languages.find(lang => lang.language === e.target.value);
    if (selectedLanguage) {
      setLanguage(selectedLanguage);
      setCode(''); // Clear the code editor when changing language
      setOutput(['']); // Clear the output when changing language
    }
  }

  return (
    <>
      <button onClick={hanleClick} className='submit-code'>Submit</button>
      <select className='language-select' onChange={(e) => handleLanguageChange(e)}>
        {languages.map((lang, index) => (
          <option key={index} value={lang.language}>
            {lang.language} ({lang.version})
          </option>
        ))}
      </select>
      <div className='page'>
        <Description />
        <div className='container'>
          <Editor
            height="50vh"
            language={language.language}
            defaultValue=''
            value={code}
            onChange={(value) => setCode(value ?? "")}
          />
          <MyTerminal stdout={output} stderr={error} />
        </div>
      </div>
      {/* Optional: Display output in a simple div */}
      {/* <div className='terminal'>
        <div className='terminal-header'>Terminal</div>
        <div className='terminal-body'>
          {output.map((line, index) => (<p key={index}>{line}</p>))}
        </div>
      </div> */}
    </>

  )

}

export default App
