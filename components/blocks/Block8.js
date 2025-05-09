import Image from "next/image";

export default function Block8 ({ data }) {
    return (
        <div className="mx-auto text-left">
              <div className={`grid ${data.length === 5 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'} gap-8 max-w-lg mx-auto md:max-w-2xl lg:max-w-full`}>
                  <div className="relative w-full h-auto hover:-translate-y-3 transition-all duration-700 ease-in-out">
                      <div className="bg-gray-800 h-full w-full rounded-2xl flex justify-between flex-row flex-wrap">
                          <div className="p-5 xl:p-8">
                              <div className="block">
                                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M15 12.5V18.75M18.75 2.5L11.25 2.5M15 28.75C8.7868 28.75 3.75 23.7132 3.75 17.5C3.75 11.2868 8.7868 6.25 15 6.25C21.2132 6.25 26.25 11.2868 26.25 17.5C26.25 23.7132 21.2132 28.75 15 28.75Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                      </svg>                                    
                              </div>
                              <h3 className="text-lg font-bold xl:text-xl text-white py-5 w-full xl:w-64">
                                  Accomplish tasks swiftly with online tools.
                              </h3>
                              <p className="text-sm font-normal text-gray-300 w-full mb-8 xl:w-64">Get quoted and covered in under 10 minutes online. no paperwork or waiting any more </p>
                              {/* <button className="py-2 px-5 border border-solid text-nowrap border-gray-300 rounded-full gap-2 text-xs text-white font-semibold flex items-center justify-between transition-all duration-500 hover:bg-white/5">
                                  View More
                                  <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M1 9L3.58579 6.41421C4.25245 5.74755 4.58579 5.41421 4.58579 5C4.58579 4.58579 4.25245 4.25245 3.58579 3.58579L1 1" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
                                      </svg>
                                      
                              </button> */}
                          </div>
                          {/* <div className="relative hidden h-auto md:w-1/2 md:block">
                              <Image src="https://pagedone.io/asset/uploads/1695028873.png" width={200} height={200} alt="Header tailwind Section" className="h-full ml-auto" />
                          </div> */}
                      </div>
                  </div>
                  {data.map((item, index) => (
                    <div key={index} className="relative w-full h-auto hover:-translate-y-3 transition-all duration-700 ease-in-out">
                        <div className="bg-indigo-500 rounded-2xl p-5  xl:p-8 h-full">
                            <div className="block">
                                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24.6429 11.4286C24.6429 14.3872 20.2457 16.7857 14.8214 16.7857C9.3972 16.7857 5 14.3872 5 11.4286M24.6429 16.7857C24.6429 19.7444 20.2457 22.1429 14.8214 22.1429C9.3972 22.1429 5 19.7444 5 16.7857M24.6429 22.1429C24.6429 25.1015 20.2457 27.5 14.8214 27.5C9.3972 27.5 5 25.1015 5 22.1429M24.6429 6.96429C24.6429 9.42984 20.2457 11.4286 14.8214 11.4286C9.3972 11.4286 5 9.42984 5 6.96429C5 4.49873 9.3972 2.5 14.8214 2.5C20.2457 2.5 24.6429 4.49873 24.6429 6.96429Z" stroke="white" stroke-width="2" stroke-linecap="round"></path>
                                    </svg>                                
                            </div>
                            <h3 className="text-left py-5 text-white text-lg font-bold xl:text-xl">{item.para}</h3>
                            <div className="text-justify text-sm font-normal text-white mb-8" dangerouslySetInnerHTML={{ __html: item.text }}></div>
                            {/* <button className="py-2 px-5 border border-solid border-gray-300 rounded-full gap-2 text-xs text-white font-semibold flex items-center justify-between transition-all duration-500 hover:bg-white/5">
                                View More
                                <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 9L3.58579 6.41421C4.25245 5.74755 4.58579 5.41421 4.58579 5C4.58579 4.58579 4.25245 4.25245 3.58579 3.58579L1 1" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                    
                            </button> */}
                        </div>
                    </div>
                  ))}
              </div>
        </div>
    )
}