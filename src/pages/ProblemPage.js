import * as React from 'react';
import { Container, Button, Grid, Box, TextField, ButtonGroup, Paper } from '@mui/material';
import { useLocation } from 'react-router';

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

function Main() {
  return (
    <Container  maxWidth='false' sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item>
          <Button variant="contained" onClick={() => {
            window.location.replace('/Problems/Create');
          }}>Create Problem</Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default function ProblemPage() {
  let route = useLocation().pathname.split('/');

  return (
    <div>
      {route[2] === undefined ? <Main /> : undefined }
      {route[2] === 'Create' ? <Create /> : undefined }
    </div>
  );
}