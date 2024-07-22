//component Careers.js

"use client"

import axios from 'axios';
import { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import { toast } from 'react-toastify';


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
                                {data.email}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {data.phone}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {data.subject}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {data.admin_remarks}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {data.status}
                            </td>
                            <td className="py-3 px-6 text-left">
                                <a href={`/${data.resume}`} target='_blank' className='bg-green-500 text-white font-bold py-2 px-4 rounded mr-2'>
                                    View   
                                </a>
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

export default function Careers() {

    const [candidates, setCandidates] = useState([]);

    const [formData, setFormData] = useState({});
    const [showForm, setShowForm] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/pages/careers');
                setCandidates(response.data);
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

        });

        setShowForm(false);
    };

    const handleEdit = (index) => {
        const selectedEntry = candidates[index];
    
        setFormData({
            'id': selectedEntry.id,
            'user_id': selectedEntry.user_id,
            'name': selectedEntry.name,
            'email': selectedEntry.email,
            'phone': selectedEntry.phone,
            'resume': selectedEntry.resume,
            'cover': selectedEntry.cover,
            'subject': selectedEntry.subject,
            'message': selectedEntry.message,
            'status': selectedEntry.status,
            'admin_remarks': selectedEntry.admin_remarks
        });
    
        setShowForm(true);
    };


    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };


    const handleFormSubmit = async (putData, method) => {
        try {
            const response = await axios[method]('/api/pages/careers', putData);
    
            if (formData.id) {
                setCandidates(candidates => {
                    const updatedData = [...candidates];
                    const index = updatedData.findIndex(item => item.id === formData.id);
                    updatedData[index] = response.data.data;
                    return updatedData;
                });
            } else {
                setCandidates(candidates => [...candidates, response.data.data]);
            }
    
            setFormData({

            });

            toast.success("Submitted!");    
        } catch (error) {

            toast.error("Try Again.");
            console.error('Failed to update data', error);
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let putData = {
            user_id: formData.user_id,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            resume: formData.resume,
            cover: formData.cover,
            subject: formData.subject,
            message: formData.message,
            admin_remarks: formData.admin_remarks,
            status: formData.status
        }
        
        if (formData.id) {
            putData = {
                ...putData,
                id: formData.id
            }
        }


        // console.log(putData);

        handleFormSubmit(putData, formData.id ? 'put' : 'post');
        setShowForm(false);
    };
    

    return (
        <div className="container mx-auto py-5 px-8">

            {showForm && (
                <div className="fixed py-10 top-0 right-0 h-full w-1/3 bg-white shadow-lg z-50 overflow-y-auto">
                    <div className="flex justify-between items-center px-8 mb-4">
                        <h2 className="text-lg font-bold">{formData.id ? 'Update Banner' : 'Add Banner'}</h2>
                        <AiOutlineClose onClick={closeForm} className="text-gray-600 hover:text-gray-800" />
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 bg-white rounded">

                        <div className="mb-4">
                            <label htmlFor="admin_remarks" className="block text-gray-700 text-sm font-bold mb-2">Admin Remarks</label>
                            <input
                                type="text"
                                id="admin_remarks"
                                name="admin_remarks"
                                value={formData.admin_remarks}
                                onChange={handleChange}
                                placeholder="Admin Remarks"
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
                                <option value="Selected">Selected</option>
                                <option value="Not Selected">Not Selected</option>
                            </select>
                        </div>

                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                            {formData.id ? 'Update' : 'Submit'}
                        </button>
                    </form>
                </div>
            )}

            {/* Display client data */}
            <DataTable tableHeadings={['#', 'Name', 'Email', 'Phone', 'Subject', 'Admin Remarks', 'Status', 'Resume', 'Action']} dataArray={candidates} handleEdit={handleEdit}/>
        </div>
    );
}