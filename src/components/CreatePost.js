import { useState } from "react";
import ReactDOM from 'react-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase-config.js';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Grid from '@mui/material/Grid';

const testStyle = {
  zIndex : 1000,

  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  background : '#FFF',
  borderRadius: '25px',
  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',

  padding: '1em',
}

export default function CreatePost(props){

  const [title, setTitle] = useState('');
  const [content,setContent] = useState('');

  const postsCollection = collection(db, "posts");

  const postToDB = async e => {

    e.preventDefault();

    console.log(title);
    console.log(content);
    console.log(Date.now())

    await addDoc(postsCollection, {
      title: title, 
      content: content, 
      postid: Date.now()
    });
    
    //window.location.reload();

    props.onClose();
  };

  return (
    <div className="createPostContainer" style={testStyle}>

    <Grid container 
      spacing={2}
      direction="row"
      justifyContent="space-between"
      alignItems='baseline'
    >

      <Grid item xs={6}>
      <h1>create new post</h1>
      </Grid>

      <Grid container item xs={6}
        spacing={2}
        direction='row'
        justifyContent='flex-end'
      >
        <Grid item>
        <Button
          onClick={postToDB}
          variant='contained'
          color='primary'
          endIcon={<SendIcon />}
          >submit
        </Button>
        </Grid>

        <Grid item>
        <Button
          onClick={props.onClose}
          variant='contained'
          color='error'
          endIcon={<CancelIcon />}
          >close
        </Button>
        </Grid>
      
      
      </Grid>
        

      <Grid item xs={12}>
      <TextField
          placeholder="title"
          onChange={e => {
            setTitle(e.target.value);
          }}
        ></TextField>
      </Grid>

      <Grid item xs={12}>
      <TextareaAutosize
          placeholder="content"
          minRows={12}
          style={{ width: '80%' }}
          onChange={e => {
            setContent(e.target.value);
          }}>

        </TextareaAutosize>
      </Grid>
        
 
        
    </Grid>
    </div>
  )
}