'use client';

import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import FormInput from '../components/FormInput';

interface SigninFormInputs {
  email: string;
  password: string;
}

export default function Signin() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormInputs>();

  const onSubmit = async (data: SigninFormInputs) => {
  
  };

  return (
    <div className="flex h-[calc(100vh-96px)] items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Sign In
        </h1>

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
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
