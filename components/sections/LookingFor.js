
import { useContext } from 'react';
import SlidingForm from '@/components/sections/SlidingForm';
import MyContext from '@/context/MyContext';
import Link from 'next/link';


export default function LookingForSection({ text }) {
  const { openForm } = useContext(MyContext);

  return (
    <div>
      <div className="bg-gradient-to-r from-[#00203F] to-[#003366] flex flex-col md:flex-row justify-between items-center px-8 md:px-24 lg:px-32 py-10 shadow-lg text-white gap-6 md:gap-10">
        <h5 className="text-2xl md:text-3xl text-center md:text-left font-semibold leading-tight max-w-lg">
          {text ? text : 'Looking for Website Development?'}
        </h5>

        <button onClick={openForm} className="bg-blue-500 hover:bg-blue-600 flex items-center text-white px-8 py-4 rounded-full transition-all duration-300 shadow-md transform hover:scale-105">
          CONNECT TODAY
        </button>
      </div>

      <SlidingForm />
    </div>
  );
}
