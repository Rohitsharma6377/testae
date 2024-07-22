
import Image from "next/image";
import { baseUrl, fetchPageData } from '@/utils/helper';
import ServicePageLayout from '@/components/blocks/ServicePageLayout';


const ServicesPage = ({ banners, pages, points, testimonials, faqs }) => (
  <>
    <ServicePageLayout pages={pages} banners={banners} testimonials={testimonials} faqs={faqs} lookingForText={''}>
      {/* Features Section */}
      <section className="text-center bg-[#F4EBD0] px-10 md:px-32 py-20">
        <div className="mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{points[0][0].para}</h1>
          <div className="text-gray-600 mx-auto" dangerouslySetInnerHTML={{ __html: points[0][0].text }} />
        </div>
      </section>

      {/* Features */}
      <section className="text-center bg-white px-10 md:px-32 py-20">
        <div className="mx-auto my-auto">
            <h3 className="text-3xl font-semibold text-gray-800 mb-4">{points[1][0].para}</h3>
            <div className="text-gray-600 mx-auto mb-10" dangerouslySetInnerHTML={{ __html: points[1][0].text }} />
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {points[2].map((item, index) => (
            <div key={index} className="bg-[#F4EBD0] border border-gray-300 rounded-lg p-6 duration-300">
              <Image loader={() => item.media_path} src={`${baseUrl}/${item.media_path}`} width={250} height={250} alt={item.media_alt} className="w-32 mx-auto mb-6" />
              <h3 className="text-xl mb-2 font-bold text-gray-800">{item.para}</h3>
              <div className="text-gray-600 " dangerouslySetInnerHTML={{ __html: item.text }} />
            </div>
          ))}
        </div>
      </section>

      {/* Details */}
      <section className="text-center bg-[#F4EBD0] px-10 md:px-32 py-20">
        <h1 className="text-3xl font-bold text-black mb-2">{points[3][0].para}</h1>
        {/* <hr className="border-t-2 w-64 mx-auto border-gray-400 mb-4" /> */}
        <div className="text-gray-600 mx-auto mb-4" dangerouslySetInnerHTML={{ __html: points[3][0].text }} />
        <button className="bg-[#00203f] hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg mb-10">Connect Now</button>

        <div className="mt-12 w-full grid grid-cols-1 md:grid-cols-2 text-left mx-auto gap-10">
          {points[4].map((item, index) => (
            <div key={index} className="bg-white rounded-lg p-8 border overflow-hidden">
              <Image loader={() => item.media_path} src={`${baseUrl}/${item.media_path}`} width={250} height={250} alt={item.media_alt} className="w-20 mb-8" />
              <h3 className="text-xl mb-2 font-bold">{item.para}</h3>
              <div className="text-gray-600" dangerouslySetInnerHTML={{ __html: item.text }} />
            </div>
          ))}
        </div>
      </section>

      <section className="text-center px-10 md:px-32 py-20">
        <div className="mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{points[5][0].para}</h1>
          <div className="text-gray-600 mx-auto" dangerouslySetInnerHTML={{ __html: points[5][0].text }} />
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