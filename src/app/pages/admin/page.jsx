"use client"
import React, { useEffect, useState } from "react";
import { RiAdminFill } from "react-icons/ri";
import { BsFillHospitalFill } from "react-icons/bs";
import { FaTruckMoving, FaRegUser } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Don't forget to include this if you haven't already

const Dashboard = () => {
    // State variables for storing data and loading state
    const [pharmacyData, setPharmacyData] = useState([]);
    const [manufacturersData, setManufacturersData] = useState([]);
    const [distributorsData, setDistributorsData] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const [pharmacyResponse, manufacturersResponse, distributorsResponse, usersResponse] = await Promise.all([
                    axios.get("/api/admin/getPharmacy"),
                    axios.get("/api/admin/getManufacturers"),
                    axios.get("/api/admin/getDistributors"),
                    axios.get("/api/admin/getUsers")
                ]);

                setPharmacyData(pharmacyResponse.data);
                setManufacturersData(manufacturersResponse.data);
                setDistributorsData(distributorsResponse.data);
                setUsersData(usersResponse.data);

                setLoading(false);
            } catch (error) {
                console.error("Failed to load data from the database:", error);
                toast.error("Failed to load data. Please try again later.");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex h-screen bg-gray-200">
            <Sidebar />
            <div className="flex-1 p-8 overflow-hidden">
                <Navbar />
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {/* Dashboard Card */}
                        <div className="bg-white p-6 rounded-lg text-center shadow-md transition-transform transform-gpu duration-300 ease-in-out hover:scale-105 hover:bg-blue-300 hover:text-white flex flex-col items-center">
                            <RiAdminFill className="text-4xl mb-2" />
                            <h2 className="text-xl font-semibold mb-2">Dashboard Overview</h2>
                        </div>

                        {/* Manufacturer Card */}
                        <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform-gpu duration-300 ease-in-out hover:scale-105 hover:bg-blue-300 hover:text-white flex flex-col items-center">
                            <BsFillHospitalFill className="text-4xl mb-2" />
                            <h2 className="text-xl font-semibold mb-4">Manufacturer Stats</h2>
                            <p>Active Manufacturer: <span className="text-blue-600 font-bold text-xl">{manufacturersData.length}</span></p>
                        </div>

                        {/* Distributor Card */}
                        <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform-gpu duration-300 ease-in-out hover:scale-105 hover:bg-blue-300 hover:text-white flex flex-col items-center">
                            <FaTruckMoving className="text-4xl mb-2" />
                            <h2 className="text-xl font-semibold mb-4">Distributor Stats</h2>
                            <p>Active Distributors: <span className="text-blue-600 font-bold text-xl">{distributorsData.length}</span></p>
                        </div>

                        {/* Pharmacy Card */}
                        <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform-gpu duration-300 ease-in-out hover:scale-105 hover:bg-blue-300 hover:text-white flex flex-col items-center">
                            <FaShop className="text-4xl mb-2" />
                            <h2 className="text-xl font-semibold mb-4">Pharmacy Stats</h2>
                            <p>Total Pharmacies: <span className="text-blue-600 font-bold text-xl">{pharmacyData.length}</span></p>
                        </div>

                        {/* User Card */}
                        <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform-gpu duration-300 ease-in-out hover:scale-105 hover:bg-blue-300 hover:text-white flex flex-col items-center">
                            <FaRegUser className="text-4xl mb-2" />
                            <h2 className="text-xl font-semibold mb-4">User Stats</h2>
                            <p>Total Users: <span className="text-blue-600 font-bold text-xl">{usersData.length}</span></p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
