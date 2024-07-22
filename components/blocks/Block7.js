
export default function Block7 ({ data }) {
    return (
        <div className="mx-auto">
            {/* <div className="mb-14 text-center">
                <span
                    className="py-1 px-4 bg-indigo-100 rounded-full text-xs font-medium text-indigo-600 text-center">Features</span>
                <h2 className="text-4xl text-center font-bold text-gray-900 py-5">
                    Revolutionary Features
                </h2>
                <p className="text-lg font-normal text-gray-500 max-w-md md:max-w-2xl mx-auto">
                    Provides advanced features like time tracking, integrating with
                    third party apps (calendar / Google drive), creating subtasks.
                </p>
            </div> */}
            <div className="flex justify-center gap-x-5 gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8">
                {data.map((item, index) => (
                    <div key={index} className="relative p-5 w-full text-center max-md:max-w-sm max-md:mx-auto group md:w-2/5 lg:w-1/4">
                        <div className="bg-indigo-50 rounded-lg flex justify-center items-center mb-5 w-20 h-20 mx-auto cursor-pointer transition-all duration-500 group-hover:bg-indigo-600">
                            <svg className="stroke-indigo-600 transition-all duration-500 group-hover:stroke-white" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M10 27.5L15 25M15 25V21.25M15 25L20 27.5M8.75 14.375L12.5998 11.0064C13.1943 10.4862 14.1163 10.6411 14.5083 11.327L15.4917 13.048C15.8837 13.7339 16.8057 13.8888 17.4002 13.3686L21.25 10M2.5 2.5H27.5M26.25 2.5V13.25C26.25 17.0212 26.25 18.9069 25.0784 20.0784C23.9069 21.25 22.0212 21.25 18.25 21.25H11.75C7.97876 21.25 6.09315 21.25 4.92157 20.0784C3.75 18.9069 3.75 17.0212 3.75 13.25V2.5"
                                    stroke="" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </div>
                        <h4 className="text-xl font-semibold text-gray-800 mb-3 capitalize">{item.para}</h4>
                        <div className="text-justify text-sm font-normal text-gray-600" dangerouslySetInnerHTML={{ __html: item.text }}></div>
                    </div>
                ))}
            </div>
        </div>
    )
}