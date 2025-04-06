import React from "react";
import About01 from '../assets/img/rooms/chill01.jpg';
import About02 from '../assets/img/rooms/chill02.jpg';
import About03 from '../assets/img/rooms/spic.jpg';
import About04 from '../assets/img/rooms/restaurant.jpg';




const About = () => {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-6 lg:px-0">
        {/* Heading */}
        <div className="text-center mb-12">
          <div className="font-tertiary uppercase text-[15px] tracking-[6px] text-accent">
            About us
          </div>
          <h2 className="font-primary text-[45px] mb-4">Who We Are</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Experience luxury and tranquility in the heart of Morocco. Our hotel
            blends traditional elegance with modern comfort to provide an
            unforgettable stay.
          </p>
        </div>

        {/* Our Story Section */}
        <section className="flex flex-col lg:flex-row items-center mb-20">
          <div className="w-full lg:w-1/2">
            <img
              src={About01}
              alt="Our Story"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="w-full lg:w-1/2 p-6 text-center lg:text-left">
            <h3 className="font-primary text-[30px] mb-4">local life</h3>
            <p className="text-gray-600 text-lg">
            A masterpiece of simplicity and expression, the clay buildings cleverly negotiates various pragmatic and emotive elements of the real desert experience. (The Berber’s) weren’t thinking about making something that looked a certain way, they were thinking, ‘Where is the sun, the wind? What is the structure’s purpose within its environment?’ That’s why their buildings have remained over time. Likewise, at Aitisfoul we started with the original purpose of the structure, the history of the local village life and the personality of the place. The concept evolved from these things organically.
            </p>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="flex flex-col lg:flex-row-reverse items-center mb-20">
          <div className="w-full lg:w-1/2">
            <img
              src={About02}
              alt="Our Values"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="w-full lg:w-1/2 p-6 text-center lg:text-left">
            <h3 className="font-primary text-[30px] mb-4">Desert life</h3>
            <p className="text-gray-600 text-lg">
            With respect to the founder, Mohamed Yassine's overarching concept of Ait isfoul’s as a “gathering place” for meaningful interactions… its aim at creating connectedness and blurring the boundaries – with both locals and guests –
            The idea is realized through the buildings and their relations to the environment, whenever possible making the natural life and land,  flow both inside and out.  Communal gathering places revolving around the pool and the covered pavilion are tastefully decorated with elements drawn from the environment  – all to suggest that simplicity is our ultimate luxury. – the simple life, the desert life.
            </p>
          </div>
        </section>

        
      </div>
    </section>
  );
};

export default About;
