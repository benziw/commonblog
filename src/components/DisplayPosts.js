import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, limit, startAfter } from 'firebase/firestore';
import { db } from '../firebase-config';

import Post from './Post.js';
import Button from '@mui/material/Button';

const containerStyle={
  diplay : 'grid',
  gridTemplateRows : '1fr',
}

export default function DisplayPosts(){

  const [postsList, setPostsList] = useState([]);
  const [lastPostDoc, setLastPostDoc] = useState(null);
  const [loadPosts, setLoadPosts] = useState(true);
  const [morePosts, setMorePosts] = useState(true);

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

      if (data.docs.length < 1) {
        setMorePosts(false);
      }
      else {
        setLastPostDoc(data.docs[data.docs.length - 1]);
        const fivemore = data.docs.map((doc) => ({ ...doc.data() }));

        setPostsList(postsList.concat(fivemore));
      }

    };

    getPostsFromDB();
    console.log(q);
    //console.log('DisplayPosts useeffect fired');
    //console.log(`${postsList.length} ${lastPostDoc}`)
  }, [loadPosts]);

  /* get 5 more posts from db */
  const morePostsOnClick = () => {
    setLoadPosts(!loadPosts);
  }


  return (
    <div className="displayPostsContainer" style={containerStyle}>

      {postsList.map(post => 
        <Post title={post.title} content={post.content} postid={post.postid} key={post.postid}/>
      )}


      {morePosts ? (
        <Button
          onClick={() => morePostsOnClick()}
          variant='contained'
          color='secondary'
          sx={{justifySelf : 'center', width : '80%', marginLeft : '10%'}}
        >more posts
        </Button>
      ) :
        <Button
          onClick={() => morePostsOnClick()}
          variant='contained'
          color='info'
          disabled={true}
          sx={{justifySelf : 'center', width : '80%', marginLeft : '10%'}}
        >no more posts in db!
        </Button>

      }

   
    </div>
  );
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