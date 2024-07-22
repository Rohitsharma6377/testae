
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Nav from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import Offices from '@/components/sections/Offices';
import LookingForSection from '@/components/sections/LookingFor';
import { baseUrl } from '@/utils/helper';


const PortfolioItem = ({ name, iframe }) => {
    return (
      <div className="overflow-hidden border border-gray-300 flex flex-col rounded-xl">
        <iframe 
          src={'https://video.fixc5-1.fna.fbcdn.net/v/t42.1790-2/28816736_135925053901731_287271778105950208_n.mp4?_nc_cat=103&ccb=1-7&_nc_sid=55d0d3&efg=eyJybHIiOjMwMCwicmxhIjo1MTIsInZlbmNvZGVfdGFnIjoic3ZlX3NkIiwidmlkZW9faWQiOjY2MzI1MTk3MDUxMjAwMH0%3D&_nc_ohc=8MrJzubIpwIQ7kNvgEE2cCD&rl=300&vabr=159&_nc_ht=video.fixc5-1.fna&edm=AGo2L-IEAAAA&oh=00_AYD59x4L51lIb4D-T5xoCw8IxhsPkDDmXrIqmF7jBTiW8A&oe=667F2EAB'}
          className='min-h-52'
          allowFullScreen
        ></iframe>
        <h3 className="text-center font-semibold py-3">{name}</h3>
      </div>
    );
};



const PortfolioSection = ({ data }) => {
  data = data.filter(item => parseInt(item.status) === 1);

console.log(data);

  return (
    <div className="mt-32">
      <Head>
        <title>{'Video Portfolio | AmitKK'}</title>
        <meta name="description" content={''} />
      </Head>

      <Nav />

      <div className="px-4 md:px-32 mt-14 mb-10">
        <h1 className="text-3xl font-bold text-center text-black mb-2">Video Portfolio</h1>
        <hr className="border-t-2 w-20 mx-auto border-gray-200 mb-8" />

        <div className='grid grid-cols-3 gap-x-10 gap-y-14'>
        {data.map((item, index) => (
          <PortfolioItem key={index} {...item} />
        ))}
        </div>
      </div>

      <LookingForSection text={'Looking for Website Developer?'} />
      <Offices />
      <Footer />
    </div>
  );
};


export default PortfolioSection;


export async function getServerSideProps() {
  const res = await fetch(`${baseUrl}/api/pages/video-portfolio`);
  const data = await res.json();

  return { props: { data }}
}