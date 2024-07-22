import { useRef } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { baseUrl } from '@/utils/helper';
import Image from 'next/image';

export default function Block1 ({ data }) {
    const sliderRef = useRef(null);

    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
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
        <section className="">
            <div className="mx-auto text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-8 max-w-lg mx-auto md:max-w-2xl lg:max-w-full">
                    <div className="relative w-full h-auto col-span-2 lg:col-span-1">
                        <div className="bg-[#F9FAFC] transition-all duration-500 border hover:border-indigo-600 h-full rounded-2xl flex flex-col justify-between">
                            <div className="p-5 xl:p-8 flex-grow">
                                <h3 className="text-left text-lg font-bold xl:text-xl text-indigo-600 py-5">
                                    Accomplish tasks swiftly with online tools.
                                </h3>
                                <p className="text-justify text-sm font-normal text-gray-700 mb-8">
                                    Get quoted and covered in under 10 minutes online. No paperwork or waiting any more.
                                </p>
                            </div>
                            <div className='flex gap-4 p-5'>
                                <button className="py-2 px-2 group bg-white hover:bg-indigo-600 border border-solid border-gray-300 rounded-full text-sm text-gray-700 font-semibold flex items-center justify-between transition-all duration-500" onClick={handlePrev}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4">
                                        <path className='transition-all duration-500 stroke-indigo-600 group-hover:stroke-white' strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" strokeWidth="2.5"/>
                                    </svg>
                                </button>
                                <button className="py-2 px-2 group bg-indigo-600 hover:bg-white border border-solid border-gray-300 rounded-full text-sm text-gray-700 font-semibold flex items-center justify-between transition-all duration-500" onClick={handleNext}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4">
                                        <path className='transition-all duration-500 stroke-white group-hover:stroke-indigo-600' strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" strokeWidth="2.5"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="relative w-full h-auto md:col-span-3">
                        <Slider {...settings} ref={sliderRef}>
                            {data.map((item, index) => (
                                <div key={index} className="h-full mx-auto lg:pl-8 lg:p-1 max-lg:p-4 rounded-lg overflow-hidden">
                                    <div className="group relative w-full h-full p-5 xl:p-8 transition-all duration-500 bg-white border border-gray-300 rounded-2xl hover:bg-indigo-600 flex flex-col justify-between min-h-full">
                                        <div className="flex-grow">
                                            <Image loader={() => item.media_path} src={`${baseUrl}/${item.media_path}`} width={40} height={40} alt={item.media_alt} className="" />

                                            {/* <svg width="30" height="30" viewBox="0 0 30 30" fill='none' xmlns="http://www.w3.org/2000/svg">
                                                <path className='transition-all duration-500 group-hover:stroke-white' d="M26.7301 15.661C26.7301 22.1995 21.306 27.5 14.6151 27.5C7.9241 27.5 2.5 22.1995 2.5 15.661C2.5 9.1225 7.9241 3.822 14.6151 3.822M18.1313 10.1507L18.1313 4.85383C18.1313 3.22503 19.6455 2.00299 21.1519 2.70013C23.7608 3.90751 26.6177 6.25557 27.456 10.2563C27.7542 11.6798 26.4931 12.8563 25.0064 12.8368L20.7873 12.7814C19.3147 12.762 18.1313 11.5899 18.1313 10.1507Z" stroke='#4f46e5' strokeWidth="2" strokeLinecap="round"></path>
                                            </svg> */}
                                            <h3 className="text-left py-5 text-gray-700 text-lg font-bold xl:text-xl transition-all duration-500 group-hover:text-white">{item.para ? item.para : 'Build wealth with insurance planning'}</h3>
                                            <div className="text-justify text-sm font-normal text-gray-700 transition-all duration-500 group-hover:text-white" dangerouslySetInnerHTML={{ __html: item.text ? item.text : 'Every life plan policy has a built-in wealth bonus, and we contribute too.'}}></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>              
                </div>
            </div>
        </section>
    )
}
