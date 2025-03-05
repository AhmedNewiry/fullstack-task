'use client';

import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import FormInput from '../components/FormInput';
import { useState } from 'react';

interface SigninFormInputs {
  email: string;
  password: string;
}

export default function Signin() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormInputs>();

  const onSubmit = async (data: SigninFormInputs) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
        data,
        { withCredentials: true }
      );
      if (response.status === 200 || response.status === 201) {
        router.push('/?refresh=true'); 
   
        setTimeout(() => router.replace('/'), 100);
      }
      
    } catch (error: any) {
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Sign In
        </h1>
        {errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <FormInput
            label="Email"
            type="email"
            placeholder="Enter your email"
            registration={register('email')}
            error={errors.email}
          />

          <FormInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            registration={register('password')}
            error={errors.password}
          />

          <button
            type="submit"
            className="w-full bg-[#500878] hover:bg-[#420663] text-white font-bold py-4 px-8 rounded-full transition duration-300"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
