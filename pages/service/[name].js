
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
import { baseUrl } from '@/utils/helper';


const ServicesPage = ({ banners, faqs }) => {


  return (
    <div>
      <Head>
        <title>{'title'}</title>
        <meta name="description" content={'description'} />
      </Head>

      <Nav />
      <BannerSection data={banners} />
      {/* <HeroSection /> */}
      <ContentSection />
      <Hiring />
      <ServicesSection />
      <Faq data={faqs} color={'#F5EBD1'}/>
      <LookingForSection text={`Hire us to work for you!`} />
      <OfficesSection />
      <Footer />
    </div>
  );
};

export default ServicesPage;




export async function getServerSideProps() {
  // Fetch data from external API
  const response1 = await fetch(`${baseUrl}/api/pages/banners`);
  const banners = await response1.json();

  const response2 = await fetch(`${baseUrl}/api/pages/faq`);
  const faqs = await response2.json();
  
  // Pass data to the page via props
  return { props: { banners, faqs } };
}
