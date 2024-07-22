
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaRegFileAlt } from "react-icons/fa";
import design from "@/assets/design.png";
import { baseUrl } from "@/utils/helper";
import Block4 from "@/components/blocks/Block4";
import Block5 from "../blocks/Block5";


export default function Portfolio({ data }) {
    const { push } = useRouter();
    data = data.filter(service => parseInt(service.status) === 1);

    return (
        <section className="pt-20 pb-20 text-center bg-[#f4ebd0]">
            <div className="px-10 md:px-20 lg:px-32">
                <h1 className="text-2xl font-bold text-black mb-2">
                    Portfolio
                </h1>
                <hr className="border-t-2 w-20 mx-auto border-gray-300 mb-4" />
                <p className="text-black mx-auto leading-relaxed mb-4">
                    Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
                <button onClick={() => push('/web-portfolio')} className="bg-[#00203f] hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg mb-8">
                    See All
                </button>

                {/* <Block5 data={data} /> */}

                <div className="">
                    <div className="xl:container m-auto text-gray-500">
                        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4'>
                            {data.map((item, index) => (
                                <div key={index} className="group transition-all duration-700 ease-in-out hover:translate-y-3 relative p-8 border border-gray-300 hover:bg-indigo-700 rounded-xl bg-white">
                                    <Image loader={() => `${baseUrl}/${item.media_path}`} src={`${baseUrl}/${item.media_path}`} alt={item.media_alt} width={512} height={512} className="mx-auto mb-4 w-20" />

                                    <div className="space-y-2">
                                        <h5 className="text-lg text-[#00203f] font-semibold text-center transition-all duration-700 ease-in-out group-hover:text-white">{item.name}</h5>
                                        <p className="text-sm text-justify text-gray-600 transition-all duration-700 ease-in-out group-hover:text-white">{ item.description }</p>
                                    </div>

                                    {/* {showReadMore && (
                                        <a href="#" className="flex items-center justify-between group-hover:text-primary">
                                        <span className="text-sm text-[#00203f]">Read more</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                                            <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd" stroke="#00203f" strokeWidth={''} />
                                        </svg>
                                        </a>
                                    )} */}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
