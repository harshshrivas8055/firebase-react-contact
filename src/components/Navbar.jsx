import React from 'react'

const Navbar = () => {
  return (
    <div className='h-[60px] my-4 rounded-lg bg-white flex justify-center items-center'>
      <div className='flex gap-3 text-2xl font-bold'>
        <img src="/logos_firebase.svg" alt="logo" />
        <h1>Firebase Contact App</h1>
      </div>
    </div>
  )
}

export default Navbar
