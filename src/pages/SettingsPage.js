import React, { useState } from 'react';
import { FaUserCircle, FaLock, FaEnvelope, FaCheckCircle } from 'react-icons/fa';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const handleSaveSettings = () => {
    if (password === confirmPassword) {
      console.log('Settings saved');
    } else {
      console.error('Passwords do not match');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 sm:py-16 lg:py-24 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8  ">
        {/* Settings Tabs */}
        <div className="flex items-center justify-center space-x-8 text-lg font-semibold text-gray-700 border-b">
          <button 
            onClick={() => setActiveTab('profile')} 
            className={`px-4 py-2 transition-all ${activeTab === 'profile' ? 'border-b-2 border-primary text-primary' : 'hover:text-primary'}`}
          >
            Profile
          </button>
          <button 
            onClick={() => setActiveTab('security')} 
            className={`px-4 py-2 transition-all ${activeTab === 'security' ? 'border-b-2 border-primary text-primary' : 'hover:text-primary'}`}
          >
            Security
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && (
          <div className="mt-6 space-y-8">
            {/* Name */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 p-3  border-gray-300  focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 p-3 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="mt-6 space-y-8">
            {/* Password */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 p-3 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-2 p-3 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="mt-8">
          <button
            onClick={handleSaveSettings}
            className="w-full py-3 bg-primary text-white font-medium text-lg  hover:bg-primary-dark transition duration-300"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
