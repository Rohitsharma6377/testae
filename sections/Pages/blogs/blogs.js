
// Import React and any necessary components
"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image'; // Assuming you're using Next.js for image optimization
import Nav from '@/components/sections/Navbar';
import Footer from "@/components/sections/Footer";


const BlogsPage = () => {

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('/api/blog/blogs');
            setBlogs(response.data);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    fetchData();
  }, []);

  
    
  // Dummy data for blog list items
  const blogItems = [
    { title: "Blog Post 1", date: "April 2, 2024", imageUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZG9nfGVufDB8fDB8fHww", description: "A brief summary of Blog Post 1." },
    { title: "Blog Post 2", date: "April 3, 2024", imageUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZG9nfGVufDB8fDB8fHww", description: "A brief summary of Blog Post 2." },
    { title: "Blog Post 2", date: "April 3, 2024", imageUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZG9nfGVufDB8fDB8fHww", description: "A brief summary of Blog Post 2." },
    { title: "Blog Post 2", date: "April 3, 2024", imageUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZG9nfGVufDB8fDB8fHww", description: "A brief summary of Blog Post 2." },
    { title: "Blog Post 2", date: "April 3, 2024", imageUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZG9nfGVufDB8fDB8fHww", description: "A brief summary of Blog Post 2." },

    // Add more blog items here
  ];

  const imageData = [
    {
      src: '/path-to-your-first-image.jpg', // Replace with your image path
      text: 'Image 1 Text',
    },
    {
      src: '/path-to-your-second-image.jpg', // Replace with your image path
      text: 'Image 2 Text',
    },
    {
      src: '/path-to-your-third-image.jpg', // Replace with your image path
      text: 'Image 3 Text',
    },
    {
      src: '/path-to-your-first-image.jpg', // Replace with your image path
      text: 'Image 1 Text',
    },
    {
      src: '/path-to-your-second-image.jpg', // Replace with your image path
      text: 'Image 2 Text',
    },
    {
      src: '/path-to-your-third-image.jpg', // Replace with your image path
      text: 'Image 3 Text',
    },
  ];

  return (
    <div>
        {/* section1 */}

        <Nav />
        <h1 className="mt-32 mb-2 text-center font-semibold text-3xl">Interesting Reads</h1>
        <hr className="border-t-2 w-36 mx-auto border-gray-400 mb-8" />
        <div className="container mx-auto flex flex-wrap py-6">
            <div className="w-full md:w-2/3 relative">
                <Image src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZG9nfGVufDB8fDB8fHww" alt="Main Blog Image" className='rounded-md' layout="fill" objectFit="cover" />
                <h2 className="absolute bottom-10 left-0 text-white font-bold text-2xl p-4">How digital marketing works?</h2>
                <button className="absolute bottom-4 left-4 bg-blue-500 text-white px-4 py-1 rounded-full hover:bg-blue-600 transition duration-200">Read More</button>
            </div>
            <div className="w-full rounded-md md:w-1/3 shadow-xl flex flex-col">
                {blogItems.map((item, index) => (
                <div key={index} className="flex items-center m-2 pl-8">
                    <div className="w-1/4">
                    <Image src={item.imageUrl} alt={item.title} width={70} height={100} />
                    </div>
                    <div className="w-3/4 pl-4">
                        <p className='text-sm font-medium leading-4'>{item.description}</p>
                        <p className="text-[12px] text-gray-600">{item.date}</p>
                    </div>
                </div>
                ))}
            </div>
        </div>


        {/* section2 */}

        <div className="container mt-4 mx-auto">
            <div className="flex flex-wrap -mx-4">
                {imageData.map((image, index) => (
                    <div key={index} className="w-full md:w-1/3 px-3 py-3 mb-8 md:mb-0">
                        <div className="relative h-64">
                            <Image src='https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZG9nfGVufDB8fDB8fHww' alt={`Image ${index + 1}`} layout="fill" objectFit="cover" className="rounded-lg" />
                            <div className="absolute inset-0 flex items-end justify-center bg-black bg-opacity-50 rounded-lg p-4">
                                <p className="text-white text-xl font-semibold">{image.text}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* section3 */}

        <div className="relative mt-10 mx-5 h-96">
            <Image src='https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZG9nfGVufDB8fDB8fHww' alt={``} layout="fill" objectFit="cover" className="rounded-lg" />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 rounded-lg p-4">
                <p className="text-white text-3xl font-semibold mb-4">Want to publish your blog with us?</p>
                <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-200">Read More</button>
            </div>
        </div>

        
        {/* section4 */}

        <div className="container mt-10 mb-12 mx-auto">
            <div className="flex flex-wrap -mx-4">
                {imageData.map((image, index) => (
                    <div key={index} className="w-full md:w-1/3 px-3 py-3 mb-8 md:mb-0">
                        <div className="relative h-64">
                            <Image src='https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZG9nfGVufDB8fDB8fHww' alt={`Image ${index + 1}`} layout="fill" objectFit="cover" className="rounded-lg" />
                            <div className="absolute inset-0 flex items-end justify-center bg-black bg-opacity-50 rounded-lg p-4">
                                <p className="text-white text-xl font-semibold">{image.text}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <Footer />

    </div>
  );
};

export default BlogsPage;