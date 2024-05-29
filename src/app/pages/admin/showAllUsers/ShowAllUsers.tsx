'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function ShowAllUsers() {

    interface Users {
        _id: string,
        name: string,
        role: string,
        email: string,
        isVerified: boolean,
    }

    const [users, setUsers] = useState<Users[]>([])
    const [loadData, setLoadData] = useState(false);
    const [editUserId, setEditUserId] = useState<string | null>(null);
    const [editUser, setEditUser] = useState<Users | null>(null);

    const verifyUser = async (userId: string) => {
        try {
            setLoadData(true);
            const response = await axios.get(`/api/admin/getAllUsers/verifyuser/${userId}`);
            toast.success(response.data.message, { position: "top-right" });
            setUsers(users.map(user => user._id === userId ? { ...user, isVerified: true } : user));
        } catch (error: any) {
            toast.error(error.response.data.message, { position: "top-right" });
        } finally {
            setLoadData(false);
        }
    }

    const handleDelete = async (userId: string) => {
        if (!confirm("Are you sure you want to delete this user?")) return;

        try {
            setLoadData(true);
            const response = await axios.delete(`/api/admin/getAllUsers/verifyuser/${userId}`);
            toast.success(response.data.message, { position: "top-right" });
            setUsers(users.filter(user => user._id !== userId));
        } catch (error: any) {
            toast.error(error.response.data.message, { position: "top-right" });
        } finally {
            setLoadData(false);
        }
    }

    const getUsers = async () => {
        try {
            const response = await axios.get("/api/admin/getAllUsers");
            const data = response.data.users;
            if (Array.isArray(data)) {
                setUsers(data);
            } else {
                console.error("Data received is not an array:", data);
            }
        } catch (error: any) {
            console.error("Error fetching users:", error);
        }
    }

    const handleUpdate = (user: Users) => {
        setEditUserId(user._id);
        setEditUser(user);
    }

    const handleUpdateSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!editUser) return;

        try {
            setLoadData(true);
            const response = await axios.put(`/api/admin/getAllUsers/${editUser._id}`, editUser);
            toast.success(response.data.message, { position: "top-right" });
            setUsers(users.map(user => user._id === editUser._id ? editUser : user));
            setEditUserId(null);
            setEditUser(null);
        } catch (error: any) {
            toast.error(error.response.data.message, { position: "top-right" });
        } finally {
            setLoadData(false);
        }
    }

    const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (editUser) {
            const { name, value } = event.target;
            setEditUser({ ...editUser, [name]: value });
        }
    }

    useEffect(() => {
        getUsers();
    }, [loadData])

    return (
        <div>
            <table className="min-w-full border py-2 text-white ">
                <thead className='bg-purple-400'>
                    <tr className='text-black '>
                        <th className="border px-4 py-2">Sr#</th>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Role</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index} className=" bg-blue-900">
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">{user.name}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                            <td className="border px-4 py-2">{user.role}</td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => verifyUser(user._id)}
                                    className="text-purple-600 font-bold">{user.isVerified ? "Verified" : "Not Verified"}</button>
                            </td>
                            <td className="border px-4 py-2">
                                <div className='w-full flex gap-4 items-center justify-center'>
                                    <button type='button' onClick={() => handleUpdate(user)}>
                                        ✏️
                                    </button>
                                    <button type='button' onClick={() => handleDelete(user._id)}>
                                        ❌
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editUserId && editUser && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <form
                        className="relative bg-white rounded-lg shadow-md p-8 w-full max-w-lg"
                        onSubmit={handleUpdateSubmit}
                    >
                        <button
                            type="button"
                            onClick={() => {
                                setEditUserId(null);
                                setEditUser(null);
                            }}
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
                            <h2 className="text-2xl font-bold text-gray-800">Update User</h2>
                        </div>
                        <div className="space-y-4 px-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-600">Name</label>
                                <input
                                    className="w-full p-2 border rounded-md"
                                    type="text"
                                    name="name"
                                    value={editUser.name}
                                    onChange={handleEditChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-600">Email</label>
                                <input
                                    className="w-full p-2 border rounded-md"
                                    type="email"
                                    name="email"
                                    value={editUser.email}
                                    onChange={handleEditChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-600">Role</label>
                                <input
                                    className="w-full p-2 border rounded-md"
                                    type="text"
                                    name="role"
                                    value={editUser.role}
                                    onChange={handleEditChange}
                                />
                            </div>
                            <div className="text-center mt-4">
                                <button
                                    className="bg-[#5D16EB] hover:bg-[#0A2647] text-white font-bold py-2 px-6 rounded-md"
                                    type="submit"
                                >
                                    {loadData ? "Updating..." : "Update"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}
