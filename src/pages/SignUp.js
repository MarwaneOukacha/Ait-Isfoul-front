import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Registre } from '../services/auth'; // Adjust the path
import { toast } from 'sonner';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    iden: ''
  });
  const navigate=useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await Registre({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phone,
        type:"CUSTOMER",
        iden: formData.iden
      });

      toast.success("Registration successful!");
      navigate("/login")
      // Optionally redirect or reset the form here
    } catch (err) {
      toast.error(err.message || "Registration failed.");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg bg-white p-10 rounded-xl shadow-xl">
        <h2 className="text-3xl font-semibold text-center mb-6">Create Your Account</h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="John"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="+212 600 000 000"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Identifier (iden)</label>
            <input
              type="text"
              name="iden"
              placeholder="Your identifier"
              value={formData.iden}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-accent text-white py-2 rounded-lg hover:bg-accent/90 transition flex justify-center items-center gap-2"
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
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-accent hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
