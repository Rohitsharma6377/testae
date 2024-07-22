
import Image from "next/image";
import main from "@/assets/blog/main.jpg";
import Nav from '@/components/sections/Navbar';
import Footer from "@/components/sections/Footer";
import Offices from '@/components/sections/Offices';
import LookingForSection from '@/components/sections/LookingFor';

import Head from 'next/head';
import { useRouter } from "next/router";


import {
    TwitterIcon,
    EmailIcon,
    FacebookIcon,
    WhatsappIcon,
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    EmailShareButton
  } from "react-share";
import { baseUrl } from "@/utils/helper";




export default function BlogPage({ blogs }) {

    const router = useRouter();
    const shareUrl = `https://localhost:3000${router.asPath}`
    

    return (
        <div>
            <Head>
                <title>{blogs[0].title}</title>
                <meta name="description" content={blogs[0].description} />
            </Head>

            <Nav />
            <div className="mt-20">
                <div className="bg-[#B980FF] px-10 xl:px-64 md:px-32 h-72 grid grid-cols-3 justify-between text-center items-center">
                    <h1 className="text-4xl mx-auto font-bold font-sans text-black opacity-80 col-span-2 text-left">Introduction to CTR (Click-Through Rate)</h1>
                    <Image src={main} alt="" className="col-span-1 mx-auto w-64" width={700} height={700}/>
                </div>

                <div className="px-10 xl:px-64 md:px-32 mt-12 mb-14 flex items-start gap-10">
                    <div className="text-xl leading-8 font-sans" dangerouslySetInnerHTML={{__html:blogs[0].content}}></div>

                    <div className="max-lg:hidden">
                        <h5 className="mb-2">Share</h5>
                        <div className="flex gap-2 items-center">
                        <TwitterShareButton url={shareUrl} >
                            <TwitterIcon size={32} round={true} />
                        </TwitterShareButton>

                        <FacebookShareButton url={shareUrl} >
                            <FacebookIcon size={32} round={true} />
                        </FacebookShareButton>

                        <WhatsappShareButton url={shareUrl} >
                            <WhatsappIcon size={32} round={true} />
                        </WhatsappShareButton>

                        <EmailShareButton url={shareUrl} >
                            <EmailIcon size={32} round={true} />
                        </EmailShareButton>
                        </div>
                    </div>
                </div>

                <div className="px-10 xl:px-64 md:px-32 flex mb-20 gap-2 items-center">
                    <h5>Share</h5>
                    {/* <TwitterIcon size={32} round={true} /> */}
                    <TwitterShareButton url={shareUrl} >
                        <TwitterIcon size={32} round={true} />
                    </TwitterShareButton>

                    <FacebookShareButton url={shareUrl} >
                        <FacebookIcon size={32} round={true} />
                    </FacebookShareButton>

                    <WhatsappShareButton url={shareUrl} >
                        <WhatsappIcon size={32} round={true} />
                    </WhatsappShareButton>

                    <EmailShareButton url={shareUrl} >
                        <EmailIcon size={32} round={true} />
                    </EmailShareButton>
                </div>

            </div>

            <LookingForSection text={'Hire us to work for you!'} />
            <Offices />
            <Footer />
        </div>
    )
}




export async function getServerSideProps() {

  // Fetch data from external API
  const response = await fetch(`${baseUrl}/api/blog/blogs`);
  const blogs = await response.json()
  
  // Pass data to the page via props
  return { props: { blogs } }
}