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
            Restaurant
          </div>
          <h2 className="font-primary text-[45px] mb-4">Our Restaurant</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
          Our restaurant is the heart and soul of Aitisfoul. It epitomizes our ethos: a deep respect for the surroundings and an unwavering simple local Moroccan culture, to be gathered and shared together.
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
        <h3 className="font-primary text-[30px] mb-4">Taste It In The Food</h3>
        <p className="text-gray-600 text-lg">
        All stays include breakfast and lunch + dinner are available upon advance reservation. Our simple space blurs the boundaries between inside and out, serving our guests in different places around the property depending on the season and occasion.


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
        <h3 className="font-primary text-[30px] mb-4">Moroccan Seasonal Food</h3>
        <p className="text-gray-600 text-lg">
        Aitisfoul brings the past and present alive with local details, timeless desert design and Moroccan seasonal food. Aitisfoul is both relaxed and refined – a dining experience set in a desert oasis, in an authentic Amazigh Village in Southern Morocco.
        </p>
        </div>
        </section>

        
      </div>
    </section>
  );
};

export default Services;









