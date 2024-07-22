import { Inter } from "next/font/google";
import "./globals.css";
import { MyContextProvider } from "@/context/MyContext";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Empowering Businesses with Innovative Digital Solutions",
  description: "Discover bespoke digital solutions at AmitKK. From web development to SEO services, we empower businesses with cutting-edge strategies for online success.",

  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
          {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-LGKQM3G7X6"></script>
          <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)}
            gtag('js', new Date());

            gtag('config', 'G-LGKQM3G7X6');
          </script>
          
          <meta name="google-site-verification" content="FELfso2g9xC9Wy_vCQKHKg-rrmsO9qxf5g5NDLq9L7c" /> */}
      </head>
      <body className={inter.className}>
        <MyContextProvider>
          {children}
        </MyContextProvider>
      </body>
    </html>
  );
}