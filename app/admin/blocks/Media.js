

"use client"

import { GetMedia, MediaPost } from '@/pages/api/auth/loginApi';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from "react-icons/ai";


export default function Medias() {
    const [MediaData, setMediaData] = useState()





    function DataTable({ head, dataArray }) {

        const handleEdit = (index) => {
            const selectedBlogEntry = blogMeta[index];

            setFormData({
                id: selectedBlogEntry.id,
                model: selectedBlogEntry.model,
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
                    {MediaData && MediaData.map((meta, index) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                {index + 1}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {meta.image}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {meta.alt}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {meta.image}
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

    function AddButton({ name }) {
        return (
            <button onClick={openForm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
                Add {name}
            </button>
        )
    }

    const [blogMeta, setBlogMeta] = useState([]);
    const [fileData, setFileData] = useState();
    const [formData, setFormData] = useState({
        file: '',
        alt: '',
        status: ''
    });
    const [showForm, setShowForm] = useState(false);

    const openForm = () => {
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name == 'file') {
            setFileData(e.target.files[0])

            // console.log(e.target.files[0])
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const FieldData = new FormData();
        FieldData.append('file', fileData);
        FieldData.append('alt', formData.alt);
        FieldData.append('status', formData.status)


        const response = await MediaPost(FieldData)
        if(response.status==200){
          setShowForm(false)
        }

    };

    const [formPosition, setFormPosition] = useState('-right-1/3');


    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await GetMedia()
                setMediaData(response.data)
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="container mx-auto py-5 px-8">

            <AddButton name={"Media"} />

            {showForm && (
                <div className={`fixed py-8 right-0 top-0 h-full w-1/3 bg-white shadow-lg z-50 overflow-y-auto`}>

                    <div className='flex justify-between items-center px-8 mb-4'>
                        <h2 className="text-lg font-bold">Add Media</h2>
                        <AiOutlineClose onClick={closeForm} className="text-gray-600 hover:text-gray-800" />
                    </div>

                    <form onSubmit={handleSubmit} className="p-8" encType="multipart/form-data">

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
                                File
                            </label>
                            <input
                                className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="file"
                                type="file"
                                name="file"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="select image"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="alt">
                                Alt
                            </label>
                            <input
                                className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="alt"
                                type="text"
                                name="alt"
                                value={formData.url}
                                onChange={handleChange}
                                placeholder="ALT"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                                Status
                            </label>
                            <select
                                className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="">Select Model</option>
                                <option value="A">Show</option>
                                <option value="B">Hide</option>
                            </select>
                        </div>

                        <button type="submit" className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            {formData.id ? "Update" : "Submit"}
                        </button>
                    </form>
                </div>
            )}

            <DataTable head={['#', 'Media', 'Alt', 'Path|URL', 'Created At', 'Action']} dataArray={blogMeta} />

        </div>
    );
}