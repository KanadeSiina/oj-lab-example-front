import * as React from 'react';
import { Container, Button, Grid, Box, TextField, ButtonGroup, Paper, Divider, Typography, IconButton, Tooltip } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useLocation, useParams } from 'react-router';
import MdRender from '../components/mdRender';
import CopyToClipBoard from 'react-copy-to-clipboard';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';

function Create() {
  const [enablePreview, setEnablePreview] = React.useState(false);
  const [description, setDescription] = React.useState('# Hello, *world*!');

  const tm = require('markdown-it-texmath');
  const md = require('markdown-it')({html:true})
                    .use(tm, { engine: require('katex'),
                              delimiters: 'dollars',
                              katexOptions: { macros: {"\\RR": "\\mathbb{R}"} } });

  return (
    <Container maxWidth='false' sx={{ mt: 4, mb: 4 }}>
      <Box component="form" noValidate  sx={{ mt: 4, mb: 4 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
          autoFocus
        />
        <Box sx={{ mt: 1 }}>
          <ButtonGroup disableElevation aria-label="outlined primary button group">
            <Button variant={enablePreview ? "outlined" : "contained"} onClick={() => {setEnablePreview(false);}}>Raw</Button>
            <Button variant={!enablePreview ? "outlined" : "contained"} onClick={() => {setEnablePreview(true);}}>Preview</Button>
          </ButtonGroup>
        </Box>
        { enablePreview ? 
          <Box sx={{
            mt: 1,
            display: 'flex',
            flexDirection: 'column',
          }}>
            <Paper elevation={0}>
              <Container maxWidth='false'>
                <link  rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex/dist/katex.min.css"></link>
                <span  dangerouslySetInnerHTML={{
                    __html: md.render(description)
                  }}
                />
              </Container>
            </Paper>
          </Box> :
          undefined }
        { !enablePreview ? 
          <Box sx={{ mt: 2 }}>
            <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              fullWidth
              rows={10}
              value={description}
              onChange={(e) => {setDescription(e.target.value)}}
            />
          </Box> :
          undefined }
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2, mb: 2 }}
        >
          Create
        </Button>
      </Box>
    </Container>
  )
}

function ProblemList() {
  let [problems, setProblems] = React.useState([{id: 1, name: 'A+B Problem', tags: 'Implementation', status: 'Accepted', url: 'aplusb'}]);
  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={10}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Pid</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Tags</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {problems.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <a href={'Problems/'+row.url}>{row.id}</a>
                  </TableCell>
                  <TableCell href='#'>
                    <a href={'Problems/'+row.url}>{row.name}</a>
                  </TableCell>
                  <TableCell>{row.tags}</TableCell>
                  <TableCell>{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}

function Sample(props) {
  const theme = createTheme({
    palette: {
      grey: {
        main: '#3f3f3f3f',         // custom button color (seafoam green)
        contrastText: '#000', // custom button text (white)
      }
    },
  });
  const [openTip, setOpenTip] = React.useState(false);

  const handleCloseTip = () => {
    setOpenTip(false);
  };

  const handleClickButton = () => {
    setOpenTip(true);
  };

  const [openTip_out, setOpenTip_out] = React.useState(false);

  const handleCloseTip_out = () => {
    setOpenTip_out(false);
  };

  const handleClickButton_out = () => {
    setOpenTip_out(true);
  };

  return (
    <div>
      <Typography variant="h5">
        Input {props.id} &nbsp;
        <ThemeProvider theme={theme}>
          <CopyToClipBoard text={props.input} onCopy={handleClickButton}>
              <Tooltip title='Copied' open={openTip} onClose={handleCloseTip} arrow={true} placement='right'>
                  <Button size="small" variant="contained" color="grey">Copy</Button>
              </Tooltip>
          </CopyToClipBoard>
        </ThemeProvider>
      </Typography>
      <pre>
        <code>
          {props.input}
        </code>
      </pre>
      <Typography variant="h5">
        Output {props.id} &nbsp;
        <ThemeProvider theme={theme}>
          <CopyToClipBoard text={props.output} onCopy={handleClickButton_out}>
              <Tooltip title='Copied' open={openTip_out} onClose={handleCloseTip_out} arrow={true} placement='right'>
                  <Button size="small" variant="contained" color="grey">Copy</Button>
              </Tooltip>
          </CopyToClipBoard>
        </ThemeProvider>
      </Typography>
      <pre>
        <code>
          {props.output}
        </code>
      </pre>
    </div>
  )
}

function CodeEditor(props) {
  const hightlightWithLineNumbers = (input, language) =>
  highlight(input, language)
    .split("\n")
    .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
    .join("\n");

  return (
    <Editor
      value={props.code}
      onValueChange={code => props.setCode(code)}
      highlight={code => hightlightWithLineNumbers(code, languages.js)}
      padding={10}
      textareaId="codeArea"
      className="editor"
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 18,
        outline: 0
      }}
    />
  );
}

function ProblemView() {
  let { pid } = useParams();
  let statement = 'You are given integers $A$ and $B$. Print $A$ + $B$.';
  let timeLimit = '1';
  let MemLimit = '512';
  let Constraint = '* $0 \\leq A,B \\leq 10$';
  let input_format = '$A$ $B$';
  let output_format = "$A+B$";
  let samples = [{
    id: 1,
    input: '1 2\n',
    output: '3\n',
  },{
    id: 2,
    input: '3 4\n',
    output: '7\n',
  }];
  const [code, setCode] = React.useState('');
  const submitCode = (code) => {
    // to be implemented
    console.log(code);
  }
  return (
    <Container>
      <Typography variant="h3" paragraph={true}>
        <MdRender text={pid}/>
      </Typography>
      <Typography variant="body1" paragraph={true}>
        Time Limit: {timeLimit} sec <br></br>
        Memory Limit: {MemLimit} MB
      </Typography>

      <Divider sx={{margin: 1,}}/>

      <Container>
        <Typography variant="h5">
          Problem Statement
        </Typography>
        <MdRender text={statement} />
        <Typography variant="h5">
          Constraints
        </Typography>
        <MdRender text={Constraint}/>
        
      </Container>

      <Container>
        <Typography variant="h5">
          Input
        </Typography>
        <pre>
          <code>
            <MdRender text={input_format} inline={true}/>
          </code>
        </pre>
        <Typography variant="h5">
          Output
        </Typography>
        <pre>
          <code>
            <MdRender text={output_format} inline={true}/>
          </code>
        </pre>
      </Container>

      <Divider sx={{margin: 1,}}/>

      <Container>
        {samples.map((sample) => (
          <div>
          <Sample id={sample.id} input={sample.input} output={sample.output}/>
          {sample.id !== samples.length ? <Divider sx={{margin: 1,}}/> : null}
          </div>
        ))}
      </Container>

      <Divider sx={{margin: 1,}}/>

      <Typography variant="h4">
        Submit
      </Typography>
      <CodeEditor code={code} setCode={setCode} />
      <Button variant="contained" style={{margin:12}} onClick={()=>{submitCode(code)}}>Submit</Button>

    </Container>
  )
}

function Main() {
  console.log('in main');
  return (
    <div>
      <Container maxWidth='false' sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item>
            <Button variant="contained" onClick={() => {
              window.location.replace('/Problems/Create');
            }}>Create Problem</Button>
          </Grid>
        </Grid>
      </Container>
      <ProblemList />
    </div>
  )
}

export default function ProblemPage() {
  let route = useLocation().pathname.split('/');

  return (
    <div>
      {route[2] === undefined ? <Main /> : undefined }
      {route[2] === 'Create' ? <Create /> : undefined }
      {route[2] !== undefined && route[2] !== 'Create' ? <ProblemView /> : undefined}
    </div>
  );
}