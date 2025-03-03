"use client";
import React, { useEffect, useState } from "react";
import { RiAddCircleFill, RiMedicineBottleFill } from "react-icons/ri";
import { FaBoxOpen, FaTruckMoving } from "react-icons/fa";
import { BsFillHospitalFill } from "react-icons/bs";
import { toast } from "react-toastify";
import axios from "axios";

// QuantityIncreaseBox component


// CardForm component
const CardForm = (props) => {


    const [pharmacies, setPharmacies] = useState([])
    // this state will setup the loading section after hiting the register button  
    const [loading, setLoading] = React.useState(false);

    const [showForm, setShowForm] = useState(false);

    const [formData, setFormdata] = useState({
        gln: "",
        sscc: "",
        giai: "",
        distributorid: "",
        distributorname: "",
        quantity: "",
        pharmacyid: ""
    })

    useEffect(() => {
        setFormdata((prevFormData) => ({
            ...prevFormData,
            distributorid: props.distributorId,
            distributorname: props.distributorname
        }));
    }, [props.distributorId, props.distributorname])

    const handleCardClick = () => {
        setShowForm(!showForm);
    };

    const handleIncrease = (value) => {
        setQuantity(parseInt(value, 10));
    };

    const handleSelectChange = (event) => {
        const selectedValues = Array.from(
            event.target.selectedOptions,
            (option) => option.value
        );
        setSelectedOptions(selectedValues);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // validation for fields are not emplty 
        if (
            !formData.giai ||
            !formData.gln ||
            !formData.sscc ||
            !formData.quantity ||
            !formData.distributorid ||
            !formData.distributorname ||
            !formData.pharmacyid ||
            formData.giai.length <= 0 ||
            formData.gln.length <= 0 ||
            formData.sscc.length <= 0 ||
            formData.quantity.length <= 0 ||
            formData.distributorid.length <= 0 ||
            formData.distributorname.length <= 0 ||
            formData.pharmacyid.length <= 0
        ) {
            return toast.warning("Please fill all the Input Fields");
        }


        try {
            setLoading(true)
            // axios request will be fire 
            const response = await axios.post("/api/distributorData", formData)
            toast.success(response.data.message, { position: 'top-right' })
        } catch (error) {
            console.log(error)
            setLoading(false)
            toast.error(error.response.data.message, { position: "top-right" })

        } finally {
            setLoading(false)
        }



    };


    const getPharmacies = async () => {
        try {
            const response = await axios.get("/api/getpharmacies");
            let pharmacyData = response.data.pharmacies;
            if (!Array.isArray(pharmacyData)) {
                // Convert object to array
                pharmacyData = Object.values(pharmacyData);
            }
            setPharmacies(pharmacyData);
        } catch (error) {
            console.error("Error fetching pharmacies:", error);
        }
    };

    useEffect(() => {

        getPharmacies();
    }, []);

    return (

        <div className="max-w-md mx-auto mt-10 flex justify-center items-center">

            <div
                className="bg-white p-8 rounded-lg shadow-lg cursor-pointer flex items-center justify-center"
                onClick={handleCardClick}
            >
                <RiAddCircleFill className="text-3xl mr-2" />
                <div>
                    <h2 className="text-2xl font-bold text-center">Show Manufacturers Data</h2>

                </div>

            </div>
            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">

                    <form
                        className=" w-[100vw] h-[100vh] relative bg-white rounded-lg shadow-md p-8 "
                        onSubmit={handleSubmit}
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

                        <h2 className="text-center text-2xl font-bold text-gray-800 whitespace-nowrap">
                            Manufacturers Data
                        </h2>

                        {/* DISTRIBUTORS
                            <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
                                <label className="block text-sm font-semibold text-gray-600">
                                    Distributors
                                </label>
                                <div className="relative">

                                    <select
                                        className="w-full p-2 pl-10 border rounded-md mt-1 focus:outline-none focus:ring focus:border-blue-500"

                                        onChange={function (event) { setFormdata({ ...formData, pharmacyid: event.target.value }) }}
                                        value={formData.pharmacyid}
                                        id="options">
                                        {
                                            pharmacies.map(dist => (

                                                <option key={dist._id} value={dist._id}>{dist.name}</option>

                                            ))
                                        }

                                    </select>
                                </div>
                            </div> */}

                        {/* Submit Button
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                        >
                            {loading ? "Processing" : "Submit"}
                        </button> */}


                    </form>
                </div >
            )}
        </div >
    );
};

export default CardForm;
