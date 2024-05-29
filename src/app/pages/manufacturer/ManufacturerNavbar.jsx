import { FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import Typewriter from "./Typewriter";

const ManufacturerNavbar = ({ name }) => {
    const router = useRouter();

    const logout = async () => {
        try {
            const response = await axios.get('/api/logout');
            toast.success(response.data.message, { position: "top-right" });
            router.push('/pages/login');
        } catch (error) {
            const errorMessage = error.response?.data?.message || "An error occurred";
            console.error(errorMessage);
            toast.error(errorMessage, { position: "top-right" });
        }
    };

    return (
        <header>
            <nav className="w-full bg-blue-500 px-3 py-2 flex items-center justify-between">
                <div className="text-red-600 text-4xl font-bold">
                    <span className="text-yellow-400">Authenti</span>Care
                </div>
                <div className="text-white font-bold text-4xl">
                    <Typewriter />
                </div>
                <button onClick={logout} className="cursor-pointer">
                    <FaSignOutAlt className="text-4xl text-white" />
                </button>
            </nav>
            <div className="p-8 flex items-center justify-center gap-2">
                {/* Content can be added here */}
            </div>
        </header>
    );
};

export default ManufacturerNavbar;
