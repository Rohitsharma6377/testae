import { baseUrl } from "@/utils/helper";
import Image from "next/image";

export default function Block2 ({ data }) {
    return (
        <div className="mx-auto text-left">
            {/* <div className="mb-14 text-center">
                <h2 className="text-4xl text-center font-bold text-gray-900 leading-[3.25rem] mb-6 max-w-max lg:max-w-3xl lg:mx-auto">Developed from scratch for seamless online functionality</h2>
                <p className="text-base font-normal text-gray-700 ease-in-out lg:max-w-2xl lg:mx-auto mb-8">Using technology to make finance simpler, smarter and more rewarding. </p>  
                <div className="flex flex-col justify-center md:flex-row gap-5 max-w-lg mx-auto md:max-w-2xl lg:max-w-full">   
                    <a href="javascript:;"  className="cursor-pointer bg-indigo-600 py-3 px-6 rounded-full flex items-center justify-center text-sm font-semibold text-white transition-all duration-700 ease-in-out focus:outline-none hover:bg-indigo-700">
                        Get started
                    </a>
                    <a href="javascript:;"  className="cursor-pointer bg-indigo-50 py-3 px-6 rounded-full flex items-center justify-center  text-sm font-semibold text-indigo-600 transition-all duration-700 ease-in-out focus:outline-none hover:bg-indigo-100">
                        Learn more
                    </a>
                </div>
            </div> */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {data.map((item, index) => (
                <div key={index} className={`col-span-1 group relative w-full rounded-2xl p-6 transition-all duration-700 ease-in-out hover:bg-indigo-600 ${index === 1 && 'bg-indigo-600 text-white'}`}>
                    <div className={`bg-indigo-700 glass ease-in-out rounded-xl flex justify-center items-center mb-5 w-14 h-14 ${index === 1 && 'bg-white'}`}>
                        <Image loader={() => item.media_path} src={`${baseUrl}/${item.media_path}`} width={40} height={40} alt={item.media_alt} className="" />

                        {/* <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path className={`${index === 1 ? 'stroke-white' : 'stroke-black'} group-hover:stroke-white transition-all duration-700 ease-in-out`} d="M24.7222 11.6667V7.22225C24.7222 5.99495 23.7273 5 22.5 5H4.72222C3.49492 5 2.5 5.99492 2.5 7.22222V22.7778C2.5 24.0051 3.49492 25 4.72222 25H22.5C23.7273 25 24.7222 24.005 24.7222 22.7777V17.7778M20.8333 17.7778H25.2778C26.5051 17.7778 27.5 16.7829 27.5 15.5556V13.8889C27.5 12.6616 26.5051 11.6667 25.2778 11.6667H20.8333C19.606 11.6667 18.6111 12.6616 18.6111 13.8889V15.5556C18.6111 16.7829 19.606 17.7778 20.8333 17.7778Z" stroke='#fff' stroke-width="2"></path>
                        </svg> */}
                    </div>
                    <h4 className={`text-left text-xl font-semibold text-gray-800 mb-3 capitalize transition-all duration-700 ease-in-out group-hover:text-white ${index === 1 && 'text-white group-hover:text-white'}`}>{item.para}</h4>
                    <div className={`text-justify text-base font-normal text-gray-700 ease-in-out transition-all duration-700 leading-5 group-hover:text-white ${index === 1 && 'text-white group-hover:text-white'}`} dangerouslySetInnerHTML={{ __html: item.text }}></div>
                </div>
                ))}
            </div>
        </div>
    )
}