import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import shiftAuthService from '../appwrite/ShiftAuthService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/AuthSlice';
import { Logo, Button, Input } from '../Index';
import { Link } from 'react-router-dom';

function ShiftingAgencyLogin() {
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const agencyLogin = async (data) => {
        setError('');
        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            const shiftAgency = await shiftAuthService.shiftingAgencyLogin(data);
            if (shiftAgency) {
                const userData = await shiftAuthService.getCurrentShiftingAgency();
                if (userData) {
                    dispatch(login({ userData: userData, role: 'shift' }));
                    toast.success('🎉 Successfully logged in!', { position: 'top-center' });
                    navigate('/');
                }
            }
        } catch (error) {
            setError('❌ Invalid email or password.');
            toast.error('❌ Login failed. Please check your credentials.', { position: 'top-center' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center py-10">
            <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-md">
                <div className="text-center">
                    <Logo />
                    <h2 className="text-2xl font-semibold text-gray-800 mt-4">Shifting Agency Login</h2>
                </div>

                {error && <p className="text-red-500 text-center mt-2">{error}</p>}

                <form onSubmit={handleSubmit(agencyLogin)} className="flex flex-col gap-5 mt-6">
                    <Input
                        type="email"
                        placeholder="Enter Email"
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                        {...register('agencyEmail', { required: true })}
                    />
                    <Input
                        type="password"
                        placeholder="Enter Password"
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                        {...register('agencyPassword', { required: true })}
                    />

                    <div className="text-center mt-2">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/shifting-signup" className="text-green-600 hover:underline font-medium">
                                Sign up
                            </Link>
                        </p>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-md text-lg font-medium transition duration-300"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Signing In...' : 'Sign In'}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default ShiftingAgencyLogin;
