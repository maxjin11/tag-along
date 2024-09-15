import React, { useEffect, useState } from 'react'
import { googleSignIn } from '../services/authService' 
import { useNavigate } from 'react-router-dom';
import { getUserById, createUserWithId } from '../services/userService';

function SignInButton() {
  const [loaded, setLoaded ] = useState(false);

  const handleLoaded = () => {
    setLoaded(true);
  }

  useEffect(() => {
    handleLoaded();
  }, []);

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
    <div className={`absolute inset-0 bg-[url('/public/friends2.jpg')] bg-cover bg-center z-[-1] ease-in-out delay-500 duration-1000 ${ 
      loaded ? "-translate-x-1/3" : "translate-x-0"
    }`}></div>
      <div className={`absolute bg-slate-100 right-0 top-0 h-full ease-in-out delay-500 duration-1000 ${ 
      loaded ? "-translate-x-2/5 w-2/5" : "translate-x-0 w-1/3"
    }`}>
        <div className="absolute bg-slate-300 rounded-lg shadow-xl top-28 right-20 w-3/4 h-2/3">
          <div>
            <h1 className = "text-black mt-24 text-7xl my-10">Tag-Along.</h1>
            <h1 className = "text-black text-2xl my-6">See what your friends are up to.</h1>
            <button className = "my-7 w-48 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300" onClick = {handleSignIn}>Sign in with Google</button>
          </div>
        </div>
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
