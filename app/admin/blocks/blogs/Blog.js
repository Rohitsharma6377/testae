//component BlogMeta.js

"use client"


import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from 'next/navigation';
import threeDots from '@/assets/action.svg'

import { toast } from 'react-toastify';


export default function BlogMeta() {

    const { push } = useRouter();
    const [blogMeta, setBlogMeta] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        slug: '',
        category: '',
        author: '',
        meta_title: '',
        meta_desc: '',
        content: '',
        excerpt: ''
    });
    const [showForm, setShowForm] = useState(false);

    
    function DataTable({head, dataArray}) {

        const [openIndex, setOpenIndex] = useState(false);

        const handleActionBtns = (index) => {
            setOpenIndex(openIndex === index ? null : index);
        }

        const handleEdit = (id) => {
            push(`/admin/update-blog/${id}`);
        }

        return (
            <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            {head.map(function(val, index){
                                return (
                                    <th  key={index} className="py-3 px-6 text-left">{val}</th>
                                )
                            })}
                        </tr>
                    </thead>

                    <tbody className="text-gray-600 text-sm font-light">
                        {dataArray.map((data, index) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">
                                    {index + 1}
                                </td>
                                <td className="py-3 px-6 text-left">
                                    Title: {data.title} <br/> Slug: {data.slug}
                                </td>
                                <td className="py-3 px-6 text-left">
                                    Category: {data.category} <br/> Author: {data.author}
                                </td>
                                <td className="py-3 px-6 text-left">
                                    Title: {data.meta_title} <br/> Desc: {data.meta_desc}
                                </td>
                                <td className="py-3 px-6 text-left">
                                    Content: {data.content.substring(0, 200)} <br/> Excerpt: {data.excerpt}
                                </td>
                                <td className="py-3 px-6 text-left relative" onMouseEnter={() => handleActionBtns(index)} onMouseLeave={() => handleActionBtns(null)}>
                                    <Image src={threeDots} width={20} height={20} alt="Action Menu" className={`mx-auto ${openIndex === index && 'hidden'}`} />
                                    <div className={`action-buttons flex flex-col py-2 px-0 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 absolute z-10 top-0 right-0 ${openIndex !== index && 'hidden'}`}>
                                        <button onClick={() => push(`/admin/update-blog/${data.id}`)} className="block text-left w-full px-4 py-2 text-sm text-black hover:bg-gray-100">
                                            Edit
                                        </button>
                                        <button onClick={() => push(`/admin/update-faq/page/${data.id}`)} className="block text-left w-full px-4 py-2 text-sm text-black hover:bg-gray-100">
                                            Edit FAQ
                                        </button>
                                        <button  onClick={() => push(`/admin/update-testimonial/page/${data.id}`)} className="block text-left w-full px-4 py-2 text-sm text-black hover:bg-gray-100 text-nowrap">
                                            Edit Testimonial
                                        </button>
                                    </div>
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
                const response = await axios.get('/api/blog/blogs');
                setBlogMeta(response.data);
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
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFormSubmit = async (postData, method) => {
        try {
            const response = await axios[method]('/api/blog/blogs', postData);
            if (formData.id) {
                setBlogMeta(blogMeta => {
                    const updatedMeta = [...blogMeta];
                    const index = updatedMeta.findIndex(meta => meta.id === formData.id);
                    updatedMeta[index] = response.data.data;
                    return updatedMeta;
                });
            } else {
                setBlogMeta(blogMeta => [...blogMeta, response.data.data]);
            }
            setFormData({
                title: '',
                slug: '',
                category: '',
                author: '',
                meta_title: '',
                meta_desc: '',
                content: '',
                excerpt: ''
            });
            setShowForm(false);

            toast.success("Submitted!");
        } 
        
        catch (error) {
            toast.error("Try Again.");
            console.error('Failed to update data', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let postData = {
            title: formData.title,
            slug: formData.slug,
            category: formData.category,
            author: formData.author,
            meta_title: formData.meta_title,
            meta_desc: formData.meta_desc,
            content: formData.content,
            excerpt: formData.excerpt
        };
        handleFormSubmit(postData, formData.id ? 'put' : 'post');
    };

    return (
        <div className="container mx-auto py-5 px-8">
            
            <Link href={'./add-blog'}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
                    Add Blog
                </button>
            </Link>

            <DataTable head={['#' ,'Title|Slug', 'Author|Category', 'Meta Title|Desc', 'Content|Excerpt', 'Actions']} dataArray={blogMeta} />
        </div>
    );
}