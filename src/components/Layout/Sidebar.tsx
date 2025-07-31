import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import {
    Home,
    User,
    Settings,
    FileText,
    Bell,
    AlertCircle,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';

export const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    const menuItems = [
        { label: 'News Feed', icon: <Home size={20} />, path: '/user/newsfeed' },
        { label: 'Profile', icon: <User size={20} />, path: '/user/profile' },
        { label: 'Account Settings', icon: <Settings size={20} />, path: '/user/account-settings' },
        { label: 'My Posts', icon: <FileText size={20} />, path: '/user/my-posts' },
        { label: 'Notifications', icon: <Bell size={20} />, path: '/user/notifications' },
        { label: 'ReportIssue', icon: <AlertCircle size={20} />, path: '/user/report' },
    ];

    return (
        <div
            className={`h-screen bg-gradient-to-b from-blue-600 to-green-600 dark:from-gray-900 dark:to-gray-800 text-white         ${collapsed ? 'w-20' : 'w-64'} fixed left-0 top-0 z-40`}
        >
            <div className="flex items-center justify-between px-4 py-4">
                {!collapsed && <h1 className="text-xl font-bold">CivicHub</h1>}
                <button onClick={() => setCollapsed(!collapsed)}>
                    {collapsed ? <ChevronRight /> : <ChevronLeft />}
                </button>
            </div>

            <nav className="mt-4 space-y-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center space-x-3 px-4 py-2 rounded-md hover:bg-white hover:bg-opacity-20 transition-colors
              ${location.pathname === item.path ? 'bg-white bg-opacity-20' : ''}`}
                    >
                        {item.icon}
                        {!collapsed && <span>{item.label}</span>}
                    </Link>
                ))}
            </nav>
        </div>
    );
};


