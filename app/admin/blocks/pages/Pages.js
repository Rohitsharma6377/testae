
"use client"

import Link from 'next/link';
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import threeDots from '@/assets/action.svg'

import { toast } from 'react-toastify';
import { metaFlag } from '@/utils/helper';

import ToggleBtn from '@/components/blocks/ToggleBtn';
import MyContext from '@/context/MyContext';


export default function Pages() {

    const { searchTerm, setSearchTerm } = useContext(MyContext);
    
    const { push } = useRouter();
    const [pages, setPages] = useState([]);
    
    // const handleToggleStatus = async (page) => {
    //     const newStatus = page.status === 1 ? 0 : 1;
    //     // const updatedPage = { ...page, status: newStatus };
        
    //     try {
    //         await axios.put('/api/page/change-status', { id: page.id, status: newStatus });
    //         setPages(pages.map(c => c.id === page.id ? { ...c, status: newStatus } : c));

    //         toast.success("Status Updated!");
    //     } catch (error) {
    //         console.error('Failed to toggle status', error);
    //     }
    // };
    
    function DataTable({head, dataArray}) {
        const filteredSearchData = searchTerm ? dataArray.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())) : dataArray;

        const [openIndex, setOpenIndex] = useState(false);

        const handleActionBtns = (index) => {
            setOpenIndex(openIndex === index ? null : index);
        }

        return (
            <table className="w-full table-auto">
                <thead>
                    <tr className="bg-gray-200 text-nowrap text-gray-600 uppercase text-sm leading-normal">
                        {head.map(function(val, index){
                            return (
                                <th key={index} className="py-3 px-6 text-left">{val}</th>
                            )
                        })}
                    </tr>
                </thead>
    
                <tbody className="text-gray-600 text-sm font-light [&>*:nth-child(even)]:bg-gray-200">
                    {filteredSearchData.map((data, index) => (
                        <tr key={index} className={`border-b border-gray-200`}>
                            <td className="py-3 px-6 text-left">
                                {index + 1}
                            </td>
                            <td className="py-3 px-6 text-left">
                                Page: {data.name} <br/> URL: {data.url}
                            </td>
                            <td className={`${metaFlag(data.meta_title, data.meta_description) && 'text-red-600'} py-3 px-6 text-left`}>
                                Title: {data.meta_title} <br/> Desc: {data.meta_description}
                            </td>
                            <td className="py-3 px-6 text-center">
                                {data.faqs_count === 0 ? "" : data.faqs_count}
                            </td>
                            <td className="py-3 px-6 text-center">
                                {data.testimonials_count === 0 ? "" : data.testimonials_count}
                            </td>
                            <td className="py-3 px-6 text-left">
                                Sitemap: {data.sitemap} <br/> Schema: {data.schema} <br/> Status: {`${data.status === 1 ? 'Show' : 'Hide'}`}
                            </td>
                            <td className="py-3 px-6 text-center">
                                <ToggleBtn key={index} table={'pages'} status={data.status} id={data.id} />
                                {/* <button onClick={() => handleToggleStatus(data)} className={`${data.status === 1 ? 'bg-green-500' : 'bg-gray-500'} text-white font-bold py-2 px-4 rounded mr-2`}>
                                    {data.status === 1 ? 'Hide' : 'Show'}
                                </button> */}
                            </td>
                            <td className="py-3 px-6 text-left relative" onMouseEnter={() => handleActionBtns(index)} onMouseLeave={() => handleActionBtns(null)}>
                                <Image src={threeDots} width={20} height={20} alt="Action Menu" className={`mx-auto ${openIndex === index && 'hidden'}`} />
                                <div className={`action-buttons flex flex-col py-2 px-0 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 absolute z-10 top-0 right-0 ${openIndex !== index && 'hidden'}`}>
                                    <button onClick={() => push(`/admin/update-page/${data.id}`)} className="block text-left w-full px-4 py-2 text-sm text-black hover:bg-gray-100">
                                        Edit
                                    </button>
                                    <button onClick={() => push(`/admin/update-faq/${data.model}/${data.id}`)} className="block text-left w-full px-4 py-2 text-sm text-black hover:bg-gray-100">
                                        Edit FAQ
                                    </button>
                                    <button  onClick={() => push(`/admin/update-testimonial/${data.model}/${data.id}`)} className="block text-left w-full px-4 py-2 text-sm text-black hover:bg-gray-100 text-nowrap">
                                        Edit Testimonial
                                    </button>
                                    <button  onClick={() => push(`/admin/update-point/${data.model}/${data.id}`)} className="block text-left w-full px-4 py-2 text-sm text-black hover:bg-gray-100 text-nowrap">
                                        Edit Point
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }
    
    useEffect(() => {
        setSearchTerm('');

        const fetchData = async () => {
            try {
                const response = await axios.get('/api/page/get-page');
                setPages(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    
    return (
        <div className="container mx-auto py-5 px-8">
            <button onClick={() => push('/admin/add-page')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
                Add Page
            </button>
            <DataTable head={['#', 'Name|URL', 'Meta', `FAQ's`, 'Testimonials', 'SSS', 'Status', 'Action']} dataArray={pages} />
        </div>
    );
}