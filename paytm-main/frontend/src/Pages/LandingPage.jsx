import React from 'react'
import { Link } from 'react-router-dom'
import Bg from 'animatedbg'

const LandingPage = () => {
    return (
        <div className='relative h-screen overflow-hidden'>
            <Bg />
            <div className='relative h-full flex justify-center items-center'>
                <div className="flex flex-col w-full px-12 xs:px-4 justify-center items-center rounded-2xl gap-2">
                    <h1 className='justify-center w-full items-center text-7xl flex font-[500] text-[#f2f2f2]'>Pay Me</h1>
                    <p className='text-center font-[300] text-[#f2f2f2]/70 text-lg mb-4'>Fast, secure, and simple payments for everyone.</p>
                    <div className='flex w-full justify-center items-center gap-4'>
                        <Link to="/signup">
                            <button className='bg-[#f2f2f2] hover:bg-[#e0e0e0] w-[120px] md:w-[200px] font-[600] text-[#212121] border-none p-2 rounded-md'>Get Started</button>
                        </Link>
                        <Link to="/signin">
                            <button className='border-[#f2f2f2]/10 hover:bg-[#161616] transition-all w-[120px] md:w-[200px] font-[600] text-[#f2f2f2] border p-2 rounded-md'>Login</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage