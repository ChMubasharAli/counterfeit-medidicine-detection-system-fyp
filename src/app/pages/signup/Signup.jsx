"use client";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SignupDataValidation from "../../../helper/signupDataValidation";

export default function SignUpPage() {
    const router = useRouter();

    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "none",
    });

    const [loading, setLoading] = useState(false);

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setSignupData((prevData) => ({ ...prevData, [id]: value }));
    };

    const signupHandler = async (event) => {
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
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post("/api/signup", signupData);
            toast.success(response.data.message, { position: "top-right" });
            router.push("/pages/login");
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed", {
                position: "top-right",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section>
            <div className="flex items-center justify-center px-4 py-7 dark:bg-slate-900">
                <div className="w-[40%] bg-white p-4 shadow-md shadow-gray-300 border rounded-md dark:bg-slate-800">
                    <div className="flex flex-col justify-center items-center gap-4">
                        <Image src="/logo.png" alt="loading..." width={70} height={70} />
                        <h2 className="text-[#5E18EA] text-center text-2xl font-bold leading-tight dark:text-white">
                            {loading ? "Processing" : "Create Account"}
                        </h2>
                    </div>
                    <p className="mt-0.5 text-center text-base text-gray-600 dark:text-white">
                        Already have an account?{" "}
                        <Link
                            href="/pages/login"
                            title=""
                            className="font-medium text-[#5E18EA] transition-all duration-200 hover:underline"
                        >
                            Sign In
                        </Link>
                    </p>
                    <form onSubmit={signupHandler} className="mt-6">
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
                                            onChange={handleInputChange}
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
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between gap-4">
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
                                            onChange={handleInputChange}
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
                                            placeholder="Password"
                                            id="password_confirmation"
                                            value={signupData.password_confirmation}
                                            onChange={handleInputChange}
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
                                        className="flex h-8 w-full rounded-md border border-gray-300 bg-transparent px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        id="role"
                                        value={signupData.role}
                                        onChange={handleInputChange}
                                    >
                                        <option value="none" disabled>
                                            -Select Role-
                                        </option>
                                        <option className="dark:text-black" value="user">
                                            User
                                        </option>
                                        <option className="dark:text-black" value="manufacturer">
                                            Manufacturer
                                        </option>
                                        <option className="dark:text-black" value="distributor">
                                            Distributor
                                        </option>
                                        <option className="dark:text-black" value="pharmacy">
                                            Pharmacy
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <button
                                    type="submit"
                                    className={`inline-flex w-full items-center justify-center rounded-md bg-blue-500 px-3.5 py-2 font-semibold leading-7 text-white ${loading ? "disabled" : "hover:bg-blue-600"
                                        }`}
                                    disabled={loading}
                                >
                                    {loading ? "Processing..." : "Register"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
