//component team.js

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
                                {data.website_url}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {data.path && <Image loader={() => `${baseUrl}/${data.path}`}  src={`${baseUrl}/${data.path}`} alt={data.alt} width={100} height={100} className='w-32' />}
                            </td>
                            <td className="py-3 px-6 text-left" dangerouslySetInnerHTML={{ __html: data.text }}>
                            </td>
                            <td className="py-3 px-6 text-left">
                                <ToggleBtn key={index} table={'ui_portfolio'} status={data.status} id={data.id} />
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
                const response = await axios.get('/api/pages/ui-portfolio');

                console.log('//////////////////', response.data);
                setServices(response.data.ui_portfolio);
                setClients(response.data.websites);
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
        setFormData({});
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

    let imageSrc = `${baseUrl}/${formData.media_path}`;


    const handleEditorChange = (identifier) => (data) => {
        setFormData((prev) => ({
            ...prev,
            [identifier]: data,
        }));
    };


    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if(name === 'website'){
            const selectedValue = e.target.value;
            const website = clients.find(item => item.url === selectedValue);

            setFormData((prevFormData) => ({
                ...prevFormData,
                website_id: website.id,
                website_url: selectedValue,
                path: website.path
            }));

        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }

        if(files){
            setFile(URL.createObjectURL(e.target.files[0]));
        }
    };


    const handleFormSubmit = async (postData, method) => {
        try {
            const response = await axios[method]('/api/pages/ui-portfolio', postData);
    
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
    
            setFormData({});
            toast.success("Submitted!");

        } catch (error) {
            toast.error("Try Again.");
            console.error('Failed to update data', error);
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let formsData = {
            'website_id': formData.website_id,
            'website_url': formData.website_url,
            'path': formData.path,
            'text': formData.text,
            'status': formData.status,
            'display_order': formData.display_order ? formData.display_order : 1
        };

        if (formData.id) {
            formsData = {
                ...formsData, 
                'id': formData.id,
                'path': formData.path
            }
        }

        handleFormSubmit(formsData, formData.id ? 'put' : 'post');
        setShowForm(false);
    };
    

    return (
        <div className="container mx-auto py-5 px-8">
            <button onClick={openForm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
                Add UI Portfolio
            </button>

            {showForm && (
                <div className="fixed py-10 top-0 right-0 h-full w-1/3 bg-white shadow-lg z-50 overflow-y-auto">
                    <div className="flex justify-between items-center px-8 mb-4">
                        <h2 className="text-lg font-bold">{formData.id ? 'Update' : 'Add'} Portfolio</h2>
                        <AiOutlineClose onClick={closeForm} className="text-gray-600 hover:text-gray-800" />
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 bg-white rounded">

                        <div className="mb-4">
                            <label htmlFor="website" className="block text-gray-700 text-sm font-bold mb-2">Website*</label>
                            <select
                                id="website"
                                name="website"
                                value={formData.website_url}
                                onChange={handleChange}
                                className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            >
                                <option value="">Select</option>
                                {clients.map((item, index) => (
                                    <option key={item.id} value={item.url}>{item.url}</option>
                                ))}
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
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">Text*</label>
                            {/* <Editor value={formData.text} onChange={handleEditorChange("text")} /> */}
                        </div>

                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                            {formData.id ? 'Update' : 'Submit'}
                        </button>
                    </form>
                </div>
            )}

            {/* Display client data */}
            <DataTable tableHeadings={['#', 'Website', 'Media', 'Text', 'Status', 'Action']} dataArray={services} handleEdit={handleEdit}/>
        </div>
    );
}