"use client"
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { RiMedicineBottleFill } from "react-icons/ri";
import { toast } from 'react-toastify';
import SignupDataValidation from "../../../../helper/signupDataValidation";
import axios from "axios";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

const Pharmacy = () => {
    // State for new pharmacy data
    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "pharmacy",
    });

    // Loading state
    const [loading, setLoading] = useState(false);

    // State to control the visibility of the add pharmacy form
    const [popAddPharmacy, setPopAddPharmacy] = useState(false);

    // State to control the visibility of the update form
    const [showForm, setShowForm] = useState(false);

    // State for the update form data
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "",
        gln: "",
        gtin: "",
        sscc: "",
        grai: "",
        giai: "",
        quantity: 0,
    });

    // State to store fetched data
    const [data, setData] = useState([]);

    // Fetch pharmacy data from the API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/admin/getPharmacy`);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    // Add new pharmacy
    const addPharmacy = async (event) => {
        event.preventDefault();
        const validationResult = SignupDataValidation(signupData.name, signupData.email, signupData.password, signupData.password_confirmation, signupData.role);
        if (validationResult.error) {
            toast.error(validationResult.error, { position: "top-right" });
        } else {
            try {
                setLoading(true);
                const response = await axios.post("/api/admin/addPharmacy", signupData);
                toast.success(response.data.message, { position: 'top-right' });
                setSignupData({
                    name: "",
                    email: "",
                    password: "",
                    password_confirmation: "",
                    role: "pharmacy",
                });
                setData([...data, response.data.pharmacy]);
            } catch (error) {
                toast.error(error.response.data.message, { position: "top-right" });
            } finally {
                setLoading(false);
                setPopAddPharmacy(false);
            }
        }
    };

    // Delete pharmacy
    const handleDelete = async (itemId) => {
        if (confirm("Are you sure?")) {
            try {
                const response = await axios.delete(`/api/admin/getPharmacy/${itemId}`);
                setData(data.filter(item => item._id !== itemId));
                toast.success(response.data.message, { position: "top-right" });
            } catch (error) {
                toast.error(error.response.data.message, { position: "top-right" });
            }
        }
    };

    // Update pharmacy
    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const response = await axios.put(`/api/admin/getPharmacy/${formData._id}`, formData);
            setData(data.map(item => item._id === formData._id ? response.data.pharmacy : item));
            toast.success(response.data.message, { position: "top-right" });
            setShowForm(false);
        } catch (error) {
            toast.error(error.response.data.message, { position: "top-right" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-slate-800 dark:text-white">
            <Sidebar />
            <div className="flex-1 p-8 overflow-hidden">
                <Navbar heading="Pharmacy" />
                <div className="mt-8">
                    <button
                        className="bg-[#5D16EB] text-white px-4 py-2 rounded-md mb-4"
                        onClick={() => setPopAddPharmacy(true)}>
                        Add Pharmacy
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
                                <tr key={item._id}>
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">{item.name}</td>
                                    <td className="border px-4 py-2">{item.email}</td>
                                    <td className="border px-4 py-2">{item.role}</td>
                                    <td className="border px-4 py-2"><span className="text-purple-600 font-bold">{item.isVerified ? "Verified" : "Not Verified"}</span></td>
                                    <td className="border px-4 py-2">
                                        <div className='w-full flex gap-4 items-center justify-center'>
                                            <button type='button' onClick={() => { setShowForm(true); setFormData(item); }}>
                                                <FaEdit className="text-blue-500 cursor-pointer" />
                                            </button>
                                            <button type='button' onClick={() => handleDelete(item._id)}>
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
                                <h2 className="text-2xl font-bold text-gray-800 whitespace-nowrap">Update Pharmacy Data</h2>
                            </div>
                            <div className="space-y-4 px-4">
                                <div className='flex justify-between items-center gap-4'>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-600">Name</label>
                                        <input
                                            className="w-full p-2 border rounded-md"
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-600">Email</label>
                                        <input
                                            className="w-full p-2 border rounded-md"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className='flex justify-between items-center gap-4'>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-600">GLN</label>
                                        <input
                                            className="w-full p-2 border rounded-md"
                                            type="text"
                                            value={formData.gln}
                                            onChange={(e) => setFormData({ ...formData, gln: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-600">GTIN</label>
                                        <input
                                            className="w-full p-2 border rounded-md"
                                            type="text"
                                            value={formData.gtin}
                                            onChange={(e) => setFormData({ ...formData, gtin: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className='flex justify-between items-center gap-4'>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-600">SSCC</label>
                                        <input
                                            className="w-full p-2 border rounded-md"
                                            type="text"
                                            value={formData.sscc}
                                            onChange={(e) => setFormData({ ...formData, sscc: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-600">GRAI</label>
                                        <input
                                            className="w-full p-2 border rounded-md"
                                            type="text"
                                            value={formData.grai}
                                            onChange={(e) => setFormData({ ...formData, grai: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className='flex justify-between items-center gap-4'>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-600">GAI</label>
                                        <input
                                            className="w-full p-2 border rounded-md"
                                            type="text"
                                            value={formData.giai}
                                            onChange={(e) => setFormData({ ...formData, giai: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-600">Quantity</label>
                                        <input
                                            className="w-full p-2 border rounded-md"
                                            type="number"
                                            value={formData.quantity}
                                            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="text-center mt-4">
                                    <button
                                        className="bg-[#5D16EB] hover:bg-[#0A2647] text-white font-bold py-2 px-6 rounded-md"
                                        type="submit"
                                    >
                                        {loading ? "Updating..." : "Update"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                )}
                {popAddPharmacy && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                        <form
                            className="relative bg-white rounded-lg shadow-md p-8 w-full max-w-lg"
                            onSubmit={addPharmacy}
                        >
                            <button
                                type="button"
                                onClick={() => setPopAddPharmacy(false)}
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
                                <RiMedicineBottleFill size={30} className="text-[#5D16EB]" />
                                <h2 className="text-2xl font-bold text-gray-800 whitespace-nowrap">Add Pharmacy</h2>
                            </div>
                            <div className="space-y-4 px-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-600">Name</label>
                                    <input
                                        className="w-full p-2 border rounded-md"
                                        type="text"
                                        value={signupData.name}
                                        onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-600">Email</label>
                                    <input
                                        className="w-full p-2 border rounded-md"
                                        type="email"
                                        value={signupData.email}
                                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-600">Password</label>
                                    <input
                                        className="w-full p-2 border rounded-md"
                                        type="password"
                                        value={signupData.password}
                                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-600">Confirm Password</label>
                                    <input
                                        className="w-full p-2 border rounded-md"
                                        type="password"
                                        value={signupData.password_confirmation}
                                        onChange={(e) => setSignupData({ ...signupData, password_confirmation: e.target.value })}
                                    />
                                </div>
                                <div className="text-center mt-4">
                                    <button
                                        className="bg-[#5D16EB] hover:bg-[#0A2647] text-white font-bold py-2 px-6 rounded-md"
                                        type="submit"
                                    >
                                        {loading ? "Adding..." : "Add Pharmacy"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Pharmacy;
