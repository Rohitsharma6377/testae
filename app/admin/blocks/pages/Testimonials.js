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
import Pagination from '@/components/blocks/Pagination';
import MyContext from '@/context/MyContext';


export default function TestimonialsPage({ modelData }) {

    const { searchTerm, setSearchTerm, itemsPerPage, setItemsPerPage } = useContext(MyContext);

    const [testimonials, setTestimonials] = useState([]);
    const [clients, setClients] = useState([]);
    const [formData, setFormData] = useState({});
    const [showForm, setShowForm] = useState(false);

    //fetch page data
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchPageData = async (page) => {
        try {
            let response;

            if(!modelData) {
                response = await axios.get('/api/testimonial/get-testimonial', { params: { page, itemsPerPage: itemsPerPage ? itemsPerPage : 10 } });
            } else {
                response = await axios.post('/api/testimonial/get-testimonial', { page, itemsPerPage: itemsPerPage ? itemsPerPage : 10, modelData });
            }
            setTestimonials(response.data.testimonials);
            setClients(response.data.clients);
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

        const handleEdit = (index) => {
            const selectedEntry = testimonials[index];
        
            setFormData({
                id: selectedEntry.id,
                model: selectedEntry.model,
                model_id: selectedEntry.model_id,
                page_name: selectedEntry.page_name,
                page_url: selectedEntry.page_url,
                client_id: selectedEntry.client_id,
                client_name: selectedEntry.client_name,
                client_role: selectedEntry.client_role,
                client_status: selectedEntry.client_status,
                testimonial_status: selectedEntry.testimonial_status,
                display_order: selectedEntry.display_order ? selectedEntry.display_order : null,
                testimonial: selectedEntry.testimonial,
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
                        {dataArray.map((data, index) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">
                                    {index + 1}
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <Link href={data.page_url}>{data.page_name}</Link>
                                </td>
                                <td className="py-3 px-6 text-left">
                                    {data.client_name}
                                </td>
                                <td className="py-3 px-6 text-left" dangerouslySetInnerHTML={{ __html: data.testimonial.slice(0,180) + '...'}}>
                                </td>
                                {!modelData &&
                                <td className="py-3 px-6 text-left text-nowrap">
                                    {formatDate(data.created_at)}
                                </td>}
                                <td className="py-3 px-6 text-left">
                                    <ToggleBtn key={index} table={'testimonials'} status={data.testimonial_status} id={data.id} />
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

    const handleEditorChange = (identifier) => (data) => {
        setFormData((prev) => ({
            ...prev,
            [identifier]: data,
        }));
    };


    const openForm = () => {
        setShowForm(true);
        setFormData({
            testimonial_status: 1
        })
    };

    const closeForm = () => {
        setShowForm(false);
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
            const apiUrl = method === 'post' ? '/api/testimonial/add-testimonial' : '/api/testimonial/update-testimonial'
            const response = await axios[method](apiUrl, postData);

            if (formData.id) {
                setTestimonials(testimonial => {
                    const updatedData = [...testimonial];
                    const index = updatedData.findIndex(meta => meta.id === formData.id);
                    updatedData[index] = response.data.data;
                    return updatedData;
                });
            } else {
                setTestimonials(testimonial => [...testimonial, response.data.data]);
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
        const foundClientID = clients.find(client => client.name.includes(formData.client_name)).id;

        if (formData.id) {
            postData = {
                id: formData.id,
                model: formData.model,
                model_id: formData.model_id,
                page_name: formData.page_name,
                page_url: formData.page_url,
                client_id: foundClientID,
                client_name: formData.client_name,
                client_role: formData.client_role,
                client_status: formData.client_status,
                testimonial_status: formData.testimonial_status,
                display_order: formData.display_order,
                testimonial: formData.testimonial,
                created_at: formData.created_at
            };
            handleFormSubmit(postData, 'put');
        } 
        else {
            postData = {
                model: modelData.model,
                model_id: modelData.model_id,
                client_id: foundClientID,
                client_name: formData.client_name,
                testimonial_status: formData.testimonial_status,
                display_order: formData.display_order ? formData.display_order : null,
                testimonial: formData.testimonial
            };

            handleFormSubmit(postData, 'post');
        }
    };
    
      
    return (
        <div className="container mx-auto py-5 px-8">

            {modelData &&
            <button  onClick={openForm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
                Add Testimonial
            </button>}

            {showForm && (
                <div className={`fixed py-8 right-0 top-0 h-full w-1/3 bg-white shadow-lg z-50 overflow-y-auto`}>
                    
                    <div className='flex justify-between items-center px-8 mb-4'>
                        <h2 className="text-lg font-bold">{formData.id ? 'Edit' : 'Add'} Testimonial</h2>
                        <AiOutlineClose onClick={closeForm} className="text-gray-600 hover:text-gray-800" />
                    </div>

                    <form onSubmit={handleSubmit} className="p-8">

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="page">Client</label>
                            <select
                            id="client_name"
                            name="client_name"
                            value={formData.client_name}
                            onChange={handleChange}
                            className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                            >
                                <option value="">Select</option>
                                {clients.map((item, index) => (
                                    <option key={index} value={item.name}>{item.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4 flex gap-4">
                            <div className="mb-4 w-full">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">Status</label>
                                <select
                                id="status"
                                name="status"
                                value={formData.testimonial_status}
                                onChange={handleChange}
                                className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                                >
                                    <option value="">Select</option>
                                    <option value="1">Show</option>
                                    <option value="0">Hide</option>
                                </select>
                            </div>

                            <div className="mb-4 w-full">
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
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="testimonial">Testimonial</label>
                            {/* <Editor value={formData.testimonial} onChange={handleEditorChange("testimonial")} /> */}
                        </div>
                        
                        <button type="submit" className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            {formData.id ? 'Update' : 'Submit'}
                        </button>
                    </form>
                </div>
            )}

            {!modelData &&
            <DataTable head={['#', 'Page Name', 'Client', 'Testimonial', 'Date', 'Status', 'Action']} dataArray={testimonials} />}
            
            {modelData &&
            <DataTable head={['#', 'Page Name', 'Client', 'Testimonial', 'Status', 'Action']} dataArray={testimonials} />}
        </div>
    );
}