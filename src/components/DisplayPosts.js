import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';
import Post from './Post.js';

export default function DisplayPosts(){

  const [postsList, setPostsList] = useState([]);

  const postsCollection = collection(db, "posts");

  useEffect(() => {
    const getPostsFromDB = async () => {
      const data = await getDocs(postsCollection);
      setPostsList(data.docs.map((doc) => ({ ...doc.data()})).sort((p1,p2) => p2.postid - p1.postid ));
    };

    getPostsFromDB();

    //setPostsList(postsList.sort((p1,p2) => p2.postid - p1.postid ));
  }, []);



  return (
    <div className="displayposts">
      {postsList.map(post => <Post title={post.title} content={post.content} postid={post.postid}/>)}
    </div>
  );
}