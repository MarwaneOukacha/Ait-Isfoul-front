import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { login } from '../services/auth';
import { toast } from 'sonner';


const SignIn = () => {
  const [loading, setLoading] = useState(false);

  const handleSignIn =async  (e) => {
    e.preventDefault();
    /*try {
      const user = await login({ email: 'marwaneoukacha2001@gmail.com', password: 'PB267544' });
      
      console.log('Logged in:', user);
    } catch (e) {
      console.error(e.message);
    }*/
    
    setLoading(true);

    // Simulate an async sign-in (e.g., fetch or Firebase)
    setTimeout(() => {
      localStorage.setItem('authToken', 'mock-token-123'); // Store token or user object
      toast('Logged in')
      setLoading(false);
      window.location.href = '/'; // or use `navigate('/')` if using `react-router`
    }, 2000);
   
  };

  return (
    
    <section className="py-20 min-h-screen flex items-center justify-center">      
      <div className="w-full max-w-lg bg-white p-10 rounded-xl shadow-xl">
        <h2 className="text-3xl font-semibold text-center mb-6">Welcome Back</h2>

        <form className="space-y-5" onSubmit={handleSignIn}>
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-accent text-white py-2 rounded-lg hover:bg-accent/90 transition flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-gray-400">or</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <div className="space-y-3">
          <button
            onClick={() => console.log('Sign in with Google')}
            className="flex items-center justify-center w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            <FcGoogle size={20} className="mr-2" />
            Sign in with Google
          </button>
          <button
            onClick={() => console.log('Sign in with Facebook')}
            className="flex items-center justify-center w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition text-blue-700"
          >
            <FaFacebook size={20} className="mr-2" />
            Sign in with Facebook
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <Link to='/register'  className="text-accent hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignIn;
