// components/HeroSection.js
'use client'

import Nav from '@/components/sections/Navbar';
// import HeroSection from '@/sections/Hero2';
// import Faq from '@/sections/Pages/blocks/Faq';
// import Contact from '@/sections/Pages/Forms/Contact';
// import Footer from '@/sections/Pages/blocks/Footer';
// import Services from '@/sections/Pages/development/sections/Services';
// import Hiring from '@/sections/Pages/development/sections/Hiring';
// import Tech from '@/sections/Pages/development/sections/Tech';
// import Cost from '@/sections/Pages/development/sections/Cost';
// import WhyChooseUs from '@/sections/Pages/development/sections/WhyChooseUs';


export default function Development({data}) {
    return (
      <div>
        <Nav />
        {/* <HeroSection tech={data}/>
        <Services />
        <Hiring />
        <Tech />
        <Cost />
        <WhyChooseUs />
        <Faq />
        <Contact />
        <Footer /> */}
      </div>
    );
}