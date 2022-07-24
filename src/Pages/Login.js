import React from 'react'
import {FcGoogle} from 'react-icons/fc'
import styles from './login.module.css'
import { auth , provider } from '../firebase-config'
import { signInWithPopup  } from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
function Login({setAuth}) {
  let navigate = useNavigate()
  const signInWithGoogle = async ()=>{
     await signInWithPopup(auth,provider).then(()=> {
      setAuth(true)
      localStorage.setItem('isAuth' , true)
      navigate('/')
     }) 
  }
  return (
    <div className={styles.main}>
      <div className={styles.container}>
      <p>Sign In With Google</p>
       <button onClick={signInWithGoogle}>  <FcGoogle></FcGoogle></button>
      </div>  
    </div>
  )
}

export default Login