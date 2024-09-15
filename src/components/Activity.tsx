import React from 'react'
import { StringMappingType } from 'typescript'

// Component for a singular activity in your feed

interface ActivityProps {
  username: string,
  pfp: string,
  title: string,
  bio: string,
  time: string
}

function Activity({username, pfp, title, bio, time}: ActivityProps) {
  return (
    <div className="mb-4 min-h-24">
      <hr className="border-t-2 border-gray-300 mt-4 p-[10px]" />
      <div className="flex flex-row h-full w-full">
        
        <div className="w-[40%] flex flex-col items-start pr-4">
          <div className="flex items-center pt-2">
            <img
              src={pfp}
              alt={username}
              className="w-14 h-14 rounded-full object-cover mr-4"
            />
            <div>
              <h1 className="text-xl">{username}</h1>
              <p className="text-lg text-gray-500">{time}</p>
            </div>
          </div>
        </div>

        
        <div className="w-[60%] flex flex-col justify-start">
          <h2 className="text-xl font-bold mb-1 break-words overflow-hidden">
            {title}
          </h2>
          <p className="text-lg text-gray-600 break-words overflow-hidden">
            {bio}
          </p>
        </div>
      </div>
    </div>
    
  )
}

export default Activity