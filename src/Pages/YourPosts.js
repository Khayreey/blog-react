import React from 'react'
import PostItem from '../components/PostItem'
import { auth } from '../firebase-config'

function YourPosts(props) {
   
  return (
    <>
    {props.postsList.filter((e)=> e.userId === auth.currentUser.uid).map((e)=> {
       return (
        <PostItem key={e.id} post={e.post} image ={e.image} name={e.name} 
         id =
         {e.userId}
         ></PostItem>
       )
    })}
    </>
  )
}

export default YourPosts