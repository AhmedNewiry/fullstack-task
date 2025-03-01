import React from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type FormInputProps = {
  label: string;
  type?: string;
  placeholder?: string;
  error?: FieldError;
  registration: UseFormRegisterReturn;
}

const FormInput= ({ label, type = 'text', placeholder, error, registration }:FormInputProps) => {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        {...registration}
      />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default FormInput;
