// LoginPage.js
"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import logo from '@/assets/amitkk-logo.svg';
import Nav from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import { ResetPass } from '@/pages/api/auth/loginApi';
import { toast } from 'react-toastify';
import { useParams } from 'next/navigation';
import { useRouter } from "next/navigation";

// When creating or updating a user
// import bcrypt from 'bcryptjs';



export default function LoginPage() {
    const params = useParams();
    const route = useRouter()
    const id = params.resetid1;
    const token = params.resetid2;
    const [ResetData, SetData] = useState({
        password: "",
        cpassword: "",
    });

    const handleSubmit = async () => {
        try {
            if (ResetData.password !== ResetData.cpassword) {
                toast.error("Password is not match");
            } 
            else {
                // const hashedPassword = await bcrypt.hash(ResetData.password, 12);
                const response = await ResetPass({ password: ResetData.password, id, token });

                if (response.status == 200) {
                    toast.success("Password Change Successfull");
                    SetData({
                        password:"",
                        cpassword:""
                    })
                    route.push("/login")
                } else if (response.response.status !== 200) {
                    toast.error("Link Expire")
                }
            }

        } catch (error) {
            toast.error("Link Expire ",error.message)
        }


    }
    return (
        <div>
            <div className="py-5 px-8 mt-28 mb-28 flex flex-col items-center justify-center">
                <Image src={logo} alt="Logo" className='w-32 mb-4' />

                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2" >Password</label>
                        <input type="email" id="password" name="password" className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={ResetData.password} onChange={(e) => { SetData({ ...ResetData, [e.target.name]: e.target.value }); }} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2"> Confirm Password</label>
                        <input type="password" id="cpassword" name="cpassword" className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={ResetData.cpassword} onChange={(e) => { SetData({ ...ResetData, [e.target.name]: e.target.value }) }} />
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