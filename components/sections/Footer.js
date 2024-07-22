
import Link from 'next/link';
import Image from 'next/image';
import twitter from '@/assets/twitter.png';
import whatsapp from '@/assets/whatsapp.png';
import contact from '@/assets/contact.svg';
import { FaLocationDot } from "react-icons/fa6";
import React, { useState } from 'react';
import { IoIosAdd, IoIosRemove } from 'react-icons/io';
import SlidingForm from '@/components/sections/SlidingForm';
import { CiTwitter, CiFacebook, CiLinkedin } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";

import { useContext } from 'react';
import MyContext from '@/context/MyContext';
import { services, column2Links, column3Links, technology } from '@/constants/nav';




function FooterSection() {
    const { openForm } = useContext(MyContext);
    const [openIndex, setOpenIndex] = useState(null);

    const toggleDropdown = (index) => {
        setOpenIndex(openIndex === index ? null : index);
      };
    
    return (
        <footer className="bg-[#00203f] pt-20 text-white pb-10">
            <div className="px-10 md:px-20 lg:px-32 text-center grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Column 1 */}
                <div className="flex flex-col space-y-4 max-md:mb-10">
                    <div className='mb-4'>
                        {services.map((item, index) => (
                            <div key={index} className="py-2 px-10 md:px-0">
                                <div key={index} onClick={() => toggleDropdown(index)} className="flex text-left items-center justify-between gap-6 cursor-pointer">
                                    <p className="text-white rounded-xl">{item.city}</p>
                                    {openIndex === index ? <IoIosRemove size={20} /> : <IoIosAdd size={20} />}
                                </div>
                                {openIndex === index &&
                                <div className="px-4 py-2 text-gray-400 text-left text-md">
                                    <ul className='list-disc'>
                                    {item.services.map((val, index) => (
                                        <li key={index}><a href={val.url}><h3 className='mb-1 text-sm md:text-md'>{val.name}</h3></a></li>
                                    ))}
                                    </ul>
                                </div>
                                }
                            </div>
                        ))}
                    </div>

                    <div className='mb-4'>
                        <h3 className='text-center md:text-left mb-2'>Follow Us:</h3>
                        <div className="flex justify-center md:justify-start space-x-4 mb-2">
                            <Link href={'https://www.facebook.com/amitkk25007'}><CiTwitter size={44} className='bg-blue-500 p-2 rounded-xl' /></Link>
                            <Link href={'https://www.linkedin.com/in/amitkhare588'}><CiFacebook size={44} className='bg-blue-500 p-2 rounded-xl' /></Link>
                            <Link href={'https://www.instagram.com/_amitkk_'}><CiLinkedin size={44} className='bg-blue-500 p-2 rounded-xl' /></Link>
                            <Link href={'https://api.whatsapp.com/send?phone=918424003840&text=%20Hi,%20I%20got%20your%20number%20from%20AmitKK%20Website.'}><FaWhatsapp size={44} className='bg-blue-500 p-2 rounded-xl' /></Link>
                        </div>
                    </div>
                </div>

                {/* Column 2 */}
                <div className="flex flex-col items-center space-y-4 max-md:mb-10">
                    {column2Links.map((item, index) => (
                        <a key={index} href={item.url} className="hover:text-gray-400">{item.name}</a>
                    ))}
                </div>

                {/* Column 3 */}
                <div className="flex flex-col items-left space-y-4 max-md:mb-10">
                    {column3Links.map((item, index) => (
                        <a key={index} href={item.url} className="hover:text-gray-400">{item.name}</a>
                    ))}
                </div>

                {/* Column 4 */}
                <div className="flex flex-col mb-4">
                    {technology.map((item, index) => (
                        <div key={index} className="mb-4">
                            <a href={item.url} className='hover:text-gray-400'>{item.name}</a>
                        </div>
                    ))}
                </div>

            </div>
            {/* <h5 className="text-center text-gray-600 mt-12">@Copyright Reserved AmitKK</h5> */}


            <div className="button-wrapper">
            <div className="button-container">
                    <button onClick={openForm} className="z-30 bg-red-600 rounded-full px-3 py-3">
                        <Image src={contact} width={100} height={100} className="w-10" alt="contact" />
                    </button>
                    <div className="circle delay1"></div>
                    <div className="circle delay2"></div>
                    <div className="circle delay3"></div>
                    <div className="circle delay4"></div>
                </div>
            </div>

            <div className="button-wrapper2">
                <div className="button-container2">
                    <a href="https://wa.me/918424003840" className="z-30 bg-green-500 rounded-full px-3 py-3">
                        <Image src={whatsapp} width={100} height={100} className="w-10" alt="whatsapp" />
                    </a>
                    <div className="circle delay1"></div>
                    <div className="circle delay2"></div>
                    <div className="circle delay3"></div>
                    <div className="circle delay4"></div>
                </div>
            </div>

            <SlidingForm />

        </footer>
    );
}

export default FooterSection;