import AdminLayout from '../../components/Layout/AdminLayout';
import { Users, FileWarning, Activity, MessagesSquare, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Analytics = () => {
    const stats = [
        {
            label: 'Total Users',
            value: 1589,
            icon: <Users className="w-6 h-6 text-blue-600" />,
        },
        {
            label: 'Reports Submitted',
            value: 934,
            icon: <Activity className="w-6 h-6 text-green-600" />,
        },
        {
            label: 'Flagged Posts',
            value: 27,
            icon: <AlertCircle className="w-6 h-6 text-red-600" />,
        },
        {
            label: 'Total Comments',
            value: 1883,
            icon: <MessagesSquare className="w-6 h-6 text-purple-600" />,
        },
        {
            label: 'Active Reports',
            value: 65,
            icon: <FileWarning className="w-6 h-6 text-yellow-600" />,
        },
    ];

    return (
        <AdminLayout>
            <div className="min-h-screen p-6 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
                <h1 className="text-2xl font-bold text-blue-700 dark:text-white mb-6">Analytics Overview</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stats.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow rounded-xl p-5 flex items-center justify-between"
                        >
                            <div className="space-y-1">
                                <p className="text-sm text-gray-500 dark:text-gray-300">{item.label}</p>
                                <p className="text-xl font-semibold text-gray-800 dark:text-white">{item.value}</p>
                            </div>
                            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-full">
                                {item.icon}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
};

export default Analytics;

