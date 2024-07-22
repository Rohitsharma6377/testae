
import { useState } from "react";

export default function Accordion({ data, pageData }) {
    const filteredData = data.filter(faq => faq.status === 1);
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="px-10 md:px-20 lg:px-32 mt-20 accordion-group w-full mx-auto">
        <h2 className="text-2xl text-center font-bold mb-2">{pageData.faq_title ? pageData.faq_title : `FAQ's`}</h2>
        <hr className="border-t-2 w-12 mx-auto border-gray-400 mb-8" />

        {pageData.faq_description && (
          <div className="text-center mb-8" dangerouslySetInnerHTML={{ __html : pageData.faq_description }}></div>
        )}

        <div className="border rounded-2xl border-solid border-gray-200 overflow-hidden">
        {filteredData?.map((faq, index) => (
            <div key={index} onClick={() => toggleAccordion(index)} className={`accordion h-fit p-6 border-b border-solid border-gray-200 ${activeIndex === index ? 'bg-[#F4EBD0]' : 'bg-gray-50'} transition-all duration-500`}>
                    
                <div className={`flex justify-between`}>
                    <h5 className={`${activeIndex === index && 'font-semibold'}`}>{faq.question}</h5>
                    <svg
                        className={`text-gray-900 transition duration-500 group-hover:text-indigo-600 ${activeIndex === index ? 'rotate-180 text-indigo-600' : ''}`}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M6 15L10.5858 10.4142C11.2525 9.74755 11.5858 9.41421 12 9.41421C12.4142 9.41421 12.7475 9.74755 13.4142 10.4142L18 15"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
                
                {activeIndex === index &&
                <div id={`basic-collapse-${index}`} className={`accordion-content w-full max-h-screen px-0 overflow-hidden transition-[height] duration-300 pr-4 mt-3`} aria-labelledby={`basic-heading-${index}`}>
                    <div className="text-base text-gray-600 font-normal leading-6" dangerouslySetInnerHTML={{ __html: faq.answer }}></div>
                </div>}
            </div>
        ))}
        </div>
      </div>
    );
}