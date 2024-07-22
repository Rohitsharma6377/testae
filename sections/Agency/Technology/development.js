// components/HeroSection.js

import WhyChooseUs from '@/sections/Pages/blocks/WhyChooseUs';
import Footer from '@/components/sections/Footer';
import Offices from '@/components/sections/Offices';
import LookingForSection from '@/components/sections/LookingFor';
import FaqSection from '@/components/sections/Faq';
import Slideshow from '@/sections/Agency/Technology/slideshow';



const faqs = [
  {
    question: 'Does AMITKK provide a Flutter App Maintenance Service?',
    answer: 'React is a declarative, efficient, and flexible JavaScript library for building user interfaces.',
  },
  {
    question: 'Will Flutter Apps be Compatible with both Android and iOS?',
    answer: 'React creates a virtual DOM in memory, where it does all the necessary manipulating, before making the changes in the browser DOM.',
  },
  {
    question: 'What are components in React?',
    answer: 'Components are independent and reusable bits of code. They serve the same purpose as JavaScript functions, but work in isolation and return HTML via a render function.',
  },
];


function DevelopmentPage() {
    return (
      <div>
        <Slideshow />
        <WhyChooseUs />
        <LookingForSection text={'Looking for a Flutter App Development Company in India?'} />
        <FaqSection data={faqs} />
        <LookingForSection text={'Hire a Flutter App Development Company in India?'} />
        <Offices />
        <Footer />
      </div>
    );
}


export default DevelopmentPage;