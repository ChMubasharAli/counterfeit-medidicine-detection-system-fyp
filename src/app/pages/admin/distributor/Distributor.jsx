"use client"
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { RiMedicineBottleFill } from "react-icons/ri";
import { FaBoxOpen, FaTruckMoving } from "react-icons/fa";
import { BsFillHospitalFill } from "react-icons/bs";
import { toast } from 'react-toastify'
import SignupDataValidation from "../../../../helper/signupDataValidation";
import axios from "axios";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import Image from "next/image";

const Distributor = (props) => {

    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "distributor",
    });

    const [loading, setLoading] = useState(false);
    const [popAddManufacturer, setPopAddManufacturer] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormdata] = useState({
        name: "",
        email: "",
        role: "",
    });

    const [data, setData] = useState([]);

    useEffect(() => {
        fetchDistributors();
    }, []);

    useEffect(() => {
        console.log(data);
    }, [data]);

    const fetchDistributors = async () => {
        try {
            const response = await axios.get(`/api/admin/getDistributors`);
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const addManufacturer = async (event) => {
        event.preventDefault();

        const validationResult = SignupDataValidation(signupData.name, signupData.email, signupData.password, signupData.password_confirmation, signupData.role);

        if (validationResult.error) {
            toast.error(validationResult.error, { position: "top-right" });
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post("/api/admin/addDistributor", signupData);
            toast.success(response.data.message, { position: 'top-right' });
            setSignupData({
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
                role: "distributor",
            });
            fetchDistributors();
        } catch (error) {
            toast.error(error.response.data.message, { position: "top-right" });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (itemId) => {
        if (confirm("Are you sure?")) {
            try {
                await axios.delete(`/api/admin/getDistributors/deleteEntries/${itemId}`);
                const response = await axios.delete(`/api/admin/getDistributors/${itemId}`);
                setData(prevData => prevData.filter(item => item._id !== itemId));
                toast.success(response.data.message, { position: "top-right" });
            } catch (error) {
                toast.error(error.response.data.message, { position: "top-right" });
            }
        }
    };

    const handleUpdate = () => {
        alert("please write the functionality of the updation ");
    };

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-slate-800 dark:text-white">
            <Sidebar />
            <div className="flex-1 p-8 overflow-hidden">
                <Navbar heading="Distributor" />
                <div className="mt-8">
                    <button
                        className="bg-[#5D16EB] text-white px-4 py-2 rounded-md mb-4"
                        onClick={() => setPopAddManufacturer(!popAddManufacturer)}
                    >
                        Add Distributor
                    </button>
                    <DistributorTable data={data} onDelete={handleDelete} onUpdate={handleUpdate} />
                </div>
                {showForm && <UpdateForm formData={formData} setFormdata={setFormdata} setShowForm={setShowForm} loading={loading} handleUpdate={handleUpdate} />}
                {popAddManufacturer && <AddDistributorForm signupData={signupData} setSignupData={setSignupData} setPopAddManufacturer={setPopAddManufacturer} addManufacturer={addManufacturer} loading={loading} />}
            </div>
        </div>
    );
};

const DistributorTable = ({ data, onDelete, onUpdate }) => (
    <table className="w-full border py-2">
        <thead>
            <tr>
                <th className="border dark:bg-slate-900 bg-gray-200 px-4 py-2">Sr#</th>
                <th className="border dark:bg-slate-900 bg-gray-200 px-4 py-2">Name</th>
                <th className="border dark:bg-slate-900 bg-gray-200 px-4 py-2">Email</th>
                <th className="border dark:bg-slate-900 bg-gray-200 px-4 py-2">Role</th>
                <th className="border dark:bg-slate-900 bg-gray-200 px-4 py-2">Varified</th>
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
                    <td className="border px-4 py-2"><span className="text-purple-600 font-bold">{item.isVerified ? "Verified" : "Not Verified"}</span></td>
                    <td className="border px-4 py-2">
                        <div className='w-full flex gap-4 items-center justify-center'>
                            <button type='button' onClick={() => onUpdate(item._id)}>
                                <FaEdit className="text-blue-500 cursor-pointer" />
                            </button>
                            <button type='button' onClick={() => onDelete(item._id)}>
                                <FaTrash className="text-red-600 cursor-pointer" />
                            </button>
                        </div>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);

const AddDistributorForm = ({ signupData, setSignupData, setPopAddManufacturer, addManufacturer, loading }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <form
            onSubmit={addManufacturer}
            className="relative bg-white dark:bg-slate-600 rounded-lg shadow-md p-8 w-full max-w-2xl dark:text-white"
        >
            <button
                type="button"
                onClick={() => setPopAddManufacturer(false)}
                className="absolute top-2 right-2 text-gray-600 dark:text-white hover:text-gray-800 cursor-pointer"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <div className="bg-white p-4 dark:bg-slate-600">
                <div className="flex flex-col justify-center items-center gap-4">
                    <Image src={"/logo.png"} alt='loading...' width={70} height={70} />
                    <h2 className="text-[#5E18EA] text-center text-2xl font-bold leading-tight dark:text-white py-4">
                        {loading ? "Processing" : "Add Distributor"}
                    </h2>
                </div>
                <div className="space-y-3 px-4">
                    <div className='flex justify-between items-center w-full gap-4'>
                        <div>
                            <label htmlFor="name" className="text-base font-medium text-gray-900 dark:text-white">Full Name</label>
                            <div className="mt-0.5">
                                <input
                                    className="flex h-8 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="text"
                                    placeholder="Full Name"
                                    id="name"
                                    value={signupData.name}
                                    onChange={(event) => setSignupData({ ...signupData, name: event.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="text-base font-medium text-gray-900 dark:text-white">Email</label>
                            <div className="mt-0.5">
                                <input
                                    className="flex h-8 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="email"
                                    placeholder="Email"
                                    id="email"
                                    value={signupData.email}
                                    onChange={(event) => setSignupData({ ...signupData, email: event.target.value })}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between items-center w-full gap-4'>
                        <div>
                            <label htmlFor="password" className="text-base font-medium text-gray-900 dark:text-white">Password</label>
                            <div className="mt-0.5">
                                <input
                                    className="flex h-8 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="password"
                                    placeholder="Password"
                                    id="password"
                                    value={signupData.password}
                                    onChange={(event) => setSignupData({ ...signupData, password: event.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="confirm_password" className="text-base font-medium text-gray-900 dark:text-white">Confirm Password</label>
                            <div className="mt-0.5">
                                <input
                                    className="flex h-8 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="password"
                                    placeholder="Confirm Password"
                                    id="confirm_password"
                                    value={signupData.password_confirmation}
                                    onChange={(event) => setSignupData({ ...signupData, password_confirmation: event.target.value })}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex justify-center items-center">
                    <button type="submit" className="inline-flex items-center rounded-md bg-[#5D16EB] px-4 py-2 text-sm font-medium text-white hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        {loading ? "Processing..." : "Submit"}
                    </button>
                </div>
            </div>
        </form>
    </div>
);

const UpdateForm = ({ formData, setFormdata, setShowForm, loading, handleUpdate }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <form
            className="relative bg-white dark:bg-slate-600 rounded-lg shadow-md p-8 w-full max-w-2xl dark:text-white"
            onSubmit={handleUpdate}
        >
            <button
                type="button"
                onClick={() => setShowForm(false)}
                className="absolute top-2 right-2 text-gray-600 dark:text-white hover:text-gray-800 cursor-pointer"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <div className="bg-white p-4 dark:bg-slate-600">
                <div className="flex flex-col justify-center items-center gap-4">
                    <Image src={"/logo.png"} alt='loading...' width={70} height={70} />
                    <h2 className="text-[#5E18EA] text-center text-2xl font-bold leading-tight dark:text-white py-4">
                        {loading ? "Processing" : "Update Distributor"}
                    </h2>
                </div>
                <div className="space-y-3 px-4">
                    <div className='flex justify-between items-center w-full gap-4'>
                        <div>
                            <label htmlFor="name" className="text-base font-medium text-gray-900 dark:text-white">Full Name</label>
                            <div className="mt-0.5">
                                <input
                                    className="flex h-8 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="text"
                                    placeholder="Full Name"
                                    id="name"
                                    value={formData.name}
                                    onChange={(event) => setFormdata({ ...formData, name: event.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="text-base font-medium text-gray-900 dark:text-white">Email</label>
                            <div className="mt-0.5">
                                <input
                                    className="flex h-8 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="email"
                                    placeholder="Email"
                                    id="email"
                                    value={formData.email}
                                    onChange={(event) => setFormdata({ ...formData, email: event.target.value })}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between items-center w-full gap-4'>
                        <div>
                            <label htmlFor="role" className="text-base font-medium text-gray-900 dark:text-white">Role</label>
                            <div className="mt-0.5">
                                <input
                                    className="flex h-8 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="text"
                                    placeholder="Role"
                                    id="role"
                                    value={formData.role}
                                    onChange={(event) => setFormdata({ ...formData, role: event.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="varified" className="text-base font-medium text-gray-900 dark:text-white">Varified</label>
                            <div className="mt-0.5">
                                <input
                                    className="flex h-8 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="text"
                                    placeholder="Varified"
                                    id="varified"
                                    value={formData.varified}
                                    onChange={(event) => setFormdata({ ...formData, varified: event.target.value })}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex justify-center items-center">
                    <button type="submit" className="inline-flex items-center rounded-md bg-[#5D16EB] px-4 py-2 text-sm font-medium text-white hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        {loading ? "Processing..." : "Update"}
                    </button>
                </div>
            </div>
        </form>
    </div>
);

export default Distributor;
