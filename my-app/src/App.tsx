import { useState } from 'react'
import Editor from '@monaco-editor/react';

function App() {
  return (
    <> 
    <Editor height="50vh" defaultLanguage="python" defaultValue="// some comment" />
    <button>Submit</button>
    </>
   
  )
}

export default App
