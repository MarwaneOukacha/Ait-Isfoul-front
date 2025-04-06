"use client"

import { useState } from "react"
import { 
  FaSearch, 
  FaMapMarkedAlt, 
  FaUserAlt, 
  FaCheckCircle, 
  FaArrowRight, 
  FaCalendarAlt, 
  FaMoneyBillWave, 
  FaTrash, 
  FaDownload,
  FaEnvelope,
  FaPhone,
  FaCreditCard
} from "react-icons/fa"

export default function Reservation() {
  const [currentStep, setCurrentStep] = useState(1);  // Initial step is "Select Room"
  const [showRoomDetails, setShowRoomDetails] = useState(false);  // Show room details on button click
  const [showCart, setShowCart] = useState(true);

  const steps = [
    {
      id: 1,
      name: "Select Room",
      icon: <FaMapMarkedAlt className="h-5 w-5" />,
      completed: currentStep > 1,
      active: currentStep === 1
    },
    {
      id: 2,
      name: "Personal Information",
      icon: <FaUserAlt className="h-5 w-5" />,
      completed: currentStep > 2,
      active: currentStep === 2
    },
    {
      id: 3,
      name: "Payment",
      icon: <FaMoneyBillWave className="h-5 w-5" />,
      completed: currentStep > 3,
      active: currentStep === 3
    },
    {
      id: 4,
      name: "Confirmation",
      icon: <FaCheckCircle className="h-5 w-5" />,
      completed: currentStep > 4,
      active: currentStep === 4
    }
  ];

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-50 min-h-screen">
      <div className="w-full max-w-4xl space-y-6 px-4 py-6 bg-white shadow-lg">
        {/* Progress Tracker */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Hotel Reservation</h1>
          </div>
          
          <div className="relative">
            <div className="flex justify-between items-center">
              {steps.map((step) => (
                <div key={step.id} className="flex flex-col items-center relative z-10">
                  <div 
                    className={`flex items-center justify-center w-10 h-10 rounded-full 
                      ${step.completed || step.active ? 'bg-accent text-white' : 'bg-gray-200 text-gray-500'}`}
                  >
                    {step.completed ? (
                      <FaCheckCircle className="h-6 w-6" />
                    ) : (
                      step.icon
                    )}
                  </div>
                  <p className={`mt-2 text-xs sm:text-sm font-medium 
                    ${step.completed || step.active ? 'text-accent' : 'text-gray-500'}`}>
                    {step.name}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Connecting lines */}
            <div className="absolute top-5 left-0 w-full">
              <div className="h-0.5 w-full bg-gray-200">
                <div 
                  className="h-0.5 bg-accent transition-all duration-500"
                  style={{ width: `${(currentStep - 1) * 33.33}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white p-6  shadow-sm">
          {/* Step 1: Select Room */}
          {currentStep === 1 && (
            <div>
              <div className="mt-6 border  p-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <FaCalendarAlt className="text-accent mr-2" />
                <span className="font-medium">Check-in</span>
                <span className="ml-2 text-gray-600">Monday, 20 May 2025</span>
              </div>
              <button className="px-4 py-2 border border-accent text-accent hover:bg-accent hover:text-white transition duration-300"  onClick={() => setShowRoomDetails(!showRoomDetails)}>
              {showRoomDetails ? "Hide Details" : "View Details"}
              </button>
            </div>
          </div>
              {/* Room details shown on click */}
              
              {showRoomDetails && (
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-800">Room Details:</h3>
                  <ul className="list-disc pl-5">
                    <li>Ocean view with balcony</li>
                    <li>King-size bed</li>
                    <li>Free Wi-Fi</li>
                    <li>Mini-bar included</li>
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Personal Information */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
              {/* Personal information form with icons */}
              <div className="mb-4 flex items-center">
                <FaUserAlt className="mr-3 text-gray-600" />
                <input 
                  type="text" 
                  className="mt-1 block w-full px-4 py-2 border rounded-md"
                  placeholder="Full Name"
                />
              </div>
              <div className="mb-4 flex items-center">
                <FaEnvelope className="mr-3 text-gray-600" />
                <input 
                  type="email" 
                  className="mt-1 block w-full px-4 py-2 border rounded-md"
                  placeholder="Email Address"
                />
              </div>
              <div className="mb-4 flex items-center">
                <FaPhone className="mr-3 text-gray-600" />
                <input 
                  type="text" 
                  className="mt-1 block w-full px-4 py-2 border rounded-md"
                  placeholder="Phone Number"
                />
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment</h2>
              {/* Payment form with icons */}
              <div className="mb-4 flex items-center">
                <FaCreditCard className="mr-3 text-gray-600" />
                <input 
                  type="text" 
                  className="mt-1 block w-full px-4 py-2 border rounded-md"
                  placeholder="Credit Card Number"
                />
              </div>
              <div className="mb-4 flex items-center">
                <FaCalendarAlt className="mr-3 text-gray-600" />
                <input 
                  type="text" 
                  className="mt-1 block w-full px-4 py-2 border rounded-md"
                  placeholder="Expiration Date (MM/YY)"
                />
              </div>
              <div className="mb-4 flex items-center">
                <FaCreditCard className="mr-3 text-gray-600" />
                <input 
                  type="text" 
                  className="mt-1 block w-full px-4 py-2 border rounded-md"
                  placeholder="CVV"
                />
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <div className="text-center">
              <FaCheckCircle className="text-green-600 h-12 w-12 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Reservation Confirmed!</h2>
              <p>Your reservation has been successfully completed. You can download your invoice below.</p>
              <div className="mt-4 flex justify-center">
                <button className="px-6 py-3 bg-accent text-white  flex items-center">
                  <FaDownload className="mr-2" /> Download Invoice
                </button>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            <button 
              onClick={handlePreviousStep} 
              disabled={currentStep === 1} 
              className="px-4 py-2 border border-gray-300 text-gray-700 "
            >
              Back
            </button>
            <button 
              onClick={handleNextStep} 
              className="px-4 py-2 bg-accent text-white "
            >
              {currentStep === 4 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


{/*  */}