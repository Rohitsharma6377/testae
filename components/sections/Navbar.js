
import React, { useState, useEffect, useContext, useRef } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Button, Avatar } from "@nextui-org/react";
import logo from '@/assets/amitkk-logo.svg';
import Image from "next/image";
import { LiaAngleDownSolid } from "react-icons/lia";
import { verifyAuth } from '@/pages/api/auth/loginApi';
import Cookies from 'universal-cookie';
import { usePathname, useRouter } from 'next/navigation'
import axios from "axios";
import MyContext from "@/context/MyContext";
import { RxHamburgerMenu } from "react-icons/rx";
import { NavItems, NavDropdownItems } from "@/constants/nav";
import { FaRegCircleUser } from "react-icons/fa6";


export default function Nav() {
  const { isOpen, openForm } = useContext(MyContext);
  const currentPath = usePathname();
  const { push } = useRouter();
  const cookies = new Cookies();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAvatar, setShowAvatar] = useState(null);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleDropdown = (id) => {
    if (dropdownOpen === id) {
      setDropdownOpen(null);
    } else {
      setDropdownOpen(id);
    }
  };

  const CheckUser = async () => {
    const store = cookies.get("User");
    if (store) {
      const Response = await verifyAuth(store);
      if (Response.status == 200) {
        setShowAvatar(true);
        setUser(Response.data.user);
      } else if (Response.response.status == 401) {
        cookies.remove("User");
        setShowAvatar(false);
      }
    }
  }

  const handleLogout = async () => {
    try {
      const response = await axios.get('/api/auth/logout');
      if (response && currentPath !== '/') push('/')
      setShowAvatar(false);
    } catch (error) {
      console.error('Something went wrong: ', error);
    }
  }

  useEffect(() => {
    CheckUser();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && buttonRef.current && !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);


  return (
    <div className={`fixed top-0 ${!isOpen && 'z-10'} w-screen py-4 bg-[#F4EBD0]`}>
      <Navbar className="h-14 flex justify-evenly relative">
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand className="w-20 sm:ml-4">
            <Link href="/" className="focus:outline-none"><Image src={logo} alt="Logo" className='w-20' /></Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-2 lg:gap-4 " justify="center">
          {NavItems.map((item) => (
            <NavbarItem key={item.name}>
              <Dropdown closeOnSelect={false}>
                <DropdownTrigger>
                  <Button variant="light" disableAnimation={true} className="focus:outline-none">
                    {NavDropdownItems[item.name.toLowerCase()] ? (
                      <div className="flex items-center gap-2">
                        {item.name}
                        <LiaAngleDownSolid size={14} />
                      </div>
                    ) : (
                      <Link className="focus:outline-none" href={item.url}>{item.name}</Link>
                    )}
                  </Button>
                </DropdownTrigger>
                {NavDropdownItems[item.name.toLowerCase()] && (
                  <DropdownMenu className="py-2 px-0 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    {NavDropdownItems[item.name.toLowerCase()].map((service) => (
                      <DropdownItem key={service.name} className="relative block text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none">
                        <Link className="focus:outline-none" href={service.url}>{service.name}</Link>
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                )}
              </Dropdown>
            </NavbarItem>
          ))}

          <NavbarItem className={`ml-4 mr-4 focus:outline-none`}>
            <button onClick={openForm} className="bg-[#00203f] hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg focus:outline-none">
              Contact Us
            </button>
          </NavbarItem>

          {showAvatar && (
          <NavbarItem className="w-20 justify-center md:justify-end lg:justify-start" as="div">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button variant="light" disableAnimation={true} className="flex focus:outline-none">
                  <FaRegCircleUser className="text-2xl transition-transform focus:outline-none" />
                  <LiaAngleDownSolid size={14} />
                </Button>
                {/* <Avatar
                  isBordered
                  as="button"
                  className="transition-transform focus:outline-none"
                  color="secondary"
                  name={user.email}
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                /> */}
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat" className="py-2 px-0 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <DropdownItem key="profile" className="block text-left w-full px-4 py-2 text-sm text-gray-700 focus:outline-none">
                  <p className="font-semibold cursor-default">Signed in as</p>
                  <p className="font-semibold cursor-default">{user.email}</p>
                </DropdownItem>

                {user.role !== 'user' && (
                  <DropdownItem key="admin_panel" className="block text-left w-full px-4 py-1 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none">
                      <button onClick={() => push('/admin')}>Admin Panel</button>
                  </DropdownItem>
                )}

                <DropdownItem key="logout" color="danger" className="block text-left w-full px-4 py-1 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none">
                  <button onClick={() => handleLogout()}>Log Out</button>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
          )}
        </NavbarContent>

        <button ref={buttonRef} onClick={() => setIsMenuOpen(!isMenuOpen)} className="mr-8 sm:hidden">
          <RxHamburgerMenu size={24} />
        </button>
      </Navbar>

      {isMenuOpen && 
      <div ref={menuRef} className={`absolute sm:hidden bg-white w-screen text-left top-20 py-2 px-10 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}>
        {NavItems.map((item) => 
          (NavDropdownItems[item.name.toLowerCase()] ? (
            <div key={item.id}>
              <div onClick={() => toggleDropdown(item.id)} className="flex items-center gap-2 text-gray-700 py-2">
                {item.name}
                <LiaAngleDownSolid size={14} />
              </div>
              {dropdownOpen === item.id && 
              <div className="pl-4">
                {NavDropdownItems[item.name.toLowerCase()].map((service) => (
                  <Link href={service.url} key={service.name} className="block py-1 text-gray-500" onClick={() => setIsMenuOpen(false)}>
                    {service.name}
                  </Link>
                ))}
              </div>}
            </div>
          ) : (
            <Link key={item.id} href={item.url} className="block text-gray-700 py-2" onClick={() => setIsMenuOpen(false)}>
              {item.name}
            </Link>
          ))
        )}
      </div>}
    </div>
  );
}