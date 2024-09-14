import React, { EventHandler } from 'react'
import '../styles/IconButton.css'
// Button and Icon lol

interface IconButtonProps {
    onClick: () => void,
    name: string,
    icon: string
}

function IconButton({ onClick, name, icon }: IconButtonProps) {
  return (
    <div className="icon-button" onClick={onClick}>
        <img src={icon} alt={name}></img>
        {name}
    </div>
  )
}

export default IconButton