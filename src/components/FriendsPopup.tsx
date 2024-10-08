import React, { useEffect, useState } from "react";
import { friendById } from "../services/userService";

interface Props {
    userId:string;
    handleClose: () => void;
    isOpen:boolean;
}

export default function FriendsPopup({ userId, handleClose, isOpen }: Props) {
    const [text, setText] = useState("");
    const [submission, setSubmission] = useState("");
    const [success, setSuccess] = useState(0);

    useEffect(() => {
      const submit = async () => {
        const result = await friendById(userId, submission)
        if (result) {
          setSuccess(1);
        } else {
          setSuccess(2);
        }
      }

      submission && submit();
    }, [submission]);

    if (!isOpen) return null;
    return (
        <div className = "sbg-blue-500 ml-[150px] mt-[150px] justify-center align-middle absolute">
      <div className=" absolute flex flex-col space-y-4 bg-gray-200 rounded-lg shadow-lg w-96 p-4 h-auto border border-gray-500 place-items-center"    >
        <button className="absolute top-2 right-2 text-gray-800 hover:text-gray-600 focus:outline-none" onClick={handleClose}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <div className="text-gray-700 rounded text-3xl font-bold">Add Friend</div>
        <input className="rounded-3xl p-2 border-slate-200 text-slate-600 w-48" placeholder="Enter user ID" value={text} onChange={(e) => {
            setText(e.target.value)}} ></input>
        <div className="w-48 rounded-3xl drop-shadow-2xl bg-slate-300 p-4 align-middle text-center cursor-pointer hover:scale-105" onClick={() => setSubmission(text)}>
            Submit
        </div>
        {success === 1 ? <div className="text-green-600">Success!</div> : (success === 2 ? <div className="text-red-600">Error adding friend</div> : null)}
      </div>   
    </div>
    )
}