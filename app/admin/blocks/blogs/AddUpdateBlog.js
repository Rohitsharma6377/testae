
"use client"

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { slugify } from '@/utils/helper';
import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from "react-icons/ai";

// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// import dynamic from "next/dynamic";
// const Editor = dynamic(() => import('@/components/blocks/CKEditor'), { ssr: false });

import Image from 'next/image';

import { toast } from 'react-toastify';
import { baseUrl } from '@/utils/helper';


export default function AddUpdateBlog({ blogId }) {

    const { push } = useRouter();

    const [file, setFile] = useState(null);
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

    const handleEditorChange = (identifier) => (data) => {
        setFormData((prev) => ({
            ...prev,
            [identifier]: data,
        }));
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(blogId ? ('/api/blog/update-blog/' + blogId) : ('/api/blog/blogs'));
                setBlogMeta(response.data[0]);
                blogId && setFormData(response.data[0]);

                // console.log('file', response.data[0]);

            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        //// console.log(e.target.files[0]);
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
        
        if(files){
            setFile(URL.createObjectURL(e.target.files[0]));
        }

        // console.log(e.target.files);
    };

    const handleFormSubmit = async (postData, method) => {
        try {
            const response = await axios[method](method === 'put' ? `/api/blog/update-blog/${formData.id}` : `/api/blog/blogs`, postData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                },
            });
            
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

            toast.success("Submitted!");

        } 
        catch (error) {
            toast.error("Try Again.");
            console.error('Failed to update data', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formsData = new FormData();
        formsData.append('title', formData.title);
        formsData.append('slug', slugify(formData.slug, { lower: true }));
        formsData.append('category', formData.category);
        formsData.append('author', formData.author);
        formsData.append('meta_title', formData.meta_title);
        formsData.append('meta_desc', formData.meta_desc);
        formsData.append('content', formData.content);
        formsData.append('excerpt', formData.excerpt);
        formsData.append('image', e.target.elements.image.files[0] ? e.target.elements.image.files[0] : blogMeta.image_path);

        

        // console.log(e.target.elements.image.files[0], blogMeta.image_path, formData);

        handleFormSubmit(formsData, formData.id ? 'put' : 'post');
        push('/admin/blog');
    };


    const src = `${baseUrl}/${formData.image_path}`;

    return (
        <div className="container h-full border-t mx-auto w-full bg-white z-50 py-4 scrollbar-hide overflow-x-auto">
        
            <div className='flex justify-between items-center px-8 mb-4'>
                <h2 className="text-lg font-bold">{blogId ? 'Update Blog' : 'Add Blog'}</h2>
                <Link href={blogId ? '../blog' : './blog'}><AiOutlineClose className="text-gray-600 hover:text-gray-800" /></Link>
            </div>
            <form onSubmit={handleSubmit} className="p-8">
                <div className='flex gap-10'>
                    <div className="mb-4 w-full">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
                        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Title" required />
                    </div>
                    <div className="mb-4 w-full">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="slug">Slug</label>
                        <input type="text" id="slug" name="slug" value={formData.slug} onChange={handleChange} className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Slug" required />
                    </div>
                </div>

                <div className='flex gap-10'>
                    <div className="mb-4 w-full">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">Category</label>
                        <select
                            multiple
                            id="category"
                            name="category"
                            value={formData.category || []}
                            onChange={handleChange}
                            className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                            size="5"  // Optional: Shows multiple options at once without needing to scroll
                        >
                            <option value="A">Category A</option>
                            <option value="B">Category B</option>
                            <option value="C">Category C</option>
                            <option value="D">Category D</option>
                            <option value="E">Category E</option>
                        </select>
                    </div>
                    <div className="mb-4 w-full">
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
                </div>


                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="meta_title">Meta Title</label>
                    <input type="text" id="meta_title" name="meta_title" value={formData.meta_title} onChange={handleChange} className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Meta Title" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="meta_desc">Meta Description</label>
                    <input type="text" id="meta_desc" name="meta_desc" value={formData.meta_desc} onChange={handleChange} className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Meta Description" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">Blog Content</label>
                    {/* <Editor value={formData.content} onChange={handleEditorChange("content")} /> */}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="excerpt">Body Excerpt</label>
                    {/* <Editor value={formData.excerpt} onChange={handleEditorChange("excerpt")} /> */}
                </div>

                <div className="mb-4">
                    <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Image</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        // value={formData.image}
                        onChange={handleChange}
                        className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />

                    {(file || formData.image_path) && <Image loader={() => file ? file : src} src={file ? file : src} alt='image' width={100} height={100} className='w-24'/>}
                </div>

                <button type="submit" className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    {blogId ? 'Update' : 'Submit'}
                </button>
            </form>
        </div>
    );
}