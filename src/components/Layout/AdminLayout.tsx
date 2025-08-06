import type {ReactNode} from 'react';
import AdminSidebar from '../AdminSidebar';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../../Context/useTheme';

interface AdminLayoutProps {
    children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
    const { isDarkMode, toggleDarkMode } = useTheme();

    return (
        <div className={`flex min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
            <AdminSidebar />

            <div className="ml-64 flex-1 flex flex-col">
                {/* Navbar */}
                <div className="flex justify-between items-center p-4 border-b shadow bg-white dark:bg-gray-800">
                    <h1 className="text-xl font-semibold">CivicHub Admin</h1>
                    <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>

                {/* Main Content */}
                <motion.main
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4"
                >
                    {children}
                </motion.main>
            </div>
        </div>
    );

};

export default AdminLayout;
