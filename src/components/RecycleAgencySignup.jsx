import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import recycleAuthService from '../appwrite/RecycleAuth';
import { toast } from 'react-toastify';
import { Button, Input, Logo } from '../Index';
import { useDispatch } from 'react-redux';
import { login } from '../store/AuthSlice';

function RecycleAgencySignup() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      agencyName: '',
      agencyEmail: '',
      agencyPassword: '',
      agencyPhone: '',
      agencyAddress: '',
      agencyCity: '',
      serviceArea: '',
      acceptedMaterials: '',
      role: 'recycle',
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const recycleSignup = async (data) => {
    setError('');
    if (isSubmitting) return;
    setIsSubmitting(true);

    if (data.agencyPassword.length < 8) {
      toast.error('❌ Password must be at least 8 characters long.', { position: 'top-center' });
      setIsSubmitting(false);
      return;
    }

    try {
      const agency = await recycleAuthService.createRecycleAgency(data);
      if (agency) {
        toast.success('🎉 Agency registered successfully!', { position: 'top-center' });
        const currentData = await recycleAuthService.getCurrentRecycleAgency();
        if (currentData) {
          dispatch(login({ userData: currentData, role: data.role }));
        }
        navigate('/');
      }
    } catch (error) {
      setError(error.message || 'Registration failed. Try again.');
      toast.error('❌ Registration failed. Try again.', { position: 'top-center' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center py-10">
      <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-md">
        <div className="text-center">
          <Logo />
          <h2 className="text-2xl font-semibold text-gray-800 mt-4">Create Recycle Agency Account</h2>
        </div>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form onSubmit={handleSubmit(recycleSignup)} className="flex flex-col gap-5 mt-6">
          <Input type="text" placeholder="Agency Name" {...register('agencyName', { required: true })} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500" />
          <Input type="email" placeholder="Agency Email" {...register('agencyEmail', { required: true })} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500" />
          <Input type="password" placeholder="Password (min 8 chars)" {...register('agencyPassword', { required: true })} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500" />
          <Input type="text" placeholder="Phone Number" {...register('agencyPhone', { required: true })} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500" />
          <Input type="text" placeholder="Address" {...register('agencyAddress', { required: true })} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500" />
          <Input type="text" placeholder="City" {...register('agencyCity', { required: true })} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500" />
          <Input type="text" placeholder="Service Area" {...register('serviceArea', { required: true })} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500" />
          <Input type="text" placeholder="Accepted Materials" {...register('acceptedMaterials', { required: true })} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500" />
          <Input type="hidden" {...register('role')} />

          <div className="text-center mt-2">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/recycle-login" className="text-green-600 hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>

          <Button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-md text-lg font-medium transition duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Agency...' : 'Create Account'}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default RecycleAgencySignup;
