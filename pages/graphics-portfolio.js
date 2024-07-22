
import Nav from '@/components/sections/Navbar';
import Footer from "@/components/sections/Footer";
import Image from "next/image";
import { useState } from 'react';
import LookingForSection from '@/components/sections/LookingFor';
import { baseUrl } from '@/utils/helper';


const Card = ({ imageSrc, text }) => {
    const [mouseOn, setMouseOn] = useState(false);
    return (
        <div onMouseEnter={() => setMouseOn(true)} onMouseLeave={() => setMouseOn(false)} className="relative bg-black">
            <Image
                loader={() => imageSrc}
                src={imageSrc}
                alt={`graphic ${text}`}
                width={100}
                height={200}
                className={`mx-auto h-full w-full ${mouseOn ? 'opacity-30' : ''}`}
            />

            <h2 className={`text-white w-full text-center p-6 font-semibold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${mouseOn ? '' : 'hidden'}`}>{text}</h2>
        </div>
    );
};


export default function PortfolioPage({ data }){
    data = data.filter(portfolio => parseInt(portfolio.status) === 1);

    return (
        <div>
            <Nav />

            <div className="px-10 md:px-20 mt-12 mb-20">
                <div className="text-center pt-20 px-6">
                    <h1 className="text-3xl font-bold text-black mb-2">
                        Graphics Portfolio
                    </h1>
                    <hr className="border-t-2 w-16 mx-auto border-gray-400 mb-4" />
                </div>

                <div className="mt-20 w-full">
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1">
                        {data.map((item, index) => {
                            return (
                                <Card key={index} imageSrc={item.image} text={item.text} />
                            )
                        })}
                    </div>
                </div>
            </div>

            <LookingForSection />
            <Footer />
        </div>
    )
}


export async function getServerSideProps() {
    const res = await fetch(`${baseUrl}/api/graphics-portfolio/get-graphics-portfolio`);
    const data = await res.json()
    
    return { props: { data } }
}