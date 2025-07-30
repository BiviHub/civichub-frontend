import {  Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserNavbar = () => {
    return (
        <div className="sticky top-0 w-full z-30 bg-white dark:bg-gray-800 shadow-md transition-colors">

        <div className="flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                        <Shield className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            CivicHub
          </span>
                </Link>

                {/* Right side */}
                <div className="flex items-center space-x-4">
                    <span className="text-gray-600 font-medium dark:text-gray-300">Welcome, User</span>

                    {/* Future: profile pic, dropdown, etc */}
                </div>
            </div>
        </div>
    );
};

export default UserNavbar;
