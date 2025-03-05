'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function HomePageContent() {
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchWelcomeMessage = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/app/welcome`,
          { withCredentials: true }
        );
        setMessage(response.data.message);
      } catch (err) {
        setError('Failed to fetch welcome message. Please try again.');
      }
    };

    fetchWelcomeMessage();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-grow flex items-center justify-center">
        {message ? (
          <h2 className="text-3xl font-bold text-gray-800">{message}</h2>
        ) : error ? (
          <h2 className="text-3xl font-bold text-red-500">{error}</h2>
        ) : (
          <h2 className="text-3xl font-bold text-gray-800">Loading...</h2>
        )}
      </main>
    </div>
  );
}
