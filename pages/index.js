
import Nav from '@/components/sections/Navbar';
import AboutFounder from '@/components/sections/AboutFounder';
import HeroSection from '@/components/sections/HeroSection';
import TechStack from '@/components/sections/TechStack';
import Achievements from '@/components/sections/Achievements';
import Services from '@/components/sections/Services';
import Work from '@/components/sections/Work';
import Portfolio from '@/components/sections/Portfolio';
import Testimonials from '@/components/sections/Testimonials';
import Faq from '@/components/sections/Faq';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';
import OfficesSection from '@/components/sections/Offices';
import Head from 'next/head';
import axios from 'axios';
import { baseUrl, fetchPageData } from '@/utils/helper';


export default function HomePage({ pages, hero, technology, achievements, services, portfolio, testimonials, faqs, work, contact }) {

  return (
    <div className='overflow-hidden'>
      <Head>
        <title>{pages.meta_title}</title>
        <meta name="description" content={pages.meta_description} />
      </Head>

      <Nav />
      <HeroSection data={hero} />
      <TechStack data={technology} />
      <Achievements data={achievements}/>
      <Services data={services}/>
      <Work data={work} />
      <Portfolio data={portfolio} />
      <AboutFounder />
      {testimonials.length > 0 && <Testimonials data={testimonials} pageData={pages} />}
      {faqs.length > 0 && <Faq data={faqs} pageData={pages} />}
      <OfficesSection />
      <Contact data={contact} />
      <Footer />
    </div>
  );
}



// export async function getServerSideProps(context) {
//   const { req } = await context;
//   const currentPageUrl = `${req.url}`;

//   const data = await fetchPageData(currentPageUrl);

//   const response0 = await axios.get(`${baseUrl}/api/technology/get-technology`);
//   const technology = await response0.data;

//   const response1 = await axios.get(`${baseUrl}/api/pages/achievements`);
//   const achievements = await response1.data;

//   const response2 = await axios.get(`${baseUrl}/api/service/get-service`);
//   const services = await response2.data;

//   const response3 = await axios.get(`${baseUrl}/api/portfolio/get-portfolio`);
//   const portfolio = await response3.data;

//   const response4 = await axios.get(`${baseUrl}/api/work`);
//   const work = await response4.data;

//   return { props: { ...data, technology, achievements, services, portfolio, work } };


export async function getServerSideProps(context) {
  const { req } = await context;
  const currentPageUrl = `${req.url}`;

  const data = await fetchPageData(currentPageUrl);

  const response5 = await axios.get(`${baseUrl}/api/hero`);
  const hero = await response5.data;

  const response0 = await axios.get(`${baseUrl}/api/technology/get-technology`);
  const technology = await response0.data;

  const response1 = await axios.get(`${baseUrl}/api/pages/achievements`);
  const achievements = await response1.data;

  const response2 = await axios.get(`${baseUrl}/api/service/get-service`);
  const services = await response2.data;

  const response3 = await axios.get(`${baseUrl}/api/portfolio/get-portfolio`);
  const portfolio = await response3.data;

  const response4 = await axios.get(`${baseUrl}/api/work`);
  const work = await response4.data;

  const response6 = await axios.get(`${baseUrl}/api/contact`);
  const contact = await response6.data;

  return { props: { ...data, hero, technology, achievements, services, portfolio, work, contact } };
}
