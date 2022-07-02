import React, { useState } from "react";
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase-config.js';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Alert from "@mui/material/Alert";
import Portal from '@mui/base/Portal';

const testStyle = {
  zIndex : 1000,

  display : 'flex',
  flexDirection : 'column',

  width : '800px',

  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  background : '#FEFFFF',
  borderRadius: '25px',
  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',

  padding: '1em 2em',
}

export default function CreatePost(props){

  const [title, setTitle] = useState('');
  const [content,setContent] = useState('');
  const [warning, setWarning] = useState('');

  const createAlertContainer = React.useRef(null);

  const postsCollection = collection(db, "posts");

  const postToDB = async e => {

    if (title.length === 0) {
      setWarning('title cannot be empty');
      console.log(warning);
    }
    else if (content.length === 0) {
      setWarning('content cannot be empty');
      console.log(warning);
    }
    else {
      setWarning('');

      e.preventDefault();

      // console.log(title);
      // console.log(content);
      // console.log(Date.now())

      await addDoc(postsCollection, {
        title: title,
        content: content,
        postid: Date.now()
      });

      window.location.reload();

      props.onClose();

      
    }
  };

  return (
    <div className="createPostContainer" style={testStyle}>

      <h1>create new post</h1>

      <TextField
        autoFocus={true}
        color='secondary'
        placeholder="title"
        required={true}
        onChange={e => {
          setTitle(e.target.value);
          setWarning('');
        }}
      ></TextField>

      <TextareaAutosize
        color='primary'
        placeholder="content"
        minRows={12}
        required={true}
        onChange={e => {
          setContent(e.target.value);
          setWarning('');
        }}>

      </TextareaAutosize>

      <div className='buttonsContainer' style={{display : 'flex', justifyContent : 'space-evenly'}}>
        <Button
          onClick={postToDB}
          variant='contained'
          color='primary'
          endIcon={<SendIcon />}
        >submit
        </Button>

        <Button
          onClick={props.onClose}
          variant='contained'
          color='error'
          endIcon={<CancelIcon />}
        >close
        </Button>

      </div>

      {warning.length !== 0 ? (
        <Portal container={createAlertContainer.current}>
          <Alert severity=  "error" sx={{zIndex : 1001}}>{warning}</Alert>
        </Portal>
      ) : null}

    </div>
  )
}