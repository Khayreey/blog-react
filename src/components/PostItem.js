import React, { useState } from 'react'
import styles from './postitem.module.css'
import load from '../load.gif'
import {MdDeleteForever} from 'react-icons/md'
import SignOutForm from '../forms/SignOutForm'
import { auth } from '../firebase-config'

function PostItem(props) {
  const [isDeleteClicked , setIsDeleteClicked] = useState(false)
  return (
    <>
     {isDeleteClicked && <SignOutForm onSure={props.deletePostHandler} 
     onNo={()=> setIsDeleteClicked(false)}
     setPar = 'Sure You Want Delete ?'
     ></SignOutForm>}
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.userData}>
            <img src={props.image ? props.image : load} alt="load" />
            <p>{props.name}</p>
            {props.id === auth.currentUser?.uid  && 
            <MdDeleteForever className={styles.delete} onClick={()=>setIsDeleteClicked(true)} ></MdDeleteForever> }
        </div>
         <p>{props.post}</p>
    </div>
    </div>
    </>   
  )
}
export default PostItem