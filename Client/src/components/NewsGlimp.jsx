import React from 'react'

export default function NewsGlimp({image,title,date}) {
  return (
    <div className='w-full p-2 rounded-lg flex flex-col items-start justify-center'>
        <img src={image} alt="" className='w-full h-[150px] mb-2'/>
        <h6 className='text-sm sm:text-md font-semibold'>
            {title}
        </h6>
        <h6 className='text-gray-500 text-xs font-bold'>{date}</h6>

    </div>
  )
}
