import React from 'react'

// Modal/Popup that displays your profile
interface Props {
  activity: {},
  user: {},
  isOpen: boolean, 
}

function ProfilePopup( { activity, user, isOpen }: Props) {
  
  if (!isOpen) return null;
  
  return ( 
    <div className = "sbg-blue-500 ml-[150px] mt-[150px] justify-center align-middle absolute">
      <p>user.name</p>
    </div>
      

  )
}

export default ProfilePopup