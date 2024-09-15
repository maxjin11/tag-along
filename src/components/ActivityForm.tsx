import React, { useState } from 'react'
import { createActivity } from '../services/activityService';
// Component for a singular activity in your feed
 
interface Props { 
    user: {id: string, name: string, pfp: string, bio?: string}
    coordinates: number[]
    title?: string
}

function ActivityForm({user, coordinates}: Props) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startTime: 0,
        endTime: 0,
      });
      function handleSelect(e:any) {
          e.preventDefault() 
          
          createActivity(formData.startTime, coordinates[0], coordinates[1], formData.title, user.id, user.name, user.pfp, user.bio)
          setFormData({
            title: '',
            description: '',
            startTime: 0,
            endTime: 0
          })
      }
      
    
      const handleChange = (e: any) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value, // Dynamically update form data based on input name
        });
      };

  return (
    <div className="absolute flex z-1000 right-0 top-0 h-full">
    <div className="h-full">
        <form onSubmit = {handleSelect} className = "h-full flex flex-col w-96 gap-4 bg-slate-600 justify-center items-center"> 
            <div className = "w-[80%] flex gap-4 flex-col justify-center items-center">
            <h1 className = "text-white text-2xl">New Activity</h1>

            <input type = "text" required placeholder = "Title:"
            name="title"
            value={formData.title}
            className = "leading-normal border border-gray-400 w-full rounded p-2"
            onChange={handleChange}/>

            <textarea className = "w-full border border-gray-400 resize-none rounded p-2"
            placeholder = "Description:"
            name = "description"
            value = {formData.description}
            onChange = {handleChange} />

            <div className = "w-full flex justify-around items-center">
                <div className = "flex flex-col">
                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start time</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                        <input type="time" id="time" name = "startTime" value = {formData.startTime} onChange = {handleChange} className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="00:00" required />
                    </div>
                </div>
                
                <div className = "flex flex-col">
                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End time</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                        <input type="time" id="time" name = "endTime" value = {formData.endTime} onChange = {handleChange} className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  placeholder="00:00" required />
                    </div> 
                </div> 
            </div> 
            <button type ="submit" className = "mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl w-full">Create</button>
            </div>
        </form>
    </div> 
    </div>
  )
}

export default ActivityForm