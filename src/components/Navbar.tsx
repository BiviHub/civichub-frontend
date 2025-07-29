import { Shield, Menu,   } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                            CivicHub
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                            Home
                        </Link>
                        <Link to="/blog" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                            Blog
                        </Link>

                        <Link to="/report" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                            Report Issue
                        </Link>
                        <Link to="/track" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                            Track Complaints
                        </Link>
                        <Link to="/pages/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                            About
                        </Link>
                        <Link to="/pages/contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                            Contact
                        </Link>
                    </div>

                    {/* Action Buttons */}
                    <div className="hidden md:flex items-center space-x-4">

                        <Link to="/login">
                            <button className="text-blue-600 hover:text-blue-700 font-medium px-4 py-2 rounded-md border border-blue-600 hover:bg-blue-50 transition-colors">
                                Login
                            </button>
                        </Link>
                        <Link to="/register">
                            <button className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 py-2 rounded-md hover:from-blue-700 hover:to-green-700 transition-colors font-medium">
                                Sign Up
                            </button>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200">
                        <div className="flex flex-col space-y-3">
                            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors">
                                Home
                            </Link>
                            <Link to="/report" className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors">
                                Report Issue
                            </Link>
                            <Link to="/track" className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors">
                                Track Complaints
                            </Link>
                            <Link to="/About" className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors">
                                About
                            </Link>
                            <Link to="/Contact" className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors">
                                Contact
                            </Link>
                            <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                                <Link to="/login">
                                    <button className="w-full text-blue-600 hover:text-blue-700 font-medium px-4 py-2 rounded-md border border-blue-600 hover:bg-blue-50 transition-colors">
                                        Login
                                    </button>
                                </Link>
                                <Link to="/register">
                                    <button className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 py-2 rounded-md hover:from-blue-700 hover:to-green-700 transition-colors font-medium">
                                        Sign Up
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;