import React ,{ useEffect } from 'react'
import PostItem from '../components/PostItem'

function Home(props) {


 
  return(
  
    <>
    {props.postsList.map((e)=> {
       return (
         <PostItem key={e.id} post={e.post} image ={e.image} name={e.name} 
         id =
         {e.userId}
         deletePostHandler = {()=> props.deletePostHandler(e.id)}
         ></PostItem>
       )
    })}
    </>
  )
}

export default Home



