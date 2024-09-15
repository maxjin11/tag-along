import IconButton from "../components/IconButton"
import Sidebar from "../components/Sidebar";
import React, { useState } from "react"
import ActivityForm from "../components/ActivityForm"

function TestPage() {

  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div> 
        <ActivityForm location = "108 University Ave W"/>
        {!openSidebar && <div className="cursor-pointer left-0 ml-[30px] float-left absolute mt-[20px] h-[30px] w-[30px] inline-block z-3">
            <IconButton onClick={() => setOpenSidebar(true)} name="" icon="/menu.png"/>
        </div>}
      
      <Sidebar handleClose={() => setOpenSidebar(false)} isOpen={openSidebar}/>
    </div> 
  )
}

export default TestPage