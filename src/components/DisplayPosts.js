import { useEffect, useState, useRef } from 'react';
import { collection, getDocs, query, orderBy, limit, startAfter } from 'firebase/firestore';
import { db } from '../firebase-config';
import Post from './Post.js';

import Button from '@mui/material/Button';


export default function DisplayPosts(){

  const [postsList, setPostsList] = useState([]);
  const [lastPostDoc, setLastPostDoc] = useState(null);

  const [loadPosts, setLoadPosts] = useState(true);


  const postsCollectionRef = collection(db, "posts");

  /* get 5 posts from db initially */
  useEffect(() => {

    const q = (lastPostDoc === null ?
                query(postsCollectionRef, orderBy("postid", "desc"), limit(5)) :
                query(postsCollectionRef,  orderBy("postid", "desc"), startAfter(lastPostDoc), limit(5))
              );

    const getPostsFromDB = async () => {
      const data = await getDocs(q);
      console.log(data);

      setLastPostDoc(data.docs[data.docs.length-1]);
      const fivemore = data.docs.map((doc) => ({ ...doc.data()}));
      
      //setNewPosts(fivemore);
      setPostsList(postsList.concat(fivemore));
    };

    getPostsFromDB();
    console.log('DisplayPosts useeffect fired');
    console.log(`${postsList.length} ${lastPostDoc}`)
  }, [loadPosts]);

  /* get 5 more posts from db */
  const morePostsOnClick = () => {

    setLoadPosts(!loadPosts);
    
    // const q = query(postsCollectionRef,  orderBy("postid", "desc"), startAfter(lastDocRef), limit(5));

    // const getPostsFromDB = async () => {
    //   const data = await getDocs(q);
    //   setLastPostDoc(data.docs[data.length-1]);

    //   const fivemore = data.docs.map((doc) => ({ ...doc.data()}));
      
    //   //setNewPosts(fivemore);
    //   setPostsList(postsList.concat(fivemore));
    // };

    // getPostsFromDB();
    // console.log('DisplayPosts morePostsOnClick fired');
    // console.log(`${postsList.length} ${lastPostDoc}`)
  }

  /* this updates posts effectively */
//  useEffect(() => {

//  const q = query(postsCollectionRef, orderBy("postid", "desc"));

//    const getPostsFromDB = async () => {
//       const data = await getDocs(q);
//      setPostsList(data.docs.map((doc) => ({ ...doc.data()})));
//   };

//     getPostsFromDB();
//   }, []);

  return (
    <div className="displayPostsContainer" style={{diplay : 'flex', flexDirection : 'column', justifyContent : 'center', alignItems : 'center'}}>

      {postsList.map(post => 
        <Post title={post.title} content={post.content} postid={post.postid} key={post.postid}/>
      )}

      <Button
        onClick={() => morePostsOnClick()}
        variant='contained'
        color='secondary'
      >more posts
      </Button>
   
    </div>
  );
}