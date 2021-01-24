import React from 'react'

export default function Input({name, ...rest}) {
    
    return(
        <div className='flex flex-col mb-4'>
            <label className='text-blue-900 font-medium' htmlFor="">{name}</label>
            <input className='bg-gray-100 h-12 p-4 rounded'  {...rest}/>
        </div>
    )
}