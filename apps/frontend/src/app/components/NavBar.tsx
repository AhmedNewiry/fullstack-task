'use client';

import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchParams = useSearchParams(); 
  const refreshQuery = searchParams.get('refresh');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
          { withCredentials: true }
        );
        setIsLoggedIn(!!response.data);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, [refreshQuery]);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.error('An error occurred while logging out', error);
    } finally {
      setIsLoggedIn(false);
      router.push('/');
    }
  };

  return (
    <nav className="bg-gradient-to-r from-gray-50 to-white shadow-lg border-b border-gray-100 fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between items-center py-5 ">
          <h1
            className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={() => router.push('/')}
          >
            EasyGen App
          </h1>

          <div className="hidden md:flex items-center space-x-8">
            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => {
                    router.push('/sign-up');
                    setIsMenuOpen(false);
                  }}
                  className="relative px-12 py-4 text-gray-700 font-medium rounded-full hover:bg-gray-100 hover:text-blue-600 transition-all duration-300 ease-in-out group"
                >
                  
                  Sign Up
                </button>
                <button
                  onClick={() => {
                    router.push('/sign-in');
                    setIsMenuOpen(false);
                  }}
                  className="px-12 py-4 bg-[#500878] text-white font-medium rounded-full hover:bg-[#420663] transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
                >
                  Sign In
                </button>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="px-12 py-4 bg-red-50 text-red-600 font-medium rounded-full hover:bg-red-100 hover:text-red-700 transition-all duration-300 ease-in-out"
              >
                Logout
              </button>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-gray-600 hover:text-blue-600"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white shadow-md absolute left-0 right-0">
            <div className="flex flex-col items-center ">
              {!isLoggedIn ? (
                <>
                  <button
                    onClick={() => router.push('/sign-up')}
                    className="w-full mx-4 px-6 py-8 text-gray-700 font-medium md:rounded-lg md:hover:bg-gray-100 md:hover:text-blue-600 transition-all duration-300"
                  >
                    Sign Up
                  </button>
                  <button
                    onClick={() => router.push('/sign-in')}
                    className="flex items-center justify-center w-full  px-12 py-4 border-t border-gray-200 md:bg-[#500878] text-gray-700 md:text-white font-medium md:rounded-full md:hover:bg-[#420663] transition-all duration-300"
                  >
                    Sign In
                  </button>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="w-full mx-4 px-6 py-3 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 hover:text-red-700 transition-all duration-300"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
