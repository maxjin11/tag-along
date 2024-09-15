import React from 'react'

// Component for a singular activity in your feed

function Activity(activity: any) {
  return (
    <div className="mb-4 h-24">
      <hr className = "border-t-2 border-gray-300 mt-4" />
      <div className = "flex flex-col h-[100%]">

        <div className = "flex flex-row justify-center items-center pt-2">
          <img src={activity.pfp} alt={activity.username} className="w-16 h-16 rounded-full object-cover mr-4 float-left" />
          <h1 className = "text-3xl font-bold"> {activity.username}</h1>
        </div>

        <div className = "flex-1 flex flex-row justify-center items-center">
          <p>4:30 ● {activity.title}</p>
        </div>
        <div>
          {activity.bio}
        </div>
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