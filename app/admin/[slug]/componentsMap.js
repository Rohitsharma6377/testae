
//Admin SideMenu ComponentMap
import BlogMeta from "@/app/admin/blocks/blogs/BlogMeta";
import Author from "@/app/admin/blocks/Author";
import Blog from "@/app/admin/blocks/blogs/Blog";
import AddUpdateBlog from "@/app/admin/blocks/blogs/AddUpdateBlog";
import CommentPage from "@/app/admin/blocks/blogs/Comments";
import Users from "@/app/admin/blocks/Users";
import Pages from "@/app/admin/blocks/pages/Pages";
import AddUpdatePage from "@/app/admin/blocks/pages/AddUpdatePage";
import FaqPage from "@/app/admin/blocks/pages/FAQ";
import TestimonialsPage from "@/app/admin/blocks/pages/Testimonials";
import MetaTagsPage from "@/app/admin/blocks/pages/MetaTags";
import Clients from "@/app/admin/blocks/pages/Clients";
import Banners from "@/app/admin/blocks/pages/Banners";
import Contacts from "@/app/admin/blocks/pages/Contacts";
import Teams from "@/app/admin/blocks/pages/Teams";
import Subscribers from "@/app/admin/blocks/pages/Subscribers";
import Careers from "@/app/admin/blocks/pages/Careers";
import Services from "@/app/admin/blocks/home/Services";
import Technology from "@/app/admin/blocks/home/Technology";
import Websites from "@/app/admin/blocks/pages/Websites";
import WebPortfolio from "@/app/admin/blocks/pages/WebPortfolio";
import UiPortfolio from "@/app/admin/blocks/pages/UiPortfolio";
import VideoPortfolio from "@/app/admin/blocks/pages/VideoPortfolio";
import GraphicsPortfolio from "@/app/admin/blocks/pages/GraphicsPortfolio";
import RolesPermissions from "@/app/admin/blocks/RolesPermissions";
import Medias from "@/app/admin/blocks/Media";
import Achievements from "@/app/admin/blocks/home/Achievements";
import Portfolio from "@/app/admin/blocks/home/Portfolio";
import Work from "@/app/admin/blocks/home/Work";
import Contact from "@/app/admin/blocks/home/Contact";
import Hero from "@/app/admin/blocks/home/Hero";
import Points from "@/app/admin/blocks/pages/Points";


export const componentsMap = {
  'blogmeta': {'title': 'BlogMeta', 'component': BlogMeta},
  'author': {'title': 'Author', 'component': Author},
  'blog': {'title': 'Blog', 'component': Blog},
  'add-blog': {'title': 'Add Blog', 'component': AddUpdateBlog},
  'comments': {'title': 'Comments', 'component': CommentPage},
  'users': {'title': 'Users', 'component': Users},
  'pages': {'title': 'Pages', 'component': Pages},
  'add-page': {'title': 'Add Page', 'component': AddUpdatePage},
  'faq': {'title': 'FAQ', 'component': FaqPage},
  'testimonials': {'title': 'Testimonials', 'component': TestimonialsPage},
  'meta-tags': {'title': 'Meta Tags', 'component': MetaTagsPage},
  'clients': {'title': 'Clients', 'component': Clients},
  'banners': {'title': 'Banners', 'component': Banners},
  'contacts': {'title': 'Contacts', 'component': Contacts},
  'teams': {'title': 'Teams', 'component': Teams},
  'subscribers': {'title': 'Subscribers', 'component': Subscribers},
  'careers': {'title': 'Careers', 'component': Careers},
  'websites': {'title': 'Websites', 'component': Websites},
  'web-portfolio': {'title': 'Web Portfolio', 'component': WebPortfolio},
  'ui-portfolio': {'title': 'UI Portfolio', 'component': UiPortfolio},
  'video-portfolio': {'title': 'Video Portfolio', 'component': VideoPortfolio},
  'graphics-portfolio': {'title': 'Graphics Portfolio', 'component': GraphicsPortfolio},
  'roles-and-permissions': {'title': 'Manage Roles', 'component': RolesPermissions},
  'media': {'title': 'Media', 'component': Medias},
  'points': {'title': 'Points', 'component': Points},
  'hero': {'title': 'Hero', 'component': Technology},
  'technology': {'title': 'Technology', 'component': Technology},
  'achievements': {'title': 'Achievements', 'component': Achievements},
  'services': {'title': 'Services', 'component': Services},
  'work': {'title': 'Work', 'component': Work},
  'contact': {'title': 'Contact', 'component': Contact},
  'hero': {'title': 'Hero', 'component': Hero},
  'portfolio': {'title': 'Portfolio', 'component': Portfolio},
  'contact': {'title': 'Contact', 'component': Contact},
};

export default componentsMap;
