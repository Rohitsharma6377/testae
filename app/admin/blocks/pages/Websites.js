//component team.js

"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineClose } from 'react-icons/ai';
import Image from 'next/image';

import { toast } from 'react-toastify';
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
                                {data.client_name}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {data.url}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {data.media_path && <Image loader={() => `${process.env.NEXT_PUBLIC_BASE_URL}/${data.media_path}`}  src={`${process.env.NEXT_PUBLIC_BASE_URL}/${data.media_path}`} alt={`service ${data.name}`} width={50} height={50} className='w-32' />}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {data.design}
                            </td>
                            <td className="py-3 px-6 text-left">
                                <ToggleBtn key={index} table={'websites'} status={data.status} id={data.id} />
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
    
    const [file, setFile] = useState(null);
    const [services, setServices] = useState([]);
    const [clients, setClients] = useState([]);
    
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
                const response = await axios.get('/api/pages/websites');
                setServices(response.data.websites);
                setClients(response.data.clients);
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
        setFile(null);
        setShowForm(true);
    };

    const closeForm = () => {
        setFormData({
            // name: '',
            // designation: '',
            // status: '',
            // text: '',
            // image: null,
        });
        setFile(null);

        setShowForm(false);
    };

    const handleEdit = (index) => {
        const selectedEntry = services[index];

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

    let imageSrc = `${process.env.NEXT_PUBLIC_BASE_URL}/${formData.media_path}`;

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if(name === 'client_name'){
            const selectedValue = event.target.value;
            const clientId = clients.find(item => item.name === selectedValue).id;

            setFormData((prevFormData) => ({
                ...prevFormData,
                client_id: clientId,
                client_name: selectedValue
            }));


            // // console.log(formData);

        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }


        // // console.log(e.target);

        if(files){
            setFile(URL.createObjectURL(e.target.files[0]));
        }
    };


    const handleFormSubmit = async (postData, method) => {
        try {
            const response = await axios[method]('/api/pages/websites', postData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            if (formData.id) {
                setServices(services => {
                    const updatedData = [...services];
                    const index = updatedData.findIndex(data => data.id === formData.id);
                    updatedData[index] = response.data.data;
                    return updatedData;
                });
            } else {
                setServices(services => [...services, response.data.data]);
            }
    
            setFormData({
                // name: '',
                // designation: '',
                // status: '',
                // text: '',
                // image: null,
            });

            toast.success("Submitted!");
        } 
        
        catch (error) {
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
        
        formsData.append('client_id', formData.client_id);
        formsData.append('client_name', formData.client_name);
        formsData.append('url', formData.url);
        formsData.append('design', formData.design);
        formsData.append('status', formData.status);
        formsData.append('display_order', formData.display_order ? formData.display_order : 1);
        formsData.append('image', e.target.elements.image.files[0] ? e.target.elements.image.files[0] : formData.media_path);

        handleFormSubmit(formsData, formData.id ? 'put' : 'post');
        setShowForm(false);

        // // console.log(formData);
    };
    

    return (
        <div className="container mx-auto py-5 px-8">
            <button onClick={openForm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
                Add Website
            </button>

            {showForm && (
                <div className="fixed py-10 top-0 right-0 h-full w-1/3 bg-white shadow-lg z-50 overflow-y-auto">
                    <div className="flex justify-between items-center px-8 mb-4">
                        <h2 className="text-lg font-bold">{formData.id ? 'Update' : 'Add'} Website</h2>
                        <AiOutlineClose onClick={closeForm} className="text-gray-600 hover:text-gray-800" />
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 bg-white rounded">

                        <div className="mb-4">
                            <label htmlFor="client_name" className="block text-gray-700 text-sm font-bold mb-2">Client*</label>
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
                                    <option key={item.id} value={item.name}>{item.name}</option>
                                ))}
                            </select>
                        </div>

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
                            <label htmlFor="design" className="block text-gray-700 text-sm font-bold mb-2">Design*</label>
                            <input
                                type="text"
                                id="design"
                                name="design"
                                value={formData.design}
                                onChange={handleChange}
                                placeholder="Design"
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
                        {(file || formData.media_path) && <Image loader={() => file ? file : imageSrc} src={file ? file : imageSrc} alt='image' width={100} height={100} className='w-24 mb-4' />}

                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                            {formData.id ? 'Update' : 'Submit'}
                        </button>
                    </form>
                </div>
            )}

            {/* Display client data */}
            <DataTable tableHeadings={['#', 'Client', 'URL', 'Image', 'Design', 'Status', 'Action']} dataArray={services} handleEdit={handleEdit}/>
        </div>
    );
}