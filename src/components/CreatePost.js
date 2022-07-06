import React, { useState } from "react";
import ReactDOM from 'react-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase-config.js';

import '../css/CreatePost.css';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import TextareaAutosize from "@mui/material/TextareaAutosize";

import { motion } from "framer-motion";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

export default function CreatePost(props) {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [warning, setWarning] = useState('');

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

      await addDoc(postsCollection, {
        title: title,
        content: content,
        postid: Date.now()
      });

      window.location.reload();

      props.onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className='portalBackdrop'>
      <motion.div
        onClick={(e) => e.stopPropagation()}  // Prevent click from closing modal
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit">

        <div className="createPostContainer">

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

          <div className='buttonsContainer' style={{ display: 'flex', justifyContent: 'space-evenly' }}>
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

        </div>
      </motion.div>
    </div>
    , document.getElementById('portal'))
}