
import Image from "next/image";
import design from "@/assets/design.png";
import code from "@/assets/code.png";
import host from "@/assets/host.png";
import tech from "@/assets/tech.png";


export default function WhyChooseUsSection() {

    const data = [
        {
          image: tech,
          heading: "Technology stack used.",
          desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
        },
        {
          image: tech,
          heading: "Digital Marketing service.",
          desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
        },
        {
          image: tech,
          heading: "Past Projects",
          desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
        },
        {
          image: tech,
          heading: "UI designer",
          desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
        }
    ];


    return (
      <section className="text-center px-6 md:px-20 lg:px-32 py-10 md:py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Social Media Marketing (SMM) in Dubai
          </h1>
          <hr className="border-t-2 w-24 mx-auto border-red-600 mb-6" />
          <p className="text-gray-600 mx-auto leading-relaxed max-w-2xl mb-12">
            Welcome to Dubai's digital realm, where the buildings are not the only giants. In the Social Media Marketing (SMM) world, Dubai is always a land of hope. Let us walk with you in this changing city’s paths online; every click holds business horizons waiting to happen. This guide will show you how to do it right on social media marketing in Dubai.
          </p>
          <h3 className="text-3xl font-semibold text-gray-800 mb-4">
            Digital Dubai
          </h3>
          <p className="text-gray-600 mx-auto leading-relaxed max-w-2xl mb-12">
            Dubai is very famous for the presence of the tallest buildings in the world, wealth and luxury. Let’s have a look at why Dubai’s digital space is enchanting:
          </p>

          <div className="mt-12 mb-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <Image src={design} className="w-20 mx-auto mb-6" />
              <h3 className="text-xl mb-2 font-bold text-gray-800">Demographics and Social Media</h3>
              <p className="text-gray-600">With social media being present every day, Dubai has a tech-savvy diverse population. Fashion sharing and experiences in Dubai are popular on platforms such as Instagram and Facebook.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <Image src={code} className="w-20 mx-auto mb-6" />
              <h3 className="text-xl mb-2 font-bold text-gray-800">Cultural Nuances</h3>
              <p className="text-gray-600">The traditional souks blended with modern malls illustrate Dubai’s cultural diversity. These subtleties are necessary to form connections with locals who know what they like.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <Image src={host} className="w-20 mx-auto mb-6" />
              <h3 className="text-xl mb-2 font-bold text-gray-800">Legal Framework</h3>
              <p className="text-gray-600">The digital space in Dubai has been shaped by strong legal structures ensuring cybersecurity and dignity considerations online. Citizen protection remains paramount even as directives encourage digital growth.</p>
            </div>
          </div>
        </div>
        
      </section>
    );
  }
  