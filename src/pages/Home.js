import React from 'react';
import Rooms from '../components/Rooms';
import BookForm from '../components/BookForm';
import HeroSlider from '../components/HeroSlider';
import About from '../components/about';
import Contact from '../components/Contact';
import { useLocation } from 'react-router-dom';

import { useEffect } from 'react';
import Services from '../components/Services';
import Experiences from '../components/Experiences';


const Home = () => {
  const location = useLocation();

  useEffect(() => {
    const scrollTo = location.state?.scrollTo;
    if (scrollTo) {
      const el = document.getElementById(scrollTo);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <>
      <section id="home"><HeroSlider /></section>
      <div className='container mx-auto relative'>
        <div className='bg-accent/20 mt-4 p-4 lg:shadow-xl lg:absolute lg:left-0 lg:right-0 lg:p-0 lg:z-30 lg:-top-12'>
          <BookForm />
        </div>
      </div>
      <section id="rooms"><Rooms /></section>
      <section id="about"><About /></section>
      <section id="services"><Services /></section>
      <section id="experiences"><Experiences/></section>
      <section id="contact"><Contact /></section>
    </>
  );
};

export default Home;

