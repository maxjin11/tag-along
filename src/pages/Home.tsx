import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { getUserById } from '../services/userService';

function Home() {
  const [loading, setLoading] = useState(true)
  const location = useLocation();
  const [userInfo, setUserInfo] = useState<any>(null);
  const user = location.state?.user; 

  useEffect( () => {
    const fetchData = async () => {
      if (user) {
        const userProfile = await getUserById(user)
        setUserInfo(userProfile)
        setLoading(false)
        console.log(userInfo)
      } else {  
        console.log("ERROR!!!")
      }
    }
    fetchData()
  }, [user]);
  if (loading) {
    return (
      <div>Loading</div>
    )
  } 
  return (
    <div>Welcome, {userInfo.name}</div>
  )
}

export default Home