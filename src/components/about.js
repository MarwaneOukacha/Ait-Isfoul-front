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
            Founded by Mohamed Yassine, Aitisfoul has been lovingly restored by local owner Kamal Yassine, Mohamed's grandson and partner, Canadian artist + designer Michelle Fletcher. Jointly and in collaboration with local artisans and craftsman, we have used traditional techniques and reclaimed materials whenever possible.
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
            <h3 className="font-primary text-[30px] mb-4">What is Aitisfoul?</h3>
            <p className="text-gray-600 text-lg">
            Aitisfoul is a Kasbah of pisé architecture (rammed clay) with local Amazigh influences. Restoring the Kasbah was more an act of preservation and restoration than of transformation. We highlighted the structure's weather-worn imperfections, wabi-sabi nature and blended it with the local desert environment, and the simple elegance of the Sahara, with all its stunning golden hues.
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
            <h3 className="font-primary text-[30px] mb-4">Experience Desert Life</h3>
            <p className="text-gray-600 text-lg">
            Aitisfoul has soul, and is in the heart of an Amazigh village. Aitisfoul is filled with history and local character, we started Aitisfoul to help people experience the desert like a local — with a local. A way to connect with the culture, while finding inspiration from the desert's raw beauty while connecting with others and most importantly yourself. Our wish is that you arrive as visitors and leave as friends, with memories better than your most vivid imagined.
            </p>
          </div>
        </section>

        
      </div>
    </section>
  );
};

export default About;
