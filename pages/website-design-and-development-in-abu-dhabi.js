
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

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {points[2].map((item, index) => (
            <div key={index} className="bg-white border rounded-lg p-6 duration-300">
              <Image loader={() => item.media_path} src={`${baseUrl}/${item.media_path}`} width={250} height={250} alt={item.media_alt} className="w-32 mx-auto mb-6" />
              <h3 className="text-xl mb-2 font-bold text-gray-800">{item.para}</h3>
              <div className="text-gray-600 " dangerouslySetInnerHTML={{ __html: item.text }} />
            </div>
          ))}
        </div>
      </section>

      {/* Facts */}
      <section className="text-center px-10 md:px-32 py-20">
        <h3 className="text-3xl font-semibold text-gray-800 mb-4">{points[3][0].para}</h3>
        {/* <hr className="border-t-2 w-64 mx-auto border-gray-400 mb-4" /> */}
        <div className="text-gray-600 mx-auto mb-4" dangerouslySetInnerHTML={{ __html: points[3][0].text }} />
        <button className="bg-[#00203f] hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg mb-10">Connect Now</button>

        {points[4].map((item, index) => (
          <div key={index} className="py-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 text-center lg:text-left justify-between gap-10 items-center">
              <div className={`my-auto max-lg:mx-auto ${index % 2 === 1 ? 'lg:ml-auto lg:order-2' : 'lg:mr-auto'}`}>
                <Image loader={() => item.media_path} src={`${baseUrl}/${item.media_path}`} width={250} height={250} alt={item.media_alt} className="" />
              </div>
              <div className="lg:col-span-2 mx-auto">
                <h3 className="font-bold text-xl text-gray-800 mb-4">{item.para}</h3>
                <div className="text-gray-600" dangerouslySetInnerHTML={{ __html: item.text }} />
                {/* <button className="font-bold bg-red-600 text-white rounded-lg py-3 px-6 hover:bg-red-700 transition duration-200">Know More</button> */}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Details */}
      <section className="text-center bg-[#F4EBD0] px-10 md:px-32 py-20">
        <h1 className="text-3xl font-bold text-black mb-2">{points[5][0].para}</h1>
        {/* <hr className="border-t-2 w-64 mx-auto border-gray-400 mb-4" /> */}
        <div className="text-gray-600 mx-auto mb-4" dangerouslySetInnerHTML={{ __html: points[5][0].text }} />
        <button className="bg-[#00203f] hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg mb-10">Connect Now</button>

        <div className="mt-12 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-left mx-auto gap-10">
          {points[6].map((item, index) => (
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