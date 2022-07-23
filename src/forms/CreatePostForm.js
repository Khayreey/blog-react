import React , {useState}from 'react'
import styles from './createPost.module.css'
import {MdOutlineCancel} from 'react-icons/md'
import {FcShare} from 'react-icons/fc'
import {addDoc, collection} from 'firebase/firestore'
import { auth, db } from '../firebase-config'
import load from '../load.gif'

function CreatePostForm(props) {
    const [userInput , setUserInput] =  useState('')
    const [placeholder , setPlaceHolder] = useState('Type What In Your Mind...')
    const [isLoad , setIsLoad] = useState(false)
    // firebase refernce and add post functionality
    const postCollectionRef = collection(db , "posts")
    const sharePostHandler = async ()=> {
        setIsLoad(true)
        if(userInput.trim().length===0)
        {
            setPlaceHolder('INVALID you should enter a post')
            return
        }
        await addDoc(postCollectionRef , {post : userInput , 
           name : auth.currentUser.displayName , userId : auth.currentUser.uid , image : auth.currentUser.photoURL
            })
              props.hideForm()
    }
    const userInputHandler = (e)=> {
        setUserInput(e.target.value)
        setPlaceHolder('Type What In Your Mind...')
    }
  return ( 
    <div className={styles.main}>
    <div className={styles.createPostContainer}>
       {isLoad ? <img src={load} alt='loading'></img>
      :  <><div className={styles.header}>
            <p>Create New Post</p>
            <MdOutlineCancel onClick={props.hideForm}></MdOutlineCancel>
          </div><textarea className={styles.textInput} placeholder={placeholder} value={userInput}
            onChange={userInputHandler}></textarea><FcShare className={styles.icon} onClick={sharePostHandler}></FcShare></>}       
     </div>  
    </div> 
  )
}
export default CreatePostForm