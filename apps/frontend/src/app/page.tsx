'use client';

import Navbar from './components/NavBar';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">

      <main className="flex-grow flex items-center justify-center">
        <h2 className="text-3xl font-bold text-gray-800">
          Welcome to the application.
        </h2>
      </main>

    </div>
  );
}
