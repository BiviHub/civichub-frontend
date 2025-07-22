import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, FileText, Flag, Users, FileCog, Megaphone,
    BarChart3, Settings, User
} from 'lucide-react';

const adminLinks = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Manage Reports', path: '/admin/reports', icon: FileText },
    { label: 'Flagged Posts', path: '/admin/flagged', icon: Flag },
    { label: 'Users', path: '/admin/users', icon: Users },
    { label: 'Content Management', path: '/admin/content', icon: FileCog },
    { label: 'Announcements', path: '/admin/announcements', icon: Megaphone },
    { label: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
    { label: 'Profile', path: '/admin/profile', icon: User },
];

const AdminSidebar = () => {
    const location = useLocation();

    return (
        <div className="fixed top-0 left-0 h-full w-64 bg-gradient-to-br from-blue-600 to-green-600 text-white shadow-lg z-50">
            <div className="text-2xl font-bold px-6 py-4 border-b border-white/20">Admin Panel</div>
            <nav className="mt-6 flex flex-col gap-1 px-4">
                {adminLinks.map(({ label, path, icon: Icon }) => (
                    <Link
                        key={path}
                        to={path}
                        className={`flex items-center gap-3 px-4 py-2 rounded-lg transition hover:bg-white/10 ${
                            location.pathname === path ? 'bg-white/10' : ''
                        }`}
                    >
                        <Icon className="w-5 h-5" />
                        <span>{label}</span>
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default AdminSidebar;
