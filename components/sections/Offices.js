
import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const OfficesSection = () => {
  const offices = [
    { id: 1, city: 'Gurgaon', address: 'Second Floor, 1172, Sector- 45, Near DPS School, Gurgaon, Haryana- 122002' },
    { id: 2, city: 'Rewa', address: 'HIG 3/11/152, Infront of Anand Park, Nehru Nagar, Rewa, M.P - 486001' },
    { id: 3, city: 'Mumbai', address: 'Sar Park view, B 602, Plot- 31 & 45, Sec- 30, Kharghar - 410210' }
  ];

  const contactDetails = [
    { id: 1, type: 'Phone', value: '+91-8424 003 840 / +91-9695 871 040', icon: <FaPhoneAlt /> },
    { id: 2, type: 'Email', value: 'amit@amitkk.com', icon: <FaEnvelope /> }
  ];

  return (
    <section className="mx-auto px-10 md:px-20 lg:px-32 py-20 text-gray-900">
      <h1 className="text-center text-2xl md:text-3xl font-bold mb-2">Our Offices</h1>
      <hr className="border-t-2 w-20 mx-auto border-gray-400 mb-12" />

      <div className="grid sm:grid-cols-3 gap-8 mb-12">
        {offices.map((office) => (
          <div key={office.id} className=" bg-blue-500 border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-white text-blue-500 p-2 rounded-bl-xl">
              <FaMapMarkerAlt />
            </div>
            <h3 className="text-xl md:text-2xl font-semibold mb-2 text-white">{office.city}</h3>
            <p className="text-gray-100">{office.address}</p>
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-8">
        {contactDetails.map((detail) => (
          <div key={detail.id} className="bg-blue-500 border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-white text-blue-500 p-2 rounded-bl-xl">
              {detail.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">{detail.type}</h3>
            <p className="text-gray-100">{detail.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OfficesSection;
