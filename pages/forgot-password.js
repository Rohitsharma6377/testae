
import Image from 'next/image';
import React, { useState } from 'react';
import logo from '@/assets/amitkk-logo.svg';
import Nav from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import { ForgotPass, ResetPass } from '@/pages/api/auth/loginApi';
import { toast } from 'react-toastify';
import { useParams } from 'next/navigation';


export default function ForgotPage() {
    // const params = useParams();
    // const id = params.resetid1;
    // const token = params.resetid2;

    const [ForgotData, SetData] = useState({
        email: "",
        password: "",
        rememberMe: false
    });

    const handleSubmit = async () => {

        try {
            const response = await ForgotPass({ email: ForgotData.email });

            if (response.status == 200) {
                toast.success("Reset Password Link Successfull Send");
            } else if (response.status !== 200) {
                toast.error("Invalid Email Address")
            }

        } catch (error) {
            console.log("Sending Link", error.message);
        }

    }
    return (
        <div>
            <Nav />
            <div className="py-5 px-8 mt-28 mb-28 flex flex-col items-center justify-center">
                <Image src={logo} alt="Logo" className='w-28 mb-8' />

                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2" >Email Address</label>
                        <input type="email" id="email" name="email" className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder='Your Email' value={ForgotData.email} onChange={(e) => { SetData({ ...ForgotData, [e.target.name]: e.target.value }) }} />
                    </div>
                    <div className="mb-6">
                        <button type="button" className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit} >Submit</button>
                    </div>

                </form>
            </div>
            <Footer />
        </div>
    )
}