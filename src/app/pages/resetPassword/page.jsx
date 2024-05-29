"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify'
import Image from "next/image";


export default function VerifyEmailPage() {

    const [loading, setLoading] = useState(false)
    const [token, setToken] = useState("");
    const [values, setValues] = useState({
        token: "",
        password: "",
        confirmPassword: ""
    })

    const forgotHandler = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/api/verifyemail', { token })
            setVerified(true);
            toast.success("Email Varified", { position: 'top-center' })
        } catch (error) {
            setError(true);
            console.log(error.reponse.data);

        }

    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);


    useEffect(() => {
    }, [token]);

    return (
        <>
            <div className="flex  items-center justify-center px-4 py-4 dark:bg-slate-900 h-screen ">
                <div className=" w-[40%]  bg-white py-4 px-6 shadow-lg border rounded-md dark:bg-slate-800">

                    {/* Sign in logo Image */}
                    <div className="mb-2 flex justify-center">

                        <Image src={"/logo.png"} alt='loading...' width={70} height={70}>

                        </Image>

                    </div>

                    {/* LOGIN HEADING  */}
                    <h2 className="text-center text-2xl font-bold leading-tight dark:text-white text-black">

                        Forgot Password
                    </h2>



                    <form onSubmit={forgotHandler} action="#" method="POST" className="mt-8">
                        {JSON.stringify(token)}
                        <div className="space-y-3">

                            {/* New Password Field   */}
                            <div>
                                <label htmlFor="" className="text-base font-medium dark:text-white text-gray-900">
                                    {' '}
                                    New Password{' '}
                                </label>
                                <div className="mt-2">
                                    <input
                                        className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="text"
                                        placeholder="New Password"
                                        value={values.password}
                                        onChange={(event) => { setValues({ ...values, password: event.target.value }) }}


                                    ></input>
                                </div>
                            </div>

                            {/* Confirm Password Field  */}
                            <div>
                                <label htmlFor="" className="text-base font-medium dark:text-white text-gray-900">
                                    {' '}
                                    Confirm Password{' '}
                                </label>
                                <div className="mt-2">
                                    <input
                                        className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="text"
                                        placeholder="New Password"
                                        value={values.confirmPassword}
                                        onChange={(event) => { setValues({ ...values, confirmPassword: event.target.value }) }}


                                    ></input>
                                </div>
                            </div>

                            <div className='flex flex-col gap-2 ' >
                                <button
                                    type='submit'
                                    className={`inline-flex w-full items-center justify-center rounded-md bg-[#5E18EA] px-3.5 py-1.5 font-semibold leading-7 text-white ${loading ? 'disabled' : 'hover:bg-[#5E18EA]/80'
                                        }`}
                                    disabled={loading}
                                >
                                    {loading ? "Processing..." : "Reset Password"}
                                </button>




                            </div>
                        </div>
                    </form>

                </div>
            </div >
        </>
    )

}