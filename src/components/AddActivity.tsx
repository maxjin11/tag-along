import React from 'react'
import ActivityForm from './ActivityForm';

// Popup that where you put in information about a new/future activity
// "absolute flex bg-red-500 left-2/3 top-1/4 w-1/4 h-1/2 z-1000"

const AddActivity = (props: any) => {
  return (
    <div className="absolute flex z-1000 right-0 top-0 h-full">
      <ActivityForm location={ props.location }></ActivityForm>
    </div>
  );
}

export default AddActivity