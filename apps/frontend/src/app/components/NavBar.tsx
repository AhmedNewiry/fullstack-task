'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
  
  };

  return (
    <nav className="bg-white shadow-md border-b  md:h-24 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between items-center py-4">
     
          <h1
            className="text-xl font-bold text-blue-600 cursor-pointer"
            onClick={() => router.push('/')}
          >
            My App
          </h1>

     
          <div className="hidden md:flex space-x-6  ">
            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => router.push('/sign-up')}
                  className="text-gray-700 hover:text-blue-600 transition font-medium"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => router.push('/sign-in')}
                  className="text-gray-700 hover:text-blue-600 transition font-medium"
                >
                  Sign In
                </button>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 transition font-medium"
              >
                Logout
              </button>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

    
        {isMenuOpen && (
          <div className="md:hidden border-t">
            <div className="flex flex-col items-center space-y-4 py-4">
              {!isLoggedIn ? (
                <>
                  <button
                    onClick={() => router.push('/sign-up')}
                    className="text-gray-700 hover:text-blue-600 transition font-medium"
                  >
                    Sign Up
                  </button>
                  <button
                    onClick={() => router.push('/sign-in')}
                    className="text-gray-700 hover:text-blue-600 transition font-medium"
                  >
                    Sign In
                  </button>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-800 transition font-medium"
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
