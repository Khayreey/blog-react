import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth , GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyD3muzCbfEY7ix9g380k_NdRqCpk5t-EV8",
  authDomain: "blog-app-7e516.firebaseapp.com",
  projectId: "blog-app-7e516",
  storageBucket: "blog-app-7e516.appspot.com",
  messagingSenderId: "376121585385",
  appId: "1:376121585385:web:4781853420bfd5f9bf8a78"
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()