
import Nav from '@/components/sections/Navbar';
import Footer from "@/components/sections/Footer";
import Image from "next/image";
import { useState } from "react";
import LookingForSection from '@/components/sections/LookingFor';
import { baseUrl, fetchPageData } from '@/utils/helper';
import ServicePageLayout from '@/components/blocks/ServicePageLayout';


const Card = ({ imageSrc, clientName }) => {
    return (
                <div className="group flex justify-center items-center border border-solid border-gray-200 shadow-sm h-24 rounded-2xl">
                    <Image
                        loader={() => imageSrc}
                        src={imageSrc}
                        alt={clientName}
                        width={100}
                        height={100}
                        className="mx-auto w-32 group-hover:scale-110 transition-all duration-700 ease-in-out"
                    />
                </div>
                                            
        // <div className="group w-full flex flex-col gap-4 items-center justify-center rounded-md border transition-all duration-700 ease-in-out p-5 overflow-hidden">
        //     <div className="relative">
                // <Image
                //     loader={() => imageSrc}
                //     src={imageSrc}
                //     alt={clientName}
                //     width={100}
                //     height={100}
                //     className="mx-auto w-32 group-hover:scale-110 transition-all duration-700 ease-in-out"
                // />
        //     </div>
        //     {/* <div className="px-4 text-center">
        //         <h5 className="text-md text-center text-gray-600 font-medium">{clientName}</h5>
        //     </div> */}
        // </div>
    );
};


export default function ClientsPage({ banners, pages, points, testimonials, faqs, clients }){
    const [searchTerm, setSearchTerm] = useState("");
    clients = clients.filter(client => parseInt(client.status) === 1 && client.media_id !== null);

    const filteredData = searchTerm ? clients.filter(client => client.brand.toLowerCase().includes(searchTerm.toLowerCase())) : clients;

    return (
        <div>
            <ServicePageLayout pages={pages} banners={banners} testimonials={testimonials} faqs={faqs} lookingForText={''}>
                <div className="px-10 md:px-20 mt-12 mb-20">
                    <div className="text-center pt-20 px-6">
                        <h1 className="text-2xl font-bold text-black mb-2">
                            Clients
                        </h1>
                        <hr className="border-t-2 w-16 mx-auto border-gray-400 mb-4" />
                    </div>

                    <div className="mb-14 mt-2 w-full text-center">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search Client"
                            className="mt-4 px-4 py-2 w-full max-w-xl border border-gray-400 focus:outline-none rounded-md"
                        />
                    </div>

                    <div className="w-full">
                        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                            {filteredData.map((item, index) => {
                                return (
                                    <Card key={index} imageSrc={item.image} clientName={item.name} />
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
  
    const res = await fetch(`${baseUrl}/api/client/get-client`);
    const clients = await res.json()

    return { props: { ...data, clients } };
}
