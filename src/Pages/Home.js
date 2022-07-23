import React ,{ useEffect } from 'react'
import { getDocs , collection, doc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase-config'
import PostItem from '../components/PostItem'

function Home(props) {

  const postCollectionRef = collection(db , "posts")
  const deletePostHandler = async (id)=> {
    const postDoc = doc(db , "posts" , id)
    await deleteDoc(postDoc)
}
  useEffect(()=> {
    const getData = async ()=> {
        const data = await getDocs(postCollectionRef)
        props.setPostsList(data.docs.map((d)=> ({ ...d.data() , id : d.id })))
    };
    getData()
  })
 
  return(
  
    <>
    {props.postsList.map((e)=> {
       return (
         <PostItem key={e.id} post={e.post} image ={e.image} name={e.name} 
         id =
         {e.userId}
         deletePostHandler = {()=> deletePostHandler(e.id)}
         ></PostItem>
       )
    })}
    </>
  )
}

export default Home



