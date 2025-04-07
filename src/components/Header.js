import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import LogoWhite from '../assets/img/logo-white.svg';
import LogoDark from '../assets/img/logo-dark.svg';

const Header = () => {
  const [header, setHeader] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const handleScroll = () => {
      setHeader(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();

    setMobileMenuOpen(false); // close mobile menu on link click

    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`${
        header ? 'bg-white py-6 shadow-lg' : 'bg-transparent py-8'
      } fixed z-50 w-full transition-all duration-300`}
    >
      <div className='container mx-auto flex items-center justify-between relative'>
        {/* Left side: logo + mobile menu icon */}
        <div className='flex items-center gap-4'>
          {/* Mobile menu toggle */}
          <div className='lg:hidden cursor-pointer'>
            {mobileMenuOpen ? (
              <FaTimes size={24} className={header ? 'text-primary' : 'text-white'} onClick={() => setMobileMenuOpen(false)} />
            ) : (
              <FaBars size={24} className={header ? 'text-primary' : 'text-black'} onClick={() => setMobileMenuOpen(true)} />
            )}
          </div>

          {/* Logo */}
          <Link to='/'>
            {header ? (
              <img className='w-[140px]' src={LogoDark} alt='Logo Dark' />
            ) : (
              <img className='w-[140px]' src={LogoWhite} alt='Logo White' />
            )}
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav
          className={`${
            header ? 'text-primary' : 'text-gray-300'
          } hidden lg:flex gap-x-4 font-tertiary tracking-[3px] text-[15px] items-center uppercase lg:gap-x-8`}
        >
          <Link to='/' onClick={(e) => handleNavClick(e, 'home')} className='hover:text-accent transition'>
            Home
          </Link>
          <Link to='/' onClick={(e) => handleNavClick(e, 'rooms')} className='hover:text-accent transition'>
            Rooms
          </Link>
          <Link to='/' onClick={(e) => handleNavClick(e, 'about')} className='hover:text-accent transition'>
            About Us
          </Link>
          <Link to='/' onClick={(e) => handleNavClick(e, 'services')} className='hover:text-accent transition'>
            Restaurant
          </Link>
          <Link to='/' onClick={(e) => handleNavClick(e, 'experiences')} className='hover:text-accent transition'>
            Experiences
          </Link>
          <Link to='/' onClick={(e) => handleNavClick(e, 'contact')} className='hover:text-accent transition'>
            Contact
          </Link>

          <Link to='/login' className='px-4 py-2 transition hover:bg-accent hover:text-white'>
            Sign In
          </Link>
          <Link to='/register' className='px-4 py-2 transition hover:bg-accent hover:text-white'>
            Sign Up
          </Link>
        </nav>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div className='absolute top-full left-0 w-full bg-white shadow-lg flex flex-col gap-4 px-6 py-4 text-primary text-sm uppercase font-medium lg:hidden z-50'>
            <Link to='/' onClick={(e) => handleNavClick(e, 'home')}>
              Home
            </Link>
            <Link to='/' onClick={(e) => handleNavClick(e, 'rooms')}>
              Rooms
            </Link>
            <Link to='/' onClick={(e) => handleNavClick(e, 'about')}>
              About Us
            </Link>
            <Link to='/' onClick={(e) => handleNavClick(e, 'services')}>
              Restaurant
            </Link>
            <Link to='/' onClick={(e) => handleNavClick(e, 'experiences')}>
              Experiences
            </Link>
            <Link to='/' onClick={(e) => handleNavClick(e, 'contact')}>
              Contact
            </Link>
            <Link to='/login'>Sign In</Link>
            <Link to='/register'>Sign Up</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
