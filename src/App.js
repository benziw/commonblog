import React, { useState } from 'react';

import CreatePost from "./components/CreatePost";
import DisplayPosts from "./components/DisplayPosts";

export default function App() {

  const [openCreatePost, setOpenCreatePost] = useState(false);

  return (
    <div className="App">

      <button onClick={() => {setOpenCreatePost(true); console.log(document.getElementById('portal'))}}>create post</button>

      <CreatePost open={openCreatePost} onClose={() => setOpenCreatePost(false)}/>

      <DisplayPosts/>

    </div>
  );
}
