import axios from 'axios';
import { Eye } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SendPage = () => {
    const [message, setMessage] = useState();
    const [error, setError] = useState();
    const [balance, setBalance] = useState(0);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(100);
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.style.width = `${Math.max(amount.toString().length, 0.5)}ch`;
        }
    }, [amount]);

    useEffect(() => {
        const getDetails = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/account/balance`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                setBalance(parseFloat(response.data.balance));
            } catch (error) {
                console.error('Error fetching balance:', error);
            }
        }
        getDetails();
    }, []);

    const transferRequest = async () => {
        if (amount > balance) {
            setError('Insufficient balance');
            setMessage('');
            return;
        }
        try {
            axios.post(`${import.meta.env.VITE_API_URL}/account/transfer`, {
                to: id,
                amount: amount
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            })
            setError('');
            setMessage('');
            toast.success('Money transferred successfully');
            setTimeout(() => {
                navigate('/dashboard');
            }, 1000); // Adjust the delay as needed
        }
        catch (error) {
            setError('Error transferring money');
            setMessage('');
            console.error('Error transferring money:', error);
        }
    }

    const increaseAmount = () => {
        setAmount((prevAmount) => prevAmount + 10); // Increase amount by 10
    };

    const decreaseAmount = () => {
        setAmount((prevAmount) => (prevAmount > 10 ? prevAmount - 10 : 0)); // Decrease by 10, minimum of 0
    };

    const handleSetAmount = (e) => {
        const newAmount = parseInt(e.target.value, 10);
        setAmount(isNaN(newAmount) ? 0 : newAmount);
    };


    return (
        <div className='h-screen flex justify-center items-start pt-24'>
            <div className="flex flex-col w-full px-12 xs:px-4 justify-start items-center rounded-2xl gap-2">
                <h1 className='justify-center w-full items-center text-7xl flex font-[500] text-[#f2f2f2] pb-32'>Send Money</h1>
                <img src="https://avatars.githubusercontent.com/u/77189432" draggable='false' alt="Lokendra Kushwah" className='rounded-full select-none w-[60px] h-[60px]' />
                <p className='text-center font-[300] text-[#f2f2f2]/70 text-lg mb-4'>{name}</p>
                <div className='flex flex-col w-full justify-center items-center gap-4'>
                    <div className="flex justify-center items-end gap-2">
                        {/* Amount Display */}
                        <p className='text-center flex justify-center items-end font-[500] text-[#f2f2f2] text-5xl'>
                            <input className='focus:outline-none w-[2.75ch]' ref={inputRef} type="number" onChange={(e) => { handleSetAmount(e) }} value={amount} />
                        </p>
                        <div className="flex flex-col items-center">
                            <button onClick={increaseAmount} className="text-[#f2f2f2]/70 font-[300] w-4 h-8 text-3xl">
                                +
                            </button>
                            <button onClick={decreaseAmount} className="text-[#f2f2f2]/70 font-[300] w-4 h-8 text-3xl">
                                -
                            </button>
                        </div>
                        <span className='text-[#f2f2f2]/70 font-[300] text-lg'>&nbsp;INR</span>
                    </div>
                    <button onClick={transferRequest} className='bg-[#f2f2f2] hover:bg-[#e0e0e0] w-[150px] md:w-[200px] font-[600] text-[#212121] border-none p-2 rounded-md'>Initiate Transfer</button>

                    <Link to="/dashboard">
                        <button className='border-[#f2f2f2]/10 hover:bg-[#161616] transition-all w-[150px] md:w-[200px] font-[600] text-[#f2f2f2] border p-2 rounded-md'>Cancel</button>
                    </Link>
                </div>
                {message
                    &&
                    <p className='text-center font-[300] text-green-500 text-lg mt-4'>{message}</p>
                }
                {error
                    &&
                    <p className='text-center font-[300] text-red-500 text-lg mt-4'>{error}</p>
                }

            </div>
            <ToastContainer />
        </div>
    )
}

export default SendPage
