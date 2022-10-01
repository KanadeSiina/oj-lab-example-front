import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another
import React from 'react'
import Button from '@mui/material/Button';

function TestPage() {
    const clickHandler = (value) => {
        console.log(value)
    }
    const [code, setCode] = React.useState(
        `function add(a, b) {\n  return a + b;\n}`
      );
      return (
        <div>
            <Editor
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code => highlight(code, languages.js)}
            padding={10}
            style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
            }}
            />
            <Button variant="contained" style={{margin:12}} onClick={()=>{clickHandler(code)}}>Submit</Button>
        </div>
      );
}

export default TestPage;