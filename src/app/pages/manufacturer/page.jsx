"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';
import ManufacturerNavbar from "./ManufacturerNavbar";
import CardForm from "./CardForm";
import ShowData from "./ShowData";

export default function Manufacturer() {
    const [data, setData] = useState(null);



    // Function to fetch user details from the database
    const getUserDetails = async () => {
        try {
            const res = await axios.get('/api/getUserInfo');
            setData(res.data.data);
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    // Fetch user details on component mount
    useEffect(() => {
        getUserDetails();
    }, []);

    return (
        <>
            {data && (
                <>
                    <ManufacturerNavbar name={data.name} />
                    <CardForm manufacturerId={data._id} manufacturername={data.name} />
                    <ShowData manufacturerId={data._id} />
                </>
            )}
        </>
    );
}
