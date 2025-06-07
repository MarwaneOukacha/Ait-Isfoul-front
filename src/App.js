import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import RoomDetails from './pages/RoomDetails';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Reservation from './components/Reservation';
import ReservationList from './components/ReservationList';
import SettingsPage from './pages/SettingsPage';
import { Toaster } from 'sonner';

import OtpVerification from './pages/OtpVerification';
import ProtectedRoute from './components/ProtectedRoute';


const roomDetails = {
  hotelName: 'Ait-Isfoul HÔTEL',
  roomType: 'Suite',
  price: 2500,
  features: ['2 lits king-size', 'Jacuzzi privé']
};
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'room/:id', element: <RoomDetails /> },
      { path: 'register', element: <SignUp /> },
      { path: 'Login', element: <SignIn /> },
      {
        path: 'Book',
        element: <Reservation roomDetails={roomDetails} />,
      },
      {
        path: 'my-bookings',
        element: (
          <ProtectedRoute>
            <ReservationList />
          </ProtectedRoute>
        ),
      },
      {
        path: 'settings',
        element: (
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/:email/verification',
        element: <OtpVerification />,
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </>
  
)
};

export default App;
