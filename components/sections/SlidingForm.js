
import React, { useState, useRef, useEffect, useContext } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-toastify';
import MyContext from '@/context/MyContext';
import axios from 'axios';

function SlidingForm() {
  const { isOpen, setIsOpen } = useContext(MyContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const slideRef = useRef(null);

  const handleClose = () => setIsOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('/api/pages/contacts', formData);

      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });

      toast.success("Form Submitted!");
      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to submit!");
      console.error('Error submitting contact form:', error);
    }
  };

  useEffect(() => {
    if (slideRef.current) {
      if (isOpen) {
        slideRef.current.style.transform = 'translateX(0)';
      } else {
        slideRef.current.style.transform = 'translateX(100%)';
      }
    }
  }, [isOpen]);

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={handleClose}></div>
      )}
      <div
        ref={slideRef}
        style={{ transform: 'translateX(100%)', transition: 'transform 0.3s ease-in-out' }}
        className="fixed right-0 top-0 h-full w-full md:w-1/3 bg-white shadow-lg overflow-y-auto z-50"
      >
        <div className='bg-gray-200 flex justify-between items-center py-3 px-4'>
          <h2 className="text-lg text-black font-semibold">Contact Us</h2>
          <AiOutlineClose onClick={handleClose} className="text-gray-900 cursor-pointer" />
        </div>
        <form onSubmit={handleSubmit} className="py-8 px-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Full Name*
            </label>
            <input
              className="appearance-none border w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email*
            </label>
            <input
              className="appearance-none border w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
              Phone*
            </label>
            <input
              className="appearance-none border w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
              Message*
            </label>
            <textarea
              className="appearance-none border w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              rows={5}
              required
            />
          </div>
          <button type="submit" className="bg-[#00203f] hover:bg-blue-700 w-full text-white font-bold py-3 px-4 rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default SlidingForm;
