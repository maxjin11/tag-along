import React, {useState} from "react";
import ActivityPopup from "./ActivityPopup";

interface ActivityContainerProps {
    username: string,
    pfp: string,
    title: string,
    bio: string,
    time: string,
  }

export default function ActivityContainer({username, pfp, title, bio, time}: ActivityContainerProps) {
    const [open, setOpen] = useState(false);
    return (<div>
        <img src={pfp} onClick={() => setOpen(!open)} className='rounded-full size-10 cursor-pointer hover:scale-110' />
        <ActivityPopup username={username} pfp={pfp} title={title} bio={bio} time={time} handleClose={() => setOpen(false)} isOpen={open} />
    </div>)
}