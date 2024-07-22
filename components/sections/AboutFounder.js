
import pic from "@/assets/pic.png";
import Image from "next/image";

const data = {
    heading: "AMIT KUMAR KHARE",
    description1: "Amit has worked in various sectors and the journey so far has been no less than a roller coaster ride. He has worked with Indian Air Force for 8 years, Thomas Cook India Ltd for 3 years, Started a TV channel and co founded a digital marketing agency - YoCreativ before building AmitKK.",
    description2: "An avid coder, graphics designer and marketing expert, Amit has a solid indepth knowledge of the digital domain. He personally takes care of the web design and development service part of AmitKK."
}


export default function AboutFounder() {

    return (
        <div className="flex flex-col lg:flex-row px-10 m:px-20 lg:px-32 py-20 bg-white">
            <div className="mb-6 lg:mb-0 mx-auto">
                <Image
                    src={pic}
                    alt="Descriptive Alt Text"
                    className="w-56 mx-auto rounded-full object-cover"
                />
            </div>
            <div className="text-center max-w-4xl mx-auto">
                <h2 className="text-2xl text-gray-700 font-bold mb-1">{data.heading}</h2>
                <hr className="border-t-2 mx-auto w-64 border-gray-200 mb-4" />
                <p className="text-[16px] leading-6">{data.description1}</p>
                <p className="text-[16px] leading-6 mt-6">{data.description2}</p>
            </div>
        </div>
    )
}