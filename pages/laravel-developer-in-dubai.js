
import Image from "next/image";
import { fetchPageData } from '@/utils/helper';
import ServicePageLayout from '@/components/blocks/ServicePageLayout';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const ServicesPage = ({ banners, pages, points, testimonials, faqs }) => (
  <>
    <ServicePageLayout pages={pages} banners={banners} testimonials={testimonials} faqs={faqs} lookingForText={''}>

      {/* Features Section */}
      <section className="text-center px-10 md:px-32 py-20">
        <div className="mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {points[0][0].para}
          </h1>
          <div className="text-gray-600  pb-6 mx-auto leading-relaxed mb-12" dangerouslySetInnerHTML={{ __html: points[0][0].text }} />
          
          <div className="mx-auto my-auto">
            <h3 className="text-3xl font-semibold text-gray-800 mb-4">
              {points[1][0].para}
            </h3>
            <div className="text-gray-600  mx-auto leading-relaxed" dangerouslySetInnerHTML={{ __html: points[1][0].text }} />
          </div>

          <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-10">
            {points[2].map((item, index) => (
              <div key={index} className="bg-white border rounded-lg p-6  hover:shadow-lg transition-shadow duration-300">
                <Image 
                  loader={() => item.media_path}
                  src={`${baseUrl}/${item.media_path}`} 
                  width={250} 
                  height={250} 
                  alt={item.media_alt} 
                  className="w-32 mx-auto mb-6" 
                />
                <h3 className="text-2xl mb-2 font-bold text-gray-800">{item.para}</h3>
                <div className="text-gray-600 text-justify" dangerouslySetInnerHTML={{ __html: item.text }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="text-center bg-[#F4EBD0] px-10 md:px-32 py-20">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {points[3][0].para}
        </h1>
        {/* <hr className="border-t-2 w-64 mx-auto border-gray-400 mb-4" /> */}
        <div className="text-gray-600  mx-auto leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: points[3][0].text }} />
        <button className="bg-[#00203f] hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg mb-10">
          Connect Now
        </button>
        
        <div className="mt-12 w-full grid grid-cols-1 lg:grid-cols-2 text-left mx-auto gap-10">
          {points[4].map((item, index) => (
            <div key={index} className="bg-white rounded-lg p-8 border overflow-hidden">
              <Image 
                loader={() => item.media_path}
                src={`${baseUrl}/${item.media_path}`} 
                width={250} 
                height={250} 
                alt={item.media_alt} 
                className="w-20 mb-8 max-lg:mx-auto" 
              />
              <h3 className="text-2xl text-gray-800 mb-2 font-bold text-center lg:text-left">{item.para}</h3>
              <div className="text-gray-600 text-justify" dangerouslySetInnerHTML={{ __html: item.text }} />
            </div>
          ))}
        </div>
      </section>

      {/* Facts Section */}
      <section className="px-10 md:px-32 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 text-center lg:text-left justify-between gap-10 items-center">
          <div className="my-auto max-lg:mx-auto lg:mr-auto">
            <Image 
              loader={() => points[5][0].media_path}
              src={`${baseUrl}/${points[5][0].media_path}`} 
              width={250} 
              height={250} 
              alt={points[5][0].media_alt} 
            />
          </div>

          <div className="lg:col-span-2 mx-auto">
            <h3 className="font-bold text-3xl text-gray-800 mb-4">{points[5][0].para}</h3>
            <div className="text-gray-600 text-justify mb-6" dangerouslySetInnerHTML={{ __html: points[5][0].text }} />
            <button className="font-bold bg-red-600 text-white rounded-lg py-3 px-6 hover:bg-red-700 transition duration-200">
              Know More
            </button>
          </div>
        </div>

        <h3 className="text-xl mt-20 font-bold text-center text-gray-800">The following reasons make us your best choice when it comes to exploring the benefits of Laravel development:</h3>

        <div className="mt-12 text-center grid grid-cols-1 lg:grid-cols-2 gap-10">
          {points[6].map((item, index) => (
            <div key={index} className="bg-white border rounded-lg p-6  hover:shadow-lg transition-shadow duration-300">
              <Image 
                loader={() => item.media_path}
                src={`${baseUrl}/${item.media_path}`} 
                width={250} 
                height={250} 
                alt={item.media_alt} 
                className="w-32 mx-auto mb-6" 
              />
              <h3 className="text-2xl mb-2 font-bold text-gray-800">{item.para}</h3>
              <div className="text-gray-600 text-justify" dangerouslySetInnerHTML={{ __html: item.text }} />
            </div>
          ))}
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
