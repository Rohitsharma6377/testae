
import Image from "next/image";
import { baseUrl, fetchPageData } from '@/utils/helper';
import ServicePageLayout from '@/components/blocks/ServicePageLayout';
import Block6 from "@/components/blocks/Block6";
import Block2 from "@/components/blocks/Block2";


const ServicesPage = ({ banners, pages, points, testimonials, faqs }) => {
  return (
    <>
      <ServicePageLayout pages={pages} banners={banners} testimonials={testimonials} faqs={faqs} lookingForText={''}>

        <section className="text-center px-10 md:px-32 py-20">
          <div className="mx-auto mb-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {points[0][0].para}
            </h1>
            <div className="text-gray-600 mx-auto" dangerouslySetInnerHTML={{ __html: points[0][0].text }}>
            </div>
          </div>

          {/* <div className="mx-auto mt-16">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {points[1][0].para}
            </h1>
            <div className="text-gray-600 mx-auto" dangerouslySetInnerHTML={{ __html: points[1][0].text }}>
            </div>
          </div> */}

          <Block6 data={points[1][0]} />
        </section>

        <section className="bg-[#F4EBD0] px-10 md:px-32 py-20">
            <div className="mx-auto">
                <div className="text-center mb-10">
                    <h2 className="font-semibold text-gray-800 text-3xl">Why go for AMITKK?</h2>
                    {/* <div className="mx-auto mt-2 text-gray-600" dangerouslySetInnerHTML={{ __html: points[2][0].text }}></div> */}
                </div>

                <Block2 data={points[2]} />

                {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
                    {points[2].map((item, index) => (
                    <div key={index} className="flex gap-4 text-left items-stretch">
                    <div className="border bg-white overflow-hidden rounded-xl p-6 flex flex-col justify-between h-full">
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
            </div>
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