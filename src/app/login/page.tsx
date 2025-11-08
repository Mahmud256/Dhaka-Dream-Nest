'use client';

import { Button } from '@mui/material';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    if (!res?.error) router.push('/');
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/background/4.webp')" }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-[#ffffffce] bg-opacity-90 backdrop-blur-md p-6 rounded-md shadow-md w-80"
      >
        <h1 className="text-xl font-semibold mb-4 text-center">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-2 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative mb-2">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="border p-2 w-full rounded-md pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-2 flex items-center text-gray-500"
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>

        <button
          type="submit"
          className="bg-[#103c3b] hover:bg-[#0d302f] transition text-white w-full py-2 rounded-md cursor-pointer font-bold"
        >
          Login
        </button>

        <div className="text-center my-2 text-gray-500">or</div>

        <button
          type='button'
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="w-full font-bold flex items-center justify-center cursor-pointer gap-2 border border-[#77a5d4] py-2 rounded-lg hover:bg-[#86a5fa10] hover:border-[#1976d2] hover:bg-opacity-[0.04] transition"
        >
          <FcGoogle size={25} /> Continue with Google
        </button>


        <p className="text-center mt-6 text-gray-700">
          Don’t have an account?{' '}
          <Link href="/signup" className="text-indigo-600 font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
