import { Mail, Phone, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ContactPage = () => {
    return (
        <div className="bg-gradient-to-br from-blue-50 to-green-50 text-gray-800">
            <Navbar />

            {/* Hero Section */}
            <section className="text-center py-20 px-4 bg-gradient-to-r from-blue-600 to-green-500 text-white">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Contact Us</h1>
                    <p className="text-lg font-medium">
                        Have a question, suggestion, or feedback? We’d love to hear from you.
                    </p>
                </div>
            </section>

            {/* Contact Info and Form */}
            <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10">
                {/* Contact Information */}
                <div className="space-y-6">
                    <div className="flex items-start gap-4 bg-blue-100 rounded-xl p-6 shadow-md">
                        <Mail className="text-blue-600 w-6 h-6 mt-1" />
                        <div>
                            <h3 className="font-semibold text-blue-700">Email</h3>
                            <p className="text-sm">hello@civichub.com</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 bg-green-100 rounded-xl p-6 shadow-md">
                        <Phone className="text-green-600 w-6 h-6 mt-1" />
                        <div>
                            <h3 className="font-semibold text-green-700">Phone</h3>
                            <p className="text-sm">+1 (555) 123-4567</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 bg-yellow-100 rounded-xl p-6 shadow-md">
                        <Clock className="text-yellow-600 w-6 h-6 mt-1" />
                        <div>
                            <h3 className="font-semibold text-yellow-700">Business Hours</h3>
                            <p className="text-sm">Mon–Fri: 9AM–6PM<br />Weekends: 10AM–4PM</p>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white rounded-xl p-8 shadow-md space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800">Send us a Message</h2>
                    <form className="space-y-4">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <textarea
                            rows={5}
                            placeholder="Your Message"
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        ></textarea>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 rounded-md font-semibold"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ContactPage;
