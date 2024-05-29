"use client";
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { RiMedicineBottleFill } from "react-icons/ri";
import { FaBoxOpen, FaTruckMoving } from "react-icons/fa";
import { BsFillHospitalFill } from "react-icons/bs";
import { toast } from 'react-toastify';
import SignupDataValidation from "../../../../helper/signupDataValidation";
import axios from "axios";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

const Manufacturer = () => {
    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "manufacturer",
    });
    const [loading, setLoading] = useState(false);
    const [popAddManufacturer, setPopAddManufacturer] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "",
    });
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/admin/getManufacturers");
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        console.log(data);
    }, [data]);

    const addManufacturer = async (event) => {
        event.preventDefault();
        const validationResult = SignupDataValidation(signupData.name, signupData.email, signupData.password, signupData.password_confirmation, signupData.role);

        if (validationResult.error) {
            toast.error(validationResult.error, { position: "top-right" });
        } else {
            try {
                setLoading(true);
                const response = await axios.post("/api/admin/addManufacturer", signupData);
                toast.success(response.data.message, { position: 'top-right' });
                setSignupData({
                    name: "",
                    email: "",
                    password: "",
                    password_confirmation: "",
                    role: "manufacturer",
                });
            } catch (error) {
                toast.error(error.response?.data?.message || "An error occurred", { position: "top-right" });
            } finally {
                setLoading(false);
            }
        }
    };

    const handleDelete = async (itemId) => {
        if (confirm("Are you sure?")) {
            try {
                await axios.delete(`/api/admin/getManufacturers/deleteEntries/${itemId}`);
                const response = await axios.delete(`/api/admin/getManufacturers/${itemId}`);
                setData((prevData) => prevData.filter(item => item._id !== itemId));
                toast.success(response.data.message, { position: "top-right" });
            } catch (error) {
                toast.error(error.response?.data?.message || "An error occurred", { position: "top-right" });
            }
        }
    };

    const handleUpdate = async () => {
        // Implement the update functionality
        alert("Please write the functionality of the updation");
    };

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-slate-800 dark:text-white">
            <Sidebar />
            <div className="flex-1 p-8 overflow-hidden">
                <Navbar heading="Manufacturer" />

                <div className="mt-8">
                    <button
                        className="bg-[#5D16EB] text-white px-4 py-2 rounded-md mb-4"
                        onClick={() => setPopAddManufacturer(!popAddManufacturer)}
                    >
                        Add Manufacturer
                    </button>

                    <table className="w-full border py-2">
                        <thead>
                            <tr>
                                <th className="border dark:bg-slate-900 bg-gray-200 px-4 py-2">Sr#</th>
                                <th className="border dark:bg-slate-900 bg-gray-200 px-4 py-2">Name</th>
                                <th className="border dark:bg-slate-900 bg-gray-200 px-4 py-2">Email</th>
                                <th className="border dark:bg-slate-900 bg-gray-200 px-4 py-2">Role</th>
                                <th className="border dark:bg-slate-900 bg-gray-200 px-4 py-2">Verified</th>
                                <th className="border dark:bg-slate-900 bg-gray-200 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={item._id} className="">
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">{item.name}</td>
                                    <td className="border px-4 py-2">{item.email}</td>
                                    <td className="border px-4 py-2">{item.role}</td>
                                    <td className="border px-4 py-2">
                                        <span className="text-purple-600 font-bold">
                                            {item.isVerified ? "Verified" : "Not Verified"}
                                        </span>
                                    </td>
                                    <td className="border px-4 py-2">
                                        <div className="w-full flex gap-4 items-center justify-center">
                                            <button type="button" onClick={() => handleUpdate()}>
                                                <FaEdit className="text-blue-500 cursor-pointer" />
                                            </button>
                                            <button type="button" onClick={() => handleDelete(item._id)}>
                                                <FaTrash className="text-red-600 cursor-pointer" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {showForm && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                        <form
                            className="relative bg-white rounded-lg shadow-md p-8 w-full max-w-2xl"
                            onSubmit={handleUpdate}
                        >
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 cursor-pointer"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>

                            <div className="mb-8 text-center flex flex-col items-center justify-center">
                                <h2 className="text-2xl font-bold text-gray-800 whitespace-nowrap">
                                    Update Your Data
                                </h2>
                            </div>

                            <div className="flex flex-wrap -mx-4 mb-4">
                                <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
                                    <label className="block text-sm font-semibold text-gray-600">
                                        GLN (Global Location Number)
                                    </label>
                                    <div className="relative">
                                        <BsFillHospitalFill className="absolute h-6 w-6 text-gray-500 top-3 left-3" />
                                        <input
                                            type="text"
                                            value={formData.gln || ""}
                                            onChange={(event) => setFormData({ ...formData, gln: event.target.value })}
                                            className="w-full p-2 pl-10 border rounded-md mt-1 focus:outline-none focus:ring focus:border-blue-500"
                                            placeholder="Enter GLN"
                                        />
                                    </div>
                                </div>

                                <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
                                    <label className="text-sm font-semibold text-gray-600">
                                        GTIN (Global Trade Item Number)
                                    </label>
                                    <div className="relative">
                                        <RiMedicineBottleFill className="absolute h-6 w-6 text-gray-500 top-3 left-3" />
                                        <input
                                            type="text"
                                            value={formData.gtin || ""}
                                            onChange={(event) => setFormData({ ...formData, gtin: event.target.value })}
                                            className="w-full p-2 pl-10 border rounded-md mt-1 focus:outline-none focus:ring focus:border-blue-500"
                                            placeholder="Enter GTIN"
                                        />
                                    </div>
                                </div>

                                <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
                                    <label className="text-sm font-semibold text-gray-600">
                                        Batch Number
                                    </label>
                                    <div className="relative">
                                        <FaBoxOpen className="absolute h-6 w-6 text-gray-500 top-3 left-3" />
                                        <input
                                            type="text"
                                            value={formData.batch_number || ""}
                                            onChange={(event) => setFormData({ ...formData, batch_number: event.target.value })}
                                            className="w-full p-2 pl-10 border rounded-md mt-1 focus:outline-none focus:ring focus:border-blue-500"
                                            placeholder="Enter Batch Number"
                                        />
                                    </div>
                                </div>

                                <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
                                    <label className="text-sm font-semibold text-gray-600">
                                        Serial Number
                                    </label>
                                    <div className="relative">
                                        <FaTruckMoving className="absolute h-6 w-6 text-gray-500 top-3 left-3" />
                                        <input
                                            type="text"
                                            value={formData.serial_number || ""}
                                            onChange={(event) => setFormData({ ...formData, serial_number: event.target.value })}
                                            className="w-full p-2 pl-10 border rounded-md mt-1 focus:outline-none focus:ring focus:border-blue-500"
                                            placeholder="Enter Serial Number"
                                        />
                                    </div>
                                </div>

                                <div className="w-full px-4 mb-4">
                                    <label className="text-sm font-semibold text-gray-600">
                                        Expiry Date
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            value={formData.expiry_date || ""}
                                            onChange={(event) => setFormData({ ...formData, expiry_date: event.target.value })}
                                            className="w-full p-2 border rounded-md mt-1 focus:outline-none focus:ring focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center mt-8">
                                <button
                                    type="submit"
                                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md"
                                >
                                    Update Data
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {popAddManufacturer && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                        <div className="relative bg-white rounded-lg shadow-md p-8 w-full max-w-lg">
                            <button
                                type="button"
                                onClick={() => setPopAddManufacturer(false)}
                                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 cursor-pointer"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>

                            <form onSubmit={addManufacturer}>
                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-600">
                                        Name
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={signupData.name}
                                            onChange={(event) => setSignupData({ ...signupData, name: event.target.value })}
                                            className="w-full p-2 border rounded-md mt-1 focus:outline-none focus:ring focus:border-blue-500"
                                            placeholder="Enter Name"
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-600">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            value={signupData.email}
                                            onChange={(event) => setSignupData({ ...signupData, email: event.target.value })}
                                            className="w-full p-2 border rounded-md mt-1 focus:outline-none focus:ring focus:border-blue-500"
                                            placeholder="Enter Email"
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-600">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            value={signupData.password}
                                            onChange={(event) => setSignupData({ ...signupData, password: event.target.value })}
                                            className="w-full p-2 border rounded-md mt-1 focus:outline-none focus:ring focus:border-blue-500"
                                            placeholder="Enter Password"
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-600">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            value={signupData.password_confirmation}
                                            onChange={(event) => setSignupData({ ...signupData, password_confirmation: event.target.value })}
                                            className="w-full p-2 border rounded-md mt-1 focus:outline-none focus:ring focus:border-blue-500"
                                            placeholder="Confirm Password"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-center mt-8">
                                    <button
                                        type="submit"
                                        className={`bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                                        disabled={loading}
                                    >
                                        {loading ? "Adding..." : "Add Manufacturer"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Manufacturer;
