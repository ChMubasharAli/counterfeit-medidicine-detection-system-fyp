import NavbarComponent from '../components/Navbar'
import { FaArrowRight, FaTruck } from "react-icons/fa";
import { BsFillHospitalFill, BsPerson } from "react-icons/bs";
import { MdHealthAndSafety } from "react-icons/md";

export const metadata = {
  title: "HOME-Counterfeit"
}

export default function Home() {
  return (
    <div className='dark:bg-slate-900 h-screen'>
      <NavbarComponent />
      <div className="dark:bg-slate-900 h-screen">
        {/* <Navbar /> */}
        <div className="container mx-auto p-4 overflow-x-auto overflow-y-auto">
          {/* Hero Section */}
          <div className="text-center p-8">
            <h1 className="text-5xl font-bold mb-6">
              Fight Against Counterfeit Medicines with{" "}
              <span className="text-indigo-600">AuthentiCare</span>
            </h1>
            <p className="text-lg mb-4">
              Ensuring the authenticity of medicines from manufacturer to
              consumer.
            </p>
            <img src="/supplyChain.jpg" className="mx-auto mb-8 rounded-lg shadow-lg" />
          </div>

          {/* Flow Diagram Section */}
          <div className="flex flex-col md:flex-row items-center justify-center py-10 gap-6">
            {/* Manufacturer */}
            <div className="flex flex-col items-center transform transition-transform hover:scale-110">
              <BsFillHospitalFill className="text-9xl text-slate-500" />
              <p className="text-center mt-2">Manufacturer</p>
              <p className="text-sm text-center max-w-xs">
                Begin the journey of medicine with verified production.
              </p>
            </div>
            <FaArrowRight className="text-7xl text-blue-700 hidden md:block" />

            {/* Distributor */}
            <div className="flex flex-col items-center transform transition-transform hover:scale-110">
              <FaTruck className="text-9xl" />
              <p className="text-center mt-2">Distributor</p>
              <p className="text-sm text-center max-w-xs">
                Secure and traceable distribution network.
              </p>
            </div>
            <FaArrowRight className="text-7xl text-blue-700 hidden md:block" />

            {/* Pharmacy */}
            <div className="flex flex-col items-center transform transition-transform hover:scale-110">
              <MdHealthAndSafety className="text-9xl text-green-700" />
              <p className="text-center mt-2">Pharmacy</p>
              <p className="text-sm text-center max-w-xs">
                Verified pharmacies ensuring genuine medicines.
              </p>
            </div>
            <FaArrowRight className="text-7xl text-blue-700 hidden md:block" />

            {/* User */}
            <div className="flex flex-col items-center transform transition-transform hover:scale-110">
              <BsPerson className="text-9xl text-purple-700" />
              <p className="text-center mt-2">User</p>
              <p className="text-sm text-center max-w-xs">
                Empowering consumers to verify their purchases.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
