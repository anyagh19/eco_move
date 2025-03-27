import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import shiftAuthService from '../appwrite/ShiftAuthService';
import { login } from '../store/AuthSlice';
import { Logo, Input, Button } from '../Index';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function ShiftingAgencySignup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const { register, handleSubmit } = useForm({
        defaultValues: {
            agencyName: '',
            agencyEmail: '',
            agencyPassword: '',
            agencyPhone: '',
            agencyAddress: '',
            serviceArea: '',
            vehicleAvailable: '',
            role: 'shift'
        }
    });

    const shiftCreate = async (data) => {
        setError('');
        if (isSubmitting) return;
        setIsSubmitting(true);

        if (data.agencyPassword.length < 8) {
            setError('❌ Password must be at least 8 characters.');
            toast.error('❌ Password must be at least 8 characters.', { position: 'top-center' });
            setIsSubmitting(false);
            return;
        }

        try {
            const agency = await shiftAuthService.createShiftingAgency(data);
            if (agency) {
                toast.success('🎉 Agency registered successfully!', { position: 'top-center' });

                const userData = await shiftAuthService.getCurrentShiftingAgency();
                if (userData) {
                    dispatch(login({ userData: userData, role: 'shift' }));
                }
                navigate('/');
            }
        } catch (error) {
            setError('❌ Registration failed. Try again.');
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
                    <h2 className="text-2xl font-semibold text-gray-800 mt-4">Shifting Agency Signup</h2>
                </div>

                {error && <p className="text-red-500 text-center mt-2">{error}</p>}

                <form onSubmit={handleSubmit(shiftCreate)} className="flex flex-col gap-5 mt-6">
                    <Input
                        type="text"
                        placeholder="Agency Name"
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                        {...register('agencyName', { required: true })}
                    />
                    <Input
                        type="email"
                        placeholder="Agency Email"
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                        {...register('agencyEmail', { required: true })}
                    />
                    <Input
                        type="password"
                        placeholder="Password (min 8 chars)"
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                        {...register('agencyPassword', { required: true })}
                    />
                    <Input
                        type="text"
                        placeholder="Phone Number"
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                        {...register('agencyPhone', { required: true })}
                    />
                    <Input
                        type="text"
                        placeholder="Agency Address"
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                        {...register('agencyAddress', { required: true })}
                    />
                    <Input
                        type="text"
                        placeholder="Service Area"
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                        {...register('serviceArea', { required: true })}
                    />
                    <Input
                        type="text"
                        placeholder="Available Vehicles"
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                        {...register('vehicleAvailable', { required: true })}
                    />
                    <input type="hidden" {...register('role')} />

                    <div className="text-center mt-2">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link to="/shifting-login" className="text-green-600 hover:underline font-medium">
                                Sign in
                            </Link>
                        </p>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-md text-lg font-medium transition duration-300"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Creating Agency...' : 'Create Agency'}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default ShiftingAgencySignup;
