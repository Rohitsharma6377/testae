//component clients.js

"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineClose } from 'react-icons/ai';
import Image from 'next/image';

import { toast } from 'react-toastify';


export default function PageSections() {

    function DataTable({head, dataArray}) {

        const handleEdit = (index) => {
            const selectedBlogEntry = clients[index];
        
            setFormData({
                id: selectedBlogEntry.id,
                name: selectedBlogEntry.name,
                role: selectedBlogEntry.role,
                status: selectedBlogEntry.status,
                image: selectedBlogEntry.image
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
                                <td className="py-3 px-6 text-left">
                                    {index + 1}
                                </td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    {data.url}
                                </td>
                                <td className="py-3 px-6 text-left">
                                    {/* {data.status} */}
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


    const [file, setFile] = useState(null);
    const [clients, setClients] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        status: '',
        image: null // Change to null initially
    });
    const [showForm, setShowForm] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/pages/clients');
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
            name: '',
            role: '',
            status: '',
            image: null
        });

        setShowForm(false);
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        // // If the input is a file input, use the files array
        // const newValue = name === 'image' ? files[0] : value;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));

        if(files){
            setFile(URL.createObjectURL(e.target.files[0]));
        }
    };


    const handleFormSubmit = async (postData, method) => {
        try {
            const response = await axios[method]('/api/pages/clients', postData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // // console.log("response", response.data.data);
    
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
                name: '',
                role: '',
                status: '',
                image: null
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
        
        formsData.append('name', formData.name);
        formsData.append('role', formData.role);
        formsData.append('status', formData.status);
        formsData.append('image', e.target.elements.image.files[0] ? e.target.elements.image.files[0] : formData.image);


        handleFormSubmit(formsData, formData.id ? 'put' : 'post');
        setShowForm(false);
    };


    const src = `${process.env.NEXT_PUBLIC_BASE_URL}/${formData.image}`;
    

    return (
        <div className="container mx-auto py-5 px-8">
            <button onClick={openForm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
                Add Client
            </button>

            {showForm && (
                <div className="fixed py-10 top-0 right-0 h-full w-1/3 bg-white shadow-lg z-50 overflow-y-auto">
                    <div className="flex justify-between items-center px-8 mb-4">
                        <h2 className="text-lg font-bold">{formData.id ? 'Update Client' : 'Add Client'}</h2>
                        <AiOutlineClose onClick={closeForm} className="text-gray-600 hover:text-gray-800" />
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 bg-white rounded">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Name"
                                className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">Role</label>
                            <input
                                type="text"
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                placeholder="Role"
                                className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">Status</label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
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
                            <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Image</label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                onChange={handleChange}
                                className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        {(file || formData.image) && <Image loader={() => file ? file : src} src={file ? file : src} alt='image' width={100} height={100} className='w-24' />}

                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                            {formData.id ? 'Update' : 'Submit'}
                        </button>
                    </form>
                </div>
            )}

            {/* Display client data */}
            <DataTable head={['#', 'Page URL', 'Status', 'Action']} dataArray={clients} />
        </div>
    );
}
