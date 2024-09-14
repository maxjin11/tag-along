import React, { useState } from 'react';
import IconButton from './IconButton';
import ProfilePopup from './ProfilePopup';
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

  if (!isOpen) return null;

  return (
    <div className="sidebar">
      <IconButton onClick={() => setOpenFeed(true)} name="Activity" icon="/activity.png" />
      <IconButton onClick={() => setOpenMap(true)} name="Map" icon="/pin.png" />
      <IconButton onClick={() => setOpenFriends(true)} name="Friends" icon="/friends.png" />
      <IconButton onClick={() => setOpenProfile(true)} name="Profile" icon="/user.png" />

      <button onClick={handleClose}>Close</button>

      <ProfilePopup handleClose={() => setOpenProfile(false)} isOpen={openProfile} />
    </div>
  )
}

export default Sidebar