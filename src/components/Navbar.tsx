import React, { useState } from 'react';
import IconButton from './IconButton';
import '../styles/Navbar.css';

// Navbar at the top of site that has the profile + sidebar + feed + mapview buttons

function Navbar() {
  
  const [openProfile, setOpenProfile] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openFeed, setOpenFeed] = useState(false);
  const [openMap, setOpenMap] = useState(false);
  const [openFriends, setOpenFriends] = useState(false);

  return (
    <div className="navbar">
        <IconButton onClick={() => setOpenProfile(true)} name="Profile" icon="/user.png" />
        <IconButton onClick={() => setOpenSidebar(true)} name="Menu" icon="/menu.png" />
        <IconButton onClick={() => setOpenFeed(true)} name="Activity" icon="/activity.png" />
        <IconButton onClick={() => setOpenMap(true)} name="Map" icon="/pin.png" />
        <IconButton onClick={() => setOpenFriends(true)} name="Friends" icon="/friends.png" />
    </div>
  )
}

export default Navbar