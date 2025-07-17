import React from 'react';

const Button = ({ label, variant = 'default', className = '', icon }) => {
    const baseClasses = 'w-full flex justify-center items-center gap-1 md:w-[400px] font-[600] p-2 rounded-md';
    const variants = {
        default: 'bg-[#f2f2f2] hover:bg-[#e0e0e0] text-[#212121] border-none',
        secondary: 'border-[#f2f2f2]/10 hover:bg-[#161616] transition-all w-[120px] md:w-[200px] text-[#f2f2f2] border',
    };

    return (
        <button className={`${baseClasses} ${variants[variant]} ${className}`}>
            {label}
            {icon && <span className="">{icon}</span>}
        </button>
    );
};

export default Button;
