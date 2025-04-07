import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import LogoWhite from '../assets/img/logo-white.svg';
import LogoDark from '../assets/img/logo-dark.svg';

const Header = () => {
  const [header, setHeader] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Mocked auth state (replace with actual auth context or logic)
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('authToken');
    return token ? { name: 'John Doe' } : null; // or parse a real user object if stored
  });
   // null if not signed in to test it use { name: 'John Doe' }

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setHeader(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleUserDropdown = () => {
    setUserDropdownOpen((prev) => !prev);
  };

  return (
    <header className={`${user || header ? 'bg-white py-6 shadow-lg' : 'bg-transparent py-8'} fixed z-50 w-full transition-all duration-300`}>
      <div className='container mx-auto flex items-center justify-between relative'>
        {/* Logo and Mobile Menu */}
        <div className='flex items-center gap-4'>
          <div className='lg:hidden cursor-pointer'>
            {mobileMenuOpen ? (
              <FaTimes size={24} className={header ? 'text-primary' : 'text-white'} onClick={() => setMobileMenuOpen(false)} />
            ) : (
              <FaBars size={24} className={header ? 'text-primary' : 'text-black'} onClick={() => setMobileMenuOpen(true)} />
            )}
          </div>
          <Link to='/'>
            {header ? (
              <img className='w-[140px]' src={LogoDark} alt='Logo Dark' />
            ) : (
              <img className='w-[140px]' src={LogoWhite} alt='Logo White' />
            )}
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className={`${user || header ? 'text-primary' : 'text-gray-300'} hidden lg:flex gap-x-4 font-tertiary tracking-[3px] text-[15px] items-center uppercase lg:gap-x-8`}>
          <Link to='/' onClick={(e) => handleNavClick(e, 'home')} className='hover:text-accent transition'>Home</Link>
          <Link to='/' onClick={(e) => handleNavClick(e, 'rooms')} className='hover:text-accent transition'>Rooms</Link>
          <Link to='/' onClick={(e) => handleNavClick(e, 'about')} className='hover:text-accent transition'>About Us</Link>
          <Link to='/' onClick={(e) => handleNavClick(e, 'services')} className='hover:text-accent transition'>Restaurant</Link>
          <Link to='/' onClick={(e) => handleNavClick(e, 'experiences')} className='hover:text-accent transition'>Experiences</Link>
          <Link to='/' onClick={(e) => handleNavClick(e, 'contact')} className='hover:text-accent transition'>Contact</Link>

          {!user ? (
            <>
              <Link to='/login' className='px-4 py-2 transition hover:bg-accent hover:text-white'>Sign In</Link>
              <Link to='/register' className='px-4 py-2 transition hover:bg-accent hover:text-white'>Sign Up</Link>
            </>
          ) : (
            <div className='relative'>
              <FaUserCircle
                size={28}
                className='cursor-pointer hover:text-accent'
                onClick={toggleUserDropdown}
              />
              {userDropdownOpen && (
                <div className='absolute right-0 mt-2 bg-white border shadow-lg rounded-md w-[180px] text-sm z-50'>
                  <Link to='/my-bookings' className='block px-4 py-2 hover:bg-gray-100'>My Bookings</Link>
                  <button onClick={() => setUser(null)} className='w-full text-left px-4 py-2 hover:bg-gray-100'>Logout</button>
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className='absolute top-full left-0 w-full bg-white shadow-lg flex flex-col gap-4 px-6 py-4 text-primary text-sm uppercase font-medium lg:hidden z-50'>
            <Link to='/' onClick={(e) => handleNavClick(e, 'home')}>Home</Link>
            <Link to='/' onClick={(e) => handleNavClick(e, 'rooms')}>Rooms</Link>
            <Link to='/' onClick={(e) => handleNavClick(e, 'about')}>About Us</Link>
            <Link to='/' onClick={(e) => handleNavClick(e, 'services')}>Restaurant</Link>
            <Link to='/' onClick={(e) => handleNavClick(e, 'experiences')}>Experiences</Link>
            <Link to='/' onClick={(e) => handleNavClick(e, 'contact')}>Contact</Link>

            {!user ? (
              <>
                <Link to='/login'>Sign In</Link>
                <Link to='/register'>Sign Up</Link>
              </>
            ) : (
              <>
                <Link to='/my-bookings'>My Bookings</Link>
                <button onClick={() => setUser(null)} className='text-left'>Logout</button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
