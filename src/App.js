import React, { useState } from 'react';

import CreatePost from "./components/CreatePost";
import DisplayPosts from "./components/DisplayPosts";

import Button from '@mui/material/Button';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SendIcon from '@mui/icons-material/Send';
import AnnouncementIcon from '@mui/icons-material/Announcement'

import Portal from '@mui/base/Portal';

export default function App() {

  const [openCreatePost, setOpenCreatePost] = useState(false);
  const [censor, setCensor] = useState(false);

  const createPostContainer = React.useRef(null);

  const actions = [
    {icon : <SendIcon/>, name : 'post', onClick : () => setOpenCreatePost(true)},
    {icon : <AnnouncementIcon/>, name : 'censor', onClick : () => setCensor(!censor)}
  ]

  return (
    <div className="App">

      <h1>common blog</h1>

      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            tooltipOpen
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>

      {/*<div className="options">
        <Button 
          onClick={() => setOpenCreatePost(true)}
          variant='contained'
          >create post
          </Button>
      </div>*/}

      <DisplayPosts censor={censor}/>

      {openCreatePost ? (
        <Portal container={createPostContainer.current}>
          <CreatePost onClose={() => setOpenCreatePost(false)}/>
        </Portal>
        
      ) : null}

      {/*<CreatePost open={openCreatePost} onClose={() => setOpenCreatePost(false)}/>*/}
    </div>
  );
}
