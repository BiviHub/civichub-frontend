import { Shield, Mail, Phone, MapPin, Users, MessageSquare, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="col-span-1 lg:col-span-2">
                        <Link to="/" className="flex items-center space-x-2 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                                CivicHub
                            </span>
                        </Link>
                        <p className="text-gray-300 mb-6 max-w-md">
                            Empowering citizens to report civic issues and connect with local authorities for a better community.
                            Your voice matters in building a stronger, more responsive local government.
                        </p>
                        <div className="flex space-x-4">
                            <div className="flex items-center space-x-2 text-sm text-gray-300">
                                <Users className="w-4 h-4" />
                                <span>15,000+ Citizens</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-300">
                                <CheckCircle className="w-4 h-4" />
                                <span>5,000+ Issues Resolved</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/report" className="text-gray-300 hover:text-white transition-colors">
                                    Report Issue
                                </Link>
                            </li>
                            <li>
                                <Link to="/track" className="text-gray-300 hover:text-white transition-colors">
                                    Track Complaints
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Support</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/help" className="text-gray-300 hover:text-white transition-colors">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="text-gray-300 hover:text-white transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link to="/feedback" className="text-gray-300 hover:text-white transition-colors">
                                    Feedback
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="border-t border-gray-800 mt-12 pt-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                                <Phone className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <div className="text-sm text-gray-400">Emergency Hotline</div>
                                <div className="text-white font-medium">+1 (555) 123-4567</div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                                <Mail className="w-5 h-5 text-green-400" />
                            </div>
                            <div>
                                <div className="text-sm text-gray-400">Support Email</div>
                                <div className="text-white font-medium">support@civichub.gov</div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                                <MapPin className="w-5 h-5 text-purple-400" />
                            </div>
                            <div>
                                <div className="text-sm text-gray-400">Office Address</div>
                                <div className="text-white font-medium">City Hall, Main Street</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-gray-400 text-sm mb-4 md:mb-0">
                        © 2024 CivicHub. All rights reserved. Building better communities together.
                    </div>
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span>24/7 Support Available</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <MessageSquare className="w-4 h-4" />
                            <span>Response within 24hrs</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;