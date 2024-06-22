"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { MdArrowOutward } from "react-icons/md";
import DistributorNavbar from "./DistributorNavbar";

export default function Distributor() {
    const [showDistributedData, setShowDistributedData] = useState(false);
    const [showManufacturerData, setShowManufacturerData] = useState(true);
    const [manufacturerData, setManufacturerData] = useState([]);
    const [data, setData] = useState("");
    const [popupData, setPopupData] = useState(null); // State for popup data
    const [isPopupOpen, setIsPopupOpen] = useState(false); // State for popup visibility
    const [pharmacies, setPharmacies] = useState([]) //state for distributors
    const [distributedData, setDistributedData] = useState([""]);





    const getManufacturerData = async (distributorEmail) => {
        try {
            if (!distributorEmail) return;

            const response = await axios.post("/api/manufacturerData/distributorData", { distributorEmail });
            setManufacturerData(response.data.response);
        } catch (error) {
            console.log("Failed to get Manufacturer Data");
        }
    }

    const getUserDetails = async () => {
        try {
            const res = await axios.get('/api/getUserInfo');
            setData(res.data.data);
        } catch (error) {
            console.log("Failed to get user details");
        }
    }

    // This function will update the quantity of the particular Medicine after the distributon 
    const getDistributedRecord = async (distributorEmail) => {
        try {
            if (!distributorEmail) return;

            const response = await axios.post("/api/getDistributedRecord", { distributorEmail });
            setDistributedData(response.data.distributedRecord);
        } catch (error) {
            console.log("Failed to get Ditributed Data");
        }
    }

    const getPharmacies = async () => {
        try {
            const response = await axios.get("/api/getpharmacies");
            setPharmacies(response.data.pharmacies);
        } catch (error) {
            console.log("Failed to get Pharmacies", error);
        }
    }

    const distributeData = async () => {
        try {
            const response = await axios.post("/api/distributorData", popupData)
            toast.success(response.data.message, { position: "top-right" })
        } catch (error) {
            console.log("Failed to distribute data ", error);
            toast.error(error.response.data.message, { position: "top-right" });
        }
    }

    // This function will update the quantity of the particular Medicine after the distributon 
    const updateManufacturerData = async () => {
        try {
            const response = await axios.put("/api/manufacturerData", popupData)
            toast.success(response.data.message, { position: "top-right" })
        } catch (error) {
            console.log("Failed to distribute data ", error);
            toast.error(error.response.data.message, { position: "top-right" });
        }
    }





    useEffect(() => {

        async function runFunctions() {
            await getUserDetails();
            await getPharmacies();
        }

        runFunctions()


    }, []);

    useEffect(() => {
        if (data.email) {
            getManufacturerData(data.email);
            getDistributedRecord(data.email);
        }
    }, [data.email]);

    const handleButtonClick = (item) => {
        setPopupData({
            ...item,
            pharmacyEmail: "", // Add field for selected option
            distributedQuantity: "", // Initialize distributedQuantity with empty string
        });
        setIsPopupOpen(true); // Open the popup

    };

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        if (name === "distributedQuantity" && value > popupData.quantity) {
            toast.error("New quantity cannot be greater than available quantity", { position: "top-right" });
        } else {
            setPopupData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const closePopup = () => {
        setIsPopupOpen(false); // Close the popup
        setPopupData(null); // Clear the popup data
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await updateManufacturerData()
        await distributeData();
        console.log("Form submitted:", popupData);

        closePopup(); // Close the popup after submission
    };

    return (
        <>
            <DistributorNavbar name={data.name} />
            <hr />
            {/* {JSON.stringify()} */}
            <main className="min-h-screen bg-slate-400 w-full flex">

                <div id="leftMenu" className="flex flex-col gap-4 p-4 w-[20vw] bg-gray-800">

                    <button
                        className=" text-xl font-bold bg-[#3F83F8] rounded-md py-1 px-2 text-white"
                        onClick={() => {
                            setShowDistributedData(false);
                            setShowManufacturerData(prevState => !prevState);
                        }}
                    >Manufacturers Data</button>

                    <button
                        className="  text-xl font-bold bg-[#3F83F8] rounded-md py-1 px-2 text-white text-left"
                        onClick={() => {
                            setShowManufacturerData(false);
                            setShowDistributedData(prevState => !prevState);
                        }}
                    > Distributed Data</button>

                </div>

                <div id="rightMenu" className=" bg-slate-700 p-6 w-[80vw] ">
                    {showDistributedData && (
                        <div className="w-full">
                            <h2 className="text-2xl font-bold py-2 text-white">Distributed Data</h2>
                            <table className="w-[75vw] bg-slate-300">
                                <thead >
                                    <tr className="">
                                        <th className="bg-[#3F83F8] px-2 py-3 text-sm">#</th>
                                        <th className="bg-[#3F83F8] px-2 py-3 text-sm">Distributor</th>
                                        <th className="bg-[#3F83F8] px-2 py-3 text-sm">Medicine</th>
                                        <th className="bg-[#3F83F8] px-2 py-3 text-sm">Serial Number</th>
                                        <th className="bg-[#3F83F8] px-2 py-3 text-sm">Dosage Form</th>
                                        <th className="bg-[#3F83F8] px-2 py-3 text-sm">Expiry Date</th>
                                        <th className="bg-[#3F83F8] px-2 py-3 text-sm">Quantity</th>
                                        <th className="bg-[#3F83F8] px-2 py-3 text-sm">Phamrnacy </th>

                                    </tr>
                                </thead>
                                {distributedData.map((item, index) => (
                                    <tr key={item._id} className="text-center text-xs">
                                        <td className=" border px-2 py-1">{index + 1}</td>
                                        <td className=" border px-2 py-1">{item.distributerEmail}</td>
                                        <td className=" border px-2 py-1">{item.medicineName}</td>
                                        <td className=" border px-2 py-1">{item.serialNumber}</td>
                                        <td className=" border px-2 py-1">{item.dosageForm}</td>
                                        <td className=" border px-2 py-1">{item.expiryDate}</td>
                                        <td className=" border px-2 py-1">{item.distributedQuantity}</td>
                                        <td className=" border px-2 py-1">{item.pharmacyEmail}</td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                    )}

                    {showManufacturerData && (
                        <div className="w-full">
                            <h2 className="text-2xl font-bold py-2 text-white">Manufacturers Data</h2>
                            <table className="w-[75vw] table-auto rounded-md border border-gray-300 py-2 bg-slate-300">
                                <thead >
                                    <tr>
                                        <th className=" bg-[#3F83F8] px-2 py-2 text-sm">#</th>
                                        <th className=" bg-[#3F83F8] px-2 py-2 text-sm">Manufacturer</th>
                                        <th className=" bg-[#3F83F8] px-2 py-2 text-sm">Medicine</th>
                                        <th className=" bg-[#3F83F8] px-2 py-2 text-sm">Serial Num</th>
                                        <th className=" bg-[#3F83F8] px-2 py-2 text-sm">Dosage Form</th>
                                        <th className=" bg-[#3F83F8] px-2 py-2 text-sm">Total Quantity</th>
                                        <th className=" bg-[#3F83F8] px-2 py-2 text-sm">Distribute Now</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {manufacturerData.map((item, index) => (
                                        <tr key={item._id} className="text-center text-xs">
                                            <td className="border px-2 py-1">{index + 1}</td>
                                            <td className="border px-2 py-1">{item.manufacturername}</td>
                                            <td className="border px-2 py-1">{item.medicineName}</td>
                                            <td className="border px-2 py-1">{item.serialNumber}</td>
                                            <td className="border px-2 py-1">{item.dosageForm}</td>
                                            <td className="border px-2 py-1">{item.quantity}</td>
                                            <td className="border text-xl text-[#3F83F8] outline-none px-2 flex gap-2 justify-center items-center">
                                                <button
                                                    className="p-0.5"
                                                    onClick={() => handleButtonClick(item)} // Handle button click
                                                >
                                                    <MdArrowOutward />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}



                    {isPopupOpen && popupData && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="w-[50vw] bg-slate-200 p-8 rounded-lg shadow-lg">
                                <div className="w-[40vw]">
                                    {/* {JSON.stringify(popupData)} */}
                                </div>
                                <h2 className="text-2xl font-bold mb-4">Distribute Medicine</h2>
                                <form
                                    className="flex flex-wrap gap-6 justify-between "
                                    onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label className="block text-sm font-semibold ">Manufacturer:</label>
                                        <input
                                            type="text"
                                            className="border border-gray-300 p-2 rounded w-full"
                                            value={popupData.manufacturername}
                                            readOnly
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-semibold">Medicine:</label>
                                        <input
                                            type="text"
                                            className="border border-gray-300 p-2 rounded w-full"
                                            value={popupData.medicineName}
                                            readOnly
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-semibold">Serial Number:</label>
                                        <input
                                            type="text"
                                            className="border border-gray-300 p-2 rounded w-full"
                                            value={popupData.serialNumber}
                                            readOnly
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-sm font-semibold">Dosage Form:</label>
                                        <input
                                            type="text"
                                            className="border border-gray-300 p-2 rounded w-full"
                                            value={popupData.dosageForm}
                                            readOnly
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-semibold">Total Quantity:</label>
                                        <input
                                            type="number"
                                            className="border border-gray-300 p-2 rounded w-full"
                                            value={popupData.quantity}
                                            readOnly
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-semibold">Quantity to Distribute</label>
                                        <input
                                            type="number"
                                            name="distributedQuantity"
                                            className="border border-gray-300 p-2 rounded w-full"
                                            value={popupData.distributedQuantity}
                                            onChange={handleFieldChange} // Update popupData on change
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-semibold">Select Option:</label>
                                        {/* <select
                                            name="pharmacyEmail"
                                            className="border border-gray-300 p-2.5 rounded w-[230px]"
                                            value={popupData.pharmacyEmail}
                                            onChange={handleFieldChange} // Handle change
                                        >
                                            {pharmacies.map((item) => (
                                                <option key={item._id} value={item.email}>{item.name}</option>
                                            ))}

                                        </select> */}
                                        <select
                                            name="pharmacyEmail"
                                            className="border border-gray-300 p-2.5 rounded w-[230px]"
                                            value={popupData.pharmacyEmail}
                                            onChange={handleFieldChange} // Handle change
                                        >
                                            <option value="" disabled selected>Select pharmacy</option>
                                            {pharmacies.map((item) => (
                                                <option key={item._id} value={item.email}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex justify-end items-center gap-6">
                                        <button
                                            type="button"
                                            className="bg-gray-800 text-white px-4 py-1 rounded mr-2"
                                            onClick={closePopup}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-blue-500 text-white px-4 py-1 rounded"
                                        >
                                            Distribute
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </main >
        </>
    );
}
