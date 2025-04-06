import React from "react";
import pic1 from '../assets/img/rooms/pic01.jpg';
import About03 from '../assets/img/rooms/spic.jpg';
import About04 from '../assets/img/rooms/restaurant.jpg';




const Experiences = () => {
  return (
    <section id="services" className="py-24">
      <div className="container mx-auto px-6 lg:px-0">
        {/* Heading */}
        <div className="text-center mb-12">
          <div className="font-tertiary uppercase text-[15px] tracking-[6px] text-accent">
            Experiences
          </div>
          <h2 className="font-primary text-[45px] mb-4">Our Excurtions</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
          DESERT EXPERIENCES
          </p>
        </div>


        {/* Our Services Section */}
        <section className="flex flex-col lg:flex-row items-center">
        <div className="w-full lg:w-1/2">
        <img
            src={pic1}
            alt="Our Services"
            className="w-full h-auto rounded-lg shadow-lg"
        />
        </div>
        <div className="w-full lg:w-1/2 p-6 text-center lg:text-left">
        <h3 className="font-primary text-[30px] mb-4">SAHARA DESERT EXPERIENCE</h3>
        <p className="text-gray-600 text-lg">
        Experience the true Sahara with our camel rides. Feel an overwhelming sense of tranquility as our experienced camel handlers guide you across the oasis during sunrise or sunset.

Camel ride with handler for one hour sunrise/sunset Camel excursions half or full day.


        </p>
        </div>
        </section>

        <section className="flex flex-col lg:flex-row-reverse items-center mb-20">
        <div className="w-full lg:w-1/2">
        <img
            src={pic1}
            alt="Our Services"
            className="w-full h-auto rounded-lg shadow-lg"
        />
        </div>
        <div className="w-full lg:w-1/2 p-6 text-center lg:text-left">
        <h3 className="font-primary text-[30px] mb-4">WALKING WITH NOMADS</h3>
        <p className="text-gray-600 text-lg">
        We can design any trek you want. Treks can start and end at any desert location and last for any number of days. You may wish start directly from the desert to trek or you may wish to incorporate the trekking experience as part of a longer tour of Morocco. and we can arrange as little or as much as you need us too.
        </p>
        </div>
        </section>

        
      </div>
    </section>
  );
};

export default Experiences;









