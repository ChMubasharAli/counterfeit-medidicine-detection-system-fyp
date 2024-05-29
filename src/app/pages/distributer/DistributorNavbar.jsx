import { FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import Typewriter from "./Typewriter";

const DistributorNavbar = ({ name }) => {
    const router = useRouter();

    const logout = async () => {
        try {
            const { data } = await axios.get('/api/logout');
            toast.success(data.message, { position: "top-right" });
            router.push('/pages/login');
        } catch (error) {
            console.error("Logout error:", error.message);
            toast.error(error.response?.data?.message || "Logout failed", { position: "top-right" });
        }
    };

    return (
        <div>
            {/* NavBar */}
            <nav className="w-full bg-blue-500 px-4 py-2 flex items-center justify-between">
                <div className="text-red-600 text-4xl font-bold">
                    <span className="text-yellow-400">Authenti</span>Care
                </div>
                <div className="text-white font-bold text-4xl">
                    <Typewriter manufacturerName={name} />
                </div>
                <div className="flex items-center space-x-4">
                    <button onClick={logout} className="cursor-pointer">
                        <FaSignOutAlt className="text-4xl text-white" />
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default DistributorNavbar;
