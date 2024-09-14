import IconButton from "../components/IconButton"
import Sidebar from "../components/Sidebar";
import React, { useState } from "react"

function TestPage() {

  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div> 
      <IconButton onClick={() => setOpenSidebar(true)} name="" icon="/menu.png" />
      
      <Sidebar handleClose={() => setOpenSidebar(false)} isOpen={openSidebar}/>
    </div> 
  )
}

export default TestPage