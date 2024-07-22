
"use client"

import Head from 'next/head';
import { useState } from 'react';
import Header from '@/app/admin/blocks/Header';
import SubHeader from '@/app/admin/blocks/SubHeader';
import Sidebar from '@/app/admin/blocks/Sidebar';

import { AiOutlineMenu } from "react-icons/ai";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function AdminDashboard({children, pageTitle}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);

  return (
    <div className="flex">

      <Sidebar setSelectedContent={setSelectedContent} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      <div className={`absolute right-0`} style={{ width: isSidebarOpen ? "calc(100% - 16rem)" : "calc(100% - 6rem)" }}>
        <Header pageTitle={pageTitle} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <SubHeader isSidebarOpen={isSidebarOpen} />
        
        {/* Render MainContent conditionally based on selectedContent */}
        <div className='mt-60'>
          {children 
          ? 
          children 
          : 
              <section className="flex items-center h-full p-16 dark:bg-gray-50 dark:text-gray-800">
                <div className="container flex flex-col justify-center items-center px-5 mx-auto my-8">
                
                  <div className="max-w-md text-center">
          
                    <h2 className="font-extrabold text-7xl dark:text-gray-400">
                      <span className="sr-only">Error</span>Hello,
                    </h2>
                    {/* <p className="text-2xl font-semibold md:text-3xl">Welcome to the dashboard!</p> */}

                    <p className="mt-4 mb-8 dark:text-gray-600">Welcome to the dashboard!</p>

                  </div>

              </div>
            </section>} 
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}