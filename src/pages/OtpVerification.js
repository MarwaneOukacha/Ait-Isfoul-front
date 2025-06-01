import React, { useState } from 'react';
import { toast } from 'sonner';
import { verifyOtp } from '../services/auth'; // You must define this function
import { useParams } from 'react-router-dom';

const OtpVerification = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const {email}=useParams();

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await verifyOtp({ email,otp }); // Call backend
      toast.success('OTP verified successfully!');
      window.location.href = '/'; // Navigate on success
    } catch (error) {
      console.error(error.message);
      toast.error('Invalid OTP. Please try again.', {
        style: {
          background: '#dc2626',
          color: 'white',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-10 rounded-xl shadow-xl">
        <h2 className="text-3xl font-semibold text-center mb-6">Enter OTP</h2>

        <form onSubmit={handleVerify} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium">OTP Code</label>
            <input
              type="text"
              placeholder="Enter the 6-digit code"
              maxLength="6"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-white py-2 rounded-lg hover:bg-accent/90 transition flex items-center justify-center"
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
              'Verify OTP'
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Didn't get the code?{' '}
          <button
            type="button"
            onClick={() => toast('Resend OTP not implemented')}
            className="text-accent hover:underline"
          >
            Resend
          </button>
        </p>
      </div>
    </section>
  );
};

export default OtpVerification;
