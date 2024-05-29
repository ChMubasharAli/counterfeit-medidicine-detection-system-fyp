"use client";
import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';
import axios from 'axios';
import Image from 'next/image';
import Swal from 'sweetalert2';

const QRCodeScanner = () => {
    const [data, setData] = useState('No result');
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [facingMode, setFacingMode] = useState('environment'); // Default to rear camera
    const [manufacturerRecord, setManufacturerRecord] = useState(null);
    const [distributorRecord, setDistributorRecord] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleScan = (result) => {
        if (result) {
            const qrData = result.text;
            setData(qrData);
            setIsCameraActive(false);
            const serialNumber = extractSerialNumber(qrData);
            if (serialNumber) {
                getManufacturerDetail(serialNumber);
            }
        }
    };

    const handleError = (err) => {
        console.error(err);
    };

    const previewStyle = {
        height: 240,
        width: 320,
    };

    const toggleCamera = () => {
        setIsCameraActive(!isCameraActive);
    };

    const switchCamera = () => {
        setFacingMode((prevFacingMode) => (prevFacingMode === 'environment' ? 'user' : 'environment'));
    };

    const extractSerialNumber = (data) => {
        const regex = /Serial Number:\s*([^\s,]+)/;
        const match = data.match(regex);
        return match ? match[1] : null;
    };

    const authentic = () => {
        Swal.fire({
            title: 'Your Medicine is Authentic',
            text: 'Click to show supply chain report',
            icon: 'success',
            confirmButtonText: 'Click'
        });
    };

    const counterfeit = () => {
        Swal.fire({
            title: 'Your Medicine is Counterfeit',
            text: 'No supply chain available ',
            icon: 'error',
            confirmButtonText: 'Close'
        });
    };

    const getManufacturerDetail = async (serialNumber) => {
        setLoading(true);
        try {
            const response = await axios.post('/api/authentication/getManufacturerRecord', { serialNumber });
            if (response.data) {
                setManufacturerRecord(response.data);
                getDistributorDetail(response.data.distributerEmail);
            } else {
                setLoading(false);
                counterfeit();
            }
        } catch (error) {
            console.error("Failed to get Manufacturer Record", error);
            setLoading(false);
        }
    };

    const getDistributorDetail = async (distributorEmail) => {
        try {
            const response = await axios.post('/api/authentication/getDistributorRecod', { distributorEmail });
            if (response.data) {
                setDistributorRecord(response.data);
                setLoading(false);
                authentic();
            } else {
                setLoading(false);
                counterfeit();
            }
        } catch (error) {
            console.error("Failed to get Distributor Record", error);
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    return (
        <>
            <div className="flex flex-col items-center bg-gray-100 p-10">
                <h1 className="text-2xl font-bold mb-4">Scan your QR Code</h1>
                <div className="w-fit max-w-md bg-white shadow-lg rounded-lg p-4">
                    {isCameraActive ? (
                        <QrScanner
                            delay={300}
                            style={previewStyle}
                            onError={handleError}
                            onScan={handleScan}
                            className="rounded-lg"
                            facingMode={facingMode} // Dynamic facing mode
                        />
                    ) : (
                        <div className="h-60 w-80 bg-gray-200 flex items-center justify-center rounded-lg">
                            <p className="text-gray-500">Camera is off</p>
                        </div>
                    )}
                </div>
                <div className="flex mt-4">
                    <button
                        onClick={toggleCamera}
                        className="mr-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
                    >
                        {isCameraActive ? 'Stop Scanning' : 'Start Scanning'}
                    </button>
                    {isCameraActive && (
                        <button
                            onClick={switchCamera}
                            className="ml-2 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-700 focus:outline-none"
                        >
                            Switch Camera
                        </button>
                    )}
                </div>
            </div>

            {loading && <div className="text-center mt-4">Loading...</div>}

            {manufacturerRecord && (
                <div className="min-h-screen bg-gray-50 flex flex-col items-center">
                    <main className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md shadow-gray-900">
                        <div className="flex flex-col items-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-800 mb-4">
                                Medicine Distribution Supply Chain Report
                            </h1>
                            <div className="bg-gray-200 shadow-md shadow-gray-400 p-1 rounded-lg">
                                <Image
                                    src={manufacturerRecord.qrImage}
                                    width={200}
                                    height={200}
                                    alt='QR Code'
                                />
                            </div>
                        </div>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Manufacturer Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 shadow-sm shadow-gray-500 p-3 bg-slate-200">
                                <p className="md:col-span-1"><strong>Name:</strong> {manufacturerRecord.manufacturername}</p>
                                <p className="md:col-span-1"><strong>Medicine Name:</strong> {manufacturerRecord.medicineName}</p>
                                <p className="md:col-span-1"><strong>Dosage Form:</strong> {manufacturerRecord.dosageForm}</p>
                                <p className="md:col-span-1"><strong>Creation Date:</strong> {formatDate(manufacturerRecord.manufactureDate)}</p>
                                <p className="md:col-span-1"><strong>Expiry Date:</strong> {formatDate(manufacturerRecord.expiryDate)}</p>
                                <p className="md:col-span-1"><strong>Quantity:</strong> {manufacturerRecord.quantity}</p>
                                <p className="md:col-span-1"><strong>Distributor:</strong> {manufacturerRecord.distributerEmail}</p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Distributor Details</h2>
                            {distributorRecord.map((record) => (
                                <div key={record._id} className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-6 shadow-sm shadow-gray-500 p-3 bg-slate-200">
                                    <p className="md:col-span-1"><strong>Name:</strong> {record.distributerEmail}</p>
                                    <p className="md:col-span-1"><strong>Quantity Received:</strong> {manufacturerRecord.quantity}</p>
                                    <p className="md:col-span-1"><strong>Sent to Pharmacy:</strong> {record.pharmacyEmail}</p>
                                </div>
                            ))}
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Pharmacy Details</h2>
                            {distributorRecord.map((record) => (
                                <div key={record._id} className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-6 shadow-sm shadow-gray-500 p-3 bg-slate-200">
                                    <p className="md:col-span-1"><strong>Pharmacy:</strong> {record.pharmacyEmail}</p>
                                    <p className="md:col-span-1"><strong>Distributor:</strong> {record.distributerEmail}</p>
                                    <p className="md:col-span-1"><strong>Distributed Quantity:</strong> {record.distributedQuantity}</p>
                                </div>
                            ))}
                        </section>
                    </main>
                </div>
            )}
        </>
    );
};

export default QRCodeScanner;
