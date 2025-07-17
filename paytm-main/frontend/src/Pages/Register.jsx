    import React, { useState, useEffect } from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import Input from '../Components/ui/input';
    import Button from '../Components/ui/button';
    import axios from 'axios';
    import Spinner from '../Components/ui/spinner';
    import Success from '../Components/ui/Success';

    const Register = () => {
        const [firstName, setFirstName] = useState('');
        const [lastName, setLastName] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const [error, setError] = useState('');
        const [loading, setLoading] = useState(false);
        const [success, setSuccess] = useState(false);
        const [buttonLabel, setButtonLabel] = useState('Sign Up');
        const navigate = useNavigate();

        const validateForm = () => {
            if (password.length < 8) {
                setError('Password must be at least 8 characters long.');
                return false;
            } else if (password !== confirmPassword) {
                setError('Passwords do not match.');
                return false;
            }
            setError('');
            return true;
        };

        const onSubmit = async (e) => {
            e.preventDefault();
            if (validateForm()) {
                setLoading(true);
                try {
                    const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/signup`, {
                        username: email,
                        firstName,
                        lastName,
                        password
                    });
                    localStorage.setItem('token', response.data.token);
                    setSuccess(true);
                    setButtonLabel('Account Created Successfully');

                    // Clear input fields
                    setFirstName('');
                    setLastName('');
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');

                    navigate('/dashboard');

                    // Change button label after 1 second
                    setTimeout(() => {
                        setButtonLabel('Sign Up');
                    }, 2000);
                } catch (error) {
                    setError('An error occurred during registration.');
                } finally {
                    setLoading(false);
                }
            }
        };

        return (
            <div className='h-screen flex justify-center items-center'>
                <div className="flex flex-col w-full px-12 xs:px-4 justify-center items-center rounded-2xl gap-2">
                    <h1 className='justify-center w-full items-center text-3xl flex font-[500] text-[#f2f2f2]'>Sign Up</h1>
                    <form onSubmit={onSubmit} className='flex flex-col w-full justify-center items-center space-y-4 mt-4'>
                        <Input type='text' name='firstName' value={firstName} placeholder='First Name' onChange={(e) => setFirstName(e.target.value)} />
                        <Input type='text' name='lastName' value={lastName} placeholder='Last Name' onChange={(e) => setLastName(e.target.value)} />
                        <Input type='email' name='email' value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                        <Input type='password' name='password' value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                        <Input type='password' name='confirmPassword' value={confirmPassword} placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)} />
                        {error && <div className='text-red-500 font-[300] text-left text-sm'>{error}</div>}
                        {loading ? (
                            <Button label='Processing' icon={<Spinner />} />
                        ) : (
                            <Button label={buttonLabel} icon={buttonLabel === 'Account Created Successfully' ? <Success /> : null} />
                        )}
                    </form>
                    <div className='flex justify-center text-[#f2f2f2]/50 font-[300] items-center ' >
                        Already have an account? &nbsp;<Link to='/signin' className='text-[#f2f2f2] hover:text-[#f2f2f2] hover:underline font-[400]'>Sign In</Link>
                    </div>
                </div>
            </div>
        );
    };

    export default Register;