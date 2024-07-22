
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
        <title>{'Social Media Marketing (SMM) in Sharjah'}</title>
        <meta name="description" content={'description'} />
      </Head>

      <Nav />
      <BannerSection data={banners} />
      
      <section className="text-center px-6 md:px-20 lg:px-32 pt-20">

        <div className="mx-auto">

          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Social Media Marketing (SMM) in Sharjah
          </h1>
          {/* <hr className="border-t-2 w-24 mx-auto border-red-600 mb-6" /> */}
          <p className="text-gray-600  pb-6 mx-auto leading-relaxed mb-12">
            In today’s fast-paced digital world, social media marketing (SMM) has become the most important factor for brand building. Imagine Sharjah, a prominent trade and cultural centre where any business can develop in its growing market. However, to survive in this hustle, you need to engage in efficient SMM strategies. These will help you to shape a better brand online and realise never-before-seen connections with your target audience.
          </p>

          <div className='flex mb-16'>
            <Image src={digital} alt='' className="h-80 my-auto" />
            <div className='my-auto'>
              <h3 className="text-3xl font-semibold text-gray-800 mb-4">
                Understanding the Social Media Marketing
              </h3>
              <p className="text-gray-600  mx-auto leading-relaxed mb-12">
                Social media promotion is a technique of promoting goods and services through social platforms. It encompasses various activities such as producing content for the website, advertising and engaging customers. Key platforms for SMM in Sharjah include Facebook, Instagram, Twitter, LinkedIn, Snapchat and others. For your target audience and business goals, it is crucial to select the right platform because each platform has its own pros.
              </p>
            </div>
          </div>

          <h3 className="text-3xl font-semibold text-gray-800 mb-4">
            Benefits of SMM for Businesses in Sharjah
          </h3>
          <p className="text-gray-600  pb-6 mx-auto leading-relaxed mb-12">
            SMM in Sharjah boosts brand visibility, enhances customer engagement, provides cost-effective marketing, enables precise targeting, and delivers measurable results.
          </p>


          <div className="mt-12 mb-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-white border rounded-lg p-6  hover:shadow-lg transition-shadow duration-300">
              <Image src={design} alt='' className="w-20 mx-auto mb-6" />
              <h3 className="text-xl mb-2 font-bold text-gray-800">Increased Brand Awareness</h3>
              <p className="text-gray-600">
                SMM involves increasing brand visibility and recognition. In Sharjah, your business can reach a wider audience thus enhancing their brand presence by using well-thought-out social media campaigns.
              </p>
            </div>
            <div className="bg-white border rounded-lg p-6  hover:shadow-lg transition-shadow duration-300">
              <Image src={code} alt='' className="w-20 mx-auto mb-6" />
              <h3 className="text-xl mb-2 font-bold text-gray-800">Enhanced Customer Engagement</h3>
              <p className="text-gray-600">
                Through social media platforms, your business can interact directly with customers creating a sense of community among them which translates into loyalty. Informative material that generates new ideas and quick responses to inquiries may improve customer relations dramatically.
              </p>
            </div>
            <div className="bg-white border rounded-lg p-6  hover:shadow-lg transition-shadow duration-300">
              <Image src={host} alt='' className="w-20 mx-auto mb-6" />
              <h3 className="text-xl mb-2 font-bold text-gray-800">Cost-Effective Marketing</h3>
              <p className="text-gray-600">
                Compared to traditional marketing methods; SMM is cheaper for several reasons. Businesses can get significant reach and engagement without having to spend that much money on it.
              </p>
            </div>
            
            <div className="col-span-3 flex justify-center gap-6">
              <div className="bg-white border rounded-lg p-6  hover:shadow-lg transition-shadow duration-300">
                <Image src={host} alt='' className="w-20 mx-auto mb-6" />
                <h3 className="text-xl mb-2 font-bold text-gray-800">Targeted Advertising</h3>
                <p className="text-gray-600">
                  Demographics, interests or behaviour are some of the targeting options provided by social media sites. As a result, your ads will be seen by only relevant people thereby improving conversion possibilities.
                </p>
              </div>
              <div className="bg-white border rounded-lg p-6  hover:shadow-lg transition-shadow duration-300">
                <Image src={host} alt='' className="w-20 mx-auto mb-6" />
                <h3 className="text-xl mb-2 font-bold text-gray-800">Measurable Results</h3>
                <p className="text-gray-600">
                  One of the major benefits of social media marketing is its ability to track and measure results. Facebook Insights, as well as Google Analytics, are tools that offer useful data for refining your strategies and improving the Return on Investment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="text-center bg-[#F4EBD0] px-32 py-20">
        <h1 className="text-2xl font-bold text-black mb-2">
          AMITKK’s SMM Services
        </h1>
        <hr className="border-t-2 w-64 mx-auto border-gray-400 mb-4" />
        <p className="text-black mx-auto leading-relaxed max-w-7xl mb-12">
          AMITKK, one of the leading names in digital marketing, provides a full range of SMM solutions to suit the Sharjah market. Some of their offerings include customised social media strategies, content creation, social media management, advertising and analytics. AMITKK has a proven track record of helping numerous businesses in Sharjah achieve their marketing objectives through SMM.
        </p>

        <h1 className="text-2xl font-bold text-black mb-2">
          Why Choose AMITKK for SMM in Sharjah
        </h1>
        {/* <hr className="border-t-2 w-64 mx-auto border-gray-400 mb-4" /> */}
        <p className="text-black mx-auto leading-relaxed max-w-7xl mb-4">
          Below are the reasons why you should choose AMITKK for Social Media Marketing in Sharjah.
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
                The team members at AMITKK are experts in their field with extensive experience in SMM. A successful campaign is guaranteed due to their professionalism and competency.
              </h5>
            </div>

            <div className="text-sm bg-white rounded-lg p-8 border-2  overflow-hidden">
                <Image src={tech} className="w-20 mb-8" alt='tech' />
                <h3 className="text-2xl mb-4 font-bold">Localized Approach</h3>
                <h5>
                  Knowing what works for the unique needs of the Sharjah Market allows AMITKK to develop customized campaigns that resonate with local audiences so they have maximum impact.
                </h5>
                {/* <p className="font-bold text-gray-600">read more..</p> */}
            </div>

            <div className="text-sm bg-white rounded-lg p-8 border-2  overflow-hidden">
                <Image src={tech} className="w-20 mb-8" alt='tech' />
                <h3 className="text-2xl mb-4 font-bold">Innovative Techniques</h3>
                <h5>
                  AMITKK uses up-to-date tools and techniques to make sure it is not just another campaign out there. They are creative and strategic enough to give you the results you need.
                </h5>
                {/* <p className="font-bold text-gray-600">read more..</p> */}
            </div>
        </div>
      </section>

      {/* <Hiring data={details[1]} /> */}

      <section className='text-center px-6 md:px-20 lg:px-32 pt-20'>
        <div className="mb-10 px-6 text-left">
          <div className="flex flex-col md:flex-row items-center mb-20">
            <div className="md:w-1/3 mb-6 md:mb-0">
              <Image src={design} alt="smm" width={250} className="" />
            </div>
            <div className="md:w-2/3 md:pl-10">
              <h3 className="font-bold text-2xl text-gray-800 mb-4">Boost Your Sales with Amitkk SMM Services!</h3>
              <p className="text-gray-600 mb-6">
                Mastering SMM in Sharjah requires a bespoke approach that relates to the unique qualities of this dynamic market. By segmenting the target audience, choosing suitable platforms and creating culturally specific material, businesses can enhance their online presence and achieve meaningful engagement with the users. Get more of our expertise on social media marketing and digital branding at Amitkk today for your business prowess in Sharjah. From strategic consultation to personalized support, let us guide you on the path to SMM success in this vibrant market.
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