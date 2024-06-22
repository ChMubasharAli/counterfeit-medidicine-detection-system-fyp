// pages/contact.js
import { BsFillTelephoneFill, BsEnvelope, BsGeoAlt } from "react-icons/bs";
import NavbarComponent from "../../../components/Navbar";

const ContactPage = () => {
    return (
        <div>
            <NavbarComponent />

            <div className="container mx-auto p-4">
                {/* Header */}
                <header className="bg-purple-700 text-white py-6 text-center">
                    <h1 className="text-4xl font-bold">Contact Us</h1>
                    <p className="text-lg mt-2">
                        We'd love to hear from you. Get in touch with us!
                    </p>
                </header>

                {/* Contact Information */}
                <section className="py-10 px-4">
                    <h2 className="text-3xl font-semibold mb-8 text-center">
                        Our Contact Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 bg-white shadow-lg rounded-lg text-center">
                            <BsFillTelephoneFill className="mx-auto mb-4 w-24 h-24 text-blue-700" />
                            <h3 className="text-xl font-bold mb-2">Phone</h3>
                            <p>+1 234 567 890</p>
                        </div>
                        <div className="p-6 bg-white shadow-lg rounded-lg text-center">
                            <BsEnvelope className="mx-auto mb-4 w-24 h-24 text-blue-700" />
                            <h3 className="text-xl font-bold mb-2">Email</h3>
                            <p>contact@authenticare.com</p>
                        </div>
                        <div className="p-6 bg-white shadow-lg rounded-lg text-center">
                            <BsGeoAlt className="mx-auto mb-4 w-24 h-24 text-blue-700" />
                            <h3 className="text-xl font-bold mb-2">Address</h3>
                            <p>1234 Pharma St, Health City, HC 56789</p>
                        </div>
                    </div>
                </section>

                {/* Contact Form */}
                <section className="py-10 px-4 bg-gray-100">
                    <h2 className="text-3xl font-semibold mb-8 text-center">
                        Send Us a Message
                    </h2>
                    <form className="max-w-2xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Your name"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Your email"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="subject">
                                Subject
                            </label>
                            <input
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                                type="text"
                                id="subject"
                                name="subject"
                                placeholder="Subject"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="message">
                                Message
                            </label>
                            <textarea
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                                id="message"
                                name="message"
                                rows="5"
                                placeholder="Your message"
                            ></textarea>
                        </div>
                        <div className="text-center">
                            <button className="bg-purple-700 text-white font-bold py-2 px-6 rounded-full hover:bg-green-700 transition duration-200">
                                Send Message
                            </button>
                        </div>
                    </form>
                </section>

                {/* Footer */}
                <footer className="bg-gray-800 text-white py-4 text-center">
                    <p>&copy; 2024 AuthentiCare. All rights reserved.</p>
                </footer>
            </div>

        </div>
    );
};

export default ContactPage;
