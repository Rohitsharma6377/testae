//component comment.js

"use client"

import axios from 'axios';
import Link from 'next/link';
import React, { useState, useEffect, useContext } from 'react';
import { AiOutlineClose } from "react-icons/ai";

// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// import dynamic from "next/dynamic";
// const Editor = dynamic(() => import('@/components/blocks/CKEditor'), { ssr: false });


import { toast } from 'react-toastify';
import ToggleBtn from '@/components/blocks/ToggleBtn'
import { formatDate } from '@/utils/helper';
import MyContext from '@/context/MyContext';
import Pagination from '@/components/blocks/Pagination';


export default function FaqPage({ modelData }) {

    const { searchTerm, setSearchTerm, itemsPerPage, setItemsPerPage } = useContext(MyContext);

    const [faqs, setFaqs] = useState([]);
    const [formData, setFormData] = useState({});
    const [showForm, setShowForm] = useState(false);

    //fetch page data
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchPageData = async (page) => {
        try {
            let response;

            if(!modelData) {
                response = await axios.get('/api/faq/get-faq', { params: { page, itemsPerPage: itemsPerPage ? itemsPerPage : 10 } });
            } else {
                response = await axios.post('/api/faq/get-faq', { page, itemsPerPage: itemsPerPage ? itemsPerPage : 10, modelData });
            }
            setFaqs(response.data.faqs);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        fetchPageData(newPage);
    };

    useEffect(() => {
        setSearchTerm('');
        fetchPageData(currentPage);
    }, [currentPage, itemsPerPage]);


    function DataTable({head, dataArray}) {
        const filteredSearchData = searchTerm ? dataArray.filter(item => item.page_name.toLowerCase().includes(searchTerm.toLowerCase()) || item.question.toLowerCase().includes(searchTerm.toLowerCase())) : dataArray;

        const handleEdit = (index) => {
            const selectedEntry = faqs[index];
            
            setFormData({
                id: selectedEntry.id,
                model: selectedEntry.model,
                model_id: selectedEntry.model_id,
                page_url: selectedEntry.page_url,
                status: selectedEntry.status,
                display_order: selectedEntry.display_order,
                question: selectedEntry.question,
                answer: selectedEntry.answer,
                created_at: selectedEntry.created_at
            });
            setShowForm(true);
        };


        return (
            <div>
                <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-200 text-nowrap text-gray-600 uppercase text-sm leading-normal">
                                {
                                    head.map((value, index) => (
                                        <th key={index} className="py-3 px-6 text-left">{value}</th>
                                    ))
                                }
                            </tr>
                        </thead>

                        <tbody className="text-gray-600 text-sm font-light [&>*:nth-child(even)]:bg-gray-200">
                            {filteredSearchData.map((data, index) => (
                                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left">
                                        {(currentPage-1)*10 + index + 1}
                                    </td>
                                    {!modelData &&
                                    <td className="py-3 px-6 text-left">
                                        <Link href={data.page_url}>{data.page_name}</Link>
                                    </td>}
                                    <td className="py-3 px-6 text-left">
                                        {data.question}
                                    </td>
                                    {!modelData &&
                                    <td className="py-3 px-6 text-left text-nowrap">
                                        {formatDate(data.created_at)}
                                    </td>}
                                    <td className="py-3 px-6 text-left">
                                        <ToggleBtn key={index} table={'faqs'} status={data.status} id={data.id} />
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <button onClick={() => handleEdit(index)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="mt-4 flex justify-center">
                        <Pagination total={totalPages} initialPage={currentPage} onChange={handlePageChange} />
                    </div>
                </div>
        )
    }



    const openForm = () => {
        setShowForm(true);
        setFormData({
            status: 1
        });
    };

    const closeForm = () => {
        setShowForm(false);
        setFormData({});
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    const handleFormSubmit = async (postData, method) => {
        try {
            const apiUrl = method === 'post' ? '/api/faq/add-faq' : '/api/faq/update-faq';
            const response = await axios[method](apiUrl, postData);
            
            if (formData.id) {
                setFaqs(faq => {
                    const updatedData = [...faq];
                    const index = updatedData.findIndex(faq => faq.id === formData.id);
                    updatedData[index] = response.data.data;
                    return updatedData;
                });
            } else {
                setFaqs(faq => [...faq, response.data.data]);
            }
            
            setFormData({});
            setShowForm(false);

            toast.success("Submitted!");
            
        } catch (error) {
            toast.error("Try Again.");
            console.error('Failed to update data', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let postData = {};
        
        if (formData.id) {
            postData = {
                id: formData.id,
                model: formData.model,
                model_id: formData.model_id,
                page_url: formData.page_url,
                status: formData.status,
                display_order: formData.display_order,
                question: formData.question,
                answer: formData.answer,
                created_at: formData.created_at
            };
        } 
        
        else {
            postData = {
                model: modelData.model,
                model_id: modelData.model_id,
                // page_url: formData.page_url,
                status: formData.status,
                display_order: formData.display_order ? formData.display_order : null,
                question: formData.question,
                answer: formData.answer,
                // created_at: formData.created_at
            };
        }

        handleFormSubmit(postData, formData.id ? 'put' : 'post');
        setShowForm(false);
    };
    
    
    const handleEditorChange = (identifier) => (data) => {
        setFormData((prev) => ({
            ...prev,
            [identifier]: data,
        }));
    };
      
    return (
        <div className="container mx-auto py-5 px-8">
            {modelData &&
            <button onClick={openForm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
                Add FAQ
            </button>}

            {showForm && (
                <div className={`fixed py-8 right-0 top-0 h-full w-1/3 bg-white shadow-lg z-50 overflow-y-auto`}>
                <div className="flex justify-between items-center px-8 mb-4">
                  <h2 className="text-lg font-bold">{formData.id ? 'Edit' : 'Add'} FAQ</h2>
                  <AiOutlineClose onClick={closeForm} className="text-gray-600 hover:text-gray-800" />
                </div>
          
                <form onSubmit={handleSubmit} className="p-8">

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                            Status*
                        </label>
                        <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                        >
                            <option value="">Select Status</option>
                            <option value="1">Show</option>
                            <option value="0">Hide</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="display_order">
                            Display Order
                        </label>
                        <input
                            className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="display_order"
                            name="display_order"
                            type="text"
                            value={formData.display_order}
                            onChange={handleChange}
                            placeholder='Display Order'
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor='question'>Question*</label>
                        <input
                            className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id='question'
                            name='question'
                            type="text"
                            value={formData.question}
                            onChange={handleChange}
                            placeholder='Question'
                        />
                        <div className="mt-4 mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor='answer'>Answer*</label>
                            {/* <Editor value={formData.answer} onChange={handleEditorChange("answer")} /> */}
                        </div>
                    </div>

                    <button type="submit" className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                        {formData.id ? 'Update' : 'Submit'}
                    </button>
                </form>
              </div>
            )}

            {modelData &&
            <DataTable head={['#', 'Question', 'Status', 'Action']} dataArray={faqs} />}

            {!modelData &&
            <DataTable head={['#', 'Page Name', 'Question', 'Date', 'Status', 'Action']} dataArray={faqs} />}
        </div>
    );
}