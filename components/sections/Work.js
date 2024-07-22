
import Image from "next/image";
import work from "@/assets/work.png";
import { useRouter } from "next/router";


export default function Work({ data }) {
    const { push } = useRouter();

    return (
      <section className="text-center pt-20 pb-20">
        <div className="px-10 md:px-20 lg:px-32">
            <h1 className="text-2xl font-bold text-black mb-2">
                Why Work With Us
            </h1>
            <hr className="border-t-2 w-28 mx-auto border-gray-300 mb-4" />
            <p className="text-black mx-auto leading-relaxed mb-8">
                Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
            <button onClick={() => push('/web-portfolio')} className="bg-[#00203f] hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg mb-8">
                Learn More
            </button>
            {/* Adding an image below the button */}
    
            <div className="max-xl:hidden relative mx-auto">
                <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-4 ml-20 flex flex-col justify-evenly">
                        <div className="text-left">
                            <h3 className="font-bold text-xl text-[#00203f]">{data[0].heading}</h3>
                            <p className="text-[12px]">{data[0].description}</p>
                        </div>
                        <div className="text-left">
                            <h3 className="font-bold text-xl text-[#00203f]">{data[1].heading}</h3>
                            <p className="text-[12px]">{data[1].description}</p>
                        </div>    
                    </div>

                    <div className="flex flex-col gap-10">
                        <div className="col-span-1 flex items-center justify-center">
                            <Image
                                src={work}
                                alt="work"
                                className="mx-auto w-3/5 h-auto" // Centers the image and ensures it's responsive
                            />
                        </div>
                        <div className="mx-auto text-center">
                            <h3 className="font-bold text-xl text-[#00203f]">{data[2].heading}</h3>
                            <p className="text-[12px]">{data[2].description}</p>
                        </div>
                    </div>

                    <div className="space-y-4 mr-20 flex flex-col justify-evenly">
                        <div className="text-left">
                            <h3 className="font-bold text-xl text-[#00203f]">{data[4].heading}</h3>
                            <p className="text-[12px]">{data[4].description}</p>
                        </div>
                        <div className="text-left">
                            <h3 className="font-bold text-xl text-[#00203f]">{data[3].heading}</h3>
                            <p className="text-[12px]">{data[3].description}</p>
                        </div>
                    </div>
                </div>

            </div>

            <div className="xl:hidden lg:px-40">
                <div className="grid grid-cols-1 gap-6 py-3">
                    <div className="bg-[#f4ebd0] p-4 rounded-lg text-left lg:text-center">
                        <h3 className="font-bold text-md mb-2 text-[#00203f]">{data[0].heading}</h3>
                        <p className=" text-sm text-gray-600">{data[0].description}</p>
                    </div>
                    <div className="bg-[#f4ebd0] p-4 rounded-lg text-left lg:text-center">
                        <h3 className="font-bold text-md mb-2 text-[#00203f]">{data[1].heading}</h3>
                        <p className=" text-sm text-gray-600">{data[1].description}</p>
                    </div>
                </div>

                <div className="col-span-1 flex items-center justify-center">
                    <Image
                        src={work}
                        alt="work"
                        className="mx-auto w-60 h-auto" // Centers the image and ensures it's responsive
                    />
                </div>

                <div className="grid grid-cols-1 gap-6 py-3">
                    <div className="bg-[#f4ebd0] p-4 rounded-lg text-left lg:text-center">
                        <h3 className="font-bold text-md mb-2">{data[2].heading}</h3>
                        <p className=" text-sm text-gray-600">{data[2].description}</p>
                    </div>
                    <div className="bg-[#f4ebd0] p-4 rounded-lg text-left lg:text-center">
                        <h3 className="font-bold text-md mb-2">{data[3].heading}</h3>
                        <p className=" text-sm text-gray-600">{data[3].description}</p>
                    </div>
                </div>
            </div>

        </div>

      </section>
    );
  }
  