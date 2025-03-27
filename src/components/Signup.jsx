import React, { useState } from 'react';
import { Logo, Input, Button } from '../Index';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/Auth';
import { login } from '../store/AuthSlice';
import { toast } from 'react-toastify';

function Signup() {
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError('');
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const currentUserData = await authService.getCurrentUser(userData);

        dispatch(login({ userData: currentUserData, role: data.role || 'user' }));
        toast.success('🎉 Signup successful!', { position: 'top-center' });
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
      toast.error('❌ Signup failed. Try again.', { position: 'top-center' });
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] flex justify-center items-center p-6">
      <div className="flex flex-col bg-white py-10 px-10 gap-6 rounded-2xl shadow-lg w-full max-w-md">
        <div className="text-center">
          <Logo />
        </div>

        {error && <p className="text-red-500 text-center font-medium">{error}</p>}

        <form onSubmit={handleSubmit(create)} className="flex flex-col gap-5">
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
          <Input
            type="text"
            placeholder="Enter name"
            className="py-3 px-4 bg-gray-100 border border-gray-300 rounded-md focus:ring-[#007b55]"
            {...register('name', { required: true })}
          />
          <Input
            type="text"
            placeholder="Enter phone number"
            className="py-3 px-4 bg-gray-100 border border-gray-300 rounded-md focus:ring-[#007b55]"
            {...register('phoneNumber', { required: true })}
          />
          <Input
            type="text"
            placeholder="Enter role"
            className="py-3 px-4 bg-gray-100 border border-gray-300 rounded-md focus:ring-[#007b55]"
            {...register('role', { required: true })}
          />

          <Link to="/login" className="text-lg font-medium text-[#007b55] hover:underline text-center">
            Already have an account?
          </Link>

          <Button type="submit" className="bg-[#007b55] hover:bg-[#005a3c] text-white py-3 rounded-md text-lg font-medium">
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
