
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Nav from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import Offices from '@/components/sections/Offices';
import LookingForSection from '@/components/sections/LookingFor';
import { baseUrl } from '@/utils/helper';

import '@/app/globals.css';



const PortfolioItem = ({ client_name, website_url, path, alt, text }) => {
  return (
    <div className="portfolio-item-container grid grid-cols-1 md:grid-cols-6 border border-gray-300 rounded-xl overflow-hidden mt-6">
      <div
        className="image-container md:col-span-2 max-md:overflow-hidden min-h-64 md:h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${baseUrl}/${path})` }}
      >
      </div>

      <div className="p-8 md:col-span-4">
        <h2 className="text-2xl font-semibold mb-2">{client_name}</h2>
        <h2 className="text-[14px] mb-2">{website_url}</h2>
        <div className="leading-7 text-sm" dangerouslySetInnerHTML={{ __html: text }}></div>
      </div>
    </div>
  );
};



const PortfolioSection = ({ data }) => {
  data = data.web_portfolio.filter(item => parseInt(item.status) === 1);

  return (
    <div className="mt-32">
      <Head>
        <title>{'Web Portfolio | AmitKK'}</title>
        <meta name="description" content={''} />
      </Head>

      <Nav />

      <div className="px-4 md:px-20 mt-14 mb-10">
        <h1 className="text-3xl font-bold text-center text-black mb-2">Web Portfolio</h1>
        <hr className="border-t-2 w-20 mx-auto border-gray-200 mb-8" />

        {data.map((item, index) => (
          <PortfolioItem key={index} {...item} />
        ))}
      </div>

      <LookingForSection text={'Looking for Website Developer?'} />
      <Offices />
      <Footer />
    </div>
  );
};


export default PortfolioSection;


export async function getServerSideProps() {
  const res = await fetch(`${baseUrl}/api/pages/web-portfolio`);
  const data = await res.json();

  return { props: { data }}
}