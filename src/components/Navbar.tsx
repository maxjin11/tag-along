import React, { useState } from 'react';
import IconButton from './IconButton';

// Navbar at the top of site that has the profile + sidebar + feed + mapview buttons

function Navbar() {
  
  const [openProfile, setOpenProfile] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openFeed, setOpenFeed] = useState(false);
  const [openMap, setOpenMap] = useState(false);
  const [openFriends, setOpenFriends] = useState(false);

  return (
    <div>
        <IconButton onClick={() => setOpenProfile(true)} name="Profile" icon="../../public/user.png" />
        <IconButton onClick={() => setOpenSidebar(true)} name="Menu" icon="../../public/menu.png" />
        <IconButton onClick={() => setOpenFeed(true)} name="Activity" icon="../../public/activity.png" />
        <IconButton onClick={() => setOpenMap(true)} name="Map" icon="../../public/pin.png" />
        <IconButton onClick={() => setOpenFriends(true)} name="Friends" icon="../../public/friends.png" />
    </div>
  )
}

export default Navbar