//component clients.js

"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineClose } from 'react-icons/ai';
import Image from 'next/image';


function DataTable({tableHead, dataArray}) {

    return (
        <table className="w-full table-auto">
            <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    {
                        tableHead.map((value, index) => (
                            <th key={index} className="py-3 px-6 text-left">{value}</th>
                        ))
                    }
                </tr>
            </thead>

            <tbody className="text-gray-600 text-sm font-light [&>*:nth-child(even)]:bg-gray-200">
                {dataArray.map((data, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-3 px-6 text-left">
                            {index + 1}
                        </td>
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                            {data.user_id}
                        </td>
                        <td className="py-3 px-6 text-left">
                            {data.email}
                        </td>
                        <td className="py-3 px-6 text-left">
                            {data.status}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}


export default function Subscribers() {
    
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/pages/subscribers');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);
    

    return (
        <div className="container mx-auto py-5 px-8">

            {/* Display client data */}
            <DataTable tableHead={['#', 'Name', 'Email', 'Status']} dataArray={users} />
        </div>
    );
}