import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import PDFbutton from '../../../components/PDFbutton';
import { useReactToPrint } from 'react-to-print';
import Image from 'next/image';

const ShowData = ({ manufacturerId }) => {
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        medicineName: '',
        serialNumber: '',
        dosageForm: '',
        expiryDate: '',
        manufactureDate: '',
        quantity: '',
    });
    const [data, setData] = useState([]);

    const componentPDF = useRef();

    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: 'Userdata',
    });

    const handleCardClick = (item) => {
        setShowForm(!showForm);
        setFormData({
            medicineName: item.medicineName,
            serialNumber: item.serialNumber,
            dosageForm: item.dosageForm,
            expiryDate: item.expiryDate,
            manufactureDate: item.manufactureDate,
            quantity: item.quantity,
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/manufacturerData/${manufacturerId}`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Error fetching data', { position: 'top-right' });
            }
        };

        if (manufacturerId) {
            fetchData();
        }
    }, [manufacturerId]);

    const handleDelete = async (itemId) => {
        if (confirm('Are you sure?')) {
            try {
                const response = await axios.delete(`/api/manufacturerData/${itemId}`);
                setData((prevData) => prevData.filter((item) => item._id !== itemId));
                toast.success(response.data.message, { position: 'top-right' });
            } catch (error) {
                toast.error(error.response?.data?.message || 'Error deleting item', { position: 'top-right' });
            }
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.put(`/api/manufacturerData/${manufacturerId}`, formData);
            toast.success(response.data.message, { position: 'top-right' });
            setLoading(false);
            setShowForm(false);
        } catch (error) {
            console.error('Error while Updating Item', error);
            toast.error(error.response?.data?.message || 'Error updating item', { position: 'top-right' });
            setLoading(false);
        }
    };

    return (
        <>
            <div className="mt-8">
                <div className="p-2 flex items-center justify-between">
                    <h2 className="text-xl font-bold">Manufacturer Data</h2>
                    <PDFbutton generatePDF={generatePDF} />
                </div>
                <div className="mt-8">
                    <div className="overflow-x-auto">
                        <table ref={componentPDF} className="w-full table-auto border border-gray-300 py-2">
                            <thead>
                                <tr className="bg-blue-500">
                                    <th className="border px-2 py-2 text-sm">S/NO</th>
                                    <th className="border px-2 py-2 text-sm">Name</th>
                                    <th className="border px-2 py-2 text-sm">Serial No</th>
                                    <th className="border px-2 py-2 text-sm">Dosage Form</th>
                                    <th className="border px-2 py-2 text-sm">Manufacture Date</th>
                                    <th className="border px-2 py-2 text-sm">Expiry Date</th>
                                    <th className="border px-2 py-2 text-sm">Quantity</th>
                                    <th className="border px-2 py-2 text-sm">Distributor</th>
                                    <th className="border px-2 py-2 text-sm">QR Code</th>
                                    <th className="border px-2 py-2 text-sm">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={item._id} className="text-center text-xs bg-slate-200">
                                        <td className="border border-gray-600 px-2 py-1">{index + 1}</td>
                                        <td className="border border-gray-600 px-2 py-1">{item.medicineName}</td>
                                        <td className="border border-gray-600 px-2 py-1">{item.serialNumber}</td>
                                        <td className="border border-gray-600 px-2 py-1">{item.dosageForm}</td>
                                        <td className="border border-gray-600 px-2 py-1">{item.manufactureDate}</td>
                                        <td className="border border-gray-600 px-2 py-1">{item.expiryDate}</td>
                                        <td className="border border-gray-600 px-2 py-1">{item.quantity}</td>
                                        <td className="border border-gray-600 px-2 py-1">{item.distributerEmail}</td>
                                        <td className="border border-gray-600 mx-auto pl-6 py-1">
                                            <Image src={item.qrImage} width={120} height={120} alt="QR Image" />
                                        </td>
                                        <td className="border border-gray-600 px-2 flex gap-2 justify-center items-center">
                                            <div className="flex items-center justify-center h-[125px] gap-3">
                                                <button type="button" onClick={() => handleCardClick(item)}>
                                                    ✏️
                                                </button>
                                                <button type="button" onClick={() => handleDelete(item._id)}>
                                                    ❌
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <form className="relative bg-white rounded-lg shadow-md p-8 w-full max-w-2xl" onSubmit={handleUpdate}>
                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 cursor-pointer"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="mb-8 text-center flex flex-col items-center justify-center">
                            <h2 className="text-2xl font-bold text-gray-800 whitespace-nowrap">Update Your Data</h2>
                        </div>

                        <div className="flex flex-wrap -mx-4 mb-4">
                            <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
                                <label className="block text-sm font-semibold text-gray-600">Medicine Name:</label>
                                <input
                                    type="text"
                                    value={formData.medicineName}
                                    onChange={(event) => setFormData({ ...formData, medicineName: event.target.value })}
                                    className="w-full p-2 border rounded-md mt-1 focus:outline-none focus:ring focus:border-blue-500"
                                    placeholder="Enter Medicine Name"
                                />
                            </div>

                            <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
                                <label className="block text-sm font-semibold text-gray-600">Serial Number:</label>
                                <input
                                    type="text"
                                    value={formData.serialNumber}
                                    onChange={(event) => setFormData({ ...formData, serialNumber: event.target.value })}
                                    className="w-full p-2 border rounded-md mt-1 focus:outline-none focus:ring focus:border-blue-500"
                                    placeholder="Enter Serial Number"
                                />
                            </div>

                            <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
                                <label className="block text-sm font-semibold text-gray-600">Dosage Form:</label>
                                <input
                                    type="text"
                                    value={formData.dosageForm}
                                    onChange={(event) => setFormData({ ...formData, dosageForm: event.target.value })}
                                    className="w-full p-2 border rounded-md mt-1 focus:outline-none focus:ring focus:border-blue-500"
                                    placeholder="Enter Dosage Form"
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-4 mb-4">
                            <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
                                <label className="block text-sm font-semibold text-gray-600">Manufacture Date:</label>
                                <input
                                    type="date"
                                    value={formData.manufactureDate}
                                    onChange={(event) => setFormData({ ...formData, manufactureDate: event.target.value })}
                                    className="w-full p-2 border rounded-md mt-1 focus:outline-none focus:ring focus:border-blue-500"
                                />
                            </div>

                            <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
                                <label className="block text-sm font-semibold text-gray-600">Expiry Date:</label>
                                <input
                                    type="date"
                                    value={formData.expiryDate}
                                    onChange={(event) => setFormData({ ...formData, expiryDate: event.target.value })}
                                    className="w-full p-2 border rounded-md mt-1 focus:outline-none focus:ring focus:border-blue-500"
                                />
                            </div>

                            <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
                                <label className="block text-sm font-semibold text-gray-600">Quantity:</label>
                                <input
                                    type="number"
                                    value={formData.quantity}
                                    onChange={(event) => setFormData({ ...formData, quantity: event.target.value })}
                                    className="w-full p-2 border rounded-md mt-1 focus:outline-none focus:ring focus:border-blue-500"
                                    min="0"
                                    max="500"
                                    step="1"
                                    placeholder="Enter Quantity"
                                />
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
                            {loading ? 'Processing...' : 'Update'}
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default ShowData;
