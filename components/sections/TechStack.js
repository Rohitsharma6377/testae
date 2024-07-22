
import { useState, useRef } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import flutter from "@/assets/flutter.svg";
import android from "@/assets/android.svg";
import javascript from "@/assets/javascript.svg";
import vuejs from "@/assets/vuejs.svg";
import php from "@/assets/php.svg";
import reactjs from "@/assets/reactjs.svg";
import wordpress from "@/assets/wordpress.svg";
import ios from "@/assets/ios.svg";
import laravel from "@/assets/laravel.svg";
import nodejs from "@/assets/nodejs.svg";
import arrowLeft from "@/assets/arrow-left.svg";
import arrowRight from "@/assets/arrow-right.svg";
import Link from 'next/link';
import { baseUrl } from '@/utils/helper';

const TechStackSection = ({ data }) => {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  data = data.filter(technology => parseInt(technology.status) === 1);

  const settings = {
    dots: false,
    infinite: true,
    speed: 3500,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    afterChange: (index) => setCurrentIndex(index),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
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
    <section className="text-center mt-40 md:mt-80 pt-20 pb-10">
      <div className='px-10 md:px-20 lg:px-32'>
        <h1 className="text-2xl font-bold text-black mb-2">
          Our Favourite Tech Stack
        </h1>
        <hr className="border-t-2 w-64 mx-auto border-gray-200 mb-4" />
        <p className="text-black mx-auto leading-relaxed max-w-4xl mb-8">
          Below are some of the languages and frameworks we love and use extensively. The choice of technology for a project depends on its scale and scope. Based on an extensive discussion and understanding of your requirement, we choose the tech stack that best suits you.
        </p>

        <div className="relative">
          <Slider {...settings} ref={sliderRef}>
            {data.map((item, index) => (
              <div key={index} className="rounded-lg p-8 md:p-11 overflow-hidden">
                <Link href={item.url}>
                  <Image
                    loader={() => `${baseUrl}/${item.media_path}`}
                    src={`${baseUrl}/${item.media_path}`}
                    alt={item.media_alt}
                    width={100}
                    height={100}
                    style={{ objectFit: 'cover' }}
                    className='mx-auto focus:outline-none'
                  />
                </Link>
              </div>
            ))}
          </Slider>
          <button className="max-sm:hidden absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-200 bg-opacity-50 rounded-full p-2" onClick={handlePrev}>
            <Image src={arrowLeft} alt='left-arrow' height={25} width={25} />
          </button>
          <button className="max-sm:hidden absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-200 bg-opacity-50 rounded-full p-2" onClick={handleNext}>
            <Image src={arrowRight} alt='right-arrow' height={25} width={25} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
