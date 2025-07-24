import  { useState } from 'react';
import { HeartIcon, MessageCircleIcon, Share2Icon, MoreVerticalIcon } from 'lucide-react';


const MyPosts = () => {
    // Simplified state for each dropdown with individual booleans
    const [isDropdown1Open, setIsDropdown1Open] = useState(false);
    const [isDropdown2Open, setIsDropdown2Open] = useState(false);
    const [isDropdown3Open, setIsDropdown3Open] = useState(false);

    // Toggle functions for each dropdown
    const toggleDropdown1 = () => setIsDropdown1Open(!isDropdown1Open);
    const toggleDropdown2 = () => setIsDropdown2Open(!isDropdown2Open);
    const toggleDropdown3 = () => setIsDropdown3Open(!isDropdown3Open);

    return (
        <>
            {/* Global style to extend gradient to full screen */}
            <style>
                {`
          html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;
            background: radial-gradient(circle at center, #e0f2fe 0%, #d1fae5 100%);
            overflow-x: hidden; /* Prevent horizontal overflow */
          }
          #root {
            min-height: 100vh; /* Ensure root takes full viewport height */
          }
        `}
            </style>
            <div className="min-h-screen flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8">
                <div className="max-w-4xl w-full">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-t-2xl shadow-lg p-4 sm:p-6 text-center">
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-wide drop-shadow-md">
                            My Posts
                        </h1>
                        <p className="text-sm sm:text-base text-white opacity-90 mt-2 font-light">
                            Showcase Your Creations
                        </p>
                    </div>

                    {/* Post Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
                        {/* Post 1 */}
                        <div className="bg-white rounded-xl shadow-md p-4 sm:p-5 md:p-6 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-l-2 border-blue-500 relative">
                            <div className="absolute top-2 right-2">
                                <button
                                    onClick={toggleDropdown1}
                                    className="text-gray-600 hover:text-gray-700 transition-colors duration-200"
                                >
                                    <MoreVerticalIcon className="w-4 sm:w-5 h-4 sm:h-5" />
                                </button>
                                {isDropdown1Open && (
                                    <div className="absolute right-0 mt-1 w-28 bg-white rounded-md shadow-lg py-1">
                                        <a href="#" className="block px-3 py-1 text-sm text-gray-700 hover:bg-gray-200">Edit</a>
                                        <a href="#" className="block px-3 py-1 text-sm text-gray-700 hover:bg-gray-200">Delete</a>
                                        <a href="#" className="block px-3 py-1 text-sm text-gray-700 hover:bg-gray-200">ViewComments</a>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center space-x-2 mb-2 sm:mb-3">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-300" /> {/* Placeholder for user image */}
                                <div>
                                    <h2 className="text-xs sm:text-sm font-semibold text-gray-800">John Doe</h2>
                                    <p className="text-xs text-gray-500">09:00 AM, Jul 24, 2025</p>
                                </div>
                            </div>
                            <h3 className="text-sm sm:text-md font-bold text-gray-800 mb-1 sm:mb-2">
                                React & Tailwind Masterpiece
                            </h3>
                            <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 leading-tight">
                                Created a stunning React app with TailwindCSS—perfect for responsive layouts!
                            </p>
                            <div className="flex justify-between items-center text-gray-500 text-xs sm:text-sm">
                                <div className="flex space-x-2 sm:space-x-3">
                                    <div className="flex items-center space-x-1 group">
                                        <HeartIcon className="w-3 sm:w-4 h-3 sm:h-4 group-hover:text-gray-700 transition-colors duration-200" />
                                        <span>22</span>
                                    </div>
                                    <div className="flex items-center space-x-1 group">
                                        <MessageCircleIcon className="w-3 sm:w-4 h-3 sm:h-4 group-hover:text-gray-700 transition-colors duration-200" />
                                        <span>7</span>
                                    </div>
                                    <div className="flex items-center space-x-1 group">
                                        <Share2Icon className="w-3 sm:w-4 h-3 sm:h-4 group-hover:text-gray-700 transition-colors duration-200" />
                                        <span>3</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Post 2 */}
                        <div className="bg-white rounded-xl shadow-md p-4 sm:p-5 md:p-6 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-l-2 border-green-500 relative">
                            <div className="absolute top-2 right-2">
                                <button
                                    onClick={toggleDropdown2}
                                    className="text-gray-600 hover:text-gray-700 transition-colors duration-200"
                                >
                                    <MoreVerticalIcon className="w-4 sm:w-5 h-4 sm:h-5" />
                                </button>
                                {isDropdown2Open && (
                                    <div className="absolute right-0 mt-1 w-28 bg-white rounded-md shadow-lg py-1">
                                        <a href="#" className="block px-3 py-1 text-sm text-gray-700 hover:bg-gray-200">Edit</a>
                                        <a href="#" className="block px-3 py-1 text-sm text-gray-700 hover:bg-gray-200">Delete</a>
                                        <a href="#" className="block px-3 py-1 text-sm text-gray-700 hover:bg-gray-200">ViewComments</a>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center space-x-2 mb-2 sm:mb-3">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-300" /> {/* Placeholder for user image */}
                                <div>
                                    <h2 className="text-xs sm:text-sm font-semibold text-gray-800">John Doe</h2>
                                    <p className="text-xs text-gray-500">09:00 AM, Jul 23, 2025</p>
                                </div>
                            </div>
                            <h3 className="text-sm sm:text-md font-bold text-gray-800 mb-1 sm:mb-2">
                                TypeScript Journey
                            </h3>
                            <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 leading-tight">
                                Diving into TypeScript—improving my code quality day by day!
                            </p>
                            <div className="flex justify-between items-center text-gray-500 text-xs sm:text-sm">
                                <div className="flex space-x-2 sm:space-x-3">
                                    <div className="flex items-center space-x-1 group">
                                        <HeartIcon className="w-3 sm:w-4 h-3 sm:h-4 group-hover:text-gray-700 transition-colors duration-200" />
                                        <span>15</span>
                                    </div>
                                    <div className="flex items-center space-x-1 group">
                                        <MessageCircleIcon className="w-3 sm:w-4 h-3 sm:h-4 group-hover:text-gray-700 transition-colors duration-200" />
                                        <span>4</span>
                                    </div>
                                    <div className="flex items-center space-x-1 group">
                                        <Share2Icon className="w-3 sm:w-4 h-3 sm:h-4 group-hover:text-gray-700 transition-colors duration-200" />
                                        <span>1</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Post 3 */}
                        <div className="bg-white rounded-xl shadow-md p-4 sm:p-5 md:p-6 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-l-2 border-blue-500 relative">
                            <div className="absolute top-2 right-2">
                                <button
                                    onClick={toggleDropdown3}
                                    className="text-gray-600 hover:text-gray-700 transition-colors duration-200"
                                >
                                    <MoreVerticalIcon className="w-4 sm:w-5 h-4 sm:h-5" />
                                </button>
                                {isDropdown3Open && (
                                    <div className="absolute right-0 mt-1 w-28 bg-white rounded-md shadow-lg py-1">
                                        <a href="#" className="block px-3 py-1 text-sm text-gray-700 hover:bg-gray-200">Edit</a>
                                        <a href="#" className="block px-3 py-1 text-sm text-gray-700 hover:bg-gray-200">Delete</a>
                                        <a href="#" className="block px-3 py-1 text-sm text-gray-700 hover:bg-gray-200">ViewComments</a>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center space-x-2 mb-2 sm:mb-3">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-300" /> {/* Placeholder for user image */}
                                <div>
                                    <h2 className="text-xs sm:text-sm font-semibold text-gray-800">John Doe</h2>
                                    <p className="text-xs text-gray-500">09:00 AM, Jul 20, 2025</p>
                                </div>
                            </div>
                            <h3 className="text-sm sm:text-md font-bold text-gray-800 mb-1 sm:mb-2">
                                VS Code Favorites
                            </h3>
                            <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 leading-tight">
                                Sharing my top VS Code extensions for a smoother workflow.
                            </p>
                            <div className="flex justify-between items-center text-gray-500 text-xs sm:text-sm">
                                <div className="flex space-x-2 sm:space-x-3">
                                    <div className="flex items-center space-x-1 group">
                                        <HeartIcon className="w-3 sm:w-4 h-3 sm:h-4 group-hover:text-gray-700 transition-colors duration-200" />
                                        <span>30</span>
                                    </div>
                                    <div className="flex items-center space-x-1 group">
                                        <MessageCircleIcon className="w-3 sm:w-4 h-3 sm:h-4 group-hover:text-gray-700 transition-colors duration-200" />
                                        <span>9</span>
                                    </div>
                                    <div className="flex items-center space-x-1 group">
                                        <Share2Icon className="w-3 sm:w-4 h-3 sm:h-4 group-hover:text-gray-700 transition-colors duration-200" />
                                        <span>4</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyPosts;