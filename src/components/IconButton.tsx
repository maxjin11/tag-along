// Button and Icon lol

interface IconButtonProps {
    onClick: () => void,
    name: string,
    icon: string
}

function IconButton({ onClick, name, icon }: IconButtonProps) {
  return (
    <div onClick={onClick} className = "cursor-pointer w-[30px] h-[30px] mt-[20px] mb-[20px]">
        <img src={icon} alt={name}></img>
    </div>
  )
}

export default IconButton