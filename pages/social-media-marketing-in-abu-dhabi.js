
import Image from "next/image";
import { baseUrl, fetchPageData } from '@/utils/helper';
import ServicePageLayout from '@/components/blocks/ServicePageLayout';


const ServicesPage = ({ banners, pages, points, testimonials, faqs }) => (
  <>
    <ServicePageLayout pages={pages} banners={banners} testimonials={testimonials} faqs={faqs} lookingForText={''}>
      {/* Features Section */}
      <section className="text-center px-10 md:px-32 py-20">
        <div className="mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{points[0][0].para}</h1>
          <div className="text-gray-600 mx-auto" dangerouslySetInnerHTML={{ __html: points[0][0].text }} />
        </div>
      </section>

      {/* Features */}
      <section className="text-center bg-[#F4EBD0] px-10 md:px-32 py-20">
        <div className="mx-auto my-auto">
            <h3 className="text-3xl font-semibold text-gray-800 mb-4">{points[1][0].para}</h3>
            <div className="text-gray-600 mx-auto mb-10" dangerouslySetInnerHTML={{ __html: points[1][0].text }} />
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {points[2].map((item, index) => (
            <div key={index} className="bg-white border rounded-lg p-6 duration-300">
              <Image loader={() => item.media_path} src={`${baseUrl}/${item.media_path}`} width={250} height={250} alt={item.media_alt} className="w-32 mx-auto mb-6" />
              <h3 className="text-xl mb-2 font-bold text-gray-800">{item.para}</h3>
              <div className="text-gray-600 text-justify" dangerouslySetInnerHTML={{ __html: item.text }} />
            </div>
          ))}
        </div>
      </section>

      <section className="text-center px-10 md:px-32 py-20">
        <div className="mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{points[3][0].para}</h1>
          <div className="text-gray-600 mx-auto" dangerouslySetInnerHTML={{ __html: points[3][0].text }} />
        </div>
      </section>

      {/* Facts */}
      <section className="text-center px-10 md:px-32 pb-20">
        <div className="mx-auto my-auto">
            <h3 className="text-3xl font-semibold text-gray-800 mb-4">{points[4][0].para}</h3>
            <div className="text-gray-600 mx-auto mb-10" dangerouslySetInnerHTML={{ __html: points[4][0].text }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {points[5].map((item, index) => (
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
                <div className="mt-1 text-gray-600 flex-grow text-justify" dangerouslySetInnerHTML={{ __html: item.text }}>
                </div>
            </div>
            </div>
            ))}
        </div>
      </section>

      {/* Details */}


      <section className="text-center bg-[#F4EBD0] px-10 md:px-32 py-20">
        <div className="mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{points[6][0].para}</h1>
          <div className="text-gray-600 mx-auto" dangerouslySetInnerHTML={{ __html: points[6][0].text }} />
        </div>
      </section>

      <section className="text-center px-10 md:px-32 py-20">
        <div className="mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{points[7][0].para}</h1>
          <div className="text-gray-600 mx-auto" dangerouslySetInnerHTML={{ __html: points[7][0].text }} />
        </div>
      </section>
      
    </ServicePageLayout>
  </>
);

export default ServicesPage;

export async function getServerSideProps(context) {
  const { req } = context;
  const currentPageUrl = req.url;
  const data = await fetchPageData(currentPageUrl);

  return { props: { ...data } };
}