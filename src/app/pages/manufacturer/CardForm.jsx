"use client";
import React, { useEffect, useState, useRef } from "react";
import QRCode from "qrcode.react";
import { RiAddCircleFill } from "react-icons/ri";
import { toast } from "react-toastify";
import axios from "axios";

const CardForm = (props) => {
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [distributors, setDistributors] = useState([]);
    const [formData, setFormData] = useState({
        medicineName: '',
        serialNumber: '',
        dosageForm: '',
        expiryDate: '',
        manufactureDate: '',
        quantity: "",
        distributerEmail: "",
        manufacturerid: props.manufacturerId,
        manufacturername: props.manufacturername,
    });
    const [qrData, setQrData] = useState('');
    const [qrGenerated, setQrGenerated] = useState(false);
    const qrRef = useRef();

    const getDistributors = async () => {
        try {
            const response = await axios.get("/api/getDistributors");
            let distributorsData = response.data.distirbutors;
            if (!Array.isArray(distributorsData)) {
                // Convert object to array
                distributorsData = Object.values(distributorsData);
            }
            setDistributors(distributorsData);
        } catch (error) {
            console.error("Error fetching distributors:", error);
        }
    };

    useEffect(() => {
        getDistributors();
    }, []);

    useEffect(() => {
        setFormData(prevFormData => ({
            ...prevFormData,
            manufacturerid: props.manufacturerId,
            manufacturername: props.manufacturername
        }));
    }, [props.manufacturerId, props.manufacturername]);

    const generateQrCode = (e) => {
        e.preventDefault();
        const { medicineName, serialNumber, dosageForm, expiryDate, manufactureDate, manufacturerid, manufacturername } = formData;
        if (!medicineName || !serialNumber || !dosageForm || !expiryDate || !manufactureDate || !manufacturerid || !manufacturername) {
            return toast.warning("Please fill all the Input Fields");
        }
        const qrCodeData = `Medicine Name: ${medicineName}, Serial Number: ${serialNumber}, Dosage Form: ${dosageForm}, Expiry Date: ${expiryDate}, Manufacture Date: ${manufactureDate}, Quantity: ${formData.quantity}`;
        setQrData(qrCodeData);
        setQrGenerated(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const canvas = qrRef.current.querySelector('canvas');
            const qrImage = canvas.toDataURL('image/png');
            const dataToSave = { ...formData, qrImage };
            const response = await axios.post("/api/manufacturerData", dataToSave);
            toast.success(response.data.message, { position: 'top-right' });
            setFormData({
                medicineName: '',
                serialNumber: '',
                dosageForm: '',
                expiryDate: '',
                manufactureDate: '',
                quantity: "",
                distributerEmail: "",
                manufacturerid: props.manufacturerId,
                manufacturername: props.manufacturername,
            });
            setQrGenerated(false);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "An error occurred", { position: "top-right" });
        } finally {
            setLoading(false);
            setShowForm(false);
        }
    };

    return (
        <div className="w-[100vw] mx-auto">
            <div className="flex items-center justify-center">
                <div className="flex bg-blue-500 items-center py-2 px-3 rounded-md hover:bg-blue-600 duration-150">
                    <RiAddCircleFill className="text-xl mr-2 text-white" />
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="text-xl font-bold text-center text-white"
                    >
                        Add new Entry
                    </button>
                </div>
            </div>

            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">

                    <form
                        className="relative bg-gray-200 rounded-lg shadow-md p-8 w-[80vw] min-h-[75vh]"
                        onSubmit={qrGenerated ? handleSubmit : generateQrCode}
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
                                Add Your Data
                            </h2>
                        </div>

                        <div className="flex flex-wrap -mx-4 mb-4">
                            <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
                                <label className="block text-sm font-semibold text-gray-600" htmlFor="medicineName">
                                    Medicine Name:
                                </label>
                                <div className="relative">
                                    <input
                                        id="medicineName"
                                        type="text"
                                        value={formData.medicineName}
                                        onChange={(event) => setFormData({ ...formData, medicineName: event.target.value })}
                                        className="w-full p-2 border rounded-md mt-1 focus:outline-none focus:ring focus:border-blue-500"
                                        placeholder="name"
                                        aria-label="Medicine Name"
                                    />
                                </div>
                            </div>

                            <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
                                <label className="block text-sm font-semibold text-gray-600" htmlFor="serialNumber">
                                    Serial Number:
                                </label>
                                <div className="relative">
                                    <input
                                        id="serialNumber"
                                        type="text"
                                        value={formData.serialNumber}
                                        onChange={(event) => setFormData({ ...formData, serialNumber: event.target.value })}
                                        className="w-full p-2 border rounded-md mt-1 focus:outline-none focus:ring focus:border-blue-500"
                                        placeholder="serial number"
                                        aria-label="Serial Number"
                                    />
                                </div>
                            </div>

                            <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
                                <label className="block text-sm font-semibold text-gray-600" htmlFor="dosageForm">
                                    Dosage Form:
                                </label>
                                <div className="relative">
                                    <input
                                        id="dosageForm"
                                        type="text"
                                        value={formData.dosageForm}
                                        onChange={(event) => setFormData({ ...formData, dosageForm: event.target.value })}
                                        className="w-full p-2 border rounded-md mt-1 focus:outline-none focus:ring focus:border-blue-500"
                                        placeholder="tablet, capsule, syrup"
                                        aria-label="Dosage Form"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-4 mb-4">
                            <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
                                <label className="block text-sm font-semibold text-gray-600" htmlFor="manufactureDate">
                                    Manufacture Date:
                                </label>
                                <div className="relative">
                                    <input
                                        id="manufactureDate"
                                        type="date"
                                        value={formData.manufactureDate}
                                        onChange={(event) => setFormData({ ...formData, manufactureDate: event.target.value })}
                                        className="w-full p-2 border rounded-md mt-1 focus:outline-none focus:ring focus:border-blue-500"
                                        aria-label="Manufacture Date"
                                    />
                                </div>
                            </div>

                            <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
                                <label className="block text-sm font-semibold text-gray-600" htmlFor="expiryDate">
                                    Expiry Date:
                                </label>
                                <div className="relative">
                                    <input
                                        id="expiryDate"
                                        type="date"
                                        value={formData.expiryDate}
                                        onChange={(event) => setFormData({ ...formData, expiryDate: event.target.value })}
                                        className="w-full p-2 border rounded-md mt-1 focus:outline-none focus:ring focus:border-blue-500"
                                        aria-label="Expiry Date"
                                    />
                                </div>
                            </div>

                            <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
                                <label className="block text-sm font-semibold text-gray-600" htmlFor="quantity">
                                    Quantity:
                                </label>
                                <div className="relative">
                                    <input
                                        id="quantity"
                                        type="number"
                                        value={formData.quantity}
                                        onChange={(event) => setFormData({ ...formData, quantity: event.target.value })}
                                        className="w-full p-2 border rounded-md mt-1 focus:outline-none focus:ring focus:border-blue-500"
                                        placeholder="quantity"
                                        min="0"
                                        max="500"
                                        step="1"
                                        aria-label="Quantity"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-between items-center -mx-4 mb-4">
                            <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
                                <label className="block text-sm font-semibold text-gray-600" htmlFor="distributerEmail">
                                    Select Distributor:
                                </label>
                                <div className="relative">
                                    <select
                                        id="distributerEmail"
                                        className="w-full p-2 border rounded-md mt-1 focus:outline-none focus:ring focus:border-blue-500"
                                        value={formData.distributerEmail}
                                        onChange={(event) => setFormData({ ...formData, distributerEmail: event.target.value })}
                                        aria-label="Select Distributor"
                                        aria-required="true"
                                    >
                                        <option value="" disabled>Select a distributor</option>
                                        {distributors.length > 0 ? (
                                            distributors.map(dist => (
                                                <option key={dist._id} value={dist.email}>
                                                    {dist.name.charAt(0).toUpperCase() + dist.name.slice(1)}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="" disabled>No distributors available</option>
                                        )}
                                    </select>
                                </div>
                            </div>


                            {qrGenerated && (
                                <div className="mr-6 bg-slate-200 rounded-md p-2" ref={qrRef}>
                                    <QRCode value={qrData} width={256} height={256} />
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                            aria-label={loading ? "Processing" : qrGenerated ? "Submit" : "Generate Qr Code"}
                        >
                            {loading ? "Processing" : qrGenerated ? "Submit" : "Generate Qr Code"}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CardForm;
