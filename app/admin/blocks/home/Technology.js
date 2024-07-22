
"use client";

import axios from 'axios';
import { slugify } from '@/utils/helper';
import Image from 'next/image';
import { useState, useEffect } from 'react';

import ToggleBtn from "@/components/blocks/ToggleBtn";
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { baseUrl } from '@/utils/helper';


function DataTable({ tableHeadings, dataArray, handleEdit }) {
  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          {tableHeadings.map((value, index) => (
            <th key={index} className="py-3 px-6 text-left">
              {value}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="text-gray-600 text-sm font-light [&>*:nth-child(even)]:bg-gray-200">
        {dataArray.map((data, index) => (
          <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
            <td className="py-3 px-6 text-left">{index + 1}</td>
            <td className="py-3 px-6 text-left whitespace-nowrap">{data.name}</td>
            <td className="py-3 px-6 text-left">{data.url}</td>
            <td className="py-3 px-6 text-left">
              {data.media_path && (
                <Image
                  loader={() => `${baseUrl}/${data.media_path}`}
                  src={`${baseUrl}/${data.media_path}`}
                  alt={data.media_alt}
                  width={50}
                  height={50}
                  className="w-24"
                />
              )}
            </td>
            <td className="py-3 px-6 text-left">
                <ToggleBtn key={index} table={'technology'} status={data.status} id={data.id} />
            </td>
            <td className="py-3 px-6 text-left">
              <button
                onClick={() => handleEdit(index)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Technology() {
  const [file, setFile] = useState(null);
  const [technology, setTechnology] = useState([]);
  const [formData, setFormData] = useState({});
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/technology/get-technology');
        setTechnology(response.data);
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
    const selectedEntry = technology[index];

    setFile(null);

    setFormData({
      id: selectedEntry.id,
      name: selectedEntry.name,
      url: selectedEntry.url,
      description: selectedEntry.description,
      media_id: selectedEntry.media_id,
      status: selectedEntry.status,
      display_order: selectedEntry.display_order,
      media_path: selectedEntry.media_path,
      image: selectedEntry.image
    });

    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (files) {
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleFormSubmit = async (postData, method) => {
    const apiUrl = method === 'put' ? '/api/technology/update-technology' : '/api/technology/add-technology';

    try {
      const response = await axios[method](apiUrl, postData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (formData.id) {
        setTechnology((technology) => {
          const updatedData = [...technology];
          const index = updatedData.findIndex((meta) => meta.id === formData.id);
          updatedData[index] = response.data.data;
          return updatedData;
        });
      } else {
        setTechnology((technology) => [...technology, response.data.data]);
      }

      setFormData({});
      toast.success('Submitted!');
    } catch (error) {
      toast.error('Failed to update data');
      console.error('Failed to update data', error);
    } finally {
      setShowForm(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formsData = new FormData();

    if (formData.id) {
      formsData.append('id', formData.id);
    }

    formsData.append('name', formData.name);
    formsData.append('url', '/' + slugify(formData.url.toLowerCase()));
    formsData.append('description', formData.description ? formData.description : null);
    formsData.append('media_id', formData.media_id);
    formsData.append('display_order', formData.display_order ? formData.display_order : 1);
    formsData.append('status', formData.status);
    formsData.append('image', e.target.elements.image.files[0] ? e.target.elements.image.files[0] : formData.media_path);
    formsData.append('media_path', formData.media_path);

    handleFormSubmit(formsData, formData.id ? 'put' : 'post');
  };

  const imageSrc = formData.media_path ? `${baseUrl}/${formData.media_path}` : null;

  return (
        <div className="container mx-auto py-5 px-8">
            <button onClick={openForm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
                Add Technology
            </button>

            {showForm && (
                <div className="fixed py-10 top-0 right-0 h-full w-1/3 bg-white shadow-lg z-50 overflow-y-auto scrollbar-hide">
                <div className="flex justify-between items-center px-8 mb-4">
                    <h2 className="text-lg font-bold">{formData.id ? 'Update' : 'Add'} Technology</h2>
                    <AiOutlineClose onClick={closeForm} className="text-gray-600 hover:text-gray-800" />
                </div>

                <form onSubmit={handleSubmit} className="p-8 bg-white rounded">
                    <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                        Name*
                    </label>
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
                    <label htmlFor="url" className="block text-gray-700 text-sm font-bold mb-2">
                        URL*
                    </label>
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
                    <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                        Description*
                    </label>
                    <textarea
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        rows={5}
                    />
                    </div>

                    <div className="mb-4">
                    <label htmlFor="display_order" className="block text-gray-700 text-sm font-bold mb-2">
                        Display Order
                    </label>
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
                    <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">
                        Status*
                    </label>
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
                        <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
                            Image*
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required={!formData.media_path}
                        />
                    </div>

                    {(file || formData.media_path) && (
                        <Image
                            loader={() => (file ? file : imageSrc)}
                            src={file ? file : imageSrc}
                            alt="image"
                            width={100}
                            height={100}
                            className="w-24 mb-4"
                        />
                    )}

                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                        {formData.id ? 'Update' : 'Submit'}
                    </button>
                </form>
            </div>
        )}
        
        <DataTable tableHeadings={['#', 'Name', 'URL', 'Image', 'Status', 'Action']} dataArray={technology} handleEdit={handleEdit}/>
        
        </div>
        );
    }