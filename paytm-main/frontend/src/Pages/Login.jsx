import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Components/ui/button';
import Input from '../Components/ui/input';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import Spinner from '../Components/ui/spinner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleMouseDown = () => {
    setShowPassword(true); // Show password on mouse down
  };

  const handleMouseUp = () => {
    setShowPassword(false); // Hide password on mouse up
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form submission starts
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/signin`, {
        username: email,
        password
      });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      const message = error.response?.data?.message || 'An error occurred during login. Please try again.';
      setError(message);
      console.error('Login error:', error); // Log error for debugging
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className='h-screen flex justify-center items-center'>
      <div className="flex flex-col w-full px-12 xs:px-4 justify-center items-center rounded-2xl gap-2">
        <h1 className='justify-center w-full items-center text-3xl flex font-[500] text-[#f2f2f2]'>Sign In</h1>
        <form onSubmit={onSubmit} className='flex flex-col w-full justify-center items-center space-y-4 mt-4'>
          <Input
            type='email'
            placeholder='Email'
            value={email} // Controlled input
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative md:w-[400px] w-full">
            <Input
              type={showPassword ? 'text' : 'password'} // Toggle input type
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type='button'
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#f2f2f2]"
            >
              {showPassword ? <Eye color='#f2f2f299' size={18} /> : <EyeOff color='#f2f2f299' size={18} />}
            </button>
          </div>
          {error && <div className='text-red-500 font-[300] text-left text-sm'>{error}</div>}
          <Button 
            label={loading ? 'Processing' : 'Sign In'} // Update button label based on loading state
            icon={loading ? <Spinner /> : null} // Show spinner if loading
            type="submit"
            disabled={loading} // Disable button while loading
          />
        </form>
        <div className='flex justify-center text-[#f2f2f2]/50 font-[300] items-center '>
          Don't have an account? &nbsp;
          <Link to='/signup' className='text-[#f2f2f2] hover:text-[#f2f2f2] hover:underline font-[400]'>Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
