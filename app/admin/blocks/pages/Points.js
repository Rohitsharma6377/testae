"use client"

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { toast } from "react-toastify";

// import dynamic from "next/dynamic";
// const Editor = dynamic(() => import('@/components/blocks/CKEditor'), { ssr: false });

import Pagination from "@/components/blocks/Pagination";
import ToggleBtn from "@/components/blocks/ToggleBtn";
import MyContext from "@/context/MyContext";

export default function Points({ modelData }) {
  const { searchTerm, setSearchTerm, itemsPerPage } = useContext(MyContext);
  const [file, setFile] = useState(null);
  const [points, setPoints] = useState([]);
  const [pages, setPages] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    para: "",
    status: "",
    text: "",
    image: null,
  });
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchPageData = async (page) => {
    try {
      const response = await axios.post(`/api/point/get-point`, {
        page,
        itemsPerPage: itemsPerPage || 10,
        modelData,
      });
      setFile(null);
      setPoints(response.data.points);
      setPages(response.data.pages);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handlePageChange = (newPage) => setCurrentPage(newPage);

  useEffect(() => {
    setSearchTerm("");
    fetchPageData(currentPage);
  }, [currentPage, itemsPerPage]);

  const openForm = () => {
    setShowForm(true);
    setFormData({
      status: 1,
      name: "",
      para: "",
      text: "",
      image: null,
    });
  };

  const closeForm = () => setShowForm(false);

  // const handleEditorChange = (identifier) => (event, editor) => {
  //   const data = editor.getData();
  //   setFormData((prev) => ({
  //     ...prev,
  //     [identifier]: data,
  //   }));
  // };

  const handleEditorChange = (identifier) => (data) => {
    setFormData((prev) => ({
      ...prev,
      [identifier]: data,
    }));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (files) {
      setFile(URL.createObjectURL(files[0]));
    }
  };

  const handleFormSubmit = async (postData, method) => {
    try {
      const apiUrl = method === "post" ? "/api/point/add-point" : "/api/point/update-point";
      const response = await axios[method](apiUrl, postData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (formData.id) {
        setPoints((prev) =>
          prev.map((point) => (point.id === formData.id ? response.data.data : point))
        );
      } else {
        setPoints((prev) => [...prev, response.data.data]);
      }

      toast.success("Submitted!");
      fetchPageData(currentPage);
    } catch (error) {
      toast.error("Try Again.");
      console.error("Failed to update data", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    if (formData.id) {
      form.append("id", formData.id);
      form.append("media_id", formData.media_id);
      form.append("media_path", formData.media_path);
    }
    
    form.append("model", modelData.model);
    form.append("model_id", modelData.model_id);
    form.append("status", formData.status);
    form.append("name", formData.name);
    form.append("para", formData.para);
    form.append("text", formData.text);
    form.append("image", e.target.elements.image.files[0] || formData.image);

    handleFormSubmit(form, formData.id ? "put" : "post");
    setShowForm(false);
  };

  const src = `${process.env.NEXT_PUBLIC_BASE_URL}/${formData.image}`;

  const DataTable = ({ head, dataArray }) => {
    const filteredData = searchTerm
      ? dataArray.filter((item) => item.para.toLowerCase().includes(searchTerm.toLowerCase()))
      : dataArray;

    const handleEdit = (index) => {
      const selected = dataArray[index];
      setFile(null);
      setFormData({
        id: selected.id,
        status: selected.status,
        name: selected.name,
        para: selected.para,
        text: selected.text,
        media_id: selected.media_id,
        media_path: selected.media_path,
        image: selected.media_path,
      });
      setShowForm(true);
    };

    return (
      <div>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              {head.map((value, index) => (
                <th key={index} className="py-3 px-6 text-left">
                  {value}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light [&>*:nth-child(even)]:bg-gray-200">
            {filteredData.map((data, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{(currentPage - 1) * 10 + index + 1}</td>
                <td className="py-3 px-6 text-left">{pages.find((item) => item.id === Number(data.model_id))?.name}</td>
                <td className="py-3 px-6 text-left">{data.name}</td>
                <td className="py-3 px-6 text-left">{data.para}</td>
                <td className="py-3 px-6 text-left">
                  {data.media_path && (
                    <Image
                      loader={() => `${process.env.NEXT_PUBLIC_BASE_URL}/${data.media_path}?t=${new Date().getTime()}`}
                      src={`${process.env.NEXT_PUBLIC_BASE_URL}/${data.media_path}`}
                      alt={data.media_alt}
                      width={50}
                      height={50}
                      className="w-16"
                    />
                  )}
                </td>
                <td className="py-3 px-6 text-center">
                  <ToggleBtn key={index} table={"points"} status={data.status} id={data.id} />
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
        <div className="mt-4 flex justify-center">
          <Pagination total={totalPages} initialPage={currentPage} onChange={handlePageChange} />
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-5 px-8">
      {modelData && (
        <button onClick={openForm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
          Add Point
        </button>
      )}
      {showForm && (
        <div className="fixed py-10 top-0 right-0 h-full w-1/3 bg-white shadow-lg z-50 scrollbar-hide overflow-y-auto">
          <div className="flex justify-between items-center px-8 mb-4">
            <h2 className="text-lg font-bold">{formData.id ? "Update Point" : "Add Point"}</h2>
            <AiOutlineClose onClick={closeForm} className="text-gray-600 hover:text-gray-800" />
          </div>
          <form onSubmit={handleSubmit} className="p-8 bg-white rounded">
            <div className="mb-4 w-full">
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
                <option value="">Select Status</option>
                <option value="1">Show</option>
                <option value="0">Hide</option>
              </select>
            </div>
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
              <label htmlFor="para" className="block text-gray-700 text-sm font-bold mb-2">
                Para*
              </label>
              <input
                type="text"
                id="para"
                name="para"
                value={formData.para}
                onChange={handleChange}
                placeholder="Para"
                className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="text">
                Text*
              </label>
              {/* <Editor value={formData.text} onChange={handleEditorChange("text")} /> */}
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
                required={!formData.image}
              />
            </div>
            <div className="mb-4">
              {(file || formData.image) && (
                <Image
                  loader={() => (file ? file : src)}
                  src={file ? file : src}
                  alt="image"
                  width={100}
                  height={100}
                  className="w-24"
                />
              )}
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
              {formData.id ? "Update" : "Submit"}
            </button>
          </form>
        </div>
      )}
      <DataTable head={["#", "Page", "Name", "Para", "Media", "Status", "Action"]} dataArray={points} />
    </div>
  );
}