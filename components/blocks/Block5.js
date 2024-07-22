
import { baseUrl } from "@/utils/helper"
import Image from "next/image"

export default function Block5 ({ data }) {
    return (
        <div className="">
          <div className="xl:container mx-auto">
            <div className="grid gap-6 px-4 sm:px-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {data.map((item, index) => (
                <div key={index} className="group relative rounded-3xl  space-y-6 overflow-hidden">
                  <Image loader={() => item.media_path} src={`${baseUrl}/${item.media_path}`} width={250} height={250} alt={item.media_alt} className="mx-auto h-[26rem] w-full grayscale object-cover object-top ransition duration-500 group-hover:scale-105 group-hover:grayscale-0" loading="lazy" />
                  <div className="absolute bottom-0 inset-x-0 h-max mt-auto px-8 py-6 bg-gray-800 dark:bg-white translate-y-24 transition duration-300 ease-in-out group-hover:translate-y-0">
                    <div>
                      <h4 className="text-justify text-xl font-semibold dark:text-gray-700 text-white">Hentoni Doe</h4>
                      <span className="text-justify block text-sm text-gray-500">CEO-Founder</span>
                    </div>
                    <div className="text-justify mt-8 text-gray-300 dark:text-gray-600">{item.text}</div>
                  </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
}