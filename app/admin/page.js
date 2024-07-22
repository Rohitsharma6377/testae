// AdminDashboard Component
"use client"

import Head from 'next/head';
import Sidebar from '@/app/admin/blocks/Sidebar';
import Header from '@/app/admin/blocks/Header';
import SubHeader from '@/app/admin/blocks/SubHeader';
// import MainContent from './blocks/MainContent';
// import BlogMeta from './blocks/BlogMeta'; // Import the BlogMeta component
import { useState } from 'react';
import { AiOutlineMenu } from "react-icons/ai"; // Menu icon for opening sidebar



export default function Page({children, pageTitle}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedContent, setSelectedContent] = useState(null);

  return (
    <div className="flex">

      {/* <Sidebar setSelectedContent={setSelectedContent} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} /> */}

      <div className={`absolute top-0`} style={{ width: isSidebarOpen ? "100%" : "calc(100% - 16rem)" }}>
        {/* <Header pageTitle={pageTitle} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} /> */}
        {/* <SubHeader /> */}
        
        {/* Render MainContent conditionally based on selectedContent */}
        <div className='mt-60'>
          {children ? children : 
              <section className="h-full py-8 dark:bg-gray-50 dark:text-gray-800">
                <div className="container flex flex-col px-5 my-8">
                
                  <div className="w-full text-center">
          
                    <h2 className="font-extrabold text-7xl dark:text-gray-400">
                      <span className="sr-only">Error</span>Hello,
                    </h2>
                    {/* <p className="text-2xl font-semibold md:text-3xl">Welcome to the dashboard!</p> */}

                    <p className="mt-4 dark:text-gray-600">Welcome to the dashboard!</p>

                  </div>

              </div>
            </section>} 
        </div>
      </div>
    </div>
  );
}