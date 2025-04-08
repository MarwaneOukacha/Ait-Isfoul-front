import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import RoomProvider from './context/RoomContext';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const root = ReactDOM.createRoot(document.getElementById('root'));
const stripePromise = loadStripe('pk_test_YOUR_PUBLIC_KEY'); // Replace with your Stripe public key

root.render(
  
    <React.StrictMode>
      <RoomProvider>
      <Elements stripe={stripePromise}>
        <App />
        </Elements>
      </RoomProvider>
    </React.StrictMode>
);
