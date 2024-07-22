

//Navbar
export const NavItems = [
  { id: 1, name: "Home", url: "/" },
  { id: 2, name: "Services", url: "" },
  { id: 3, name: "Technology", url: "" },
  { id: 5, name: "Portfolio", url: "" },
  // { id: 6, name: "Blogs", url: "/blog/introduction-to-ctr" },
  { id: 4, name: "Clients", url: "/our-clients" },
];

export const NavDropdownItems = {
  services: [
    { name: 'CRM Solution', url: '/crm-solution' },
    { name: 'App Development', url: '/app-development' },
    { name: 'Website Development', url: '/website-development' },
    { name: 'E-Commerce Development', url: '/ecommerce-development' },
    { name: 'Digital Marketing', url: '/digital-marketing' },
    { name: 'Branding', url: '/branding' },
    { name: 'SEO Service', url: '/seo-service' },
    { name: 'E-Commerce SEO', url: '/ecommerce-seo' },
    { name: 'Local SEO', url: '/local-seo' },
    { name: 'Social Media Marketing', url: '/social-media-marketing' },
    { name: 'Quora Marketing', url: '/quora-marketing' },
    { name: 'Technical SEO', url: '/technical-seo' },
    { name: 'Video SEO', url: '/video-seo' },
    // { name: 'Search Engine Optimization', url: '/search-engine-optimization-in-dubai' },
    // { name: 'Social Media Marketing', url: '/social-media-marketing-in-dubai' },
    // { name: 'Website Design And Development', url: '/website-design-and-development-in-dubai' },
    // { name: 'Pay Per Click', url: '/pay-per-click-in-dubai' },
  ],

  technology: [
    { name: 'Laravel Development', url: '/laravel-development' },
    { name: 'PHP Development', url: '/php-development' },
    { name: 'Wordpress Development', url: '/wordpress-development' },
    { name: 'React JS Development', url: '/react-js-development' },
    { name: 'Node JS Development', url: '/nodejs-development' },
    { name: 'Vue JS Development', url: '/vue-js-development' },
    // { name: 'Next JS Development', url: '' },
    // { name: 'Shopify Development', url: '' },
  ],

  portfolio: [
    { name: 'Web Portfolio', url: '/web-portfolio' },
    { name: 'UI Portfolio', url: '/ui-portfolio' },
    // { name: 'Seo Portfolio', url: '/seo-portfolio' },
    { name: 'Graphic Portfolio', url: '/graphics-portfolio' },
    { name: 'Video Portfolio', url: '/video-portfolio' },
    // { name: 'Company Portfolio', url: '/company-portfolio.pdf' },
  ],
}


//Footer
export const services = [
  {city: 'Dubai', services: [
      {name: 'Search Engine Optimization (SEO)', url: '/search-engine-optimization-in-dubai'},
      {name: 'Social Media Marketing (SMM)', url: '/social-media-marketing-in-dubai'},
      {name: 'Pay Per Click (PPC)', url: '/pay-per-click-in-dubai'},
      {name: 'Website Design And Development', url: '/website-design-and-development-in-dubai'},
      {name: 'Wordpress Development', url: '/wordpress-development-in-dubai'},
      {name: 'Laravel Developer', url: '/laravel-developer-in-dubai'},
      {name: 'React Developer', url: '/react-developer-in-dubai'},
  ]},
  {city: 'Sharjah', services: [
      {name: 'Wordpress Development', url: '/wordpress-development-in-sharjah'},
      {name: 'Laravel Developer', url: '/laravel-developer-in-sharjah'},
      {name: 'React Developer', url: '/react-developer-in-sharjah'},
  ]},
  {city: 'Abu Dhabi', services: [
      {name: 'Social Media Marketing (SMM)', url: '/social-media-marketing-in-abu-dhabi'},
      {name: 'Website Design And Development', url: '/website-design-and-development-in-abu-dhabi'},
      {name: 'Wordpress Development', url: '/wordpress-development-in-abu-dhabi'},
      {name: 'Laravel Developer', url: '/laravel-developer-in-abu-dhabi'},
  ]},
]

export const column2Links = [
  { name: 'Home', url: '/' },
  // { name: 'About Us', url: '/about' },
  { name: 'Contact Us', url: '/contact' },
  { name: 'Blog', url: '/blogs' }
];

export const column3Links = [
  // { name: 'Our Team', url: '/team' },
  { name: 'Our Services', url: '/our-services' },
  { name: 'Our Technology', url: '/our-technology' },
  { name: 'Our Clients', url: '/our-clients' },
];

export const technology = [
  { name: 'Laravel Development', url: '/laravel-development' },
  { name: 'PHP Development', url: '/php-development' },
  { name: 'Wordpress Development', url: '/wordpress-development' },
  { name: 'React JS Development', url: '/react-js-development' },
  { name: 'Node JS Development', url: '/nodejs-development' },
  // {name: 'PHP Development', url: ''},
  // {name: 'Shopify Development', url: ''},
]




//SideBar Menu
import { RiBloggerLine } from "react-icons/ri";
import { MdOutlineInsertPageBreak } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";
import { GoHome } from "react-icons/go";
import { CgWorkAlt } from "react-icons/cg";
import { TbSmartHome } from "react-icons/tb";

export const sidebarItems = [
    { name: 'Blogs', icon: RiBloggerLine, subItems: ['Blog', 'Comments', 'Author', 'Blog Meta'] },
    { name: 'Pages', icon: MdOutlineInsertPageBreak, subItems: ['Pages', 'FAQ', 'Testimonials', 'Meta-Tags', 'Clients', 'Banners', 'Contacts', 'Teams', 'Subscribers', 'Careers', 'Services', 'Points'] },
    { name: 'Portfolio', icon: CgWorkAlt, subItems: ['Web Portfolio', 'UI Portfolio', 'Video Portfolio', 'SEO Portfolio', 'Graphics Portfolio', 'Websites'] },
    { name: 'Home', icon: TbSmartHome, subItems: ['Hero', 'Technology', 'Achievements', 'Services', 'Work', 'Portfolio', 'Contact'] },
    { name: 'Users', icon: RiUserSettingsLine, subItems: [] },
];




// //Admin SideMenu ComponentMap
// import BlogMeta from "@/app/admin/blocks/blogs/BlogMeta";
// import Author from "@/app/admin/blocks/Author";
// import Blog from "@/app/admin/blocks/blogs/Blog";
// import AddUpdateBlog from "@/app/admin/blocks/blogs/AddUpdateBlog";
// import CommentPage from "@/app/admin/blocks/blogs/Comments";
// import Users from "@/app/admin/blocks/Users";
// import Pages from "@/app/admin/blocks/pages/Pages";
// import AddUpdatePage from "@/app/admin/blocks/pages/AddUpdatePage";
// import FaqPage from "@/app/admin/blocks/pages/FAQ";
// import TestimonialsPage from "@/app/admin/blocks/pages/Testimonials";
// import MetaTagsPage from "@/app/admin/blocks/pages/MetaTags";
// import Clients from "@/app/admin/blocks/pages/Clients";
// import Banners from "@/app/admin/blocks/pages/Banners";
// import Contacts from "@/app/admin/blocks/pages/Contacts";
// import Teams from "@/app/admin/blocks/pages/Teams";
// import Subscribers from "@/app/admin/blocks/pages/Subscribers";
// import Careers from "@/app/admin/blocks/pages/Careers";
// import Services from "@/app/admin/blocks/home/Services";
// import Technology from "@/app/admin/blocks/home/Technology";
// import Websites from "@/app/admin/blocks/pages/Websites";
// import WebPortfolio from "@/app/admin/blocks/pages/WebPortfolio";
// import UiPortfolio from "@/app/admin/blocks/pages/UiPortfolio";
// import RolesPermissions from "@/app/admin/blocks/RolesPermissions";
// import Medias from "@/app/admin/blocks/Media";
// import Achievements from "@/app/admin/blocks/home/Achievements";
// import Portfolio from "@/app/admin/blocks/home/Portfolio";
// import Work from "@/app/admin/blocks/home/Work";
// import Points from "@/app/admin/blocks/pages/Points";



// export const componentsMap = {
//   'blogmeta': {'title': 'BlogMeta', 'component': BlogMeta},
//   'author': {'title': 'Author', 'component': Author},
//   'blog': {'title': 'Blog', 'component': Blog},
//   'add-blog': {'title': 'Add Blog', 'component': AddUpdateBlog},
//   'comments': {'title': 'Comments', 'component': CommentPage},
//   'users': {'title': 'Users', 'component': Users},
//   'pages': {'title': 'Pages', 'component': Pages},
//   'add-page': {'title': 'Add Page', 'component': AddUpdatePage},
//   'faq': {'title': 'FAQ', 'component': FaqPage},
//   'testimonials': {'title': 'Testimonials', 'component': TestimonialsPage},
//   'meta-tags': {'title': 'Meta Tags', 'component': MetaTagsPage},
//   'clients': {'title': 'Clients', 'component': Clients},
//   'banners': {'title': 'Banners', 'component': Banners},
//   'contacts': {'title': 'Contacts', 'component': Contacts},
//   'teams': {'title': 'Teams', 'component': Teams},
//   'subscribers': {'title': 'Subscribers', 'component': Subscribers},
//   'careers': {'title': 'Careers', 'component': Careers},
//   'websites': {'title': 'Websites', 'component': Websites},
//   'web-portfolio': {'title': 'Web Portfolio', 'component': WebPortfolio},
//   'ui-portfolio': {'title': 'UI Portfolio', 'component': UiPortfolio},
//   'roles-and-permissions': {'title': 'Manage Roles', 'component': RolesPermissions},
//   'media': {'title': 'Media', 'component': Medias},
//   'points': {'title': 'Points', 'component': Points},
//   'hero': {'title': 'Hero', 'component': Technology},
//   'technology': {'title': 'Technology', 'component': Technology},
//   'achievements': {'title': 'Achievements', 'component': Achievements},
//   'services': {'title': 'Services', 'component': Services},
//   'work': {'title': 'Work', 'component': Work},
//   'portfolio': {'title': 'Portfolio', 'component': Portfolio},
//   'contact': {'title': 'Contact', 'component': Work},
// };
