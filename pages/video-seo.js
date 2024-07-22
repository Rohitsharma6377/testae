
import Image from "next/image";
import { baseUrl, fetchPageData } from '@/utils/helper';
import ServicePageLayout from '@/components/blocks/ServicePageLayout';
import Block7 from "@/components/blocks/Block7";
import Block8 from "@/components/blocks/Block8";
import Block3 from "@/components/blocks/Block3";


const ServicesPage = ({ banners, pages, points, testimonials, faqs }) => {
  return (
    <>
      <ServicePageLayout pages={pages} banners={banners} testimonials={testimonials} faqs={faqs} lookingForText={''}>

        <section className="text-center px-10 md:px-32 py-20">
          <div className="mx-auto">

            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {points[0][0].para}
            </h1>
            {/* <hr className="border-t-2 w-24 mx-auto border-red-600 mb-6" /> */}
            <div className="text-gray-600 mx-auto" dangerouslySetInnerHTML={{ __html: points[0][0].text }}>
            </div>
          </div>
        </section>

        <section className="bg-[#F4EBD0] px-10 md:px-32 py-20">
            <div className="mx-auto">
                <div className="text-center mb-10">
                    <h2 className="font-semibold text-gray-800 text-3xl">{points[1][0].para}</h2>
                    <div className="mx-auto mt-4 text-gray-600" dangerouslySetInnerHTML={{ __html: points[1][0].text }}></div>
                </div>

                <Block3 data={points[2]} />

                {/* <div className="mt-12 w-full grid grid-cols-1 lg:grid-cols-2 text-left mx-auto gap-10">
                    {points[2].map((item, index) => (
                        <div key={index} className="bg-white rounded-lg p-8 border border-gray-300 overflow-hidden">
                        <Image loader={() => item.media_path} src={`${baseUrl}/${item.media_path}`} width={250} height={250} alt={item.media_alt} className="w-20 mb-8 max-lg:mx-auto"/>
                        <div className="text-xl text-center lg:text-left mb-2 font-bold">{item.para}</div>
                        <div className='text-gray-600 text-center lg:text-left' dangerouslySetInnerHTML={{__html: item.text}}></div>
                        </div>
                    ))}
                </div> */}
            </div>
        </section>

        <section className="text-center px-10 md:px-32 py-20">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-black mb-4">
                {points[3][0].para}
            </h1>
            {/* <hr className="border-t-2 w-64 mx-auto border-gray-400 mb-4" /> */}
            <div className="text-gray-600 mx-auto leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: points[3][0].text }}>
            </div>
            <button className="bg-[#00203f] hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg mb-4">
                Connect Now
            </button>
          </div>

          <Block8 data={points[4]} />

          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
                {points[4].map((item, index) => (
                <div key={index} className="flex gap-4 text-left items-stretch">
                <div className="border bg-[#F4EBD0] overflow-hidden rounded-xl p-6 flex flex-col justify-between h-full">
                    <Image 
                    loader={() => item.media_path} 
                    src={`${baseUrl}/${item.media_path}`} 
                    width={250} 
                    height={250} 
                    alt={item.media_alt} 
                    className="w-12 h-12 mb-4" 
                    />
                    <h3 className="font-semibold text-xl">{item.para}</h3>
                    <div className="mt-1 text-gray-600 flex-grow" dangerouslySetInnerHTML={{ __html: item.text }}>
                    </div>
                </div>
                </div>
                ))}
            </div> */}
        </section>

      </ServicePageLayout>
    </>
  );
};

export default ServicesPage;


export async function getServerSideProps(context) {
  const { req } = await context;
  const currentPageUrl = `${req.url}`;

  const data = await fetchPageData(currentPageUrl);

  return { props: { ...data } };
}