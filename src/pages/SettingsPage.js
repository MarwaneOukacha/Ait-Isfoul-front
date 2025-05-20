import { useEffect, useState } from "react";
import { getUserIdFromToken, getUserInfoFromToken, profile } from "../services/auth";
import { useLocation, useParams } from "react-router-dom";
import profileImg from "../assets/img/profile1.jpg"
import { changePassword } from "../services/auth";
import { toast } from "sonner";
import {updateCustomer} from "../services/customerService"

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({});
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);


  useEffect(() => {
  const idi=getUserIdFromToken();
  const userInfo = getUserInfoFromToken();
  if(idi){
    setUserId(idi);
  }
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

  const handleProfileSubmit = async (e) => {
  e.preventDefault();
  setProfileLoading(true);

  try {
    const payload = {
      id: userId, // ensure ID is present
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      email: profileData.email,
      phoneNumber: profileData.phoneNumber,
      iden: profileData.iden,
    };
    console.log(payload)
    const response = await updateCustomer(payload);
    toast.success("Profile updated successfully!",
      {
    style: {
      background: '#22C55E', // amber
      color: 'white'
    }}
    );
  } catch (error) {
    console.log(error);
    toast.error(error.message || "Failed to update profile.");
  } finally {
    setProfileLoading(false);
  }
};


  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    const { current, new: newPassword, confirm } = passwords;

    if (newPassword !== confirm) {
      toast.error("New password and confirmation do not match.");
      return;
    }

    setLoading(true);
    try {
      await changePassword({ oldPassword: current, newPassword });
      toast.success("Password changed successfully!",{
    style: {
      background: '#22C55E', // amber
      color: 'white'
    }});
      setPasswords({ current: "", new: "", confirm: "" });
    } catch (error) {
      toast.error(error.message || "Failed to change password.");
    } finally {
      setLoading(false);
    }
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
                      name="phoneNumber"
                      value={profileData.phoneNumber}
                      onChange={handleProfileChange}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Identifier</label>
                    <input
                      type="text"
                      name="iden"
                      value={profileData.iden}
                      onChange={handleProfileChange}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
  type="submit"
  disabled={profileLoading}
  className={`px-4 py-2 rounded text-white flex items-center justify-center ${
    profileLoading ? 'bg-accent/70 cursor-not-allowed' : 'bg-accent hover:bg-accent-hover'
  }`}
>
  {profileLoading && (
    <svg
      className="animate-spin h-5 w-5 mr-2 text-white"
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
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
  )}
  {profileLoading ? "Saving..." : "Save Changes"}
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
  disabled={loading}
  className={`px-4 py-2 rounded text-white flex items-center justify-center ${
    loading ? 'bg-accent/70 cursor-not-allowed' : 'bg-accent hover:bg-accent-hover'
  }`}
>
  {loading ? (
    <svg
      className="animate-spin h-5 w-5 mr-2 text-white"
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
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
  ) : null}
  {loading ? "Saving..." : "Save Password"}
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
