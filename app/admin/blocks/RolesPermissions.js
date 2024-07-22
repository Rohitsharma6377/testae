//component Roles&Permissions.js

"use client"

import { GetRolesPermission, RolesPermission, UpdateRoles } from '@/pages/api/auth/loginApi';
import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from "react-icons/ai";


export default function RolesPermissions() {

    //component author.js
    const [Roles, setRolesData] = useState([]);

    const handleEdit = async (data) => {
        setShowForm(true);
        setShowBtn(true)
        const response = await UpdateRoles({ id: data._id });
        if (response.status == 200) {
            setFormData({
                name: response.data.name,
                type: response.data.type,
                guardname: response.data.guardname,
                id: response.data._id
            })
        }

    }

    // const UpdateRoless = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await UpdateRolesPermission(formData);
    //         setFormData({
    //             name: '',
    //             type: '',
    //             guardname: '',
    //             id: ''
    //         })
    //         setShowForm(false);
    //         setShowBtn(false)
            

    //     } catch (error) {

    //     }
       

    // }

    function DataTable({ head, dataArray }) {
        return (

            <table className="w-full table-auto">
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        {
                            head.map((value, index) => (
                                <th key={index} className="py-3 px-6 text-left" >{value}</th>
                            ))
                        }
                    </tr>
                </thead>

                <tbody className="text-gray-600 text-sm font-light">
                    {Roles && Roles.map((meta, index) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                {index + 1}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {meta.type}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {meta.name}
                            </td>

                            <td className="py-3 px-6 text-left">
                                {meta.guardname}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {meta.time}
                            </td>
                            <td className="py-3 px-6 text-left">
                                <button onClick={() => handleEdit(meta)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Edit</button>
                            </td>
                        </tr>))}
                </tbody>
            </table>
        )
    }


    const [author, setAuthor] = useState([]);
    const [formData, setFormData] = useState({
        type: '',
        name: '',
        guardname: '',
        id: false,
    });
    const [showForm, setShowForm] = useState(false);
    const [showBtn, setShowBtn] = useState(false);
    const fetchData = async () => {
        try {
            const response = await GetRolesPermission()
            setRolesData(response.data)
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    useEffect(() => {

        fetchData();
    }, []);

    const openForm = () => {
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {

        try {
            e.preventDefault();
            const response = await RolesPermission(formData);
            if (response.status == 200) {
                setShowForm(false);
                setFormData({

                    name: "",
                    type: "",
                    guardname: ""
                })
            }
        } catch (error) {
            // console.log("error while inserting Roles & Permissions", error.message)
        }
    };


    return (
        <div className="container mx-auto py-5 px-8">
            <button onClick={openForm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
                Add Roles & Permissions
            </button>

            {showForm && (
                <div className="fixed flex flex-col justify-center top-0 right-0 h-full w-1/3 bg-white shadow-lg z-50 overflow-y-auto">
                    <div className="flex justify-between items-center px-8 mb-4">
                        <h2 className="text-lg font-bold">{formData.id ? 'Update Author Form' : 'Add Author Form'}</h2>
                        <AiOutlineClose onClick={closeForm} className="text-gray-600 hover:text-gray-800" />
                    </div>

                    <form  className="p-8 bg-white rounded">
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
                            <label htmlFor="type" className="block text-gray-700 text-sm font-bold mb-2">Type</label>
                            <select
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            >
                                <option value="">Select</option>
                                <option value="Role">Role</option>
                                <option value="Permission">Permission</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="guardname" className="block text-gray-700 text-sm font-bold mb-2">Guardname</label>
                            <textarea
                                id="guardname"
                                name="guardname"
                                value={formData.guardname}
                                onChange={handleChange}
                                placeholder="Guard name"
                                className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                rows="10"
                            />
                        </div>
                        {showBtn &&
                            <button onClick={''} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full" >
                                Update
                            </button>
                        }
                        {!showBtn &&
                            <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                                Submit
                            </button>
                        }
                    </form>
                </div>
            )}

            {/* Display author data */}
            <DataTable head={['#', 'Type', 'Name', 'Guard Name', 'Date', 'Action']} dataArray={author} Role={Roles} />
        </div>
    );
}