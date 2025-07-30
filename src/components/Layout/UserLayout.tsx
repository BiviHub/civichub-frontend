import { useState } from "react";
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
    AlertCircle,
} from "lucide-react";
import { Link, useLocation, Outlet } from "react-router-dom";
import UserNavbar from "./UserNavbar";

const menuItems = [
    { name: "News Feed", path: "/user/news", icon: <Megaphone className="w-5 h-5 text-white" /> },
    { name: "MyPosts", path: "/user/posts", icon: <FileText className="w-5 h-5 text-white" /> },
    { name: "Settings", path: "/user/settings", icon: <Settings className="w-5 h-5 text-white" /> },
    { name: "Profile", path: "/user/profile", icon: <User className="w-5 h-5 text-white" /> },
    { name: "Logout", path: "/user/logout", icon: <LogOutIcon className="w-5 h-5 text-white" /> },
    {
        name: "Notification",
        path: "#",
        icon: <Bell className="w-5 h-5 text-white" />,
    },
    {
        name: "ReportIssue",
        path: "#",
        icon: <AlertCircle className="w-5 h-5 text-white" />,
    },
];

const UserLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showReportIssue, setShowReportIssue] = useState(false); // New state for ReportIssue
    const location = useLocation();

    const handleNotificationClick = () => {
        setShowNotifications(true);
    };

    const handleReportIssueClick = () => {
        setShowReportIssue(true);
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
                className={`fixed md:static top-0 left-0 z-50 h-full bg-gradient-to-b from-blue-600 to-green-600 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 text-white transition-transform duration-300 ${
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
                        className="focus:outline-none"
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
                    {menuItems.map((item) =>
                        item.name === "Notification" ? (
                            <button
                                key={item.name}
                                onClick={handleNotificationClick}
                                className="flex items-center space-x-3 px-4 py-2 text-left hover:bg-white/10 dark:hover:bg-white/5 w-full"
                            >
                                <span>{item.icon}</span>
                                {!collapsed && <span className="text-sm">{item.name}</span>}
                            </button>
                        ) : item.name === "ReportIssue" ? (
                            <button
                                key={item.name}
                                onClick={handleReportIssueClick}
                                className="flex items-center space-x-3 px-4 py-2 text-left hover:bg-white/10 dark:hover:bg-white/5 w-full"
                            >
                                <span>{item.icon}</span>
                                {!collapsed && <span className="text-sm">{item.name}</span>}
                            </button>
                        ) : (
                            <Link
                                key={item.name}
                                to={item.path}
                                onClick={() => setMobileSidebarOpen(false)}
                                className={`flex items-center space-x-3 px-4 py-2 hover:bg-white/10 dark:hover:bg-white/5 ${
                                    location.pathname === item.path ? "bg-white/10 dark:bg-white/5" : ""
                                }`}
                            >
                                <span>{item.icon}</span>
                                {!collapsed && <span className="text-sm">{item.name}</span>}
                            </Link>
                        )
                    )}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden md:ml-0">
                {/* Top Navbar */}
                <div className="md:hidden flex justify-between items-center px-4 py-3 bg-white/10 dark:bg-white/5 shadow z-30">
                    <button onClick={() => setMobileSidebarOpen(true)} className="text-white">
                        <ChevronRight className="w-6 h-6" />
                    </button>
                    <span className="font-semibold text-lg text-white">User</span>
                </div>

                <div className="hidden md:block">
                    <UserNavbar />
                </div>

                <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 relative transition-colors duration-300">
                    <Outlet />

                    {/* Notification Modal */}
                    {showNotifications && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                            <div className="bg-white/15 dark:bg-white/5 rounded-2xl shadow-2xl p-4 w-[90%] max-w-md transform transition-all duration-300 scale-95 opacity-0 animate-fadeInScale border border-white/20 backdrop-blur-xl">
                                <div className="flex justify-between items-center mb-3">
                                    <h2 className="text-lg font-bold text-white">Notifications</h2>
                                    <button
                                        onClick={() => setShowNotifications(false)}
                                        className="text-white/60 hover:text-red-500"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="space-y-2 max-h-[250px] overflow-y-auto">
                                    <div className="bg-white/10 dark:bg-white/5 p-2 rounded-md text-sm text-white/70">
                                        You have a new message.
                                    </div>
                                    <div className="bg-white/10 dark:bg-white/5 p-2 rounded-md text-sm text-white/70">
                                        Your profile was updated.
                                    </div>
                                    <div className="bg-white/10 dark:bg-white/5 p-2 rounded-md text-sm text-white/70">
                                        System maintenance at 11PM.
                                    </div>
                                </div>
                                <div className="flex justify-end mt-3">
                                    <button className="px-3 py-1 text-sm text-white font-medium rounded-md bg-gradient-to-r from-blue-600 to-green-500 hover:opacity-90 transition duration-300">
                                        Mark all as read
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ReportIssue Modal */}
                    {showReportIssue && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                            <div className="bg-white/15 dark:bg-white/5 rounded-2xl shadow-2xl p-4 w-[90%] max-w-md transform transition-all duration-300 scale-95 opacity-0 animate-fadeInScale border border-white/20 backdrop-blur-xl">
                                <div className="flex justify-between items-center mb-3">
                                    <h2 className="text-lg font-bold text-white">Report an Issue</h2>
                                    <button
                                        onClick={() => setShowReportIssue(false)}
                                        className="text-white/60 hover:text-red-500"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    <div className="bg-white/10 dark:bg-white/5 p-2 rounded-md text-sm text-white/70">
                                        This is a placeholder for reporting issues.
                                    </div>
                                </div>
                                <div className="flex justify-end mt-3">
                                    <button
                                        onClick={() => setShowReportIssue(false)}
                                        className="px-3 py-1 text-sm text-white font-medium rounded-md bg-gradient-to-r from-blue-600 to-green-500 hover:opacity-90 transition duration-300"
                                    >
                                        Close
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