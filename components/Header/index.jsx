import React from 'react'

export default function Header() {
    return(
        <header className='absolute top-0 w-full'>
        <div className="container mx-auto flex justify-between pt-6">
          <h2 className='text-3xl font-bold text-blue-900'>Sua Agenda Online</h2>
          <button className='h-12 bg-blue-500 px-2 text-white font-bold rounded'>Agendamento</button>
        </div>
      </header>
    )
}