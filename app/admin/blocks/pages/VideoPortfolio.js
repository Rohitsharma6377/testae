//component team.js

"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineClose } from 'react-icons/ai';
import Image from 'next/image';

import { toast } from 'react-toastify';
import { baseUrl } from '@/utils/helper';
import ToggleBtn from '@/components/blocks/ToggleBtn';



function DataTable({tableHeadings, dataArray, handleEdit}) {

    return (
        <table className="w-full table-auto">
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        {
                            tableHeadings.map((value, index) => (
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
                                {data.name}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {data.iframe}
                            </td>
                            <td className="py-3 px-6 text-left">
                                <ToggleBtn key={index} table={'video_portfolio'} status={data.status} id={data.id} />
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

export default function Services() {
    
    const [video, setVideo] = useState([]);
    const [formData, setFormData] = useState({
        // name: '',
        // url: '',
        // image: null,
        // status: '',
        // display_order: '',
    });
    const [showForm, setShowForm] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/pages/video-portfolio');
                setVideo(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    const openForm = () => {
        setFormData({
            status: 1
        })
        setShowForm(true);
    };

    const closeForm = () => {
        setFormData({});
        setShowForm(false);
    };

    const handleEdit = (index) => {
        const selectedEntry = video[index];

        setFile(null);

        setFormData({
            ...selectedEntry
            // id: selectedEntry.id,
            // name: selectedEntry.name,
            // url: selectedEntry.url,
            // media_id: selectedEntry.media_id,
            // status: selectedEntry.status,
            // display_order: selectedEntry.display_order,
            // media_path: selectedEntry.media_path
        });

        setShowForm(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };


    const handleFormSubmit = async (postData, method) => {
        try {
            const response = await axios[method]('/api/pages/video-portfolio', postData);
    
            if (formData.id) {
                setVideo(video => {
                    const updatedData = [...video];
                    const index = updatedData.findIndex(data => data.id === formData.id);
                    updatedData[index] = response.data.data;
                    return updatedData;
                });
            } else {
                setVideo(video => [...video, response.data.data]);
            }
    
            setFormData({});
            toast.success("Submitted!");

        } catch (error) {
            toast.error("Try Again.");
            console.error('Failed to update data', error);
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let postData = {
            'name': formData.name,
            'iframe': formData.iframe,
            'status': formData.status,
            'display_order': formData.display_order ? formData.display_order : null
        };

        if (formData.id) {
            postData = {
                ...postData, 
                'id': formData.id,
            }
        }

        handleFormSubmit(postData, formData.id ? 'put' : 'post');
        setShowForm(false);
    };
    

    return (
        <div className="container mx-auto py-5 px-8">
            <button onClick={openForm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
                Add Video Portfolio
            </button>

            {showForm && (
                <div className="fixed py-10 top-0 right-0 h-full w-1/3 bg-white shadow-lg z-50 overflow-y-auto">
                    <div className="flex justify-between items-center px-8 mb-4">
                        <h2 className="text-lg font-bold">{formData.id ? 'Update' : 'Add'} Portfolio</h2>
                        <AiOutlineClose onClick={closeForm} className="text-gray-600 hover:text-gray-800" />
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 bg-white rounded">

                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name*</label>
                            <input
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
                            <label htmlFor="iframe" className="block text-gray-700 text-sm font-bold mb-2">iFrame Url*</label>
                            <input
                                id="iframe"
                                name="iframe"
                                value={formData.iframe}
                                onChange={handleChange}
                                placeholder="iFrame Url"
                                className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
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
                                <option value="">Select</option>
                                <option value="1">Show</option>
                                <option value="0">Hide</option>
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

                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                            {formData.id ? 'Update' : 'Submit'}
                        </button>
                    </form>
                </div>
            )}

            {/* Display client data */}
            <DataTable tableHeadings={['#', 'Video Name', 'iframe Url', 'Status', 'Action']} dataArray={video} handleEdit={handleEdit}/>
        </div>
    );
}