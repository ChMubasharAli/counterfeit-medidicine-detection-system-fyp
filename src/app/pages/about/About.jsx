import React from "react";
import { BsFillHospitalFill, BsPerson } from "react-icons/bs";
import { MdHealthAndSafety } from "react-icons/md";
import { FaTruck } from "react-icons/fa";
import Link from "next/link";
import NavbarComponent from "../../../components/Navbar";

const AboutPage = () => {
    return (
        <div>
            <NavbarComponent />

            <div className="container mx-auto p-4">
                {/* Header */}
                <header className="bg-purple-700 text-white py-6 text-center">
                    <h1 className="text-4xl font-bold">About Us</h1>
                    <p className="text-lg mt-2">
                        Learn more about our mission to combat counterfeit medicines
                    </p>
                </header>

                {/* Introduction Section */}
                <section className="py-10 px-4 text-center">
                    <h2 className="text-3xl font-semibold mb-4">Who We Are</h2>
                    <p className="max-w-3xl mx-auto text-lg">
                        At AuthentiCare, we are dedicated to protecting consumers from
                        counterfeit medicines by providing a secure platform for verifying the
                        authenticity of pharmaceuticals. Our mission is to ensure that every
                        medicine reaching the user is safe and genuine.
                    </p>
                </section>

                {/* Counterfeit Medicine Section */}
                <section className="py-10 px-4 bg-gray-100">
                    <h2 className="text-3xl font-semibold mb-8 text-center">
                        The Issue of Counterfeit Medicines
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex flex-col items-center">
                            <img
                                src="/Counterfeit.jpg"
                                alt="Counterfeit Medicine"
                                className="mb-4 w-full object-cover rounded-lg"
                            />
                            <h3 className="text-xl font-bold mb-2">
                                What are Counterfeit Medicines?
                            </h3>
                            <p>
                                Counterfeit medicines are fake drugs that may contain incorrect
                                ingredients, no active ingredients, or harmful substances. These
                                drugs pose significant health risks to consumers.
                            </p>
                        </div>
                        <div className="flex flex-col items-center">
                            <img
                                src="/impact.jpg"
                                alt="Impact of Counterfeit Medicines"
                                className="mb-4 w-full object-cover rounded-lg"
                            />
                            <h3 className="text-xl font-bold mb-2">
                                Impact on Health and Economy
                            </h3>
                            <p>
                                Counterfeit medicines lead to treatment failures, increased
                                resistance, and severe health consequences. They also cause
                                significant economic losses globally.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Supply Chain Section */}
                <section className="py-10 px-4">
                    <h2 className="text-3xl font-semibold mb-8 text-center">
                        How the Supply Chain Works
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 bg-white shadow-lg rounded-lg text-center">
                            <BsFillHospitalFill className="mx-auto mb-4 w-24 h-24 text-slate-500" />
                            <h3 className="text-xl font-bold mb-2">Manufacturer</h3>
                            <p>
                                Manufacturers produce genuine medicines and ensure they meet
                                quality standards before distribution.
                            </p>
                        </div>
                        <div className="p-6 bg-white shadow-lg rounded-lg text-center">
                            <FaTruck className="mx-auto mb-4 w-24 h-24 text-blue-700" />
                            <h3 className="text-xl font-bold mb-2">Distributor</h3>
                            <p>
                                Distributors handle the logistics, ensuring medicines are
                                transported securely from manufacturers to pharmacies.
                            </p>
                        </div>
                        <div className="p-6 bg-white shadow-lg rounded-lg text-center">
                            <MdHealthAndSafety className="mx-auto mb-4 w-24 h-24 text-green-700" />
                            <h3 className="text-xl font-bold mb-2">Pharmacy</h3>
                            <p>
                                Pharmacies dispense medicines to consumers, verifying their
                                authenticity and ensuring they are safe for use.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="bg-purple-700 text-white py-10 text-center">
                    <h2 className="text-3xl font-semibold mb-4">
                        Join Us in Ensuring Safe Medicines
                    </h2>
                    <p className="max-w-2xl mx-auto mb-6">
                        Download the AuthentiCare app today and join our community in ensuring
                        that every medicine you use is safe and authentic.
                    </p>
                    <button className="bg-white  text-green-600 font-bold py-2 px-6 rounded-full hover:bg-gray-200">
                        <Link href={"/pages/counterfeit"}>Scan Now</Link>
                    </button>
                </section>

                {/* Footer */}
                <footer className="bg-gray-800 text-white py-4 text-center">
                    <p>&copy; 2024 AuthentiCare. All rights reserved.</p>
                </footer>
            </div>

        </div>
    );
};

export default AboutPage;
