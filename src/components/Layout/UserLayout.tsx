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
import { motion, AnimatePresence } from "framer-motion";
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
                    <AnimatePresence>
                        {showNotifications && (
                            <motion.div
                                className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80 dark:bg-black/80"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <motion.div
                                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 w-[95%] max-w-md max-h-[60vh] flex flex-col"
                                    initial={{ y: -50, opacity: 0, scale: 0.95 }}
                                    animate={{ y: 0, opacity: 1, scale: 1 }}
                                    exit={{ y: -50, opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                >
                                    <div className="flex justify-between items-center mb-3 border-b border-gray-200 dark:border-gray-700 pb-3">
                                        <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                            <Bell className="w-5 h-5 text-blue-600 dark:text-green-400" />
                                            Notifications
                                        </h2>
                                        <button
                                            onClick={() => setShowNotifications(false)}
                                            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <motion.div
                                        className="flex-1 overflow-y-auto space-y-2 mb-3 pr-1"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.1, duration: 0.3 }}
                                    >
                                        <motion.div
                                            className="bg-blue-50 dark:bg-green-950/20 p-3 rounded-lg border-l-4 border-blue-500 dark:border-green-400"
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.15, duration: 0.3 }}
                                        >
                                            <div className="flex items-start gap-2">
                                                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mt-0.5">
                                                    <Bell className="w-4 h-4 text-blue-600 dark:text-green-400" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">You have a new message.</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">2 minutes ago</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                        <motion.div
                                            className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg border-l-4 border-gray-400 dark:border-gray-500"
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.2, duration: 0.3 }}
                                        >
                                            <div className="flex items-start gap-2">
                                                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 dark:bg-gray-600/50 rounded-full flex items-center justify-center mt-0.5">
                                                    <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">Your profile was updated.</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">1 hour ago</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                        <motion.div
                                            className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg border-l-4 border-yellow-500 dark:border-yellow-400"
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.25, duration: 0.3 }}
                                        >
                                            <div className="flex items-start gap-2">
                                                <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mt-0.5">
                                                    <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">System maintenance at 11PM.</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Just now</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                        <motion.div
                                            className="bg-blue-50 dark:bg-green-950/20 p-3 rounded-lg border-l-4 border-blue-500 dark:border-green-400"
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.3, duration: 0.3 }}
                                        >
                                            <div className="flex items-start gap-2">
                                                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mt-0.5">
                                                    <Bell className="w-4 h-4 text-blue-600 dark:text-green-400" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">Another new message arrived.</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">5 minutes ago</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                        <motion.div
                                            className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg border-l-4 border-gray-400 dark:border-gray-500"
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.35, duration: 0.3 }}
                                        >
                                            <div className="flex items-start gap-2">
                                                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 dark:bg-gray-600/50 rounded-full flex items-center justify-center mt-0.5">
                                                    <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">Friend request accepted.</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">2 hours ago</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </motion.div>

                                    <motion.div
                                        className="pt-3 border-t border-gray-200 dark:border-gray-700"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.4, duration: 0.3 }}
                                    >
                                        <button className="w-full px-3 py-1.5 text-xs font-medium rounded-lg bg-gradient-to-r from-blue-600 to-green-500 text-white hover:from-blue-700 hover:to-green-600 transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md">
                                            <SendIconFallback />
                                            Mark all as read
                                        </button>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
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
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
    );
}

export default UserLayout;