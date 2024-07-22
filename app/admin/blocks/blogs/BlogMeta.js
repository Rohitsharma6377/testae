//component BlogMeta.js

"use client"

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from "react-icons/ai";

import { toast } from 'react-toastify';
import ToggleBtn from '@/components/blocks/ToggleBtn'

export default function BlogMeta() {

    function DataTable({head, dataArray}) {

        const handleEdit = (index) => {
            const selectedBlogEntry = blogMeta[index];
        
            setFormData({
                id: selectedBlogEntry.id,
                type: selectedBlogEntry.type,
                name: selectedBlogEntry.name,
                url: selectedBlogEntry.url,
                title: selectedBlogEntry.title,
                description: selectedBlogEntry.description
            });
        
            setShowForm(true);
        };


        console.log('///////////////////////', dataArray);

        return (
            <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            {
                                head.map((val, index) => (
                                    <th key={index} className="py-3 px-6 text-left">{val}</th>
                                ))
                            }
                        </tr>
                    </thead>

                    <tbody className="text-gray-600 text-sm font-light">
                        {dataArray.map((meta, index) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    {index + 1}
                                </td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    {meta.type}
                                </td>
                                <td className="py-3 px-6 text-left">
                                    {meta.name} | {meta.url}
                                </td>
                                <td className="py-3 px-6 text-left">
                                    {meta.name} | {meta.url}
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <ToggleBtn key={index} table={'blogmeta'} status={meta.status} id={meta.id} />
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
                const response = await axios.get('/api/blogmeta');
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
            const response = await axios[method]('/api/blogmeta', postData);

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
                type: '',
                name: '',
                url: '',
                title: '',
                description: ''
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
                type: formData.type,
                name: formData.name,
                url: formData.url
            };
            handleFormSubmit(postData, 'put');
        } else {
            postData = {
                type: formData.type,
                name: formData.name,
                url: formData.url
            };
            handleFormSubmit(postData, 'post');
        }
    };

    const [formPosition, setFormPosition] = useState('-right-1/3');

    
      
    return (
        <div className="container mx-auto py-5 px-8">

            <AddButton name={"Blog Meta"} />

            {showForm && (
                <div className={`fixed flex flex-col justify-center right-0 top-0 h-full w-1/3 bg-white shadow-lg z-50 overflow-y-auto`}>
                    
                    <div className='flex justify-between items-center px-8 mb-4'>
                        <h2 className="text-lg font-bold">Add Blog Meta Form</h2>
                        <AiOutlineClose onClick={closeForm} className="text-gray-600 hover:text-gray-800" />
                    </div>

                    <form onSubmit={handleSubmit} className="p-8">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                                Status
                            </label>
                            <select
                                className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="type"
                                name="type"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="">Select Status</option>
                                <option value="1">Show</option>
                                <option value="0">Hide</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                                Type
                            </label>
                            <select
                                className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                            >
                                <option value="">Select Type</option>
                                <option value="Tag">Tag</option>
                                <option value="Category">Category</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Name"
                            />
                        </div>
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
                                rows={10}
                            />
                        </div>
                        <button type="submit" className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            {formData.id ? "Update" : "Submit"}
                        </button>
                    </form>
                </div>
            )}

            <DataTable head={['#', 'Type', 'Name|Url', 'Meta', 'Status', 'Actions']} dataArray={blogMeta} />
        </div>
    );
}