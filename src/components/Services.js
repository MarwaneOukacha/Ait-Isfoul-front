import React from "react";
import About01 from '../assets/img/rooms/chill01.jpg';
import About02 from '../assets/img/rooms/chill02.jpg';
import About03 from '../assets/img/rooms/spic.jpg';
import About04 from '../assets/img/rooms/restaurant.jpg';




const Services = () => {
  return (
    <section id="services" className="py-24">
      <div className="container mx-auto px-6 lg:px-0">
        {/* Heading */}
        <div className="text-center mb-12">
          <div className="font-tertiary uppercase text-[15px] tracking-[6px] text-accent">
            Services
          </div>
          <h2 className="font-primary text-[45px] mb-4">Our Restaurant</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
          Our restaurant is the heart and soul of Aitisfoul
          </p>
        </div>


        {/* Our Services Section */}
        <section className="flex flex-col lg:flex-row items-center">
        <div className="w-full lg:w-1/2">
        <img
            src={About03}
            alt="Our Services"
            className="w-full h-auto rounded-lg shadow-lg"
        />
        </div>
        <div className="w-full lg:w-1/2 p-6 text-center lg:text-left">
        <h3 className="font-primary text-[30px] mb-4">Restaurant</h3>
        <p className="text-gray-600 text-lg">
        Our restaurant is the heart and soul of Aitisfoul. It epitomizing our ethos: a deep respect for our surroundings and an unwavering simple local moroccan culture, gathered and shared together.


        </p>
        </div>
        </section>

        <section className="flex flex-col lg:flex-row-reverse items-center mb-20">
        <div className="w-full lg:w-1/2">
        <img
            src={About04}
            alt="Our Services"
            className="w-full h-auto rounded-lg shadow-lg"
        />
        </div>
        <div className="w-full lg:w-1/2 p-6 text-center lg:text-left">
        <h3 className="font-primary text-[30px] mb-4">Restaurant</h3>
        <p className="text-gray-600 text-lg">
        Taste it in the food, a fusion of global influences and local ingredients that changes with the seasons. 

        Our simple space blurs the boundaries between inside and out. Serving our guests in different places + locations around the property depending on the season and occasion.  
        Aitisfoul is both, relaxed and refined – a dining experience set in a desert oasis, in and authentic Berbere Village in Southern Morocco.
        </p>
        </div>
        </section>

        
      </div>
    </section>
  );
};

export default Services;









