import React , { useState , useEffect} from  'react'
import {BrowserRouter , Routes , Route , Link} from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import { signOut } from 'firebase/auth'
import styles from './app.module.css'
import {auth , db} from './firebase-config'
import  {HiOutlineLogout , HiOutlineLogin} from 'react-icons/hi'
import SignOutForm from './forms/SignOutForm'
import CreatePostForm from './forms/CreatePostForm'
import YourPosts from './Pages/YourPosts'
import { getDocs , collection, doc, deleteDoc } from 'firebase/firestore'



function App() {
  const [isAuth , setIsAuth] = useState(localStorage.getItem('isAuth'))
  const [signOutClicked , setSignOutClicked] = useState(false)
  const [createPostClicked , setCreatePostClicked] = useState(false)
  const [postsList , setPostsList] = useState([])
  
  //const [yourPosts , setYourPostsList] = useState([])
  
  const deletePostHandler = async (id)=> {
    const postDoc = doc(db , "posts" , id)
    await deleteDoc(postDoc)
    setPostsList((prev)=> {
        return [...prev.filter((e)=> e.id !== id)]
    })
}

const postCollectionRef = collection(db , "posts")
//   const deletePostHandler = async (id)=> {
//     const postDoc = doc(db , "posts" , id)
//     await deleteDoc(postDoc)
// }
  useEffect(()=> {
    const getData = async ()=> {
        const data = await getDocs(postCollectionRef)
        setPostsList(data.docs.map((d)=> ({ ...d.data() , id : d.id })))
    };
    getData()
  })

//  const filterdHandler = ()=> {
//     const yourPosts = [...postsList]
//     const posts = yourPosts.filter((e)=> e.userId === auth.currentUser.uid)
//     setPostsList(posts)  
//  }
  const signOutHandler = ()=> {
    
    setSignOutClicked(true)
  }
  const onSignOutOkHandler= ()=> {
      signOut(auth)
      setIsAuth(false)
      localStorage.clear()
      window.location.pathname = '/login'
      setSignOutClicked(false)
  }
  const onSignOutCancelHabdler = ()=> {
    setSignOutClicked(false)
  }
  const createPostFormHandler = ()=> {
    setCreatePostClicked(true)
  }
  const hideCreatePostHandler = ()=> {
    setCreatePostClicked(false)
  }
 

  return (
    <BrowserRouter>
    <>
     {signOutClicked && <SignOutForm onSure={onSignOutOkHandler} onNo={onSignOutCancelHabdler} setPar='Sure To Log Out ?'></SignOutForm>}
     {createPostClicked && <CreatePostForm hideForm={hideCreatePostHandler}></CreatePostForm>} 
    <nav className={styles.nav}>
          <Link to='/' className={styles.navigation}>Home</Link>
          {isAuth && <div  className={styles.navigation} onClick={createPostFormHandler}
          >Create Post</div>}
          {isAuth && <Link to='/yourPosts'  className={styles.navigation} >My Posts</Link>}
          {!isAuth ? <Link to='/login' className={styles.navigation}>Log In <HiOutlineLogin ></HiOutlineLogin></Link>
          : <div className={styles.navigation} onClick={signOutHandler}>Sign Out <HiOutlineLogout  ></HiOutlineLogout></div> }
        </nav> 
    </>
        
        <Routes>
            <Route path='/' element={<Home setPostsList={setPostsList} postsList={postsList}  deletePostHandler={deletePostHandler} ></Home>}></Route>
            <Route path='/yourPosts' element={<YourPosts setPostsList={setPostsList} postsList={postsList} deletePostHandler={deletePostHandler}></YourPosts>} ></Route>
            <Route path='/login' element={<Login setAuth={setIsAuth}></Login>}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App