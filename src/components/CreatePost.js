import { useState } from "react";
import ReactDOM from 'react-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase-config.js';

const testStyle = {
  background : '#0000FF',
  zIndex : 1000,

  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

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
    
    window.location.reload();

    props.onClose();
  };

  if(props.open){
    return ReactDOM.createPortal(
      <div className="createnewpost" style={testStyle}>
      <h1>create new post</h1>
        <form>
          <input
            type="text"
            placeholder="title"
            onChange={ e => {
              setTitle(e.target.value);
            }}
          ></input>
          <textarea
            placeholder="content"
            onChange={ e => {
              setContent(e.target.value);
            }}>
          </textarea>
          <button onClick={postToDB}>submit post</button>
          <button onClick={props.onClose}>close</button>
        </form>
      </div>,
      document.getElementById('portal')
    );
  } else {return null}
}