import React from 'react';
import {Swiper,SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import {EffectFade,Autoplay} from 'swiper'
import Img1 from '../assets/img/heroSlider/main.jpg';
import Img2 from '../assets/img/heroSlider/4.jpg';
import Img3 from '../assets/img/heroSlider/5.jpg';
import { useLocation, useNavigate } from 'react-router-dom';

const slides=[
  {
    title:'Your Luxury Hotel For vacation',
    bg:Img1,
    btnText:'See our rooms'
  },
  {
    title:'Your Luxury Hotel For vacation',
    bg:Img2,
    btnText:'See our rooms'
  },
  {
    title:'Your Luxury Hotel For vacation',
    bg:Img3,
    btnText:'See our rooms'
  }
]
const HeroSlider = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();

    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return <Swiper modules={[EffectFade,Autoplay]} effect={'fade'} loop={true} autoplay={{delay:1000,disableOnInteraction:false}} className='heroSlider h-[600px] lg:h-[860px]'>
    {
      slides.map((slide,index)=>{
        return <SwiperSlide className='h-full relative flex justify-center items-center' key={index}>
          <div className='z-20 text-white text-center'>
            <div className='uppercase font-tertiary  tracking-[6px] mb-5'>
              just enjoy and relax
            </div>
            <h1 className='text-[32px] font-primary uppercase tracking-[2px] max-w-[920px] lg:text-[68px] leading-tight mb-6'>{slide.title}</h1>
            <button className='btn btn-lg btn-primary mx-auto' onClick={(e) => handleNavClick(e, 'rooms')}>{slide.btnText}</button>
            
          </div>
          <div className='absolute top-0 w-full h-full'>
              <img className='object-cover h-full w-full' src={slide.bg}/>
          </div>
        </SwiperSlide>
      })
    }
  </Swiper>;
};

export default HeroSlider;
