import React, { useState } from 'react';
import IconButton from './IconButton';
import ProfilePopup from './ProfilePopup';
import Feed from './Feed';
// Sidebar that opens when you press menu button

interface SidebarProps {
  handleClose: () => void,
  isOpen: boolean
}

function Sidebar({handleClose, isOpen}: SidebarProps) {
  
  const [openProfile, setOpenProfile] = useState(false);
  const [openFeed, setOpenFeed] = useState(false);
  const [openMap, setOpenMap] = useState(false);
  const [openFriends, setOpenFriends] = useState(false); 
  return (  

  <div
  className={`sidebar top-0 left-0 absolute flex flex-col bg-slate-300 w-24 h-screen z-10 items-center ease-in-out duration-300 ${
    isOpen ? "translate-x-0 " : "-translate-x-full"
  }`}>  

      <div className = "h-8"></div>
      <div onClick={handleClose} className = "cursor-pointer w-[15px] h-[15px] mt-[10px] mb-[20px]">
        <img src="/close.png"></img>
     </div> 
      <IconButton onClick={() => setOpenFeed(true)} name="Activity" icon="/activity.png" />
      <IconButton onClick={() => setOpenMap(true)} name="Map" icon="/pin.png" />
      <IconButton onClick={() => setOpenFriends(true)} name="Friends" icon="/friends.png" />
      <IconButton onClick={() => setOpenProfile(true)} name="Profile" icon="/user.png" />
      <IconButton onClick={() => null} name="Settings" icon="/settings.png" />
 

      <ProfilePopup handleClose={() => setOpenProfile(false)} isOpen={openProfile} />
 
      <Feed handleClose={() => setOpenFeed(false)} isOpen = {openFeed} />
    </div>
  )
}

export default Sidebar