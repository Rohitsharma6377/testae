
import { useState, useRef } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import arrowLeft from "@/assets/arrow-left.svg";
import arrowRight from "@/assets/arrow-right.svg";
import design from "@/assets/banner/crm-web-banner-03.png";
import webDev from "@/assets/web-dev.png";
import { baseUrl } from '@/utils/helper';


export default function BannerSection({ data }) {
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
      afterChange: setCurrentIndex,
    };
  
    const handlePrev = () => {
      sliderRef.current?.slickPrev();
    };
  
    const handleNext = () => {
      sliderRef.current?.slickNext();
    };


    return (
        <section className="relative mt-20 bg-gradient-to-r from-[#00203F] to-[#003366]">
            <Slider {...settings} ref={sliderRef}>
                {data.map((item, index) => (
                <div key={index} className="flex items-center justify-center p-10 md:p-4">
                    <div className="grid grid-cols-1 md:grid-cols-12 md:space-x-4 space-y-10 md:px-6 lg:px-32 py-4 mx-auto">
                      <div className="col-span-5 lg:col-span-3 px-24 md:p-10 my-auto">
                          <Image loader={() => `${baseUrl}/${item.image}`} src={`${baseUrl}/${item.image}`} alt="Placeholder" className="rounded-lg" width={500} height={300} layout="responsive" />
                          {/* <Image src={design} alt="placeholder" className="rounded-lg" width={500} height={300} layout="responsive" /> */}
                      </div>
                      <div className="col-span-7 lg:col-span-9 space-y-4 text-center md:text-left my-auto">
                          <h2 className="text-3xl font-bold text-white">{item.heading}</h2>
                          <p className="text-gray-300">{item.text}</p>
                          <button className="bg-[#CB1F26] text-white rounded-xl py-3 px-6 hover:bg-blue-600 transition-colors">
                            Click Here
                          </button>
                      </div>
                    </div>
                </div>
                ))}
            </Slider>
            <button className="absolute top-1/2 left-10 transform -translate-y-1/2 bg-gray-200 bg-opacity-50 rounded-full p-2" onClick={handlePrev}>
                <Image src={arrowLeft} alt="Previous" height={25} width={25} />
            </button>
            <button className="absolute top-1/2 right-10 transform -translate-y-1/2 bg-gray-200 bg-opacity-50 rounded-full p-2" onClick={handleNext}>
                <Image src={arrowRight} alt="Next" height={25} width={25} />
            </button>
        </section>
    )
}