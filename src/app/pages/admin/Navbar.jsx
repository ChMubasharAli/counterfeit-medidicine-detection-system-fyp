import React from "react";
import { IoIosNotifications } from "react-icons/io";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";



const Navbar = ({ heading }) => {

    const router = useRouter();
    const logout = async () => {
        try {
            const response = await axios.get("/api/logout")
            toast.success(response.data.message, { position: "top-right" })
            router.push('/pages/login')
        } catch (error) {
            toast.error(error.response.data.message, { position: "top-right" })
        }
    }

    return (
        <div className="flex-1 p-8 overflow-hidden">
            {/* Navbar */}
            <div className="flex justify-between items-center mb-8">
                <div className="text-4xl font-semibold">{heading}</div>
                <div className="flex items-center space-x-4">
                    {/* Notification Icon (Replace with your icon or use a library like Heroicons) */}
                    <IoIosNotifications className="text-4xl" />
                    {/* Logout Button */}
                    <button
                        onClick={logout}
                        className="bg-red-500 text-white px-4 py-2 rounded-md">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Navbar;
