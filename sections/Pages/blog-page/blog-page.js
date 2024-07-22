// Import React and any necessary components
import React from 'react';
import Image from 'next/image'; // Assuming you're using Next.js for image optimization
import Nav from '@/components/sections/Navbar';
import Footer from "@/components/sections/Footer";

// Create a reusable component for Blog Items
const BlogItem = ({ imageUrl, title, description, date }) => (
  <div className="flex items-center m-2 pl-12">
    <div className="w-1/4">
      <Image src={imageUrl} alt={title} width={70} height={100} layout="responsive" />
    </div>
    <div className="w-3/4 pl-4">
      <p className='text-sm font-medium leading-4'>{description}</p>
      <p className="text-[12px] text-gray-600">{date}</p>
    </div>
  </div>
);

const BlogPage = () => {
  // Consolidate your blog and image data here
  const blogItems = [
    { title: "Blog Post 1", date: "April 2, 2024", imageUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZG9nfGVufDB8fDB8fHww", description: "A brief summary of Blog Post 1." },
    // More blog items...
  ];

  return (
    <div>
      <Nav />
      <div className="relative h-screen">
        <Image src='https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt="" layout="fill" objectFit="cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 rounded-lg p-4">
          <p className="text-white text-3xl font-semibold mb-4">How Digital Marketing Boosts Sales for Pet Product Business</p>
        </div>
      </div>

      <div className="container mt-4 mx-auto">
        <div className="flex flex-wrap px-24 mt-8">
          <div className="w-full md:w-2/3 px-3 py-3">
            <p className='mb-4'>Brands in the pet product business know that the online competition is quite intense. However, there is still much room for brands of all sizes to grow in this industry. Being a pet business owner, you can unleash all your efforts and boost sales using digital marketing.<br/><br/>According to a recent study, pet ownership is constantly rising in the country, paving the way for brands to buy pet services and products. Suppose you have been in the pet product business for a while or have entered the competition. In that case, you can thrive in this competitive marketing by knowing how digital marketing can boost sales for your pet product business.</p>
            <h3 className='font-bold text-2xl mt-10 mb-10'>Challenges Faced by Pet Product Businesses</h3>
            <p className='mb-8'>The pet product industry shows good growth opportunities; however, there are also several challenges. One of the biggest challenges faced by businesses that are into pet products is competition from brick-and-mortar stores that sell pet products and provide various pet services.<br/><br/>Another challenge that cannot be ignored in the pet industry is the change in consumer behavior. Pet owners are digitally savvy and love to shop online. This has led to an increase in e-commerce stores that sell pet products. So, it is important to have a good presence to stay ahead of the competitors in your industry.</p>
          </div>

          <div className="w-full md:w-1/3 rounded-md flex flex-col">
            <h3 className='text-lg font-bold text-gray-700 text-center mb-2'>Recent Posts</h3>
            {blogItems.map((item, index) => (
              <BlogItem key={index} {...item} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogPage;


// // Import React and any necessary components
// import React from 'react';
// import Image from 'next/image'; // Assuming you're using Next.js for image optimization
// import Nav from "@/sections/Nav";
// import Footer from "@/sections/Footer";


// const BlogPage = () => {
//   // Dummy data for blog list items
//   const blogItems = [
//     { title: "Blog Post 1", date: "April 2, 2024", imageUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZG9nfGVufDB8fDB8fHww", description: "A brief summary of Blog Post 1." },
//     { title: "Blog Post 2", date: "April 3, 2024", imageUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZG9nfGVufDB8fDB8fHww", description: "A brief summary of Blog Post 2." },
//     { title: "Blog Post 2", date: "April 3, 2024", imageUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZG9nfGVufDB8fDB8fHww", description: "A brief summary of Blog Post 2." },
//     { title: "Blog Post 2", date: "April 3, 2024", imageUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZG9nfGVufDB8fDB8fHww", description: "A brief summary of Blog Post 2." },
//     { title: "Blog Post 2", date: "April 3, 2024", imageUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZG9nfGVufDB8fDB8fHww", description: "A brief summary of Blog Post 2." },

//     // Add more blog items here
//   ];

//   const imageData = [
//     {
//       src: '/path-to-your-first-image.jpg', // Replace with your image path
//       text: 'Image 1 Text',
//     },
//     {
//       src: '/path-to-your-second-image.jpg', // Replace with your image path
//       text: 'Image 2 Text',
//     },
//     {
//       src: '/path-to-your-third-image.jpg', // Replace with your image path
//       text: 'Image 3 Text',
//     },
//     {
//       src: '/path-to-your-first-image.jpg', // Replace with your image path
//       text: 'Image 1 Text',
//     },
//     {
//       src: '/path-to-your-second-image.jpg', // Replace with your image path
//       text: 'Image 2 Text',
//     },
//     {
//       src: '/path-to-your-third-image.jpg', // Replace with your image path
//       text: 'Image 3 Text',
//     },
//   ];

//   return (
//     <div>

//         {/* blog thumbnail */}

//         <Nav />

//         <div className="relative h-screen">
//             <Image src='https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt={``} layout="fill" objectFit="cover" className="" />
//             <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 rounded-lg p-4">
//                 <p className="text-white text-3xl font-semibold mb-4">How Digital Marketing Boosts Sales for Pet Product Business</p>
//             </div>
//         </div>




//         <div className="container mt-4 mx-auto">
//             <div className="flex flex-wrap px-24 mt-8">
//                 <div className="w-2/3 px-3 py-3 md:mb-0">
//                     <p className='mb-4'>Brands in the pet product business know that the online competition is quite intense. However, there is still much room for brands of all sizes to grow in this industry. Being a pet business owner, you can unleash all your efforts and boost sales using digital marketing.<br/><br/>According to a recent study, pet ownership is constantly rising in the country, paving the way for brands to buy pet services and products. Suppose you have been in the pet product business for a while or have entered the competition. In that case, you can thrive in this competitive marketing by knowing how digital marketing can boost sales for your pet product business.</p>
//                     <h3 className='font-bold text-2xl mt-10 mb-10'>Challenges Faced by Pet Product Businesses</h3>
//                     <p>The pet product industry shows good growth opportunities; however, there are also several challenges. One of the biggest challenges faced by businesses that are into pet products is competition from brick-and-mortar stores that sell pet products and provide various pet services.<br/><br/>Another challenge that cannot be ignored in the pet industry is the change in consumer behavior. Pet owners are digitally savvy and love to shop online. This has led to an increase in e-commerce stores that sell pet products. So, it is important to have a good presence to stay ahead of the competitors in your industry.</p>
//                 </div>

//                 <div className="w-full rounded-md md:w-1/3 flex flex-col">
//                     <h3 className='text-lg font-bold text-gray-700 text-center mb-2'>Recent Posts</h3>
//                     {blogItems.map((item, index) => (
//                     <div key={index} className="flex items-center m-2 pl-12">
//                         <div className="w-1/4">
//                         <Image src={item.imageUrl} alt={item.title} width={70} height={100} />
//                         </div>
//                         <div className="w-3/4 pl-4">
//                             <p className='text-sm font-medium leading-4'>{item.description}</p>
//                             <p className="text-[12px] text-gray-600">{item.date}</p>
//                         </div>
//                     </div>
//                     ))}
//             </div>
//             </div>
//         </div>



//         <Footer />

//     </div>
//   );
// };


// export default BlogPage;