import { BarChart3, FileText, Flag, Users } from 'lucide-react';
import AdminSidebar from '../../components/AdminSidebar';

const mockStats = [
    { title: 'Total Reports', value: 320, icon: FileText },
    { title: 'Active Users', value: 128, icon: Users },
    { title: 'Flagged Posts', value: 17, icon: Flag },
    { title: 'Weekly Activity', value: 'Up 24%', icon: BarChart3 },
];

const AdminDashboard = () => {
    return (
        <div className="flex bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
            <AdminSidebar />

            <main className="ml-64 w-full p-6">
                <h1 className="text-3xl font-bold text-blue-700 mb-6">Welcome, Admin</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {mockStats.map(({ title, value, icon: Icon }) => (
                        <div
                            key={title}
                            className="bg-white p-4 rounded-2xl shadow-md flex items-center gap-4 hover:shadow-lg transition-shadow"
                        >
                            <div className="bg-gradient-to-br from-blue-600 to-green-600 p-3 rounded-full text-white">
                                <Icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-gray-600 text-sm">{title}</h4>
                                <p className="text-xl font-bold">{value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;

