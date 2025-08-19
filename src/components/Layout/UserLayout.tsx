import { useState, useEffect } from "react";
import {
    LogOutIcon,
    Bell,
    User,
    FileText,
    Megaphone,
    Settings,
    ChevronLeft,
    ChevronRight,
    X,
    Upload,
    FileText as FileTextIcon,
    Send,
    AlertCircle,
    Check
} from "lucide-react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { logout } from "../../services/authService";
import UserNavbar from "./UserNavbar";

interface Location {
    latitude: number | null;
    longitude: number | null;
    placeName: string | null;
}

const menuItems = [
    { name: "News Feed", path: "/user/news", icon: <Megaphone className="w-5 h-5 text-white" /> },
    { name: "MyPosts", path: "/user/posts", icon: <FileText className="w-5 h-5 text-white" /> },
    { name: "Settings", path: "/user/settings", icon: <Settings className="w-5 h-5 text-white" /> },
    { name: "Profile", path: "/user/profile", icon: <User className="w-5 h-5 text-white" /> },
];

const UserLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [showReportIssue, setShowReportIssue] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const location = useLocation();
    const [reportLocation, setReportLocation] = useState<Location>({ latitude: null, longitude: null, placeName: null });
    const [locationError, setLocationError] = useState<string | null>(null);
    const [description, setDescription] = useState("");
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]); // Handles images and videos
    const [manualLocation, setManualLocation] = useState<string | null>(null); // For manual correction

    // Fetch location with higher accuracy option
    const fetchLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log("Fetched coordinates:", { latitude, longitude }); // Debug coordinates
                    setReportLocation({ latitude, longitude, placeName: null });

                    // Fetch place name using OpenStreetMap Nominatim
                    try {
                        const res = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
                        );
                        const data = await res.json();
                        setReportLocation((prev) => ({ ...prev, placeName: data.display_name || `${latitude},${longitude}` }));
                        setLocationError(null);
                        setManualLocation(null); // Reset manual input on successful fetch
                    } catch (err) {
                        setLocationError("Failed to fetch location name.");
                        console.error("Error fetching location name:", err);
                    }
                },
                (error) => {
                    setLocationError("Unable to retrieve location. Please enable location services.");
                    setReportLocation({ latitude: null, longitude: null, placeName: null });
                    console.error("Geolocation error:", error);
                },
                { enableHighAccuracy: true, maximumAge: 0 } // Request higher accuracy
            );
        }
    };

    useEffect(() => {
        if (showReportIssue) {
            fetchLocation();
        }
    }, [showReportIssue]);

    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem("token");
            window.location.href = "/login";
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files).filter((file) =>
                file.type.startsWith("image/") || file.type.startsWith("video/")
            );
            setUploadedFiles((prev) => [...prev, ...newFiles].slice(0, 5)); // Limit to 5 files
        }
    };

    const handleDeleteFile = (index: number) => {
        setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        console.log("Submitted:", { location: reportLocation, description, uploadedFiles, manualLocation });
        setShowReportIssue(false);
    };

    return (
        <div className="flex h-screen overflow-hidden relative">
            {/* Mobile Sidebar Overlay */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity ${
                    mobileSidebarOpen ? "block" : "hidden"
                }`}
                onClick={() => setMobileSidebarOpen(false)}
            ></div>

            {/* Sidebar */}
            <div
                className={`fixed md:static top-0 left-0 z-50 h-full bg-gradient-to-b from-blue-600 to-green-600 dark:from-gray-900 dark:to-gray-800 text-white transition-transform duration-300 ${
                    collapsed ? "md:w-16" : "md:w-64"
                } ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
            >
                <div className="flex items-center justify-between p-4">
                    <span className={`font-bold text-lg ${collapsed ? "hidden" : "block"}`}>Menu</span>
                    <button
                        onClick={() =>
                            window.innerWidth < 768
                                ? setMobileSidebarOpen(false)
                                : setCollapsed(!collapsed)
                        }
                        className="focus:outline-none bg-transparent"
                    >
                        {window.innerWidth < 768 ? (
                            <X className="w-5 h-5 text-white" />
                        ) : collapsed ? (
                            <ChevronRight className="w-5 h-5 text-white" />
                        ) : (
                            <ChevronLeft className="w-5 h-5 text-white" />
                        )}
                    </button>
                </div>
                <nav className="flex flex-col space-y-3 mt-6">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            onClick={() => setMobileSidebarOpen(false)}
                            className={`flex items-center space-x-3 px-4 py-2 hover:bg-white/10 dark:hover:bg-gray-800/10 ${
                                location.pathname === item.path ? "bg-white/10 dark:bg-gray-800/10" : ""
                            }`}
                        >
                            <span>{item.icon}</span>
                            {!collapsed && <span className="text-sm">{item.name}</span>}
                        </Link>
                    ))}

                    {/* Notification Button */}
                    <button
                        onClick={() => setShowNotifications(true)}
                        className="flex items-center space-x-3 px-4 py-2 text-left hover:bg-white/10 dark:hover:bg-gray-800/10 w-full"
                    >
                        <Bell className="w-5 h-5 text-white" />
                        {!collapsed && <span className="text-sm">Notification</span>}
                    </button>

                    {/* ReportIssue Button */}
                    <button
                        onClick={() => setShowReportIssue(true)}
                        className="flex items-center space-x-3 px-4 py-2 text-left hover:bg-white/10 dark:hover:bg-gray-800/10 w-full"
                    >
                        <AlertCircle className="w-5 h-5 text-white" />
                        {!collapsed && <span className="text-sm">ReportIssue</span>}
                    </button>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-2 text-left hover:bg-white/10 dark:hover:bg-gray-800/10 w-full text-red-200 mt-auto"
                    >
                        <LogOutIcon className="w-5 h-5 text-white" />
                        {!collapsed && <span className="text-sm">Logout</span>}
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden md:ml-0">
                {/* Top Navbar */}
                <div className="md:hidden flex justify-between items-center px-4 py-3 bg-white dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-800 shadow z-30">
                    <button onClick={() => setMobileSidebarOpen(true)} className="text-black dark:text-white">
                        <ChevronRight className="w-6 h-6" />
                    </button>
                    <span className="font-semibold text-lg text-black dark:text-white">User</span>
                </div>

                <div className="hidden md:block">
                    <UserNavbar />
                </div>

                <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 relative transition-colors duration-300">
                    <Outlet />

                    {/* Notification Modal */}
                    {showNotifications && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300">
                            <div className="bg-white/90 dark:bg-gray-900/90 rounded-3xl shadow-xl p-6 w-[90%] max-w-lg transform transition-all duration-500 ease-out scale-100 hover:scale-105 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-lg">
                                {/* Header */}
                                <div className="flex justify-between items-center mb-5">
                                    <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent dark:text-white tracking-tight">
                                        Notifications
                                    </h2>
                                    <button
                                        onClick={() => setShowNotifications(false)}
                                        className="text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                {/* Notification List */}
                                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
                                    {[
                                        { message: "You have a new message.", time: "2m ago" },
                                        { message: "Your profile was updated.", time: "1h ago" },
                                        { message: "System maintenance at 11PM.", time: "3h ago" },
                                    ].map((notification, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-3 bg-gray-100/50 dark:bg-gray-800/50 p-3 rounded-xl hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors duration-200 group"
                                        >
                                            <Bell className="w-5 h-5 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-1" />
                                            <div className="flex-1">
                                                <p className="text-sm text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                                                    {notification.message}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Footer */}
                                <div className="flex justify-end mt-5">
                                    <button
                                        className="px-4 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-blue-600 to-green-500 text-white hover:from-blue-700 hover:to-green-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-md"
                                        onClick={() => setShowNotifications(false)}
                                    >
                                        <Check className="w-4 h-4" /> Mark All as Read
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ReportIssue Modal */}
                    {showReportIssue && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn">
                            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 w-[90%] max-w-md transform transition-all duration-300 scale-95 animate-slideDown border border-gray-200 dark:border-gray-700">
                                {/* Header */}
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent dark:text-white">Report an Issue</h2>
                                    <button
                                        onClick={() => setShowReportIssue(false)}
                                        className="text-gray-500 dark:text-white/60 hover:text-red-500"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="space-y-6">
                                    {/* Description Field */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-gray-800 dark:text-white font-semibold text-base">
                                            <FileTextIcon className="w-4 h-4 text-gray-800 dark:text-white" />
                                            Describe the Issue
                                        </label>
                                        <textarea
                                            rows={4}
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-300 outline-none resize-none"
                                            placeholder="Briefly describe the issue..."
                                        />
                                    </div>

                                    {/* Image/Video Upload Area */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-gray-800 dark:text-white font-semibold text-base">
                                            <Upload className="w-4 h-4 text-gray-800 dark:text-white" />
                                            Upload Images or Videos (Up to 5)
                                        </label>
                                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300">
                                            <input
                                                type="file"
                                                multiple
                                                accept="image/*,video/*"
                                                onChange={handleFileChange}
                                                className="w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                                            />
                                            {uploadedFiles.length > 0 && (
                                                <div className="mt-4 grid grid-cols-2 gap-2">
                                                    {uploadedFiles.map((file, index) => (
                                                        <div key={index} className="relative">
                                                            {file.type.startsWith("video") ? (
                                                                <video
                                                                    controls
                                                                    className="w-full h-24 object-cover rounded-lg"
                                                                    src={URL.createObjectURL(file)}
                                                                />
                                                            ) : (
                                                                <img
                                                                    src={URL.createObjectURL(file)}
                                                                    alt={`Preview ${index}`}
                                                                    className="w-full h-24 object-cover rounded-lg"
                                                                />
                                                            )}
                                                            <button
                                                                onClick={() => handleDeleteFile(index)}
                                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                                                            >
                                                                <X size={14} />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            <p className="text-gray-500 dark:text-gray-400 text-xs mt-2">
                                                Support images (PNG, JPG, etc.) and videos. Max 5 files.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Location Field */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-gray-800 dark:text-white font-semibold text-base">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-4 h-4 text-gray-800 dark:text-white"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                            Location
                                        </label>
                                        {locationError ? (
                                            <p className="text-red-500 text-sm">{locationError}</p>
                                        ) : reportLocation.latitude && reportLocation.longitude ? (
                                            <div className="bg-gray-200 dark:bg-gray-800 p-2 rounded-lg text-gray-800 dark:text-white">
                                                <p>
                                                    {manualLocation || reportLocation.placeName || `Latitude: ${reportLocation.latitude.toFixed(6)}, Longitude: ${reportLocation.longitude.toFixed(6)}`}
                                                </p>
                                                <div className="mt-1 flex gap-2">
                                                    <input
                                                        type="text"
                                                        value={manualLocation || ""}
                                                        onChange={(e) => setManualLocation(e.target.value)}
                                                        placeholder="Enter correct location (e.g., Abakpa, Enugu)"
                                                        className="w-full px-2 py-1 border rounded-md text-sm dark:bg-gray-700 dark:text-white"
                                                    />
                                                    <button
                                                        className="text-red-500 dark:text-red-400 text-sm hover:underline"
                                                        onClick={() => {
                                                            setReportLocation({ latitude: null, longitude: null, placeName: null });
                                                            setManualLocation(null);
                                                        }}
                                                    >
                                                        Clear
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <button
                                                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 flex items-center justify-center gap-2"
                                                onClick={fetchLocation}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-4 h-4 text-gray-800 dark:text-white"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                                    />
                                                </svg>
                                                Use Current Location
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="flex justify-end mt-6">
                                    <button
                                        className="px-4 py-2 text-sm font-medium rounded-md bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-300 mr-2"
                                        onClick={() => setShowReportIssue(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="px-4 py-2 text-sm font-medium rounded-md bg-gradient-to-r from-blue-600 to-green-500 text-white hover:opacity-90 transition duration-300 flex items-center gap-2"
                                        onClick={handleSubmit}
                                    >
                                        <Send className="w-4 h-4" /> Submit Report
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default UserLayout;