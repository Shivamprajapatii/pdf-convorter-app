import React from 'react'

const NavBar = () => {
    return (
        <>
            <div className='max-w-screen-2x1 mx-auto container px-6 md:px-40 shadow-lg h-14'>
                <div className='flex justify-between py-3'>
                    <h1 className='text-2x1 cursor-pointer font-bold hover:scale-125 duration-300'>Word<span className='text-8x-3 text-red-700 font-bold'>&hearts;</span>PDF</h1>
                    <h1 className='text-2x1 cursor-pointer font-bold hover:scale-125 duration-300'>Home</h1>
                    <h1 className='text-2x1 cursor-pointer font-bold hover:scale-125 duration-300'>login</h1>
                </div>
            </div>
        </>
    )
}

export default NavBar