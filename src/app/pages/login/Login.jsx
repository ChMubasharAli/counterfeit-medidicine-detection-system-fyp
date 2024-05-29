"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import axios from 'axios'
import LoginDataValidation from '../../../helper/loginDataValidation'

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
        role: 'none',
    });

    const loginHandler = async (event) => {
        event.preventDefault();
        const validationResult = LoginDataValidation(loginData.email, loginData.password);

        if (validationResult.error) {
            toast.error(validationResult.error, { position: "top-right" });
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('/api/login', loginData);
            toast.success(response.data.message);

            const role = response.data.user.role;
            const isAdmin = response.data.user.isAdmin;

            switch (role) {
                case 'user':
                    if (isAdmin) {
                        router.push('/pages/admin');
                    } else {
                        router.push('/pages/profile');
                    }
                    break;
                case 'manufacturer':
                    router.push('/pages/manufacturer');
                    break;
                case 'distributor':
                    router.push('/pages/distributor');
                    break;
                case 'pharmacy':
                    router.push('/pages/pharmacy');
                    break;
                default:
                    toast.error('Invalid role', { position: 'top-right' });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred', { position: 'top-right' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section>
            <div className="flex items-center justify-center px-4 py-14 dark:bg-slate-900">
                <div className="w-[40%] bg-white py-4 px-6 shadow-md shadow-gray-300 border rounded-md dark:bg-slate-800">
                    <div className="mb-2 flex justify-center">
                        <Image src="/logo.png" alt="logo" width={70} height={70} />
                    </div>
                    <h2 className="text-center text-2xl font-bold leading-tight dark:text-white text-black">
                        Sign in with your account
                    </h2>
                    <p className="mt-2 text-center text-sm dark:text-white text-gray-600">
                        Don&apos;t have an account?{' '}
                        <Link href="/pages/signup" className="font-semibold text-[#5E18EA] transition-all duration-200 hover:underline">
                            Create an account
                        </Link>
                    </p>
                    <form onSubmit={loginHandler} className="mt-8">
                        <div className="space-y-3">
                            <div>
                                <label className="text-base font-medium dark:text-white text-gray-900">Email address</label>
                                <div className="mt-2">
                                    <input
                                        className="flex h-8 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="email"
                                        placeholder="Email"
                                        value={loginData.email}
                                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label className="text-base font-medium dark:text-white text-gray-900">Password</label>
                                    <Link href="/pages/forgotPassword" className="text-sm font-semibold text-[#5E18EA] hover:underline">
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="mt-2">
                                    <input
                                        className="flex h-8 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="password"
                                        placeholder="Password"
                                        value={loginData.password}
                                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <button
                                    type="submit"
                                    className={`inline-flex w-full items-center justify-center rounded-md bg-blue-500 px-3.5 py-1.5 font-semibold leading-7 text-white ${loading ? 'disabled' : 'hover:bg-blue-600'}`}
                                    disabled={loading}
                                >
                                    {loading ? "Processing..." : "Sign in"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
