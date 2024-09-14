import React from 'react'

// Popup that where you put in information about a new/future activity

const AddActivity = (props: any) => {
  return (
    <div>
      <h1>Looking at {props.location}.</h1>
      <p>Time: {props.time}</p>
    </div>
  );
}

export default AddActivity