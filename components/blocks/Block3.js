import { baseUrl } from "@/utils/helper";
import Image from "next/image";

export default function Block3({ data }) {
  return (
    <div className="mx-auto">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 text-left justify-center">
        {data.map((item, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-2xl p-8 transition-all duration-500 hover:-translate-y-3 hover:bg-indigo-600"
          >
            <div className="bg-indigo-100 rounded-full flex justify-center items-center mb-5 w-14 h-14">
              {/* Uncomment the below line if you want to use the image */}
              <Image loader={() => item.media_path} src={`${baseUrl}/${item.media_path}`} width={30} height={30} alt={item.media_alt} className="" />

              {/* <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24.7222 11.6667V7.22225C24.7222 5.99495 23.7273 5 22.5 5H4.72222C3.49492 5 2.5 5.99492 2.5 7.22222V22.7778C2.5 24.0051 3.49492 25 4.72222 25H22.5C23.7273 25 24.7222 24.005 24.7222 22.7777V17.7778M20.8333 17.7778H25.2778C26.5051 17.7778 27.5 16.7829 27.5 15.5556V13.8889C27.5 12.6616 26.5051 11.6667 25.2778 11.6667H20.8333C19.606 11.6667 18.6111 12.6616 18.6111 13.8889V15.5556C18.6111 16.7829 19.606 17.7778 20.8333 17.7778Z"
                  stroke="#4F46E5"
                  strokeWidth="2"
                ></path>
              </svg> */}
            </div>
            <h4 className="text-left text-xl font-semibold text-gray-900 mb-3 capitalize transition-all duration-500 group-hover:text-white">
              {item.para}
            </h4>
            <div
              className="text-justify text-sm font-normal text-gray-500 transition-all duration-500 leading-5 group-hover:text-white"
              dangerouslySetInnerHTML={{ __html: item.text }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}
