import React from 'react'
import { StringMappingType } from 'typescript'

// Component for a singular activity in your feed

interface ActivityProps {
  username: string,
  pfp: string,
  title: string,
  bio: string
}

function Activity({username, pfp, title, bio}: ActivityProps) {
  return (
    <div className="mb-4 min-h-24">
      <hr className = "border-t-2 border-gray-300 mt-4" />
      <div className = "flex flex-col h-[100%] w-[100%]">

        <div className = "flex flex-row justify-center items-center pt-2">
          <img src={pfp} alt={username} className="w-16 h-16 rounded-full object-cover mr-4 float-left" />
          <h1 className = "text-3xl font-bold"> {username}</h1>
        </div>

        <div className = "flex-1 flex flex-row justify-center items-center">
          <p>4:30 ● {title}</p>
        </div>
          {bio}
      </div>
 
    </div> 
    
    /*
      time
      location
      pfp and name of the dude
      Join/message button
      */
  )
}

export default Activity