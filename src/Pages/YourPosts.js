import React, { useEffect, useState } from 'react'
import PostItem from '../components/PostItem'
import { auth } from '../firebase-config'


function YourPosts(props) {
  return (
    <>
    {props.postsList.filter((e)=> e.userId === auth.currentUser.uid).map((post)=> {
     
      return (
     
        <PostItem key={post.id} post={post.post} image ={post.image} name={post.name} 
         id = {post.userId}
         deletePostHandler = {()=> props.deletePostHandler(post.id)}
         ></PostItem>
       )
    })}
    </>
  )
}

export default YourPosts