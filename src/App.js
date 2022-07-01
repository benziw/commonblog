import React, { useState, useEffect } from 'react';

import CreatePost from "./components/CreatePost";
import DisplayPosts from "./components/DisplayPosts";

import Button from '@mui/material/Button';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SendIcon from '@mui/icons-material/Send';
import AnnouncementIcon from '@mui/icons-material/Announcement'

import Portal from '@mui/base/Portal';

const appStyle = {
  display : 'flex',
  flexDirection : 'column',
  justifyContent : 'center',
  alignItems : 'center',
}

export default function App() {

  const [openCreatePost, setOpenCreatePost] = useState(false);
  const [censor, setCensor] = useState(false);

  const createPostContainer = React.useRef(null);

  const speedDialActions = [
    {icon : <SendIcon/>, name : 'post', onClick : () => setOpenCreatePost(true)},
    {icon : <AnnouncementIcon/>, name : 'censor', onClick : () => setCensor(!censor)}
  ]

  return (
    <div className="App" style={appStyle}>

      <div className="header"
        style={{
          width : '100%',
          display : 'flex',
          justifyContent : 'center',
        }}
      >
        <h1>common blog</h1>
      </div>

      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {speedDialActions.map((action) => (
          <SpeedDialAction
            tooltipOpen
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>

      <DisplayPosts
        censor={censor}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {openCreatePost ? (
        <Portal container={createPostContainer.current}>
          <CreatePost onClose={() => setOpenCreatePost(false)}/>
        </Portal>
        
      ) : null}

    </div>
  );
}
