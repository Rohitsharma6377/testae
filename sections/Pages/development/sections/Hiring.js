
import Image from "next/image";
import tech from "@/assets/tech.png";
import services from "@/assets/services.png";
import projects from "@/assets/projects.png";
import designer from "@/assets/designer.png";
import { image } from "@nextui-org/react";


export default function HiringSection({ data }) {

    const apiData = [
        {
          image: tech,
          heading: data.heading1,
          desc: data.text1
        },
        {
          image: services,
          heading: data.heading2,
          desc: data.text2
        },
        {
          image: projects,
          heading: data.heading3,
          desc: data.text3
        },
        {
          image: designer,
          heading: data.heading4,
          desc: data.text4
        }
      ];

    
    return (
      <section className="text-center bg-[#F4EBD0] px-32 py-20">
        <h1 className="text-2xl font-bold text-black mb-2">
          {data.heading}
        </h1>
        <hr className="border-t-2 w-64 mx-auto border-gray-400 mb-4" />
        <p className="text-black mx-auto leading-relaxed max-w-4xl mb-4">
          {data.subheading}
        </p>
        <button className="bg-[#00203f] hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg mb-10">
            Connect Now
        </button>
        {/* Adding an image below the button */}
        
        <div className="mt-12 container text-left px-72 mx-auto grid grid-cols-2 gap-10">
          {apiData.map((item, index) => (
              <div className="text-sm bg-white rounded-lg p-8 border-2 shadow-md overflow-hidden">
                  <Image src={item.image} className="w-20 mb-8"/>
                  <h3 className="text-2xl mb-2 font-bold">{item.heading}</h3>
                  <h5>{item.desc}</h5>
                  {/* <p className="font-bold text-gray-600">read more..</p> */}
              </div>
          ))}
        </div>
      </section>
    );
  }
  