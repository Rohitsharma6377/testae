
import Image from 'next/image';
import React, { useState } from 'react';
import logo from '@/assets/amitkk-logo.svg';
import Nav from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import { Login, LoginAuth, Register, verifyAuth } from '@/pages/api/auth/loginApi';
import { useEffect } from 'react';
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';


export default function LoginPage() {
    const router = useRouter();
    const cookies = new Cookies();
    const [local, setlocal] = useState(true)
    const [RegisterUser, SetUser] = useState({
        email: "",
        password: "",
        rememberMe: false
    });

    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const CheckUser = async () => {
        const store = cookies.get("User");
        if (store) {
            setlocal(true)
            const Response = await verifyAuth(store);
            if (Response.status == 200) {
                router.push("/")
            } else if (Response.response.status == 401) {
                cookies.remove("User");
                setlocal(false)
            }
        } else {
            setlocal(false)
        }
    }
    
    useEffect(() => {
        CheckUser()
    }, [])
    

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            if (!(RegisterUser.email && RegisterUser.password)) {
                toast.error("Enter Email or Password");
            } 
            
            else if (!RegisterUser.email.match(emailRegex)) {
                toast.error("Invalid Email Id");
            }
            
            else {
                setlocal(true);

                const Response = await Login(RegisterUser);

                if (Response.status == 200) {
                    toast.success("Successfully Logged In!");
                    SetUser({
                        email: "", password: "", rememberMe: false
                    })
                    const store = cookies.set("User", Response.data.token);
                    router.push("/");
                }

                else if (Response.response.status == 404) {
                    setlocal(false)
                    setTimeout(() => toast.error("Enter Correct Email Id or Password!"), 1000);
                }
            }
        } catch (error) {
            console.error("Failed to Login", error)
        }
    };


    const handleRegisterUser = async (e) => {
        e.preventDefault();

        try {
            if (!(RegisterUser.email && RegisterUser.password)) {
                toast.error("Enter Email or Password");
            } 
            
            else if (RegisterUser.password.length < 6) {
                toast.error("Password should be more than 6 characters");
            } 

            else if (!RegisterUser.email.match(emailRegex)) {
                toast.error("Invalid Email");
            } 
            
            else {
                setlocal(true);
                const Response = await Register(RegisterUser);

                if (Response.status == 200) {
                    toast.success("Successfully Registered!");
                    SetUser({
                        email: "", password: "", rememberMe: false
                    })
                    const store = cookies.set("User", Response.data.token);
                    router.push("/");
                }

                else if (Response.response.status == 400) {
                    setlocal(false)
                    setTimeout(() => toast.error("Email Already Registered!"), 1000);
                }
            }

        } catch (error) {
            console.error("Failed to Register", error)
        }
    }
    const handleForgotPassword = () => {
        setlocal(true);
        router.push("/forgot-password")
    };

    return (
        <div className='h-screen w-screen overflow-x-hidden'>
            <Nav />

            {local ? 
            
            (<div className="flex justify-center items-center h-screen">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status" style={{ color: "burlywood" }}>
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                    </span>
                </div>
            </div>)

            :

            (<div className="py-5 px-8 mt-32 mb-28 flex flex-col items-center justify-center">
                <Image src={logo} alt="Logo" className='w-28 mb-8' />

                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2" >Email</label>
                        <input type="email" id="email" name="email" className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={RegisterUser.email} onChange={(e) => { SetUser({ ...RegisterUser, [e.target.name]: e.target.value }); }} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input type="password" id="password" name="password" className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={RegisterUser.password} onChange={(e) => { SetUser({ ...RegisterUser, [e.target.name]: e.target.value }) }} />
                    </div>
                    <div className="mb-4">
                        <button type="button" className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogin}>Login</button>
                    </div>
                    <div className="mb-4">
                        <button type="button" className="bg-green-500 w-full hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleRegisterUser}>Register</button>
                    </div>
                    <div>
                        <button type="button" className="text-blue-500 hover:text-blue-700 text-sm" onClick={handleForgotPassword}>Forgot your password?</button>
                    </div>
                </form>
            </div>)}

            <Footer />
        </div>
    );
}