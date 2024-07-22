
import { baseUrl } from "@/utils/helper";
import Image from "next/image";

export default function Block6 ({ data }) {
    return (
    <div className="">
        <div className="xl:container m-auto">
          <div className="bg-[#F4EBD0] p-10 rounded-3xl space-y-6 lg:flex flex-row-reverse lg:gap-8 justify-center md:space-y-0 lg:items-center transition-all duration-700 ease-in-out hover:shadow-lg">
            <div className="md:5/12 lg:w-1/2 transition-all duration-700 ease-in-out">
                <Image 
                loader={() => data.media_path} 
                src={`${baseUrl}/${data.media_path}`} 
                width={400}
                height={400} 
                alt={data.media_alt} 
                className="md:mx-auto max-md:mb-10 rounded-3xl overflow-hidden transform hover:-translate-y-3 transition-all duration-700 ease-in-out" 
                />
            </div>
            <div className="md:7/12 lg:w-1/2 my-auto transition-all duration-700 ease-in-out hover:-translate-y-3">
              <h2 className="text-left text-3xl font-bold text-gray-800 transition-all duration-700 ease-in-out">
                {data.para ? data.para : 'Nuxt development is carried out by passionate developers'}
              </h2>
              <div className="text-justify mt-8 text-gray-600 transition-all duration-700 ease-in-out" dangerouslySetInnerHTML={{ __html: data.text ? data.text : 'Nobis minus voluptatibus pariatur dignissimos libero quaerat iure expedita at Asperiores nemo possimus nesciunt dicta veniam aspernatur quam mollitia.'}}>
              </div>
              {/* <div className="divide-y space-y-4 divide-gray-100 dark:divide-gray-800">
                <div className="mt-8 flex gap-4 md:items-center">
                  <div className="w-12 h-12 flex gap-4 rounded-full bg-indigo-100 dark:bg-indigo-900/20">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 m-auto text-indigo-500 dark:text-indigo-400">
                      <path fill-rule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z" clip-rule="evenodd" />
                    </svg>        
                  </div>
                  <div className="w-5/6">
                    <h4 className="font-semibold text-lg text-gray-700 dark:text-indigo-300">Chat Anytime</h4>
                    <p className="text-gray-500 dark:text-gray-400">Asperiores nemo possimus nesciunt quam mollitia.</p>
                  </div> 
                </div> 
                <div className="pt-4 flex gap-4 md:items-center">
                  <div className="w-12 h-12 flex gap-4 rounded-full bg-teal-100 dark:bg-teal-900/20">  
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 m-auto text-teal-600 dark:text-teal-400">
                      <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                    </svg>                                      
                  </div>
                  <div className="w-5/6">
                    <h4 className="font-semibold text-lg text-gray-700 dark:text-teal-300">Real Time Location</h4>
                    <p className="text-gray-500 dark:text-gray-400">Asperiores nemo possimus nesciunt quam mollitia.</p>
                  </div> 
                </div> 
              </div> */}
            </div>
          </div>
        </div>
      </div>
    )
}