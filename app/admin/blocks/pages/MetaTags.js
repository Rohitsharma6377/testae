
"use client"

import { formatDate, metaFlag } from '@/utils/helper';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { toast } from 'react-toastify';


export default function BlogMeta() {
    function DataTable({head, dataArray}) {

        const handleEdit = (index) => {
            const selectedBlogEntry = blogMeta[index];
        
            setFormData({
                id: selectedBlogEntry.id,
                url: selectedBlogEntry.url,
                title: selectedBlogEntry.title,
                description: selectedBlogEntry.description,
                media_id: selectedBlogEntry.media_id
            });
        
            setShowForm(true);
        };

        return (
            <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
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
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    {index + 1}
                                </td>
                                <td className="py-3 px-6 text-left">
                                    {data.url}
                                </td>
                                <td className={`${metaFlag(data.meta_title) && 'text-red-600'} py-3 px-6 text-left`} >
                                    {data.meta_title}
                                </td>
                                <td className={`${metaFlag(data.meta_description) && 'text-red-600'} py-3 px-6 text-left`} >
                                    {data.meta_description}
                                </td>
                                <td className="py-3 px-6 text-left text-nowrap">
                                    {formatDate(data.created_at)}
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <button onClick={() => handleEdit(index)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        )
    }
    
    function AddButton({name}) {
        return (
            <button onClick={openForm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
                Add {name}
            </button>
        )
    }
    
    const [blogMeta, setBlogMeta] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        model: '',
        type: '',
        name: '',
        url: '',
        title: '',
        description: ''
    });
    const [showForm, setShowForm] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/metatag/get-metatag');
                setBlogMeta(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);


    const openForm = () => {
        setShowForm(true);
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
            const apiUrl = method === 'post' ? '/api/metatag/add-metatag' : '/api/metatag/update-metatag';
            const response = await axios[method](apiUrl, postData);

            if (formData.id) {
                setBlogMeta(blogMeta => {
                    const updatedMeta = [...blogMeta];
                    const index = updatedMeta.findIndex(meta => meta.id === formData.id);
                    updatedMeta[index] = response.data.data;
                    return updatedMeta;
                });
            } else {
                setBlogMeta(blogMeta => [...blogMeta, response.data.data]);
            }

            setFormData({
                id: '',
                url: '',
                title: '',
                description: '',
                media_id: ''
            });
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
                url: formData.url,
                title: formData.title,
                description: formData.description,
                media_id: formData.media_id ? formData.media_id : null
            };
            handleFormSubmit(postData, 'put');
        } else {
            postData = {
                url: formData.url,
                title: formData.title,
                description: formData.description,
                media_id: formData.media_id ? formData.media_id : null
            };
            handleFormSubmit(postData, 'post');
        }
    };
    
      
    return (
        <div className="container mx-auto py-5 px-8">

            <AddButton name={"Meta Tag"} />

            {showForm && (
                <div className={`fixed py-8 right-0 top-0 h-full w-1/3 bg-white shadow-lg z-50 overflow-y-auto`}>
                    
                    <div className='flex justify-between items-center px-8 mb-4'>
                        <h2 className="text-lg font-bold">Add Meta Tag</h2>
                        <AiOutlineClose onClick={closeForm} className="text-gray-600 hover:text-gray-800" />
                    </div>

                    <form onSubmit={handleSubmit} className="p-8">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="url">
                                URL
                            </label>
                            <input
                                className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="url"
                                type="text"
                                name="url"
                                value={formData.url}
                                onChange={handleChange}
                                placeholder="URL"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                                Title
                            </label>
                            <input
                                className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="title"
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Title"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                Description
                            </label>
                            <textarea
                                className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="description"
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Description"
                                rows={5}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="media_id">
                                Media
                            </label>
                            <input
                                className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="media_id"
                                type="text"
                                name="media_id"
                                value={formData.media_id}
                                onChange={handleChange}
                                placeholder="Media"
                            />
                        </div>
                        <button type="submit" className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            {formData.id ? "Update" : "Submit"}
                        </button>
                    </form>
                </div>
            )}

            <DataTable head={['#', 'URL', 'Title', 'Description', 'Date', 'Action']} dataArray={blogMeta} />
        </div>
    );
}