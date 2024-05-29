// components/SearchComponent.js
"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import debounce from 'lodash.debounce';

const SearchComponent = () => {
    const [medicines, setMedicines] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchMedicines = async (query = '') => {
        try {
            const endpoint = query ? `/api/drugs/search?query=${query}` : '/api/drugs/medicines';
            const response = await axios.get(endpoint);
            setMedicines(response.data);
        } catch (error) {
            console.error("Failed to fetch medicines", error);
        }
    };

    useEffect(() => {
        fetchMedicines();
    }, []);

    useEffect(() => {
        if (searchTerm.length === 0) {
            fetchMedicines();
        } else {
            const debouncedFetch = debounce(() => fetchMedicines(searchTerm), 300);
            debouncedFetch();
            return () => debouncedFetch.cancel();
        }
    }, [searchTerm]);

    return (
        <>
            <section className="text-gray-600 bg-gray-100 body-font py-20 flex flex-col">
                <input
                    className='w-[40vw] mx-auto rounded-md'
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for a medicine..."
                />
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4 mx-auto p-4 gap-10 justify-center">
                        {medicines.map((medicine) => (
                            <div key={medicine._id} className="shadow-sm shadow-gray-700 p-3 rounded-md">
                                <Image
                                    src={medicine.qrImage}
                                    width={150}
                                    height={150}
                                    alt="ecommerce"
                                    className="object-cover object-center"
                                />
                                <div className="mt-4">
                                    <h3 className="text-gray-900 text-xs tracking-widest title-font mb-1">{medicine.dosageForm}</h3>
                                    <h2 className="text-gray-900 title-font text-lg font-medium">{medicine.medicineName}</h2>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default SearchComponent;
