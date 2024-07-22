//component BlogMeta.js

"use client"

import Link from 'next/link';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from "react-icons/ai";

// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


export default function AddUpdateBlog() {

    const [blogMeta, setBlogMeta] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        slug: '',
        category: '',
        author: '',
        metaTitle: '',
        metaDescription: '',
        // content: '',
        // excerpt: ''
    });
    const [showForm, setShowForm] = useState(false);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get('/api/blog/blogs');
    //             setBlogMeta(response.data);
    //         } catch (error) {
    //             console.error('Error fetching data: ', error);
    //         }
    //     };

    //     fetchData();
    // }, []);

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
                metaTitle: '',
                metaDescription: '',
                // content: '',
                // excerpt: ''
            });
            setShowForm(false);
        } catch (error) {
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
            metaTitle: formData.metaTitle,
            metaDescription: formData.metaDescription,
            // content: formData.content,
            // excerpt: formData.excerpt
        };
        handleFormSubmit(postData, formData.id ? 'put' : 'post');
    };

    return (
        <div className="container border-t mx-auto w-full bg-white z-50 py-4 scrollbar-hide overflow-y-auto">
        
            <div className='flex justify-between items-center px-8 mb-4'>
                <h2 className="text-lg font-bold">Add Blog</h2>
                <Link href={'./blog'}><AiOutlineClose onClick={closeForm} className="text-gray-600 hover:text-gray-800" /></Link>
            </div>
            <form onSubmit={handleSubmit} className="p-8">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Title" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="slug">Slug</label>
                    <input type="text" id="slug" name="slug" value={formData.slug} onChange={handleChange} className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Slug" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">Category</label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    >
                        <option value="">Select</option>
                        <option value="show">A</option>
                        <option value="hide">B</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">Author</label>
                    <select
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    >
                        <option value="">Select</option>
                        <option value="show">A</option>
                        <option value="hide">B</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="metaTitle">Meta Title</label>
                    <input type="text" id="metaTitle" name="metaTitle" value={formData.metaTitle} onChange={handleChange} className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Meta Title" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="metaDescription">Meta Description</label>
                    <input type="text" id="metaDescription" name="metaDescription" value={formData.metaDescription} onChange={handleChange} className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Meta Description" required />
                </div>
                {/* <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">Blog Content</label>
                    <CKEditor
                        id="content" name="content"
                        editor={ ClassicEditor }
                        data={formData.content}
                        onReady={ editor => {
                            // You can store the "editor" and use when it is needed.
                            // console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event ) => {
                            // console.log( event );
                            // handleChange(event);
                        } }
                        onBlur={ ( event, editor ) => {
                            // console.log( 'Blur.', editor );
                        } }
                        onFocus={ ( event, editor ) => {
                            // console.log( 'Focus.', editor );
                        } }
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="excerpt">Body Excerpt</label>
                    <CKEditor
                        id="excerpt" name="excerpt"
                        editor={ ClassicEditor }
                        data={formData.excerpt}
                        onReady={ editor => {
                            // You can store the "editor" and use when it is needed.
                            // console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event ) => {
                            // console.log( event );
                            // handleChange(event);
                        } }
                        onBlur={ ( event, editor ) => {
                            // console.log( 'Blur.', editor );
                        } }
                        onFocus={ ( event, editor ) => {
                            // console.log( 'Focus.', editor );
                        } }
                    />
                </div> */}
                <button type="submit" className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    {formData.id ? "Update" : "Submit"}
                </button>
            </form>
        </div>
    );
}