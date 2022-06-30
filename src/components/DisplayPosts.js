import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, limit, where } from 'firebase/firestore';
import { db } from '../firebase-config';
import Post from './Post.js';

import Grid from '@mui/material/Grid';


export default function DisplayPosts(props){

  const [postsList, setPostsList] = useState([]);
  const [newPosts, setNewPosts] = useState([]);
  const [lastPostId, setLastPostId] = useState(Number.MAX_SAFE_INTEGER);

  const postsCollectionRef = collection(db, "posts");

  /* update posts 5 at a time */
  useEffect(() => {

    const q = query(postsCollectionRef, where('postid', '<', lastPostId), orderBy("postid", "desc"), limit(5));

    const getPostsFromDB = async () => {
      const data = await getDocs(q);
      const fivemore = data.docs.map((doc) => ({ ...doc.data()}));
      
      setNewPosts(fivemore);
      setPostsList(postsList.concat(newPosts));
      setLastPostId(fivemore[4].postid);

      console.log(`${newPosts.length} \n ${fivemore.map(post => post.title)} \n ${lastPostId} \n ${postsList.length}`);
    };

    getPostsFromDB();

  }, []);

  /* this updates posts effectively */
  // useEffect(() => {

  //   const q = query(postsCollectionRef, orderBy("postid", "desc"));

  //   const getPostsFromDB = async () => {
  //     const data = await getDocs(q);
  //     setPostsList(data.docs.map((doc) => ({ ...doc.data()})));
  //   };

  //   getPostsFromDB();
  // }, []);

  return (
    <div className="displayPostsContainer">

      {newPosts.map(post => 
        <Grid item xs={12} key={post.postid}>
          <Post title={post.title} content={post.content} postid={post.postid}/>
        </Grid>
      )}
   
    </div>
  );
}