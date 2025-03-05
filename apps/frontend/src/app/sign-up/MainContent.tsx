'use client'

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { signupSchema, SignupFormInputs } from '../../schemas/sign-up.schema';
import FormInput from '../components/FormInput';
import { useState } from 'react';
export default function Signup() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema)
  });
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data: SignupFormInputs) => {

    const { email, name, password } = data;
    try {
 
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
        { email, name, password }
      );
      
      if (response.status === 201 || response.status === 200) {
   
        router.push('/sign-in');
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
        <h1 className="text-2xl font-bold text-center text-gray-800">Sign Up</h1>
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            label="Email"
            type="email"
            placeholder="Enter your email"
            registration={register('email')}
            error={errors.email}
          />

          <FormInput
            label="Name"
            placeholder="Enter your name"
            registration={register('name')}
            error={errors.name}
          />

          <FormInput
            label="Password"
            type="password"
            placeholder="Create a password"
            registration={register('password')}
            error={errors.password}
          />

          <FormInput
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            registration={register('confirmPassword')}
            error={errors.confirmPassword}
          />

          <button
            type="submit"
            className="w-full bg-[#500878] hover:bg-[#420663] text-white font-bold py-4 px-8 rounded-full transition duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
  
}