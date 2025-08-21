// src/components/Layout/UserLayout.tsx
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
import { logout } from "../../services/authService";
import UserNavbar from "./UserNavbar";

const menuItems = [
    { name: "News Feed", path: "/user/news", icon: <Megaphone className="w-5 h-5 text-white" /> },
    { name: "MyPosts", path: "/user/posts", icon: <FileText className="w-5 h-5 text-white" /> },
    { name: "Settings", path: "/user/settings", icon: <Settings className="w-5 h-5 text-white" /> },
    { name: "Profile", path: "/user/profile", icon: <User className="w-5 h-5 text-white" /> },
];

const UserLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const location = useLocation();

    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem("token");
            window.location.href = "/login";
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <div className="flex h-screen overflow-hidden relative">
            {/* Mobile Sidebar Overlay */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity ${
                    mobileSidebarOpen ? "block" : "hidden"
                }`}
                onClick={() => setMobileSidebarOpen(false)}
            />

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
                            window.innerWidth < 768 ? setMobileSidebarOpen(false) : setCollapsed(!collapsed)
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

                    {/* ReportIssue now navigates to a dedicated page */}
                    <Link
                        to="/user/report"
                        className="flex items-center space-x-3 px-4 py-2 text-left hover:bg-white/10 dark:hover:bg-gray-800/10 w-full"
                        onClick={() => setMobileSidebarOpen(false)}
                    >
                        <AlertCircle className="w-5 h-5 text-white" />
                        {!collapsed && <span className="text-sm">ReportIssue</span>}
                    </Link>

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
                {/* Top Navbar (mobile) */}
                <div className="md:hidden flex justify-between items-center px-4 py-3 bg-white dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-800 shadow z-30">
                    <button onClick={() => setMobileSidebarOpen(true)} className="text-black dark:text-white">
                        <ChevronRight className="w-6 h-6" />
                    </button>
                    <span className="font-semibold text-lg text-black dark:text-white">User</span>
                </div>

                {/* Desktop Navbar */}
                <div className="hidden md:block">
                    <UserNavbar />
                </div>

                <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 relative transition-colors duration-300">
                    <Outlet />

                    {/* Notification Modal */}
                    {showNotifications && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                            <div className="bg-white/15 dark:bg-gray-900/15 rounded-2xl shadow-2xl p-4 w-[90%] max-w-md transform transition-all duration-300 scale-95 opacity-0 animate-fadeInScale border border-white/20 backdrop-blur-xl">
                                <div className="flex justify-between items-center mb-3">
                                    <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent dark:text-white">
                                        Notifications
                                    </h2>
                                    <button onClick={() => setShowNotifications(false)} className="text-gray-500 dark:text-white/60 hover:text-red-500">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="space-y-2 max-h-[250px] overflow-y-auto">
                                    <div className="bg-white/10 dark:bg-gray-900/10 p-2 rounded-md text-sm text-gray-800 dark:text-white/70">
                                        You have a new message.
                                    </div>
                                    <div className="bg-white/10 dark:bg-gray-900/10 p-2 rounded-md text-sm text-gray-800 dark:text-white/70">
                                        Your profile was updated.
                                    </div>
                                    <div className="bg-white/10 dark:bg-gray-900/10 p-2 rounded-md text-sm text-gray-800 dark:text-white/70">
                                        System maintenance at 11PM.
                                    </div>
                                </div>

                                <div className="flex justify-end mt-3">
                                    <button className="px-3 py-1 text-sm font-medium rounded-md bg-gradient-to-r from-blue-600 to-green-500 text-white hover:opacity-90 transition duration-300 flex items-center gap-1">
                                        <SendIconFallback /> Mark all as read
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

/**
 * Small fallback for the Send icon to avoid importing `Send` in top-level file if tree-shaking/lint complains.
 * If you'd rather import `Send` from lucide-react, replace <SendIconFallback /> with <Send className="w-3 h-3" /> above.
 */
function SendIconFallback() {
    return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
    );
}

export default UserLayout;
