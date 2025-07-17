import React from 'react'
import { Link } from 'react-router-dom'

const NotFound404 = () => {
    return (
        <div className='h-screen flex justify-center items-center'>
            <div className="flex flex-col w-full px-12 xs:px-4 justify-center items-center rounded-2xl gap-2">
                <h1 className='justify-center w-full items-center text-8xl flex font-[600] text-[#f2f2f2]'>404</h1>
                <p className='text-center font-[300] text-[#f2f2f2]/70 text-lg mb-4'>Page not found.</p>
                <div className='flex w-full justify-center items-center gap-4'>
                    <Link to="/">
                        <button className='border-[#f2f2f2]/10 hover:bg-[#161616] transition-all w-[120px] md:w-[200px] font-[600] text-[#f2f2f2] border p-2 rounded-md'> Go Home</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound404
