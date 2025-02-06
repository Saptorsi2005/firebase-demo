import React, { useState } from 'react'
import {auth, googleProvider} from '../config/firebase'
import {createUserWithEmailAndPassword, signInWithPopup,signOut} from 'firebase/auth'


const Auth = () => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  async function signIn(){
    try{
    await createUserWithEmailAndPassword(auth,email,password);
    } catch(err){
      console.console.error(err);
    }
  }

  async function signInWithGoogle(){
    try{
      await signInWithPopup(auth,googleProvider);
      } catch(err){
        console.console.error(err);
      }
  }

  async function logout(){
    try{
      await signOut(auth);
      } catch(err){
        console.console.error(err);
      }
  }


  return (
    <div>
      <input placeholder='Email...'
      onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <br />
      <input placeholder='Password...'
      type='password'
      onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <br />
      <button onClick={signIn}>Sign in</button>
      <br />
      <br />
      <button onClick={signInWithGoogle}>Sign In with Google</button>
      <button onClick={logout}> Logout </button>
    </div>
  )
}

export default Auth
