import React from 'react'

// Modal/Popup that displays your profile
interface Props {
  handleClose: () => void,
  isOpen: boolean,
  user: {name: string, id: string, pfp: string, friends: string[]}
}

function ProfilePopup( { handleClose, isOpen, user }: Props) {
  
  if (!isOpen) return null;
  
  return ( 
    <div className = "sbg-blue-500 ml-[150px] mt-[15px] justify-center align-middle absolute">
      <div className=" absolute flex flex-col space-y-4 bg-gray-200 rounded-lg shadow-lg w-96 p-4 h-auto border border-gray-500">
        <button className="absolute top-2 right-2 text-gray-800 hover:text-gray-600 focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" onClick={handleClose}>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <div className = "position: absolute, text-gray-400">{user.id}</div>
        <div className="text-gray-700 rounded text-3xl font-bold">{user.name}</div>

        <div className=" text-black rounded text-center">
          <div className="flex items-center justify-center"><
            img src={user.pfp} alt="Pfp" className="w-28 h-28 rounded-full object-cover" />
          </div>
        </div>

        <textarea placeholder = "No bio..." className="resize-none p-4 text-gray-500 rounded bg-gray-100 h-28" />

        <div className="text-gray-500 rounded">{user.friends.length} Friends</div>
      </div>   
    </div>
      

  )
}

export default ProfilePopup