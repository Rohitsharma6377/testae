
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
import star from "@/assets/star.png";
import arrowLeft from "@/assets/arrow-left.svg";
import arrowRight from "@/assets/arrow-right.svg";
import axios from 'axios';


export default function TestimonialsSection({ data, pageData }) {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    afterChange: (index) => setCurrentIndex(index),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
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

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <section className="bg-[#f4ebd0] pt-20 pb-10">
      <div className="px-4 md:px-20 lg:px-32 mx-auto">
        <h2 className="text-2xl text-center font-bold mb-2">{pageData.testimonial_title ? pageData.testimonial_title : 'Client Testimonials'}</h2>
        <hr className="border-t-2 w-20 mx-auto border-gray-400 mb-8" />

        {pageData.testimonial_description && 
        <div className="text-center mb-8" dangerouslySetInnerHTML={{ __html : pageData.testimonial_description }}></div>}

        <div className="relative">
          <Slider {...settings} ref={sliderRef}>
            {data.map((item, index) => (

              <div key={index} className="bg-transparent rounded-sm lg:py-10 lg:px-20 relative">

                <div>
                  <Image loader={() => item.media_path} src={`${baseUrl}/${item.media_path}`} width={100} height={100} alt={item.client_name} className="mx-auto h-28 w-28 object-cover object-center translate-y-10 lg:translate-y-0 rounded-full border-2 border-blue-900 z-10 mb-10 md:mb-0" />
                </div>

                <div className="p-20 relative">
                  <span className="absolute top-0 left-6 text-9xl text-left opacity-40">“</span>
                  <span dangerouslySetInnerHTML={{ __html: item.testimonial }} />
                  <span className="absolute right-6 text-9xl text-right opacity-40">”</span>
                </div>

                <div className="text-center mb-10 lg:mb-0">
                  <p className="font-bold text-lg">{item.client_name}</p>
                  <p>{item.client_role}</p>
                </div>
              </div>



        
              // <div key={index} className="p-4">
              //   <div className="p-4 relative bg-white rounded-3xl shadow-md mx-2">
              //     <div className="flex items-center mb-4">
              //       <div>
              //         <p className="font-bold text-sm">{item.client_name}</p>
              //       </div>
              //       <div className="ml-auto">
              //         <Image src={twitter} alt="Twitter" width={24} height={24} className="rounded-xl" />
              //       </div>
              //     </div>
              //     <div className="mb-10" dangerouslySetInnerHTML={{ __html: item.testimonial} }></div>
              //     <div className="flex items-center absolute bottom-4">
              //       {[...Array(5)].map((_, i) => (
              //         <Image key={i} src={star} alt="Star" width={16} height={16} className="mr-1" />
              //       ))}
              //       <p className="text-xs ml-1 text-gray-500">7 days ago</p>
              //     </div>
              //   </div>
              // </div>
            ))}
          </Slider>
          <button className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-200 bg-opacity-50 rounded-full p-2" onClick={handlePrev}>
            <Image src={arrowLeft} alt="left-arrow" height={25} width={25} />
          </button>
          <button className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-200 bg-opacity-50 rounded-full p-2" onClick={handleNext}>
            <Image src={arrowRight} alt="right-arrow" height={25} width={25} />
          </button>
        </div>

      </div>
    </section>
  );
}


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function getServerSideProps() {

  const response0 = await axios.post(`${baseUrl}/api/pages/pages`, {currentPageUrl});
  const pages = await response0.data;

  const { id } = await response0.data[0];
  
  const response1 = await axios.post(`${baseUrl}/api/pages/testimonials`, {model: 'page', model_id: id});
  const testimonials = await response1.data.testimonials;

  const response2 = await axios.post(`${baseUrl}/api/pages/faq`, {model: 'page', model_id: id});
  const faqs = await response2.data;

  const response3 = await fetch(`${baseUrl}/api/pages/achievements`);
  const achievements = await response3.json();

  const response4 = await fetch(`${baseUrl}/api/pages/services`);
  const services = await response4.json();

  // Pass data to the page via props
  return { props: { pages, achievements, testimonials, faqs, services } };
}

