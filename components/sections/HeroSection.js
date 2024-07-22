
import Image from "next/image";
import image from "@/assets/image.png";

import { useState, useRef } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import arrowLeft from "@/assets/arrow-left.svg";
import arrowRight from "@/assets/arrow-right.svg";

import SlidingForm from '@/components/sections/SlidingForm';
import { useContext } from 'react';
import MyContext from '@/context/MyContext';

import Banner from '@/assets/banner/banner.jpg'


export default function HeroSection({ data }) {

  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    afterChange: (index) => setCurrentIndex(index),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const { isOpen, setIsOpen, openForm, closeForm } = useContext(MyContext);


  return (
    <section className="bg-[#f4ebd0] relative text-center py-10 lg:py-10 h-auto lg:h-screen">
      <div className="relative">
        <Slider {...settings} ref={sliderRef}>
          {data.map((item, index) => (
            <div key={index} className="rounded-lg px-8 md:p-11 overflow-hidden">
              {/* <div className="w-full">
                <Image src={Banner}  width={1200} height={480}/>
              </div> */}
              <div className="px-10 md:px-20 lg:px-32 flex flex-col items-center h-full">
                <h1 className="text-4xl md:text-7xl mt-20 font-extrabold text-[#00203f] mb-4">
                  {item.heading}
                </h1>
                <p className="text-[#00203f] leading-5 max-w-3xl mb-6">
                 {item.description}
                </p>
                <button onClick={openForm} className="bg-[#00203f] hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg mb-44 md:mb-64">
                  Connect Now
                </button>
              </div>
            </div>
          ))}
        </Slider>
        <button className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-200 bg-opacity-50 rounded-full p-2" onClick={handlePrev}>
          <Image src={arrowLeft} alt="left-arrow" height={25} width={25} />
        </button>
        <button className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-200 bg-opacity-50 rounded-full p-2" onClick={handleNext}>
          <Image src={arrowRight} alt="right-arrow" height={25} width={25} />
        </button>
      </div>

      <div className="px-10 md:px-20 lg:px-32 flex flex-col items-center h-full">
        {/* <h1 className="text-4xl md:text-6xl  mt-20 font-bold text-[#00203f] mb-4">
          Grow faster with our <br className="hidden lg:block" /> Digital Marketing Services
        </h1>
        <p className="text-[#00203f] leading-5 max-w-3xl mb-6">
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </p>
        <button className="bg-[#00203f] hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg mb-44 md:mb-64">
          View More
        </button> */}
        <div className="absolute w-2/3 lg:w-1/3 -bottom-10 md:bottom-0 h-2/6 mx-auto">
          <div className="relative w-full h-0 pb-[100%]"> {/* Adjust the padding-bottom percentage to maintain the aspect ratio */}
            <Image
              src={image}
              alt="Description"
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>

      <SlidingForm />

    </section>
  );
}
