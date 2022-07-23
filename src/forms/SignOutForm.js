import React from 'react'
import styles from './signoutform.module.css'
function SignOutForm(props) {
  return (
    <div className={styles.error}>
    <div className={styles.errorContainer}>
         <p>{props.setPar}</p>
         <div className={styles.actions}>
           <button onClick={props.onSure}>Sure</button>
           <button onClick={props.onNo}>No</button>   
         </div>
         
     </div>  
    </div> 
  )
}

export default SignOutForm