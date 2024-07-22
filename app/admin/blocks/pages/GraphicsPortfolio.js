
"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineClose } from 'react-icons/ai';
import Image from 'next/image';
import { toast } from 'react-toastify';
import ToggleBtn from '@/components/blocks/ToggleBtn';
import { baseUrl } from '@/utils/helper';


export default function Portfolio() {

    const [file, setFile] = useState(null);
    const [portfolio, setPortfolio] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        status: '',
        image: null // Change to null initially
    });
    const [showForm, setShowForm] = useState(false);


    function DataTable({head, dataArray}) {
        const handleEdit = (index) => {
            const selectedBlogEntry = portfolio[index];
        
            setFormData({
                id: selectedBlogEntry.id,
                text: selectedBlogEntry.text,
                status: selectedBlogEntry.status,
                display_order: selectedBlogEntry.display_order,
                media_id: selectedBlogEntry.media_id,
                image: selectedBlogEntry.image,
                media_path: selectedBlogEntry.image
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
                                <td className="py-3 px-6 text-left">
                                    {data.image && <Image loader={() => `${baseUrl}/${data.image}`}  src={`${baseUrl}/${data.image}`} alt={data.image_alt} width={50} height={50} className='w-24' />}
                                </td>
                                <td className="py-3 px-6 text-left">
                                    {data.text}
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <ToggleBtn key={index} table={'graphics_portfolio'} status={data.status} id={data.id} />
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


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/graphics-portfolio/get-graphics-portfolio');
                setPortfolio(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    const openForm = () => {
        setShowForm(true);
        setFormData({
            status: 1
        })
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
            const apiUrl = method === 'post' ? '/api/graphics-portfolio/add-graphics-portfolio' : '/api/graphics-portfolio/update-graphics-portfolio';
            const response = await axios[method](apiUrl, postData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (formData.id) {
                setPortfolio(portfolio => {
                    const updatedData = [...portfolio];
                    const index = updatedData.findIndex(meta => meta.id === formData.id);
                    updatedData[index] = response.data.data;
                    return updatedData;
                });
            } else {
                setPortfolio(portfolio => [...portfolio, response.data.data]);
            }
            
            setFormData({
                text: null,
                status: null,
                display_order: null,
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
            formsData.append('media_id', formData.media_id);
            formsData.append('media_path', formData.media_path);
        }
        
        formsData.append('text', formData.text);
        formsData.append('status', formData.status);
        formsData.append('display_order', formData.display_order ? formData.display_order : null);
        formsData.append('image', e.target.elements.image.files[0] ? e.target.elements.image.files[0] : formData.image);


        handleFormSubmit(formsData, formData.id ? 'put' : 'post');
        setShowForm(false);
    };


    const src = `${baseUrl}/${formData.image}`;
    

    return (
        <div className="container mx-auto py-5 px-8">
            <button onClick={openForm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
                Add Graphics Portfolio
            </button>

            {showForm && (
                <div className="fixed py-10 top-0 right-0 h-full w-1/3 bg-white shadow-lg z-50 overflow-y-auto">
                    <div className="flex justify-between items-center px-8 mb-4">
                        <h2 className="text-lg font-bold">{formData.id ? 'Update' : 'Add'} Portfolio</h2>
                        <AiOutlineClose onClick={closeForm} className="text-gray-600 hover:text-gray-800" />
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 bg-white rounded">

                        <div className="mb-4">
                            <label htmlFor="text" className="block text-gray-700 text-sm font-bold mb-2">Text*</label>
                            <textarea
                                type="text"
                                id="text"
                                name="text"
                                value={formData.text}
                                onChange={handleChange}
                                placeholder="Text"
                                className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                rows={5}
                                required
                            />
                        </div>

                        <div className="lg:flex gap-6">
                            <div className="mb-4 w-full">
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
                            
                            <div className="mb-4 w-full">
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

                        {(file || formData.image) && <Image loader={() => file ? file : src} src={file ? file : src} alt='image' width={100} height={100} className='w-24 mb-4' />}

                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                            {formData.id ? 'Update' : 'Submit'}
                        </button>
                    </form>
                </div>
            )}

            <DataTable head={['#', 'Image', 'Text', 'Status', 'Action']} dataArray={portfolio} />
        </div>
    );
}