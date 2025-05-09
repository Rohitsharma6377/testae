
import "@/app/globals.css";
import { Inter } from "next/font/google";
// import { metadata } from 'next';

import Nav from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { MyContextProvider } from '@/context/MyContext';

const inter = Inter({
  subsets: ['latin'],
  styles: ['normal', 'italic'],
  weights: [400, 700]
});


// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
//   viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
// }

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* <Nav /> */}
      <MyContextProvider>
        {/* <Router> */}
        <Component {...pageProps} />
        {/* </Router> */}
        <ToastContainer />
      </MyContextProvider>
      {/* <Footer /> */}
    </>
  );
}

export default MyApp;