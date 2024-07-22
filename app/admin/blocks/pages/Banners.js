//component clients.js

"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineClose } from 'react-icons/ai';
import Image from 'next/image';

// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// import dynamic from "next/dynamic";
// const Editor = dynamic(() => import('@/components/blocks/CKEditor'), { ssr: false });


import { toast } from 'react-toastify';



function DataTable({head, dataArray, handleEdit}) {

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
                            <td className="py-3 px-6 text-left">
                                {index + 1}
                            </td>
                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                {data.url}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {data.text}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {data.image && <Image loader={() => `${process.env.NEXT_PUBLIC_BASE_URL}/${data.image}`}  src={`${process.env.NEXT_PUBLIC_BASE_URL}/${data.image}`} alt='image' width={50} height={50} className='w-24' />}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {data.mobile_image && <Image loader={() => `${process.env.NEXT_PUBLIC_BASE_URL}/${data.mobile_image}`}  src={`${process.env.NEXT_PUBLIC_BASE_URL}/${data.mobile_image}`} alt='mobile image' width={50} height={50} className='w-24' />}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {data.status}
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

export default function Banners() {
    
    const [file, setFile] = useState({
        image: null,
        mobile_image: null
    });
    const [clients, setClients] = useState([]);
    const [formData, setFormData] = useState({
        model_type: '',
        model: '',
        status: '',
        display_order: '',
        image: null,
        mobile_image: null,
        url: '',
        heading: '',
        text: ''
    });
    const [showForm, setShowForm] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/pages/banners');
                setClients(response.data);
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
        setFormData({
            model_type: '',
            model: '',
            status: '',
            display_order: '',
            image: null,
            mobile_image: null,
            url: '',
            heading: '',
            text: ''
        });

        setShowForm(false);
    };

    const handleEdit = (index) => {
        const selectedBlogEntry = clients[index];

        setFile(null);
        
        setFormData({
            id: selectedBlogEntry.id,
            model_type: selectedBlogEntry.model_type,
            model: selectedBlogEntry.model,
            status: selectedBlogEntry.status,
            display_order: selectedBlogEntry.display_order,
            image: selectedBlogEntry.image,
            mobile_image: selectedBlogEntry.mobile_image,
            url: selectedBlogEntry.url,
            heading: selectedBlogEntry.heading,
            text: selectedBlogEntry.text
        });
    
        setShowForm(true);
    };

    const handleEditorChange = (identifier) => (data) => {
        setFormData((prev) => ({
            ...prev,
            [identifier]: data,
        }));
    };
    
    let imageSrc = `${process.env.NEXT_PUBLIC_BASE_URL}/${formData.image}`;
    let mobileImageSrc = `${process.env.NEXT_PUBLIC_BASE_URL}/${formData.mobile_image}`;
    
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
        
        if(files){
            setFile(prevState => ({
                ...prevState,
                [name]: URL.createObjectURL(e.target.files[0])
            }));
        }
    };


    const handleFormSubmit = async (postData, method) => {
        try {
            const response = await axios[method]('/api/pages/banners', postData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            if (formData.id) {
                setClients(clients => {
                    const updatedData = [...clients];
                    const index = updatedData.findIndex(meta => meta.id === formData.id);
                    updatedData[index] = response.data.data;
                    return updatedData;
                });
            } else {
                setClients(clients => [...clients, response.data.data]);
            }
            
            setFormData({
                model_type: '',
                model: '',
                status: '',
                display_order: '',
                image: null,
                mobile_image: null,
                url: '',
                heading: '',
                text: ''
            });

            toast.success("Submitted!");

        } catch (error) {
            toast.error("Try Again.");
            console.error('Failed to update data', error);
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formsData = new FormData();
        
        if (formData.id) {
            formsData.append('id', formData.id);
        }
        
        formsData.append('model_type', formData.model_type);
        formsData.append('model', formData.model);
        formsData.append('status', formData.status);
        formsData.append('display_order', formData.display_order ? formData.display_order : null);
        formsData.append('image', e.target.elements.image.files[0] ? e.target.elements.image.files[0] : formData.image);
        formsData.append('mobile_image', e.target.elements.mobile_image.files[0] ? e.target.elements.mobile_image.files[0] : formData.mobile_image);
        formsData.append('url', formData.url);
        formsData.append('heading', formData.heading);
        formsData.append('text', formData.text);
        
        handleFormSubmit(formsData, formData.id ? 'put' : 'post');
        setShowForm(false);
    };

    
    const src = `${process.env.NEXT_PUBLIC_BASE_URL}/${formData.image}`;
    
    
    return (
        <div className="container mx-auto py-5 px-8">
            <button onClick={openForm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
                Add Banner
            </button>

            {showForm && (
                <div className="fixed py-10 top-0 right-0 h-full w-1/3 bg-white shadow-lg z-50 overflow-y-auto">
                    <div className="flex justify-between items-center px-8 mb-4">
                        <h2 className="text-lg font-bold">{formData.id ? 'Update Banner' : 'Add Banner'}</h2>
                        <AiOutlineClose onClick={closeForm} className="text-gray-600 hover:text-gray-800" />
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 bg-white rounded">

                        <div className="mb-4">
                            <label htmlFor="model_type" className="block text-gray-700 text-sm font-bold mb-2">Model Type*</label>
                            <select
                                id="model_type"
                                name="model_type"
                                value={formData.model_type}
                                onChange={handleChange}
                                className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            >
                                <option value="">Select</option>
                                <option value="show">Show</option>
                                <option value="hide">Hide</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="model" className="block text-gray-700 text-sm font-bold mb-2">Model*</label>
                            <select
                                id="model"
                                name="model"
                                value={formData.model}
                                onChange={handleChange}
                                className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            >
                                <option value="">Select Model</option>
                                <option value="page">Page</option>
                                <option value="blog">Blog</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">Status*</label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            >
                                <option value="">Select Status</option>
                                <option value="0">Show</option>
                                <option value="1">Hide</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="display_order" className="block text-gray-700 text-sm font-bold mb-2">Display Order</label>
                            <input
                                type="text"
                                id="display_order"
                                name="display_order"
                                value={formData.display_order}
                                onChange={handleChange}
                                placeholder="Display Order"
                                className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
    
                        <div className="mb-4">
                            <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Image*</label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                onChange={handleChange}
                                className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        {(file.image || formData.image) && <Image loader={() => file.image ? file.image : imageSrc} src={file.image ? file.image : imageSrc} alt='image' width={100} height={100} className='w-24' />}

                        <div className="mb-4">
                            <label htmlFor="mobile_image" className="block text-gray-700 text-sm font-bold mb-2">Mobile Image*</label>
                            <input
                                type="file"
                                id="mobile_image"
                                name="mobile_image"
                                accept="image/*"
                                onChange={handleChange}
                                className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        {(file.mobile_image || formData.mobile_image) && <Image loader={() => file.mobile_image ? file.mobile_image : mobileImageSrc} src={file.mobile_image ? file.mobile_image : mobileImageSrc} alt='mobile image' width={100} height={100} className='w-24' />}

                        <div className="mb-4">
                            <label htmlFor="url" className="block text-gray-700 text-sm font-bold mb-2">URL*</label>
                            <input
                                type="text"
                                id="url"
                                name="url"
                                value={formData.url}
                                onChange={handleChange}
                                placeholder="URL"
                                className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="heading" className="block text-gray-700 text-sm font-bold mb-2">Heading*</label>
                            <input
                                type="text"
                                id="heading"
                                name="heading"
                                value={formData.heading}
                                onChange={handleChange}
                                placeholder="Heading"
                                className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="text">Text*</label>
                            {/* <Editor value={formData.text} onChange={handleEditorChange("text")} /> */}
                        </div>

                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                            {formData.id ? 'Update' : 'Submit'}
                        </button>
                    </form>
                </div>
            )}

            {/* Display client data */}
            <DataTable head={['#', 'URL', 'Text', 'Image', 'Mobile Image', 'Status', 'Action']} dataArray={clients} handleEdit={handleEdit}/>
        </div>
    );
}