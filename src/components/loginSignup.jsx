'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import supabase  from '../lib/supabase';
function LoginPage() {
  const router = useRouter();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    const  { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(error);
      // Handle error, e.g., display an error message to the user
    } else {
      router.push('/dashboard'); // Replace '/dashboard' with your desired redirect URL
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error(error);
      // Handle error, e.g., display an error message to the user
    } else {
      router.push('/dashboard'); // Replace '/dashboard' with your desired redirect URL
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-4">
          <img src="/your-logo.png" alt="Your Logo" className="w-24 h-24" />
          <h1 className="text-2xl font-bold">Tradervue</h1>
        </div>

        <h2 className="text-xl font-bold mb-4">
          {isLoginMode ? 'Sign In' : 'Sign Up'}
        </h2>

        <form onSubmit={isLoginMode ? handleLogin : handleSignup}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Username or Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md
 shadow-sm"
              required
            />
          </div>

          <div className="mb-4">
            <input type="checkbox" id="rememberMe" name="rememberMe" />
            <label htmlFor="rememberMe" className="ml-2 text-sm font-medium text-gray-700">
              Remember Me
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {isLoginMode ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-4 text-center">
          {isLoginMode ? (
            <p>
              New user?{' '}
              <Link href="#" onClick={() => setIsLoginMode(false)}>
                Sign Up
              </Link>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <Link href="#" onClick={() => setIsLoginMode(true)}>
                Sign In
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;