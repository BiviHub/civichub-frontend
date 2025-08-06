import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, FileText, Flag, Users, FileCog, Megaphone,
    BarChart3, Settings, User, LogOut, Sun, Moon
} from 'lucide-react';
import { logout } from '../services/authService';
import { useTheme } from '../Context/useTheme';
const adminLinks = [
    { label: 'Dashboard', path: '/admin-dashboard', icon: LayoutDashboard },
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
    const navigate = useNavigate();
    const { isDarkMode, toggleDarkMode } = useTheme();

    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem('token');
            navigate('/login');
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    return (
        <div className="fixed top-0 left-0 h-full w-64 bg-gradient-to-br from-blue-600 to-green-600 dark:from-gray-900 dark:to-gray-800 text-white shadow-lg z-50 flex flex-col justify-between">
            <div>
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

            <div className="px-4 py-6 flex flex-col gap-4">
                <button
                    onClick={toggleDarkMode}
                    className="w-full flex items-center gap-3 px-4 py-2 rounded-lg border border-white/30 hover:bg-white/10 transition text-white"
                >
                    {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 rounded-lg border border-white/30 hover:bg-white/10 transition text-white"
                >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar;



