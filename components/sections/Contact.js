
import axios from 'axios';
import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import MyContext from '@/context/MyContext';

export default function ContactSection({data}) {

    const { heading, description } = data[0];

    const { openForm } = useContext(MyContext);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

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
        } 
        
        catch (error) {
            toast.error("Failed to submit!");
            console.error('Error submitting contact form:', error);
        }
    };

    return (
        <section className="bg-[#00203f] pt-20 pb-10">
            <div className="px-10 md:px-20 lg:px-32">
                <div className="grid lg:grid-cols-2 gap-8">
                    
                    {/* Left Column */}
                    <div className="flex flex-col justify-center lg:items-start items-center text-center lg:text-left">
                        <h2 className="text-3xl md:text-4xl text-white font-bold mb-4 lg:w-96">{heading}</h2>
                        <p className="mb-6 text-white">{description}</p>
                        <button onClick={openForm} className="bg-blue-500 w-40 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-200">Get Started</button>
                    </div>

                    {/* Right Column - Form */}
                    <div className="md:px-6">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <input type="text" id="name" name="name" placeholder="Full Name" required value={formData.name} onChange={handleChange} className="w-full focus:outline-none text-white font-medium bg-transparent border-b-2 p-2" />
                            </div>
                            <div className="mb-4">
                                <input type="email" id="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} className="w-full focus:outline-none text-white font-medium bg-transparent border-b-2 p-2" />
                            </div>
                            <div className="mb-4">
                                <input type="tel" id="phone" name="phone" placeholder="Phone Number" required value={formData.phone} onChange={handleChange} className="w-full focus:outline-none text-white font-medium bg-transparent border-b-2 p-2" />
                            </div>
                            <div className="mb-4">
                                <textarea id="message" name="message" placeholder="Message" required value={formData.message} onChange={handleChange} className="w-full focus:outline-none text-white font-medium bg-transparent border-b-2 p-2" />
                            </div>
                            <button type="submit" className="bg-blue-500 mt-4 w-full text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-200">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
