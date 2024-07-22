
import Image from "next/image";
import design from "@/assets/design.png";
import code from "@/assets/code.png";
import host from "@/assets/host.png";


export default function ServicesSection({ data }) {
    return (
      <section className="text-center px-32 py-20">
        <h1 className="text-2xl font-bold text-black mb-2">
            {data.heading}
        </h1>
        <hr className="border-t-2 w-64 mx-auto border-gray-400 mb-4" />
        <p className="text-black mx-auto leading-relaxed max-w-4xl mb-8">
            {data.subheading}
        </p>
        {/* Adding an image below the button */}
        
        <div className="mt-12 container text-center mx-auto grid grid-cols-3 gap-10">

            <div className="text-sm bg-white rounded-lg p-8 border-2 shadow-md overflow-hidden">
              <Image src={design} className="w-32 mb-8 mx-auto"/>
              <h3 className="text-2xl mb-2 font-bold">{data.heading1}</h3>
              <h5>{data.text1}</h5>
              <p className="font-bold">read more..</p>
            </div>
            <div className="text-sm bg-white rounded-lg p-8 border-2 shadow-md overflow-hidden">
              <Image src={code} className="w-32 mb-8 mx-auto"/>
              <h3 className="text-2xl mb-2 font-bold">{data.heading2}</h3>
              <h5>{data.text2}</h5>
              <p className="font-bold">read more..</p>
            </div>
            <div className="text-sm bg-white rounded-lg p-8 border-2 shadow-md overflow-hidden">
              <Image src={host} className="w-32 mb-8 mx-auto"/>
              <h3 className="text-2xl mb-2 font-bold">{data.heading3}</h3>
              <h5>{data.text3}</h5>
              <p className="font-bold">read more..</p>
            </div>
        </div>
      </section>
    );
  }
  