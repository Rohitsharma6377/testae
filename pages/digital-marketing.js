
import Image from "next/image";
import { baseUrl, fetchPageData } from '@/utils/helper';
import ServicePageLayout from '@/components/blocks/ServicePageLayout';
import Block6 from "@/components/blocks/Block6";
import Block1 from "@/components/blocks/Block1";


const ServicesPage = ({ banners, pages, points, testimonials, faqs }) => {
  return (
    <>
      <ServicePageLayout pages={pages} banners={banners} testimonials={testimonials} faqs={faqs} lookingForText={''}>

        <section className="text-center px-10 md:px-32 pt-20">
          <div className="mx-auto mb-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {points[0][0].para}
            </h1>
            <div className="text-gray-600 mx-auto" dangerouslySetInnerHTML={{ __html: points[0][0].text }}>
            </div>
          </div>

          <Block6 data={points[1][0]} />
        </section>

        {/* <section className="text-center bg-[#F4EBD0] px-10 md:px-32 py-20">
          <div className="mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {points[1][0].para}
            </h1>
            <div className="text-gray-600 mx-auto" dangerouslySetInnerHTML={{ __html: points[1][0].text }}>
            </div>
          </div>
        </section> */}

        <section className="text-center px-10 md:px-32 py-20">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-black mb-2">{points[2][0].para}</h1>
            {/* <hr className="border-t-2 w-64 mx-auto border-gray-400 mb-4" /> */}
            <div className="text-gray-600 mx-auto leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: points[2][0].text }}></div>
            <button className="bg-[#00203f] hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg">Connect Now</button>
          </div>
          
          <Block1 data={points[3]} />

          {/* <div className="mt-12 w-full grid grid-cols-1 lg:grid-cols-2 text-left mx-auto gap-10">
              {points[3].map((item, index) => (
                <div key={index} className="bg-[#F4EBD0] rounded-lg p-8 border border-gray-300 overflow-hidden">
                  <Image loader={() => item.media_path} src={`${baseUrl}/${item.media_path}`} width={250} height={250} alt={item.media_alt} className="w-20 mb-8 max-lg:mx-auto"/>
                  <div className="text-xl text-center lg:text-left mb-2 font-bold">{item.para}</div>
                  <div className='text-gray-600 text-center lg:text-left' dangerouslySetInnerHTML={{__html: item.text}}></div>
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