
import Nav from '@/components/sections/Navbar';
import Footer from "@/components/sections/Footer";
import Image from "next/image";
import { useState } from "react";
import LookingForSection from '@/components/sections/LookingFor';
import Link from 'next/link';
import { baseUrl, fetchPageData } from '@/utils/helper';
import ServicePageLayout from '@/components/blocks/ServicePageLayout';


const Card = ({ imageSrc, altValue, link }) => {
    return (
        <Link href={link}>
            <div className="w-full flex flex-col gap-4 items-center justify-center rounded-md border h-44 overflow-hidden">
                <div className="relative">
                    <Image
                        loader={() => imageSrc}
                        src={imageSrc}
                        alt={altValue}
                        width={100}
                        height={100}
                        className="mx-auto w-24"
                    />
                </div>
                <div className="px-4 text-center">
                    <h5 className="text-md text-center text-gray-600 font-medium">{altValue}</h5>
                </div>
            </div>
        </Link>
    );
  };


export default function Technology({ banners, pages, points, testimonials, faqs, technologies }){
    const [searchTerm, setSearchTerm] = useState("");
    technologies = technologies.filter(technology => parseInt(technology.status) === 1);

    const filteredData = searchTerm ? technologies.filter(technology => 
        technology.name.toLowerCase().includes(searchTerm.toLowerCase())) : technologies;

    return (
        <div>
            <ServicePageLayout pages={pages} banners={banners} testimonials={testimonials} faqs={faqs} lookingForText={''}>
                <div className="px-10 md:px-20 mt-12 mb-20">
                    <div className="text-center pt-20 pb-14 px-6">
                        <h1 className="text-2xl font-bold text-black mb-2">
                            Our Technology
                        </h1>
                        <hr className="border-t-2 w-28 mx-auto border-gray-400 mb-4" />
                        <p className="text-md text-black mb-2">
                            We provide complete end to end digital solutions and all these are done by in house team. Delivered on time and cost, we ensure the deliverables are met earnestly.
                        </p>
                        <div className="mb-6 mt-6">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search Technology"
                                className="mt-4 px-4 py-2 w-full max-w-xl border border-gray-400 focus:outline-none rounded-md"
                            />
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-4">
                            {filteredData.map((item, index) => {
                                return (
                                    <Card key={index} imageSrc={item.media_path} altValue={item.name} link={item.url} />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </ServicePageLayout>
        </div>
    )

}


export async function getServerSideProps(context) {
    const { req } = context;
    const currentPageUrl = req.url;
    const data = await fetchPageData(currentPageUrl);
    
    const res = await fetch(`${baseUrl}/api/technology/get-technology`);
    const technologies = await res.json()

    return { props: { ...data, technologies } };
}
