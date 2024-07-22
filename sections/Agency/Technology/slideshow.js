"use client"

import React, { useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Link from 'next/link';


// Sample data for the slides
const slides = [
  {
    imageUrl: 'https://images.unsplash.com/photo-1712666410511-4e84e3db6457?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Slide 1 Title',
    description: 'Description for Slide 1',
  },
  {
    imageUrl: 'https://plus.unsplash.com/premium_photo-1673030044215-63add7857c4b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Slide 2 Title',
    description: 'Description for Slide 2',
  },
  // Add more slides as needed
];

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length); // Loop back to the first slide at the end
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length); // Loop back to the last slide if going back from the first slide
  };

  const { imageUrl, title, description } = slides[currentIndex];

  return (
    <section className="w-full flex flex-col items-center px-40">
      <div className="relative bg-gray-700 w-full">
        <IoIosArrowBack size={40} onClick={prevSlide} className="absolute bg-white top-[40%] -left-5 pl-4 rounded-full z-10" />
        <IoIosArrowForward size={40} onClick={nextSlide} className="absolute bg-white top-[40%] -right-5 pr-4 rounded-full z-10" />
        <div className="flex w-full h-96">
          <div className="w-1/3 bg-cover" style={{ backgroundImage: `url(${imageUrl})` }}></div>
          <div className="w-1/3 flex flex-col p-5">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-2">{description}</p>
            <Link href={'/contact'} className='bg-blue-500 text-white mt-6 px-6 py-3 rounded-full hover:bg-blue-600 transition duration-200'>CONNECT FOR DEVELOPMENT SERVICES</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slideshow;
