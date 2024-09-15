import React from 'react'

// Popup that where you put in information about a new/future activity

const AddActivity = (props: any) => {
  return (
    <div className="absolute flex z-1000 bg-red-500 left-10, top-10, w-1/4, h-1/2">
      <h1>Looking at {props.location}.</h1>
      <p>Time: {props.time}</p>
    </div>
  );
}

export default AddActivity