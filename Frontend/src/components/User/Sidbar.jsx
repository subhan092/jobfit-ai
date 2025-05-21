import { FileUser, Route, User } from 'lucide-react'
import React from 'react'

const icons = [User, FileUser, Route]

const Sidbar = ({ select, setSelect, index, item }) => {
  const Icon = icons[index] || User // Use default icon if index is out of range

  return (
    <div
      className={`w-full p-4 border-l-4 cursor-pointer 
      ${select === index ? 'border-purple-600 text-purple-700 font-bold' : 'border-transparent'}
      hover:text-purple-700`}
      onClick={() => setSelect(index)}
    >
      <ul className="flex items-center gap-2 text-xl">
        {item.icon}
        <li>{item.key}</li>
      </ul>
    </div>
  )
}

export default Sidbar
