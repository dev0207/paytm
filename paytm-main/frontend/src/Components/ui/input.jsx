import React from 'react';

const Input = ({ placeholder, type, onChange, value, className }) => {
  return (
    <input
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      value={value}
      className={`p-2 w-full md:w-[400px] bg-[#121212] border border-[#f2f2f2]/10 focus:border-[#f2f2f2]/20 outline-none placeholder:font-[300] placeholder:text-[#f2f2f2]/30 rounded-lg ${className}`}
    />
  )
}

export default Input;
