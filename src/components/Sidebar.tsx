import React, { useState, useEffect } from 'react';
import IconButton from './IconButton';
import ProfilePopup from './ProfilePopup';
import FriendsPopup from './FriendsPopup';
import Feed from './Feed';
// Sidebar that opens when you press menu button

interface SidebarProps {
  handleClose: () => void,
  isOpen: boolean,
  user: {name: string, id: string, pfp: string, friends: string[]},
  friendActivities: any,
  myActivities: any
}

function Sidebar({handleClose, isOpen, user, friendActivities, myActivities}: SidebarProps) {  
  const [openProfile, setOpenProfile] = useState(false);
  const [openFeed, setOpenFeed] = useState(false);
  const [openFriends, setOpenFriends] = useState(false); 

  useEffect(() => {
    setOpenProfile(false);
    setOpenFeed(false);
    setOpenFriends(false);
  }, [isOpen])

  return (  

  <div
  className={`sidebar top-0 left-0 absolute flex flex-col bg-slate-300 w-24 h-screen z-10 items-center ease-in-out duration-300 ${
    isOpen ? "translate-x-0 " : "-translate-x-full"
  }`}>  

      <div className = "h-8"></div>
      <div onClick={handleClose} className = "cursor-pointer w-[15px] h-[15px] mt-[10px] mb-[20px]">
        <img src="/close.png"></img>
     </div> 
      <IconButton onClick={() => {setOpenFeed(true); setOpenFriends(false); setOpenProfile(false);}} name="Activity" icon="/activity.png" />
      <IconButton onClick={() => {setOpenFriends(true); setOpenFeed(false); setOpenProfile(false);}} name="Friends" icon="/friends.png" />
      <IconButton onClick={() => {setOpenProfile(true); setOpenFeed(false); setOpenFriends(false)}} name="Profile" icon="/user.png" />
      <IconButton onClick={() => null} name="Settings" icon="/settings.png" />
 
      <FriendsPopup handleClose={() => {setOpenFriends(false)}} isOpen={openFriends && isOpen} userId={user.id} /> 

      <ProfilePopup user = {user} handleClose={() => setOpenProfile(false)} isOpen={openProfile && isOpen} />
 
      <Feed handleClose={() => setOpenFeed(false)} isOpen = {openFeed} friendActivities={friendActivities} myActivities={myActivities}/>
    </div>
  )
}

export default Sidebar