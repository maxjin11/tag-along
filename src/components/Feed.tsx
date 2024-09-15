import React, { useState } from 'react'
import Activity from './Activity'

// View that lets you see your friend's future activities
interface Props {
  handleClose: () => void,
  isOpen: boolean,
  friendActivities: any,
  myActivities: any
}

function Feed( { handleClose, isOpen, friendActivities, myActivities }: Props) {
  if (!isOpen) return null;

  return ( 
    <div> 
      <div className="left-0 top-0 w-screen h-screen fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center" >

        <div className="left-0 top-0 absolute w-screen h-screen bg-black opacity-25" onClick = {handleClose}></div>
        <div className="relative inset-0 flex items-center justify-center z-50 h-[90%] w-[40%]" >
          <div className="bg-white p-6 rounded-lg shadow-lg h-[100%] w-[100%] overflow-scroll">
            <h2 className="text-xl font-bold mb-4">Feed</h2>
            <div>
              {myActivities.map((obj: any) => {
                return (
                  <Activity username={obj.username} pfp={obj.pfp} title={obj.title} bio={obj.bio} time={obj.time}/>
                )
              })}

              {friendActivities.map((obj: any) => {
                return (
                  <Activity username={obj.username} pfp={obj.pfp} title={obj.title} bio={obj.bio} time={obj.time}/>
                )
              })}
            </div>
          </div>
        </div>
      </div>
  
    </div>
  )
}

export default Feed