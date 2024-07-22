
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
        <title>{'Pay Per Click (PPC) in Sharjah'}</title>
        <meta name="description" content={'description'} />
      </Head>

      <Nav />
      <BannerSection data={banners} />
      
      <section className="text-center px-6 md:px-20 lg:px-32 pt-20">

        <div className="mx-auto">

          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Pay Per Click (PPC) in Sharjah

          </h1>
          {/* <hr className="border-t-2 w-24 mx-auto border-red-600 mb-6" /> */}
          <p className="text-gray-600  pb-6 mx-auto leading-relaxed mb-12">
            Pay-per-click (PPC) advertising has emerged as a valuable tool for businesses in Sharjah, UAE, within the world of digital marketing. Consider your business standing out amidst the booming Sharjah trading post attracting traffic with every click.
            <br/><br/>
            We understand that you want to expand your digital marketing horizon, and this is why we offer Pay-Per-Click as a solution to you. Let us show you the captivating world of PPC designed specifically for businesses such as yours in Sharjah.
          </p>

          <div className='flex mb-16'>
            <Image src={digital} alt='' className="h-80 my-auto" />
            <div className='my-auto'>
              <h3 className="text-3xl font-semibold text-gray-800 mb-4">
                Understanding PPC Advertising
              </h3>
              <p className="text-gray-600  mx-auto leading-relaxed mb-12">
                Get into the world of pay-per-click (PPC) advertising. What is a PPC and How Does It Work?
                <br/><br/>
                Pay-per-click (PPC) advertising is an internet advertising model where advertisers are charged a fee every time someone clicks on the ad. The main idea of PPC advertising is to allow businesses to bid for ad placement rather than to quarrel for space in the search platform&apos;s sponsored links if someone corresponds to a word related to business. The process involves forming campaigns, listing keywords, creating ad copies, and assigning a bid for each click.
              </p>
            </div>
          </div>
        </div>
      </section>


    <section className='text-center px-32 bg-[#F4EBD0] pt-20 pb-20'>
        <h3 className="text-3xl font-semibold text-gray-800 mb-4">
        PPC Platforms For Firms in Sharjah
        </h3>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-white border rounded-lg p-6  hover:shadow-lg transition-shadow duration-300">
                <Image src={design} alt='' className="w-20 mx-auto mb-6" />
                <h3 className="text-xl mb-2 font-bold text-gray-800">Google Ads</h3>
                <p className="text-gray-600">
                It’s the most common Pay Per Click (PPC) platform and it allows ads on the Google search engine and its advertising network.
                </p>
            </div>
            <div className="bg-white border rounded-lg p-6  hover:shadow-lg transition-shadow duration-300">
                <Image src={code} alt='' className="w-20 mx-auto mb-6" />
                <h3 className="text-xl mb-2 font-bold text-gray-800">Bing Ads</h3>
                <p className="text-gray-600">
                Bing Ads is pretty similar to Google Ads which allows businesses to place their ads on the Bing search engine and its partner sites.
                </p>
            </div>
            <div className="bg-white border rounded-lg p-6  hover:shadow-lg transition-shadow duration-300">
                <Image src={host} alt='' className="w-20 mx-auto mb-6" />
                <h3 className="text-xl mb-2 font-bold text-gray-800">Social Media Advertising</h3>
                <p className="text-gray-600">
                There are PPC advertising options specifically designed for Facebook, Instagram, LinkedIn, Twitter et cetera targeting different audiences by demographic segmentation.
                </p>
            </div>
        </div>
    </section>

    <section className='text-center px-32 pt-20 pb-20'>
        <h3 className="text-3xl font-semibold text-gray-800 mb-4">
        The Merits of PPC Advertising for Local Firms
        </h3>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white border rounded-lg p-6  hover:shadow-lg transition-shadow duration-300">
                <Image src={design} alt='' className="w-20 mx-auto mb-6" />
                <h3 className="text-xl mb-2 font-bold text-gray-800">Immediate Visibility</h3>
                <p className="text-gray-600">
                As they appear right at the top of search engine results pages, pay-per-click ads provide instant visibility to those who might be interested.
                </p>
            </div>
            <div className="bg-white border rounded-lg p-6  hover:shadow-lg transition-shadow duration-300">
                <Image src={code} alt='' className="w-20 mx-auto mb-6" />
                <h3 className="text-xl mb-2 font-bold text-gray-800">Targeted Reach</h3>
                <p className="text-gray-600">
                Businesses can focus their adverts on select geographies, demographics interests and behaviours which ensures that they reach the intended audience.
                </p>
            </div>
            <div className="bg-white border rounded-lg p-6  hover:shadow-lg transition-shadow duration-300">
                <Image src={host} alt='' className="w-20 mx-auto mb-6" />
                <h3 className="text-xl mb-2 font-bold text-gray-800">Cost-Effective</h3>
                <p className="text-gray-600">
                This implies that companies only pay whenever people click on their advertisements which makes it a cost-effective advertising method.
                </p>
            </div>
            <div className="bg-white border rounded-lg p-6  hover:shadow-lg transition-shadow duration-300">
                <Image src={host} alt='' className="w-20 mx-auto mb-6" />
                <h3 className="text-xl mb-2 font-bold text-gray-800">Measurable Results</h3>
                <p className="text-gray-600">
                Additionally, these platforms offer detailed analytics as well as reports helping businesses monitor the performance of their campaigns and make necessary improvements.
                </p>
            </div>
        </div>
    </section>

      <section className="text-center bg-[#F4EBD0] px-32 py-20">
        <h1 className="text-2xl font-bold text-black mb-2">
        PPC Services by AMITKK
        </h1>
        <hr className="border-t-2 w-64 mx-auto border-gray-400 mb-4" />
        <p className="text-black mx-auto leading-relaxed max-w-7xl mb-4">
        AMITKK – the marketing pioneer is a firm offering Sharjah-specific PPC. This incorporates client-oriented custom PPC strategies, keyword research, ad creation, campaign management and performance analysis. In the same way as this type of PPC campaign, they have already helped many companies in Sharjah to achieve their objectives.
        </p>

        <button className="bg-[#00203f] hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg mb-10">
          Connect Now
        </button>
        {/* Adding an image below the button */}
        
        <div className="mt-12 container text-left px-72 mx-auto grid grid-cols-3 gap-10">
            <div className="text-sm bg-white rounded-lg p-8 border-2  overflow-hidden">
              <Image src={tech} className="w-20 mb-8" alt='tech' />
              <h3 className="text-2xl mb-4 font-bold">Expertise and Experience</h3>
              <h5>
              Seasoned professionals who have been running successful paid searches for a long time make up AMITKK’s team. With their expertise, they provide superior services and successful campaigns.
              </h5>
            </div>

            <div className="text-sm bg-white rounded-lg p-8 border-2  overflow-hidden">
                <Image src={tech} className="w-20 mb-8" alt='tech' />
                <h3 className="text-2xl mb-4 font-bold">Localized Approach</h3>
                <h5>
                We will create Sharjah-focused PPC strategies with maximum impact on local people by understanding the unique needs of this market.
                </h5>
            </div>

            <div className="text-sm bg-white rounded-lg p-8 border-2  overflow-hidden">
                <Image src={tech} className="w-20 mb-8" alt='tech' />
                <h3 className="text-2xl mb-4 font-bold">Innovative Techniques</h3>
                <h5>
                AMITKK produces remarkable campaigns using the latest tools and technologies with a strategic approach that leads to creative solutions.
                </h5>
            </div>
        </div>
      </section>


      <section className='text-center px-6 md:px-20 lg:px-32 pt-20'>
        <div className="mb-10 px-6 text-left">
          <div className="flex flex-col md:flex-row items-center mb-20">
            <div className="md:w-1/3 mb-6 md:mb-0">
              <Image src={design} alt="smm" width={250} className="" />
            </div>
            <div className="md:w-2/3 md:pl-10">
              <h3 className="font-bold text-2xl text-gray-800 mb-4">Conclude Your PPC Discussion to Success with Amitkk!</h3>
              <p className="text-gray-600 mb-6">
              Your success in Sharjah’s competitive market is based on PPC advertising. Its expeditious effect, narrow focus and quantifiable outcomes are important for your business’s expansion. Get a hold of yourself and add PPC to your digital marketing scheme. To get the help of experts visit Amitkk.com to make a successful implementation of effective PPC campaigns that match the area of Sharjah. We can lift its image together and maximize your business opportunities there making it possible.
              </p>
              <button className="font-bold bg-red-600 text-white rounded-lg py-3 px-6 hover:bg-red-700 transition duration-200">Know More</button>
            </div>
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