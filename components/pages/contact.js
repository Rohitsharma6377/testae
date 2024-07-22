
import Footer from "@/components/sections/Footer";
import Nav from '@/components/sections/Navbar';
import Offices from '@/components/sections/Offices';
import { useState } from "react";


function ContactPage() {

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
    <div>
      <Nav />

      <h1 className="mt-32 mb-2 text-center font-semibold text-2xl md:text-3xl">Contact Us</h1>
      <hr className="border-t-2 w-20 mx-auto border-gray-400 mb-6" />
      <p className="text-center mb-10 heading">Feel free to connect with us for any requirement</p>

      <div className="px-10 md:px-32">
        <div className="mx-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 justify-between gap-4">
            {/* Left Column */}
            <div className="text-center lg:text-left px-4 my-auto max-lg:mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-[#00203f] mb-4">Let&apos;s discuss your project.</h2>
              <p className="mb-4 leading-4">
                Address: 1172, Second Floor, Sec 45, Gurgaon - 122002
                <br/><br/>
                Phone: +91-8424003840 / +91-9354811331 / +91-9695871040
                <br/><br/>
                Email: amit@amitkk.com / amit.khare588@gmail.com
              </p>
            </div>

            {/* Right Column - Form */}
            <div className="px-4 md:px-10">
              <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                      <input type="text" id="name" name="name" placeholder="Full Name" required value={formData.name} onChange={handleChange} className="w-full focus:outline-none text-black font-medium bg-transparent border-b-2 p-2" />
                  </div>
                  <div className="mb-4">
                      <input type="email" id="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} className="w-full focus:outline-none text-black font-medium bg-transparent border-b-2 p-2" />
                  </div>
                  <div className="mb-4">
                      <input type="tel" id="phone" name="phone" placeholder="Phone Number" required value={formData.phone} onChange={handleChange} className="w-full focus:outline-none text-black font-medium bg-transparent border-b-2 p-2" />
                  </div>
                  <div className="mb-4">
                      <textarea id="message" name="message" placeholder="Message" required value={formData.message} onChange={handleChange} className="w-full focus:outline-none text-black font-medium bg-transparent border-b-2 p-2" />
                  </div>
                  <button type="submit" className="bg-[#00203f] mt-4 w-full text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-200">Submit</button>
              </form>
            </div>

          </div>
          <div className="col-span-12 pt-20 h-[400px]">
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14032.680907181308!2d77.0659965!3d28.4442845!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xa49f27516db76e70!2sAmitkk%20-%20Website%20Development%20Company%20in%20Gurgaon!5e0!3m2!1sen!2sin!4v1646049852954!5m2!1sen!2sin" allowFullScreen="" className="w-full h-full border-none rounded" loading="lazy"></iframe>
          </div>
        </div>
      </div>

      <Offices />

      <Footer />
    </div>
  );
}

export default ContactPage;
