"use client"

import React from 'react';
import Image from 'next/image';
import Nav from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import Offices from '@/components/sections/Offices';
import egenome from '@/assets/egenome.png';
import portfolio from '@/assets/portfolio.png';
import Link from 'next/link';
import LookingForSection from '../../../components/sections/LookingFor';



// PortfolioItem Component
const PortfolioItem = ({ imageUrl, title, description }) => {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-6 shadow-xl border-2 rounded-xl overflow-hidden mt-6"
      onMouseOver={() => scrollMe('image-container', 'bottom')}
      onMouseOut={() => scrollMe('image-container', 'top')}
    >
      {/* Image Container */}
      <div
        id="image-container"
        className="md:col-span-2 md:h-40 max-md:h-64 max-md:overflow-hidden"
      >
        <Image
          src={imageUrl}
          alt={title}
          width={900}
          height={300}
          layout="responsive"
        />
      </div>
      {/* Text Content */}
      <div className="p-8 md:col-span-4">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <p className="leading-7 text-sm">{description}</p>
      </div>
    </div>
  );
};


function scrollMe(elementId, position) {
  document.getElementById(elementId).style.backgroundPosition = position;
}



// PortfolioSection Component
const PortfolioSection = () => {
  const portfolioItems = [
    {
      imageUrl: portfolio,
      title: "India Enigma",
      description: "The website design for Selfiya, an online rent-a-car platform merges a professional web layout with a vibrant colour palette. We used the colour scheme of a red, black, and white backdrop and all of these symbolize energy, sophistication, and clarity. The website also boasts easy and seamless navigation which makes it easy for visitors to find the information they need. The inclusion of the How It Works section on the home page helps provide a concise guide, ensuring users understand the process effortlessly. The vibrant colours used in the design evoke excitement, while the professional layout instils confidence in users. As developers, we meticulously structured each element, ensuring responsiveness across devices for a consistent experience.",
      // Add more fields as needed
    },
    {
      imageUrl: portfolio,
      title: "India Enigma",
      description: "The website design for Selfiya, an online rent-a-car platform merges a professional web layout with a vibrant colour palette. We used the colour scheme of a red, black, and white backdrop and all of these symbolize energy, sophistication, and clarity. The website also boasts easy and seamless navigation which makes it easy for visitors to find the information they need. The inclusion of the How It Works section on the home page helps provide a concise guide, ensuring users understand the process effortlessly. The vibrant colours used in the design evoke excitement, while the professional layout instils confidence in users. As developers, we meticulously structured each element, ensuring responsiveness across devices for a consistent experience.",
      // Add more fields as needed
    },
    {
      imageUrl: portfolio,
      title: "India Enigma",
      description: "The website design for Selfiya, an online rent-a-car platform merges a professional web layout with a vibrant colour palette. We used the colour scheme of a red, black, and white backdrop and all of these symbolize energy, sophistication, and clarity. The website also boasts easy and seamless navigation which makes it easy for visitors to find the information they need. The inclusion of the How It Works section on the home page helps provide a concise guide, ensuring users understand the process effortlessly. The vibrant colours used in the design evoke excitement, while the professional layout instils confidence in users. As developers, we meticulously structured each element, ensuring responsiveness across devices for a consistent experience.",
      // Add more fields as needed
    },
    {
      imageUrl: portfolio,
      title: "India Enigma",
      description: "The website design for Selfiya, an online rent-a-car platform merges a professional web layout with a vibrant colour palette. We used the colour scheme of a red, black, and white backdrop and all of these symbolize energy, sophistication, and clarity. The website also boasts easy and seamless navigation which makes it easy for visitors to find the information they need. The inclusion of the How It Works section on the home page helps provide a concise guide, ensuring users understand the process effortlessly. The vibrant colours used in the design evoke excitement, while the professional layout instils confidence in users. As developers, we meticulously structured each element, ensuring responsiveness across devices for a consistent experience.",
      // Add more fields as needed
    },
    // Repeat for more items
  ];

  return (
    <div className='mt-32'>
        <Nav />

        <div className='px-4 md:px-20 mt-14'>
        <h1 className="text-3xl font-bold text-center text-black mb-2">
            Web Portfolio
        </h1>
        <hr className="border-t-2 w-20 mx-auto border-gray-200 mb-8" />
        {/* Portfolio container starts */}
        {portfolioItems.map((item, index) => (
            <PortfolioItem key={index} {...item} />
        ))}
        {/* Portfolio container ends */}
        </div>
      

        <LookingForSection text={'Looking for Website Developer?'} />

        <Offices />
        <Footer />
    </div>
  );
}

export default PortfolioSection;




// const Portfolio = () => {
//   return (
//     <div>
//         <Nav />

//         <div className='px-20 mt-14'>
//             <h1 className="text-3xl font-bold text-center text-black mb-2">
//                 Web Portfolio
//             </h1>
//             <hr className="border-t-2 w-20 mx-auto border-gray-200 mb-8" />

//             {/* portfolio container starts */}

//             <div className="flex w-full shadow-xl border-2 rounded-xl overflow-hidden">
//             {/* Image Container */}
//                 <div className="w-1/3">
//                     <Image
//                     src="https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with your own image URL
//                     alt="Description"
//                     width={500} // Set a specific width
//                     height={300} // Set a specific height to maintain aspect ratio
//                     layout="responsive" // Adjusts to the size of the container
//                     />
//                 </div>

//                 {/* Text Content */}
//                 <div className="w-2/3 p-8">
//                     <h2 className="text-2xl font-semibold mb-4">India Enigma</h2>
//                     <p className='leading-7 text-sm'>
//                     The website of eGenome AI, a Biological Age Determination service blends professional design with a vibrant colour palette. Our developers used a palette of light green, purple, and a crisp white background to evoke sophistication and a sense of vitality. The choice of colors was strategic where the light green symbolizes growth, health, and rejuvenation, while purple signifies wisdom, innovation, and the scientific realm, all fundamental to the purpose of the website. The website also has seamless navigation and is responsive, and we worked hard to ensure a seamless user experience across various devices. Every element of the website conveys credibility to the visitors. Overall, the design of the website of eGenome AI conveys the expertise in the service it offers and also fosters trust among its visitors.
//                     </p>
//                 </div>
//             </div>
//             <div className="flex w-full shadow-xl border-2 rounded-xl overflow-hidden mt-6">
//             {/* Image Container */}
//                 <div className="w-1/3">
//                     <Image
//                     src="https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with your own image URL
//                     alt="Description"
//                     width={500} // Set a specific width
//                     height={300} // Set a specific height to maintain aspect ratio
//                     layout="responsive" // Adjusts to the size of the container
//                     />
//                 </div>

//                 {/* Text Content */}
//                 <div className="w-2/3 p-8">
//                     <h2 className="text-2xl font-semibold mb-4">India Enigma</h2>
//                     <p className='leading-7 text-sm'>
//                     The website of eGenome AI, a Biological Age Determination service blends professional design with a vibrant colour palette. Our developers used a palette of light green, purple, and a crisp white background to evoke sophistication and a sense of vitality. The choice of colors was strategic where the light green symbolizes growth, health, and rejuvenation, while purple signifies wisdom, innovation, and the scientific realm, all fundamental to the purpose of the website. The website also has seamless navigation and is responsive, and we worked hard to ensure a seamless user experience across various devices. Every element of the website conveys credibility to the visitors. Overall, the design of the website of eGenome AI conveys the expertise in the service it offers and also fosters trust among its visitors.
//                     </p>
//                 </div>
//             </div>
//             <div className="flex w-full shadow-xl border-2 rounded-xl overflow-hidden mt-6">
//             {/* Image Container */}
//                 <div className="w-1/3">
//                     <Image
//                     src="https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with your own image URL
//                     alt="Description"
//                     width={500} // Set a specific width
//                     height={300} // Set a specific height to maintain aspect ratio
//                     layout="responsive" // Adjusts to the size of the container
//                     />
//                 </div>

//                 {/* Text Content */}
//                 <div className="w-2/3 p-8">
//                     <h2 className="text-2xl font-semibold mb-4">India Enigma</h2>
//                     <p className='leading-7 text-sm'>
//                     The website of eGenome AI, a Biological Age Determination service blends professional design with a vibrant colour palette. Our developers used a palette of light green, purple, and a crisp white background to evoke sophistication and a sense of vitality. The choice of colors was strategic where the light green symbolizes growth, health, and rejuvenation, while purple signifies wisdom, innovation, and the scientific realm, all fundamental to the purpose of the website. The website also has seamless navigation and is responsive, and we worked hard to ensure a seamless user experience across various devices. Every element of the website conveys credibility to the visitors. Overall, the design of the website of eGenome AI conveys the expertise in the service it offers and also fosters trust among its visitors.
//                     </p>
//                 </div>
//             </div>

//             {/* portfolio container ends */}

//         </div>

//         <div className='bg-[#00203F] mt-20 flex flex-col md:flex-row justify-between h-auto md:h-36 items-center px-4 md:px-20 lg:px-40 text-white gap-4 md:gap-20 py-6'>
//             <h5 className='text-xl md:text-2xl text-center md:text-left'>Looking for Website Developer?</h5>
//             <Link href={'/contact'} className='bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-200'>CONNECT TODAY</Link>
//         </div>

//         <Offices />
        
//         <Footer />
//     </div>
//   );
// };

// export default Portfolio;
