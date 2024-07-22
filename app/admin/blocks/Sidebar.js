// components/Sidebar.js
"use client"

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/amitkk-logo.svg';

import { IoIosArrowForward } from "react-icons/io";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai"; // Icons for the close and menu buttons
import { useRouter } from 'next/navigation';
import { sidebarItems } from '@/constants/nav';
import { slugify } from '@/utils/helper';




export default function Sidebar({ setSelectedContent, isSidebarOpen, setIsSidebarOpen }) {

    const { push } = useRouter();

    const [openItem, setOpenItem] = useState(null);
    const sidebarRef = useRef(null);

    const openSidebar = () => {
        if (sidebarRef.current) {
            sidebarRef.current.style.width = '16rem';
            sidebarRef.current.style.transition = 'width 0.5s';
            setTimeout(() => {
              setIsSidebarOpen(true);
            }, 300);
        }
    };

    const closeSidebar = () => {
        if (sidebarRef.current) {
            sidebarRef.current.style.width = '6rem';
            sidebarRef.current.style.transition = 'width 0.5s';
            setIsSidebarOpen(false);
            setOpenItem(null);
        }
    };

    const toggleDropdown = (itemName) => {
        setOpenItem(openItem === itemName ? null : itemName);
    };

    const handleItemClick = (item) => {
      openSidebar();

      setTimeout(() => {

        if(item.subItems.length > 0){
          toggleDropdown(item.name);
        } 
        else {
          push(`/admin/${item.name.toLowerCase()}`);
        }
      }, 300);

    };

    return (
      <div ref={sidebarRef} className={`bg-[#F9FCFF] border-r ${isSidebarOpen ? "w-64" : "flex flex-col items-center"} px-8 overflow-y-auto scrollbar-hide fixed h-full z-30`}>
        <div className="flex justify-between items-center py-4">
          {isSidebarOpen ? (
            <>
            <Link href={'/admin'}><Image src={logo} alt="Logo" className='w-20' /></Link>
            <button onClick={closeSidebar} className="p-1 rounded-xl opacity-50 hover:opacity-80 bg-[#2F5A76] text-white">
              <AiOutlineClose size={20} />
            </button>
            </>
          ) : 
          (<button onClick={openSidebar} className="mt-4 p-1 rounded-xl hover:bg-[#1a384d] bg-[#2F5A76] text-white">
            <IoIosArrowForward size={20} />
          </button>)}
        </div>

        <nav className="pt-4 text-black">
          <ul>
            {isSidebarOpen && <h3 className="text-sm text-gray-400 mb-3">MENU</h3>}
            
            {sidebarItems.map((item) => (
              // <Link href={``} key={1} className='flex gap-3 items-center'>
                <li key={item.name} className={`${isSidebarOpen ? "relative mb-2" : "relative mb-3"}`}>
                  <div
                    className={`flex justify-between items-center text-md font-light hover:font-medium ${isSidebarOpen ? "hover:text-white hover:bg-[#2F5A76] pl-4" : "py-0"} ${openItem === item.name && "text-white bg-[#2F5A76] rounded-xl"} py-3 rounded-l-full cursor-pointer`}
                    onClick={() => handleItemClick(item)}
                  >
                    <div className={`${!isSidebarOpen && "hover:text-white hover:bg-[#2F5A76] p-2 rounded-xl"} flex gap-3 items-center`}>
                      <item.icon className={""} size={24} />
                      {isSidebarOpen && item.name}
                    </div>
                  </div>

                  {openItem === item.name && (
                    <div className="relative left-8 top-2 mt-0 mb-6 w-40 bg-white rounded-md z-10">
                      
                      {item.subItems.map((subItem) => (
                        <Link href={`/admin/${slugify(subItem.toLowerCase())}`} key={subItem}
                          onClick={() => setSelectedContent(subItem)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            {subItem}
                        </Link>
                      ))}

                    </div>
                  )}

                </li>
              // </Link>
            ))}
          </ul>
        </nav>
      </div>
    );
}
