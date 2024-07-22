
import Head from 'next/head';
import { useState, useRef } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import arrowLeft from "@/assets/arrow-left.svg";
import arrowRight from "@/assets/arrow-right.svg";
import webDev from "@/assets/web-dev.png";
import LookingForSection from '@/components/sections/LookingFor';
import OfficesSection from '@/components/sections/Offices';
import BannerSection from '@/components/sections/Banner';


import Nav from '@/components/sections/Navbar';
import HeroSection from '@/sections/Hero2';
import Faq from '@/components/sections/Faq';
import Footer from '@/components/sections/Footer';
import ContentSection from '@/sections/Pages/development/sections/Content';
import Hiring from '@/sections/Pages/development/sections/Hiring';
import Tech from '@/sections/Pages/development/sections/Tech';
import Cost from '@/sections/Pages/development/sections/Cost';
import WhyChooseUs from '@/sections/Pages/development/sections/WhyChooseUs';
import ServicesSection from '@/sections/Pages/development/sections/Services';
import Testimonials from '@/components/sections/Testimonials';


import design from "@/assets/design.png";
import code from "@/assets/code.png";
import host from "@/assets/host.png";
import tech from "@/assets/tech.png";
import digital from "@/assets/services/digital-space.jpg";
import { fetchPageData } from '@/utils/helper';



const ServicesPage = ({ banners, pages, points, testimonials, faqs }) => {

  return (
    <div>
      <Head>
        <title>{'Search Engine Optimization (SEO) in Sharjah'}</title>
        <meta name="description" content={'description'} />
      </Head>

      <Nav />
      <BannerSection data={banners} />


      {/* features */}
      <section className="text-center px-10 md:px-32 py-20">
        <div className="mx-auto">

          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Mastering the Laravel Landscape in Dubai: A Developer&apos;s Guide
          </h1>
          {/* <hr className="border-t-2 w-24 mx-auto border-red-600 mb-6" /> */}
          <p className="text-gray-600  pb-6 mx-auto leading-relaxed mb-12">
            Step into Dubai&apos;s tech-filled world where the skyline shines with new ideas and endless chances. Against this exciting scene, Laravel stands tall, lighting the way for web growth. Join us on a trip to see why Laravel rules and explore the lively developer scene making Dubai&apos;s digital world great.
          </p>

          <div className='grid grid-cols-1 lg:grid-cols-2 text-center gap-10'>
            <Image src={digital} alt='' className="mx-auto my-auto" />
            <div className='mx-auto my-auto'>
              <h3 className="text-3xl font-semibold text-gray-800 mb-4">
                The Essence of Laravel Development
              </h3>
              <p className="text-gray-600  mx-auto leading-relaxed">
                In the ever-busy world of web development, Laravel stands out as an embodiment of efficiency and sophistication. Being simple to use, this framework offers programmers a complete set of tools needed to bring their ideas to fruition without effort. Starting from its seamless authentication system to its expressive syntax, Laravel makes it possible for developers at all levels.
              </p>
            </div>
          </div>

          <div className='mt-20'>
            <h3 className="text-3xl font-semibold text-gray-800 mb-4">
              {features[0].heading}
            </h3>
            <p className="text-gray-600  mx-auto leading-relaxed">
              {features[0].subheading}
            </p>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-10">
              {features[1].map((item, index) => (
                <div key={index} className="bg-white border rounded-lg p-6  hover:shadow-lg transition-shadow duration-300">
                  <Image src={code} alt='' className="w-32 mx-auto mb-6" />
                  <h3 className="text-2xl mb-2 font-bold text-gray-800">{item.heading}</h3>
                  <p className="text-gray-600 text-justify" dangerouslySetInnerHTML={{__html: item.text}}></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* details */}
      <section className="text-center bg-[#F4EBD0] px-10 md:px-32 py-20">
        <h1 className="text-3xl font-bold text-black mb-2">
            {details[0].heading}
        </h1>
        <hr className="border-t-2 w-64 mx-auto border-gray-400 mb-4" />
        <p className="text-gray-600  mx-auto leading-relaxed mb-4">
            {details[0].subheading}
        </p>
        <button className="bg-[#00203f] hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg mb-10">
            Connect Now
        </button>
        {/* Adding an image below the button */}
        
        <div className="mt-12 w-full grid grid-cols-1 lg:grid-cols-2 text-left mx-auto gap-10">
            {details[1].map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-8 border-2  overflow-hidden">
                <Image src={tech} alt='' className="w-20 mb-8"/>
                <h3 className="text-2xl mb-2 font-bold">{item.heading}</h3>
                <p className='text-gray-600 text-justify' dangerouslySetInnerHTML={{__html: item.text}}></p>
              </div>
            ))}
        </div>
      </section>

      {/* facts */}
      <section className='px-10 md:px-32 py-20'>
          <div className="grid grid-cols-1 lg:grid-cols-3 text-center lg:text-left justify-between gap-10 items-center">
            <div className="my-auto max-lg:mx-auto lg:mr-auto">
              <Image src={design} alt="smm" width={250} className="" />
            </div>

            <div className="lg:col-span-2 mx-auto">
              <h3 className="font-bold text-3xl text-gray-800 mb-4">{facts[1][0].heading}</h3>
              <p className="text-gray-600  mb-6" dangerouslySetInnerHTML={{__html: facts[1][0].text}}></p>
              <button className="font-bold bg-red-600 text-white text-justify rounded-lg py-3 px-6 hover:bg-red-700 transition duration-200">Know More</button>
            </div>
          </div>
      </section>

      <Testimonials data={testimonials} />
      <Faq data={faqs} color={'#F5EBD1'}/>
      <LookingForSection text={`Hire us to work for you!`} />
      <OfficesSection />
      <Footer />
    </div>
  );
};

export default ServicesPage;


export async function getServerSideProps(context) {
  const { req } = await context;
  const currentPageUrl = `${req.url}`;

  const data = await fetchPageData(currentPageUrl);

  return { props: { ...data } };
}