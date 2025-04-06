import React from 'react';
import LogoWhite from '../assets/img/logo-white.svg';
import { FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='bg-primary py-12 text-white'>
      <div className='container mx-auto flex flex-col lg:flex-row justify-between items-center gap-6'>
        {/* Logo */}
        <a href='/'>
          <img src={LogoWhite} alt='Logo' className='h-10' />
        </a>

        {/* Contact Info */}
        <div className='text-center lg:text-left space-y-2'>
          <div className='flex items-center gap-2 justify-center lg:justify-start'>
            <FaEnvelope className='text-accent' />
            <a href='mailto:info@aitisfoulhotel.com' className='hover:underline'>
              aitisfoul@gmail.com
            </a>
          </div>
          <div className='flex items-center gap-2 justify-center lg:justify-start'>
            <FaPhone className='text-accent' />
            <a href='tel:+212600000000' className='hover:underline'>
              +212 670-226639
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className='text-sm text-center lg:text-right'>
          &copy; 2025 Ait Isfoul Hotel. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
