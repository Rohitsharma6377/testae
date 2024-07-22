
"use client"

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from "react-icons/ai";

import { toast } from 'react-toastify';


function DataTable({ head, dataArray, handleEdit }) {

    return (
        <table className="w-full table-auto">
            <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    {head.map((val) => (
                        <th key={val} className="py-3 px-6 text-left">{val}</th>
                    ))}
                </tr>
            </thead>

            <tbody className="text-gray-600 text-sm font-light [&>*:nth-child(even)]:bg-gray-200">
                {dataArray.map((data, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                            {index + 1}
                        </td>
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                            {data.heading}
                        </td>
                        <td className="py-3 px-6 text-left">
                            {data.description}
                        </td>
                        <td className="py-3 px-6 text-left">
                            <button onClick={() => handleEdit(index)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Edit</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}




export default function Work(){


    const [work, setWork] = useState([]);
    const [formData, setFormData] = useState({});
    const [showForm, setShowForm] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/work');
                setWork(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);


  const openForm = () => {
    setFormData({});
    setShowForm(true);
};

const closeForm = () => {
    setFormData({});
    setShowForm(false);
};


    const handleEdit = (index) => {
        const selectedEntry = work[index];
    
        setFormData({
            id: selectedEntry.id,
            heading: selectedEntry.heading,
            description: selectedEntry.description
        });
        setShowForm(true);
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
            const response = await axios[method]('/api/work', postData);

            if (formData.id) {
                setWork(item => {
                    const updatedMeta = [...item];
                    const index = updatedMeta.findIndex(meta => meta.id === formData.id);
                    updatedMeta[index] = response.data.data;
                    return updatedMeta;
                });
            } else {
                setWork(item => [...item, response.data.data]);
            }

            setFormData({
                heading: '',
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
                heading: formData.heading,
                description: formData.description
            };
            handleFormSubmit(postData, 'put');
        } else {
            postData = {
                heading: formData.heading,
                description: formData.description
            };
            handleFormSubmit(postData, 'post');
        }
    };




    return (
        <div className='container mx-auto py-5 px-8'>

            <button onClick={openForm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
                Add Work
            </button>

            {showForm && (
                <div className={`fixed flex flex-col pt-6 right-0 top-0 h-full w-1/3 bg-white shadow-lg z-50 overflow-y-auto`}>
                    
                    <div className='flex justify-between items-center px-8 mb-4'>
                        <h2 className="text-lg font-bold">{formData.id ? 'Update' : 'Add'} Work</h2>
                        <AiOutlineClose onClick={closeForm} className="text-gray-600 hover:text-gray-800" />
                    </div>

                    <form onSubmit={handleSubmit} className="p-8">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="heading">
                                Heading
                            </label>
                            <input
                                className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="heading"
                                type="text"
                                name="heading"
                                value={formData.heading}
                                onChange={handleChange}
                                placeholder="Heading"
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

                        <button type="submit" className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            {formData.id ? "Update" : "Submit"}
                        </button>
                    </form>
                </div>
            )}

            
            <DataTable head={['#', 'Heading', 'Description', 'Action']} dataArray={work} handleEdit={handleEdit}/>
        </div>
    )
}