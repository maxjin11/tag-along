import React, { useState } from 'react'
import { googleSignIn } from '../services/authService' 
import { useNavigate } from 'react-router-dom';
import { getUserById, createUserWithId } from '../services/userService';

function SignInButton() {

  const [loaded, setLoaded ] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
  }

  if (!loaded) {
    window.addEventListener('load', handleLoad);
  }
  
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
 
  return( 
    <div className = " w-screen h-screen flex justify-center flex-col items-center gap-12" >   
    <div className={`absolute inset-0 bg-[url('/public/friends2.jpg')] bg-cover bg-center z-[-1] ease-out duration-2000 ${ 
      loaded ? "translate-x-0" : "-translate-x-1/3"
    }`}></div>
      <div className="absolute bg-white">
        <h1 className = "text-white text-7xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Welcome to Tag-Along!</h1>
        <h1 className = "text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-2xl"> For people who want to see their friends, more!</h1>
        <button className = "w-48 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300" onClick = {handleSignIn}>Sign in with Google</button>
      </div>
    </div> ) 
}

function Login() {

  return (
    <div>  

      <SignInButton />
    </div> 
  )
}

export default Login
