"use client";
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from 'react-toastify';
import SignupDataValidation from "../../../../helper/signupDataValidation";
import axios from "axios";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import Image from "next/image";

const User = () => {
    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "user",
    });

    const [loading, setLoading] = useState(false);
    const [popAddUser, setPopAddUser] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "",
    });
    const [data, setData] = useState([]);

    const addUser = async (event) => {
        event.preventDefault();
        const validationResult = SignupDataValidation(
            signupData.name,
            signupData.email,
            signupData.password,
            signupData.password_confirmation,
            signupData.role
        );

        if (validationResult.error) {
            toast.error(validationResult.error, { position: "top-right" });
        } else {
            try {
                setLoading(true);
                const response = await axios.post("/api/admin/addUser", signupData);
                toast.success(response.data.message, { position: "top-right" });
                setSignupData({
                    name: "",
                    email: "",
                    password: "",
                    password_confirmation: "",
                    role: "user",
                });
                setPopAddUser(false);  // Close the form after successful submission
                fetchData();  // Refresh data after adding a new user
            } catch (error) {
                toast.error(error.response?.data?.message || "Error adding user", { position: "top-right" });
            } finally {
                setLoading(false);
            }
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/admin/getUsers`);
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (itemId) => {
        if (confirm("Are you sure?")) {
            try {
                const response = await axios.delete(`/api/admin/getUsers/${itemId}`);
                setData((prevData) => prevData.filter((item) => item._id !== itemId));
                toast.success(response.data.message, { position: "top-right" });
            } catch (error) {
                toast.error(error.response?.data?.message || "Error deleting user", { position: "top-right" });
            }
        }
    };

    const handleUpdate = async (itemId) => {
        // Implement the update functionality
        alert("Please implement the update functionality");
    };

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-slate-800 dark:text-white">
            <Sidebar />
            <div className="flex-1 p-8 overflow-hidden">
                <Navbar heading="User" />
                <div className="mt-8">
                    <button
                        className="bg-[#5D16EB] text-white px-4 py-2 rounded-md mb-4"
                        onClick={() => setPopAddUser(true)}
                    >
                        Add User
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
                                <tr key={item._id} className="text-center">
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
                                        <div className="flex gap-4 items-center justify-center">
                                            <button type="button" onClick={() => handleUpdate(item._id)}>
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

                {popAddUser && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                        <form
                            onSubmit={addUser}
                            className="relative bg-white dark:bg-slate-600 rounded-lg shadow-md p-8 w-full max-w-2xl dark:text-white"
                        >
                            <button
                                type="button"
                                onClick={() => setPopAddUser(false)}
                                className="absolute top-2 right-2 text-gray-600 dark:text-white hover:text-gray-800 cursor-pointer"
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

                            <div className="bg-white p-4 dark:bg-slate-600">
                                <div className="flex flex-col justify-center items-center gap-4">
                                    <Image src="/logo.png" alt="loading..." width={70} height={70} />
                                    <h2 className="text-[#5E18EA] text-center text-2xl font-bold leading-tight dark:text-white py-4">
                                        {loading ? "Processing" : "Add User"}
                                    </h2>
                                </div>

                                <div className="space-y-3 px-4">
                                    <div className="flex justify-between items-center w-full gap-4">
                                        <div>
                                            <label htmlFor="name" className="text-base font-medium text-gray-900 dark:text-white">
                                                Full Name
                                            </label>
                                            <div className="mt-0.5">
                                                <input
                                                    className="flex h-8 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                    type="text"
                                                    placeholder="Full Name"
                                                    id="name"
                                                    value={signupData.name}
                                                    onChange={(event) => setSignupData({ ...signupData, name: event.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="text-base font-medium text-gray-900 dark:text-white">
                                                Email address
                                            </label>
                                            <div className="mt-0.5">
                                                <input
                                                    className="flex h-8 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                    type="email"
                                                    placeholder="Email"
                                                    id="email"
                                                    value={signupData.email}
                                                    onChange={(event) => setSignupData({ ...signupData, email: event.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center w-full gap-4">
                                        <div>
                                            <label htmlFor="password" className="text-base font-medium text-gray-900 dark:text-white">
                                                Password
                                            </label>
                                            <div className="mt-0.5">
                                                <input
                                                    className="flex h-8 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                    type="password"
                                                    placeholder="Password"
                                                    id="password"
                                                    value={signupData.password}
                                                    onChange={(event) => setSignupData({ ...signupData, password: event.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="password_confirmation" className="text-base font-medium text-gray-900 dark:text-white">
                                                Confirm Password
                                            </label>
                                            <div className="mt-0.5">
                                                <input
                                                    className="flex h-8 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                    type="password"
                                                    placeholder="Confirm Password"
                                                    id="password_confirmation"
                                                    value={signupData.password_confirmation}
                                                    onChange={(event) =>
                                                        setSignupData({ ...signupData, password_confirmation: event.target.value })
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="role" className="text-base font-medium text-gray-900 dark:text-white">
                                            Role
                                        </label>
                                        <div className="mt-0.5">
                                            <select
                                                className="flex h-8 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                id="role"
                                                value={signupData.role}
                                                onChange={(event) => setSignupData({ ...signupData, role: event.target.value })}
                                            >
                                                <option value="user">User</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-center">
                                        <button
                                            type="submit"
                                            className="inline-flex items-center px-4 py-2 text-base font-semibold leading-6 text-white whitespace-no-wrap bg-[#5E18EA] border border-[#5E18EA] rounded-md shadow-sm hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600"
                                            disabled={loading}
                                        >
                                            {loading && (
                                                <svg
                                                    className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-7.172 4.984L4.818 10H4a8.003 8.003 0 010 4z"
                                                    ></path>
                                                </svg>
                                            )}
                                            {loading ? "Processing" : "Add User"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default User;
