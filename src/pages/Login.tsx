import React from 'react'
import { googleSignIn } from '../services/authService' 
import { useNavigate } from 'react-router-dom';
import { getUserById, createUserWithId } from '../services/userService';

function SignInButton() {

  const navigate = useNavigate();
  const handleSignIn = async () => { 
    const { user, token } = await googleSignIn(); 
    if (user && token) {   
      let userExists = await getUserById(user.uid) 
      if (userExists) { 
        navigate('/home',{ state: { user: user.uid } });
      }
      else { 
        let newUser = await createUserWithId(user.uid, user.displayName, user.photoURL);
        navigate('/home',{ state: { user: newUser } });
      }
    }
  } 

  return <button onClick = {handleSignIn}>Sign in with Google</button>
}

function Login() {

  return (
    <div> 
      <SignInButton />
    </div> 
  )
}

export default Login