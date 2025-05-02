import Editor from '@monaco-editor/react';
import '@monaco-editor/react/dist/monaco.css';


const MyEditor = () => {
  return (
    <Editor
      theme="vs-dark" // 🎯 This sets the dark theme
    />
  );
};

export default MyEditor;