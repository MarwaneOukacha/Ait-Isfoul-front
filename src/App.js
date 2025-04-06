import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import RoomDetails from './pages/RoomDetails';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Reservation from './components/Reservation';
const roomDetails = {
  hotelName: 'HÔTEL DE PARIS',
  roomType: 'Suite Présidentielle',
  price: 2500,
  features: ['2 lits king-size', 'Vue mer', 'Jacuzzi privé']
};
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true, // equivalent to path: '/'
        element: <Home />,
      },
      {
        path: 'room/:id',
        element: <RoomDetails />,
      },
      {
        path: 'register',
        element: <SignUp />,
      },
      {
        path: 'Login',
        element: <SignIn />,
      },
      {
        path: 'Book',
        element:<Reservation roomDetails={roomDetails} />

      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
