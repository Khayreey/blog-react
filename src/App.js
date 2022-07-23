import React , {useState } from  'react'
import {BrowserRouter , Routes , Route , Link} from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import { signOut } from 'firebase/auth'
import styles from './app.module.css'
import {auth} from './firebase-config'
import  {HiOutlineLogout , HiOutlineLogin} from 'react-icons/hi'
import SignOutForm from './forms/SignOutForm'
import CreatePostForm from './forms/CreatePostForm'
import YourPosts from './Pages/YourPosts'


function App() {
  const [isAuth , setIsAuth] = useState(localStorage.getItem('isAuth'))
  const [signOutClicked , setSignOutClicked] = useState(false)
  const [createPostClicked , setCreatePostClicked] = useState(false)
  const [postsList , setPostsList] = useState([])
  

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
  // const yourPostsHandler = ()=> {
  //   const yourPosts = [...postsList]
  //    setPostsList(yourPosts.filter((p)=> p.userId === auth.currentUser.uid))
  // }

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
            <Route path='/' element={<Home setPostsList={setPostsList} postsList={postsList}></Home>}></Route>
            <Route path='/yourPosts' element={<YourPosts  postsList={postsList} ></YourPosts>} ></Route>
            <Route path='/login' element={<Login setAuth={setIsAuth}></Login>}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App