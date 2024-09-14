import React from 'react'

// Modal/Popup that displays your profile
interface Props {
  handleClose: () => void,
  isOpen: boolean
}

function ProfilePopup( { handleClose, isOpen }: Props) {
  
  if (!isOpen) return null;
  
  return (
    <div> 
      <div className="right-4 absolute flex flex-col space-y-4 bg-gray-200 rounded-lg shadow-lg w-96 p-4 h-auto border border-gray-500">
        <button className="absolute top-2 right-2 text-gray-800 hover:text-gray-600 focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" onClick={handleClose}>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <div className="text-gray-700 rounded text-3xl font-bold">Bryan Cui</div>

        <div className=" text-black rounded text-center">
          <div className="flex items-center justify-center"><
            img src="../../BB2.png" alt="Bryan Cui" className="w-28 h-28 rounded-full object-cover" />
          </div>
        </div>

        <textarea placeholder = "No bio..." className="resize-none p-4 text-gray-500 rounded bg-gray-100 h-28" />

        <div className="text-gray-500 rounded">69 Friends</div>
      </div> 
    </div> 

  )
}

export default ProfilePopup