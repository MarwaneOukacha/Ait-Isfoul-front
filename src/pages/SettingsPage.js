import { useEffect, useState } from "react";
import { getUserIdFromToken, getUserInfoFromToken, profile } from "../services/auth";
import { useLocation, useParams } from "react-router-dom";
import profileImg from "../assets/img/profile1.jpg"

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({});
  const [userId, setUserId] = useState(null);

  useEffect(() => {
  const userInfo = getUserInfoFromToken();
  if (userInfo) {
    setProfileData(userInfo);
  } else {
    console.error("User info not found in token.");
  }
}, []);


  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    console.log("Profile updated:", profileData);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    console.log("Password changed");
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">My Profile</h1>
      <div className="flex justify-center mb-8">
        <div className="w-12 h-1 bg-red-600 rounded"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <div className="w-32 h-32 rounded-full border-4 border-gray-100 overflow-hidden">
                <img src={profileImg} alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>

            <h2 className="text-xl font-medium text-gray-800">
              {profileData.firstName} {profileData.lastName}
            </h2>
            <p className="text-gray-500 text-sm mb-2">{profileData.email}</p>
            <p className="text-gray-700 mb-6">
              
            </p>

            <div className="w-full space-y-2">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center px-4 py-2 rounded-md text-left ${
                  activeTab === "profile" ? "bg-gray-100 font-medium" : ""
                }`}
              >
                <span className="mr-2">👤</span>
                Update Profile
              </button>
              <button
                onClick={() => setActiveTab("password")}
                className={`w-full flex items-center px-4 py-2 rounded-md text-left ${
                  activeTab === "password" ? "bg-gray-100 font-medium" : ""
                }`}
              >
                <span className="mr-2">🔒</span>
                Change Password
              </button>
            </div>
          </div>
        </div>

        {/* Main Form Section */}
        <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
          {activeTab === "profile" ? (
            <>
              <h2 className="text-xl font-medium text-gray-800 mb-6">Update Profile</h2>
              <form onSubmit={handleProfileSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleProfileChange}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={profileData.lastName}
                      onChange={handleProfileChange}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      className="w-full px-3 py-2 border rounded-md bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={profileData.phoneNumber}
                      onChange={handleProfileChange}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-accent text-white rounded hover:bg-accent-hover"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-xl font-medium text-gray-800 mb-6">Change Password</h2>
              <form onSubmit={handlePasswordSubmit}>
                <div className="space-y-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <input
                      type="password"
                      name="current"
                      value={passwords.current}
                      onChange={handlePasswordChange}
                      className="w-full px-3 py-2 border rounded-md bg-yellow-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input
                      type="password"
                      name="new"
                      value={passwords.new}
                      onChange={handlePasswordChange}
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <input
                      type="password"
                      name="confirm"
                      value={passwords.confirm}
                      onChange={handlePasswordChange}
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-accent text-white rounded hover:bg-accent-hover"
                  >
                    Save Password
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
