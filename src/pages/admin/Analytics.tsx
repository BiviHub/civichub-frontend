import AdminSidebar from '../../components/AdminSidebar';
import { Users, FileWarning, Activity, MessagesSquare, AlertCircle } from 'lucide-react';

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
        <div className="flex bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
            <AdminSidebar />

            <main className="ml-64 w-full p-6">
                <h1 className="text-2xl font-bold text-blue-700 mb-6">Analytics Overview</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stats.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-white shadow rounded-xl p-5 flex items-center justify-between border"
                        >
                            <div className="space-y-1">
                                <p className="text-sm text-gray-500">{item.label}</p>
                                <p className="text-xl font-semibold text-gray-800">{item.value}</p>
                            </div>
                            <div className="bg-gray-100 p-3 rounded-full">
                                {item.icon}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Analytics;
