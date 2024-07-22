"use client"

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from "react-icons/ai";

// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import dynamic from "next/dynamic";
// const Editor = dynamic(() => import('@/components/blocks/CKEditor'), { ssr: false });

import Image from 'next/image';

import { toast } from 'react-toastify';
import { slugify } from '@/utils/helper';
import { baseUrl } from '@/utils/helper';


export default function AddUpdatePage({ pageId }) {

    const { push } = useRouter();

    const [file, setFile] = useState({
        image: '',
        cover: ''
    });
    const [blogMeta, setBlogMeta] = useState([]);
    const [formData, setFormData] = useState({});

    const handleEditorChange = (identifier) => (data) => {
        setFormData((prev) => ({
            ...prev,
            [identifier]: data,
        }));
    };

    let imageSrc = `${baseUrl}/${formData.image}`;
    let coverSrc = `${baseUrl}/${formData.cover}`;


    useEffect(() => {

        {!pageId &&
        setFormData({
            model: 'page',
            sitemap: 'show',
            schema: 'show',
            status: 1
        })}

        const fetchData = async () => {
            try {
                let response = {};

                if(pageId) {
                    response = await axios.post('/api/page/get-page', {id: pageId});
                }
                else {
                    response = await axios.get('/api/page/get-page');
                }

                setBlogMeta(response.data[0]);
                pageId && setFormData(response.data[0]);

            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);


    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));        

        if(files) {
            setFile(prevState => ({
                ...prevState,
                [name]: URL.createObjectURL(e.target.files[0])
            }))
        }
    };

    const handleFormSubmit = async (postData, method) => {
        try {
            const apiUrl = method === 'post' ? `/api/page/add-page` : `/api/page/update-page`;
            const response = await axios[method](apiUrl, postData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });
            
            setFormData({
                id: '',
                name: '',
                url: '',
                model: '',
                sitemap: '',
                schema: '',
                status: '',
                image: '',
                cover: '',
                meta_title: '',
                meta_description: '',
                faq_title: '',
                faq_description: '',
                testimonial_title: '',
                testimonial_description: '',
                content: ''
            });

            toast.success("Submitted!");
            push('/admin/pages');

        } catch (error) {
            toast.error("Try Again.");
            console.error('Failed to update data', error);
        }
    };

    const handleSubmit = async (e) => {
        console.log(formData);
        e.preventDefault();

        const formsData = new FormData();

        if(formData.id) {
            formsData.append('id', formData.id);
            formsData.append('image', e.target.elements.image.files[0] ? e.target.elements.image.files[0] : blogMeta.image);
            formsData.append('cover', e.target.elements.cover.files[0] ? e.target.elements.cover.files[0] : blogMeta.cover);
            formsData.append('image_path', blogMeta.image ? blogMeta.image : null);
            formsData.append('cover_path', blogMeta.cover ? blogMeta.cover : null);
        } else {
            formsData.append('image', e.target.elements.image.files[0] ? e.target.elements.image.files[0] : null);
            formsData.append('cover', e.target.elements.cover.files[0] ? e.target.elements.cover.files[0] : null);
        }

        formsData.append('name', formData.name);
        formsData.append('url', '/' + slugify(formData.url.toLowerCase()));
        formsData.append('model', formData.model);
        formsData.append('sitemap', formData.sitemap);
        formsData.append('schema', formData.schema);
        formsData.append('status', formData.status);

        formsData.append('media_id', formData.media_id);
        formsData.append('cover_id', formData.cover_id);

        formsData.append('meta_title', formData.meta_title);
        formsData.append('meta_description', formData.meta_description);
        formsData.append('faq_title', formData.faq_title);
        formsData.append('faq_description', formData.faq_description);
        formsData.append('testimonial_title', formData.testimonial_title);
        formsData.append('testimonial_description', formData.testimonial_description);
        formsData.append('content', formData.content);

        handleFormSubmit(formsData, formData.id ? 'put' : 'post');
    };


    return (
        <div className="container h-full border-t mx-auto w-full bg-white z-50 py-4 scrollbar-hide overflow-x-auto">
        
            <div className='flex justify-between items-center px-8 mb-4'>
                <h2 className="text-lg font-bold">{pageId ? 'Update Page' : 'Add Page'}</h2>
                <AiOutlineClose onClick={() => push('/admin/pages')} className="text-gray-600 hover:text-gray-800" />
            </div>

            <form onSubmit={handleSubmit} className="p-8">
                <div className='grid grid-cols-4 gap-10'>
                    <div className="mb-4 w-full">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name*</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Name" required />
                    </div>
                    <div className="mb-4 w-full">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="url">URL*</label>
                        <input type="text" id="url" name="url" value={formData.url} onChange={handleChange} className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="URL" required />
                    </div>
                    <div className="mb-4 w-full">
                        <label htmlFor="model" className="block text-gray-700 text-sm font-bold mb-2">Model*</label>
                        <select
                            id="model"
                            name="model"
                            value={formData.model}
                            onChange={handleChange}
                            className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        >
                            <option value="">Select Model</option>
                            <option value="page">Page</option>
                            <option value="blog">Blog</option>
                        </select>
                    </div>
                    <div className="mb-4 w-full">
                        <label htmlFor="sitemap" className="block text-gray-700 text-sm font-bold mb-2">Sitemap*</label>
                        <select
                            id="sitemap"
                            name="sitemap"
                            value={formData.sitemap}
                            onChange={handleChange}
                            className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        >
                            <option value="">Select Sitemap</option>
                            <option value="show">Show</option>
                            <option value="hide">Hide</option>
                        </select>
                    </div>
                </div>

                <div className='grid grid-cols-4 gap-10'>
                    <div className="mb-4">
                        <label htmlFor="schema" className="block text-gray-700 text-sm font-bold mb-2">Schema*</label>
                        <select
                            id="schema"
                            name="schema"
                            value={formData.schema}
                            onChange={handleChange}
                            className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        >
                            <option value="">Select Schema</option>
                            <option value="show">Show</option>
                            <option value="hide">Hide</option>
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
                            <option value="">Select Status</option>
                            <option value="1">Show</option>
                            <option value="0">Hide</option>
                        </select>
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

                        {(file.image || formData.image) && <Image loader={() => file.image ? file.image : imageSrc} src={file.image ? file.image : imageSrc} alt='image' width={100} height={100} className='w-24'/>}
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="cover" className="block text-gray-700 text-sm font-bold mb-2">Testimonial Cover</label>
                        <input
                            type="file"
                            id="cover"
                            name="cover"
                            accept="image/*"
                            // value={formData.cover}
                            onChange={handleChange}
                            className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />

                        {(file.cover || formData.cover) && <Image loader={() => file.cover ? file.cover : coverSrc} src={file.cover ? file.cover : coverSrc} alt='cover' width={100} height={100} className='w-24'/>}
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="meta_title">Meta Title*</label>
                    <input type="text" id="meta_title" name="meta_title" value={formData.meta_title} onChange={handleChange} className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Title" required />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="meta_description">Meta Description*</label>
                    <input type="text" id="meta_description" name="meta_description" value={formData.meta_description} onChange={handleChange} className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Description" required />
                </div>

                <div className='grid grid-cols-2 gap-10'>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="faq_title">FAQ Title</label>
                        <input type="text" id="faq_title" name="faq_title" value={formData.faq_title} onChange={handleChange} className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="FAQ Title" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="testimonial_title">Testimonial Title</label>
                        <input type="text" id="testimonial_title" name="testimonial_title" value={formData.testimonial_title} onChange={handleChange} className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Testimonial Title" />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="faq_description">FAQ Description</label>
                    {/* <Editor value={formData.faq_description} onChange={handleEditorChange("faq_description")} /> */}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="testimonial_description">Testimonial Description</label>
                    {/* <Editor value={formData.testimonial_description} onChange={handleEditorChange("testimonial_description")} /> */}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">Content</label>
                    {/* <Editor value={formData.content} onChange={handleEditorChange("content")} /> */}
                </div>

                <button type="submit" className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    {pageId ? 'Update' : 'Submit'}
                </button>
            </form>
        </div>
    );
}