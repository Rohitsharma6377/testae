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
                                {data.designation}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {data.media_id && <Image loader={() => `${process.env.NEXT_PUBLIC_BASE_URL}/${data.media_id}`}  src={`${process.env.NEXT_PUBLIC_BASE_URL}/${data.media_id}`} alt='image' width={50} height={50} className='w-24' />}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {data.status}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {data.text}
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

export default function Teams() {
    
    const [file, setFile] = useState({
        image: null,
        mobile_image: null
    });
    const [team, setTeam] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        designation: '',
        status: '',
        text: '',
        image: null,
    });
    const [showForm, setShowForm] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/pages/teams');
                setTeam(response.data);
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
            designation: '',
            status: '',
            text: '',
            image: null,
        });

        setShowForm(false);
    };

    const handleEdit = (index) => {
        const selectedBlogEntry = team[index];

        setFile(null);
    
        setFormData({
            id: selectedBlogEntry.id,
            name: selectedBlogEntry.name,
            designation: selectedBlogEntry.designation,
            status: selectedBlogEntry.status,
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
            const response = await axios[method]('/api/pages/teams', postData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            if (formData.id) {
                setTeam(team => {
                    const updatedData = [...team];
                    const index = updatedData.findIndex(meta => meta.id === formData.id);
                    updatedData[index] = response.data.data;
                    return updatedData;
                });
            } else {
                setTeam(team => [...team, response.data.data]);
            }
    
            setFormData({
                name: '',
                designation: '',
                status: '',
                text: '',
                image: null,
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
        formsData.append('designation', formData.designation);
        formsData.append('image', e.target.elements.image.files[0] ? e.target.elements.image.files[0] : formData.image);
        formsData.append('status', formData.status);
        formsData.append('text', formData.text);


        handleFormSubmit(formsData, formData.id ? 'put' : 'post');
        setShowForm(false);
    };


    const src = `${process.env.NEXT_PUBLIC_BASE_URL}/${formData.image}`;
    

    return (
        <div className="container mx-auto py-5 px-8">
            <button onClick={openForm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
                Add Team Member
            </button>

            {showForm && (
                <div className="fixed py-10 top-0 right-0 h-full w-1/3 bg-white shadow-lg z-50 overflow-y-auto">
                    <div className="flex justify-between items-center px-8 mb-4">
                        <h2 className="text-lg font-bold">{formData.id ? 'Update Banner' : 'Add Banner'}</h2>
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
                            <label htmlFor="designation" className="block text-gray-700 text-sm font-bold mb-2">Designation</label>
                            <input
                                type="text"
                                id="designation"
                                name="designation"
                                value={formData.designation}
                                onChange={handleChange}
                                placeholder="Designation"
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
                        {(file.image || formData.image) && <Image loader={() => file.image ? file.image : imageSrc} src={file.image ? file.image : imageSrc} alt='image' width={100} height={100} className='w-24' />}

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="text">Text</label>
                            {/* <Editor value={formData.text} onChange={handleEditorChange("text")} /> */}
                        </div>

                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                            {formData.id ? 'Update' : 'Submit'}
                        </button>
                    </form>
                </div>
            )}

            {/* Display client data */}
            <DataTable tableHeadings={['#', 'Name', 'Designation', 'Image', 'Text', 'Status', 'Action']} dataArray={team} handleEdit={handleEdit}/>
        </div>
    );
}