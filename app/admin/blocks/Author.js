//component Author.js

"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineClose } from 'react-icons/ai';

import { toast } from 'react-toastify';


export default function Author() {

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

                    <tbody className="text-gray-600 text-sm font-light">
                        {dataArray.map((meta, index) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">
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
                                    <button onClick={() => handleEdit(index)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        )
    }

    
    const [author, setAuthor] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        status: '',
        bio: '',
        image: null // Change to null initially
    });
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/author');
                setAuthor(response.data);
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

        // // If the input is a file input, use the files array
        // const newValue = name === 'image' ? files[0] : value;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formsData = new FormData();
        formsData.append('name', formData.name);
        formsData.append('status', formData.status);
        formsData.append('bio', formData.bio);
        formsData.append('image', e.target.elements.image.files[0]); // Access the uploaded file

        // console.log(formsData);
    
        try {
            const response = await axios.post('/api/author', formsData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            if (formData.id) {
                setAuthor(author => {
                    const updatedMeta = [...author];
                    const index = updatedMeta.findIndex(meta => meta.id === formData.id);
                    updatedMeta[index] = response.data.data;
                    return updatedMeta;
                });
            } else {
                setAuthor(author => [...author, response.data.data]);
            }
    
            setFormData({
                name: '',
                status: '',
                bio: '',
                image: null
            });
            setShowForm(false);

            toast.success("Submitted!");
    
        } catch (error) {
            toast.error("Try Again.");
            console.error('Failed to update data', error);
        }
    };
    

    return (
        <div className="container mx-auto py-5 px-8">
            <button onClick={openForm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
                Add Author
            </button>

            {showForm && (
                <div className="fixed flex flex-col justify-center top-0 right-0 h-full w-1/3 bg-white shadow-lg z-50 overflow-y-auto">
                    <div className="flex justify-between items-center px-8 mb-4">
                        <h2 className="text-lg font-bold">{formData.id ? 'Update Author Form' : 'Add Author Form'}</h2>
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
                            <label htmlFor="bio" className="block text-gray-700 text-sm font-bold mb-2">Bio</label>
                            <textarea
                                id="bio"
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                placeholder="Bio"
                                className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                rows="10"
                            />
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
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                            {formData.id ? 'Update' : 'Submit'}
                        </button>
                    </form>
                </div>
            )}

            {/* Display author data */}
            <DataTable head={['#', 'Author', 'Bio', 'Status', 'Action']} dataArray={author} />
        </div>
    );
}
