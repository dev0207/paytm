import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({ user }) => {
    return (
        <div className="flex justify-between w-full items-center p-2 bg-[#f2f2f2]/5 rounded-lg">
            <div className="flex justify-center items-center gap-2">
                <img src="https://avatars.githubusercontent.com/u/77189432" draggable='false' alt="Lokendra Kushwah" className='rounded-full select-none w-[25px] border md:w-[40px] h-[25px] md:h-[40px]' />
                <p className='text-center font-[300] text-[#f2f2f2]/70 tex-sm md:text-lg'>{user.firstName}</p>
            </div>
            <div className="flex justify-center items-center gap-2">
                <Link to={"/transfer?id=" + user.id + "&name=" + user.firstName}>
                    <button className='border-[#f2f2f2]/10 hover:bg-[#161616] md:text-base text-sm transition-all w-[120px] md:w-[200px] bg-[#121212] font-[600] text-[#f2f2f2] border p-2 rounded-md'>Send Money</button>
                </Link>
            </div>
        </div>
    )
}

export default Card