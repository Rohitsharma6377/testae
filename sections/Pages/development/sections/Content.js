import Image from "next/image";
import design from "@/assets/design.png";
import code from "@/assets/code.png";
import host from "@/assets/host.png";

export default function ContentSection() {
  return (
    <section className="text-center px-6 md:px-20 lg:px-32 py-10 md:py-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Social Media Marketing (SMM) in Dubai
        </h1>
        {/* <hr className="border-t-2 w-24 mx-auto border-red-600 mb-6" /> */}
        <p className="text-gray-600 mx-auto leading-relaxed mb-12">
          Welcome to Dubai's digital realm, where the buildings are not the only giants. In the Social Media Marketing (SMM) world, Dubai is always a land of hope. Let us walk with you in this changing city’s paths online; every click holds business horizons waiting to happen. This guide will show you how to do it right on social media marketing in Dubai.
        </p>
        <h3 className="text-3xl font-semibold text-gray-800 mb-4">
          Digital Dubai
        </h3>
        <p className="text-gray-600 mx-auto leading-relaxed mb-12">
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

        <h3 className="text-3xl font-semibold text-gray-800 mb-4">
          Design Your Winning SMM Strategy
        </h3>
        <p className="text-gray-600 mx-auto leading-relaxed max-w-3xl mb-8">
          Social media marketing strategy is a must-have for business success in the ever-changing world of social media. We'd like to now consider the essential steps.
        </p>

        <div className="mt-16 mb-10 px-6 lg:px-20">
          <div className="flex flex-col md:flex-row items-center mb-12">
            <div className="md:w-1/3 mb-6 md:mb-0">
              <Image src={design} alt="smm" width={250} className="mx-auto" />
            </div>
            <div className="md:w-2/3 md:pl-10">
              <h3 className="font-bold text-2xl text-gray-800 mb-4">Aligning Objectives with Business Goals</h3>
              <p className="text-gray-600 mb-6">The objectives of your SMM should match seamlessly with your general business goals. No social media campaign should be undertaken without it being a part of the bigger picture of your company’s growth strategy, whether it is about enhancing brand recognition, generating web traffic or boosting sales.</p>
              <button className="font-bold bg-red-600 text-white rounded-lg py-3 px-6 hover:bg-red-700 transition duration-200">Know More</button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center mb-12">
            <div className="md:w-2/3 md:pr-10 order-2 md:order-1">
              <h3 className="font-bold text-2xl text-gray-800 mb-4">Creating Target Audience Personas</h3>
              <p className="text-gray-600 mb-6">Knowing who your target audience is is crucial. For instance, make sure you find out all about prospective customers’ details such as their age brackets, preferences, problems and behaviours online so that you can deliver content that speaks to them at the right time.</p>
              <button className="font-bold bg-red-600 text-white rounded-lg py-3 px-6 hover:bg-red-700 transition duration-200">Know More</button>
            </div>
            <div className="md:w-1/3 mb-6 md:mb-0 order-1 md:order-2">
              <Image src={code} alt="smm" width={250} className="mx-auto" />
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 mb-6 md:mb-0">
              <Image src={host} alt="smm" width={250} className="mx-auto" />
            </div>
            <div className="md:w-2/3 md:pl-10">
              <h3 className="font-bold text-2xl text-gray-800 mb-4">Picking the Right Platforms</h3>
              <p className="text-gray-600 mb-6">All social networks are not created equally. Spend some time identifying where these individuals hang out most frequently and focus on those platforms in particular instead of wasting energy on others. Choosing Facebook over Instagram or vice versa might help you reach more people thus increasing overall engagement rates.</p>
              <button className="font-bold bg-red-600 text-white rounded-lg py-3 px-6 hover:bg-red-700 transition duration-200">Know More</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
