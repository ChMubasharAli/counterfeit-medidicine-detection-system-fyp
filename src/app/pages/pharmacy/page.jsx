"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ManufacturerNavbar from "./ManufacturerNavbar";


export default function Manufacturer() {

    const [data, setData] = useState("")
    const [pharmacyData, setPharmacyData] = useState([])


    // This function will extract the user information from the database against the specific user 
    const getUserDetails = async () => {
        const res = await axios.get('/api/getUserInfo')
        setData(res.data.data)
    }

    const getPharmacyRecord = async (email) => {
        try {
            if (email) {
                const response = await axios.post('/api/distributorData/pharmacyData/specificPharmacyRecord', { email })
                setPharmacyData(response.data.pharmacyRecord)
            }

        } catch (error) {
            console.log("Failed to get Pharmacy recrd", error);
        }
    }

    // this will responsible for getting the data of the user when any change will be occur in the component 
    useEffect(() => {
        getUserDetails();

    }, []);

    useEffect(() => {
        getPharmacyRecord(data.email)
    }, [data.email])


    return (
        <>
            <ManufacturerNavbar />
            <div className="w-full py-24 px-4">
                <h2 className="text-2xl font-bold py-4 text-blue-500">Pharmacy Data</h2>
                <table className="w-full bg-slate-300 shadow-md shadow-slate-800">
                    <thead >
                        <tr className="">
                            <th className="bg-[#3F83F8] px-2 py-3 text-sm">#</th>
                            <th className="bg-[#3F83F8] px-2 py-3 text-sm">Distributor</th>
                            <th className="bg-[#3F83F8] px-2 py-3 text-sm">Medicine</th>
                            <th className="bg-[#3F83F8] px-2 py-3 text-sm">Serial Number</th>
                            <th className="bg-[#3F83F8] px-2 py-3 text-sm">Dosage Form</th>
                            <th className="bg-[#3F83F8] px-2 py-3 text-sm">Expiry Date</th>
                            <th className="bg-[#3F83F8] px-2 py-3 text-sm">Quantity</th>

                            <th className="bg-[#3F83F8] px-2 py-3 text-sm">QR Image</th>

                        </tr>
                    </thead>
                    {pharmacyData.map((item, index) => (
                        <tr key={item._id} className="text-center text-xs">
                            <td className=" border px-2 py-1">{index + 1}</td>
                            <td className=" border px-2 py-1">{item.distributerEmail}</td>
                            <td className=" border px-2 py-1">{item.medicineName}</td>
                            <td className=" border px-2 py-1">{item.serialNumber}</td>
                            <td className=" border px-2 py-1">{item.dosageForm}</td>
                            <td className=" border px-2 py-1">{item.expiryDate}</td>
                            <td className=" border px-2 py-1">{item.distributedQuantity}</td>
                            <td className=" flex items-center justify-center border px-2 py-3">
                                <Image src={item.qrImage} width={125} height={125} alt="QR Code" />
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
        </>
    )
}