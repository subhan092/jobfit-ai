import React from 'react'

const Card = ({title,value, color , icon}) => {
  return (
    <div className={ `bg-${color}-400 space-y-4 rounded-md  shadow-lg p-8  `} >
      <div className="flex gap-2">
        {icon}
        <h2 className='text-[1.2rem]'>{title}</h2>
      </div>
      <h3 className='font-bold text-white text-[2rem]'>{value}+</h3>
    </div>
  )
}

export default Card