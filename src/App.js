import React, { useState } from 'react';

import CreatePost from "./components/CreatePost";
import DisplayPosts from "./components/DisplayPosts";

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SendIcon from '@mui/icons-material/Send';
import AnnouncementIcon from '@mui/icons-material/Announcement'
import GitHubIcon from '@mui/icons-material/GitHub';
import Portal from '@mui/base/Portal';

import { AnimatePresence, motion } from "framer-motion";

import './css/App.css';

const expand = {
  hidden: {
    scale : 0.1
  },
  visible: {
    scale : 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
};

export default function App() {

  const [openCreatePost, setOpenCreatePost] = useState(false);
  const [censor, setCensor] = useState(true);

  const createPostContainer = React.useRef(null);

  const speedDialActions = [
    {icon : <SendIcon/>, name : 'post', onClick : () => setOpenCreatePost(true)},
    //{icon : <AnnouncementIcon/>, name : 'censor', onClick : () => setCensor(!censor)},
    {icon : <GitHubIcon />, name : 'github', onClick : () => window.open("https://github.com/benziw/commonblog", "_blank")}
  ]

  return (
    <div className="App">

      <div className="header"
        component={motion.div}
        onClick={(e) => e.stopPropagation()}  // Prevent click from closing modal
        variants={expand}
        initial="hidden"
        animate="visible"
      >
        <h1>common blog</h1>
        <p><em>a blog for all</em></p>
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
      />

      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
      >
        {openCreatePost && (
          <Portal className='fade-in' container={createPostContainer.current}>
            <CreatePost onClose={() => setOpenCreatePost(false)} />
          </Portal>
        )}
      </AnimatePresence>



    </div>
  );
}