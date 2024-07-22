
import { useState, useContext, useRef } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Image from 'next/image';
import arrowLeft from "@/assets/arrow-left.svg";
import arrowRight from "@/assets/arrow-right.svg";
import design from "@/assets/design.png";
import { slugify } from '@/utils/helper';
import Link from 'next/link';
import MyContext from '@/context/MyContext';
import { useRouter } from 'next/router';
import { baseUrl } from '@/utils/helper';



export default function Services({ data }) {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isOpen, setIsOpen, openForm, closeForm } = useContext(MyContext);

  const { push } = useRouter();
  data = data.filter(service => parseInt(service.status) === 1);
    
  const settings = {
      dots: false,
      infinite: true,
      speed: 1000,
      autoplay: true,
      autoplaySpeed: 3000,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false,
      afterChange: (index) => setCurrentIndex(index),
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1
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



  return (
      <section className="bg-[#f4ebd0] text-center pt-20 pb-20">
        <div className='px-10 md:px-20 lg:px-32'>
          <h1 className="text-2xl font-bold text-black mb-2">
              Services We Provide
          </h1>
          <hr className="border-t-2 w-28 mx-auto border-gray-400 mb-4" />
          <p className="text-black mx-auto leading-relaxed mb-8">
              Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
          <button onClick={() => push('/our-services')} className="bg-[#00203f] hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg mb-8">
              View More
          </button>

          <div className="relative">
                <Slider {...settings} ref={sliderRef}>
                    {data.map((service, index) => (
                        <div key={index} className="bg-transparent mx-auto rounded-lg px-8 py-4 overflow-hidden">
                            <Link href={`${service.url}`}>
                                <div className='bg-white mx-auto text-center rounded-lg p-8 border border-gray-300 overflow-hidden'>
                                    {/* <Image src={`/${service.media_path}`} width={100} height={100} className="mb-4 w-28 max-md:mx-auto" /> */}
                                    <Image loader={() => `${baseUrl}/${service.media_path}`} src={`${baseUrl}/${service.media_path}`} alt={service.media_alt} width={100} height={100} className="mb-4 w-28 mx-auto" />
                                    <h3 className="font-bold text-lg">{service.name}</h3>
                                    <h5 className="text-sm mt-1 text-justify">{service.description}</h5>
                                    <p className="mt-3 text-gray-600 font-semibold">{service.action}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </Slider>

                <button className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-300 bg-opacity-90 rounded-full p-2" onClick={handlePrev}>
                    <Image src={arrowLeft} alt='left-arrow' height={25} width={25} />
                </button>
                <button className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-300 bg-opacity-90 rounded-full p-2" onClick={handleNext}>
                    <Image src={arrowRight} alt='right-arrow' height={25} width={25} />
                </button>
          </div>
        </div>

      </section>
  );
}
