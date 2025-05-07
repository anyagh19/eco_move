import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import authService from '../appwrite/Auth';
import { login as storelogin } from '../store/AuthSlice';
import { Button, Input, Logo } from '../Index';
import { toast } from 'react-toastify';

function Login() {
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const loginUser = async (data) => {
    setError('');
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();

        if (userData) {
          // Extract role from preferences or fallback to 'user'
          const role = userData.prefs?.role || 'user';
          dispatch(storelogin({ userData, role }));
          toast.success('🎉 Login successful', { position: 'top-center' });
          navigate('/');
        }
      }
    } catch (error) {
      setError(error.message);
      toast.error('❌ Login failed! Check your credentials.', { position: 'top-center' });
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] flex justify-center items-center p-6">
      <div className="flex flex-col bg-white py-12 px-10 gap-6 rounded-2xl shadow-lg w-full max-w-md">
        <div className="text-center">
          <Logo />
        </div>

        {error && <p className="text-red-500 text-center font-medium">{error}</p>}

        <form onSubmit={handleSubmit(loginUser)} className="flex flex-col gap-6">
          <Input
            type="email"
            placeholder="Enter email"
            className="py-3 px-4 bg-gray-100 border border-gray-300 rounded-md focus:ring-[#007b55]"
            {...register('email', { required: true })}
          />
          <Input
            type="password"
            placeholder="Enter password"
            className="py-3 px-4 bg-gray-100 border border-gray-300 rounded-md focus:ring-[#007b55]"
            {...register('password', { required: true })}
          />
          
          <Link to="/signup" className="text-lg font-medium text-[#007b55] hover:underline text-center">
            Create an account
          </Link>

          <Button type="submit" className="bg-[#007b55] hover:bg-[#005a3c] text-white py-3 rounded-md text-lg font-medium">
            Sign In
          </Button>

          <div className="flex justify-between px-5">
            <Link to="/recycle-signup" className="text-xl font-semibold bg-[#007b55] hover:bg-[#005a3c] text-white py-3 px-6 rounded-xl">
              Recycle
            </Link>
            <Link to="/shifting-signup" className="text-xl font-semibold bg-[#ffb300] hover:bg-[#cc8a00] text-white py-3 px-6 rounded-xl">
              Shift
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
