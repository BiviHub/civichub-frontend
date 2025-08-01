import { useEffect, useState } from 'react';
import { BarChart3, FileText, Flag, Users } from 'lucide-react';
import { getAdminDashboard } from '../../services/authService';
import AdminSidebar from '../../components/AdminSidebar';


const AdminDashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        reportsCount: 0,
        usersCount: 0,
        flaggedPostCount: 0,
        reviewedFlaggedCount: 0,
        weeklyActivitiesCount: 0,
    });

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const data = await getAdminDashboard();
                setDashboardData(data);
            } catch (error) {
                console.error('Failed to fetch dashboard:', error);
            }
        };

        fetchDashboard();
    }, []);

    const statCards = [
        { title: 'Total Reports', value: dashboardData.reportsCount, icon: FileText },
        { title: 'Active Users', value: dashboardData.usersCount, icon: Users },
        { title: 'Flagged Posts', value: dashboardData.flaggedPostCount, icon: Flag },
        { title: 'Reviewed Flags', value: dashboardData.reviewedFlaggedCount, icon: BarChart3 },
        // You can replace above or add new card for WeeklyActivities if you implement it
    ];

    return (
        <div className="flex bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
            <AdminSidebar />

            <main className="ml-64 w-full p-6">
                <h1 className="text-3xl font-bold text-blue-700 mb-6">Welcome, Admin</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statCards.map(({ title, value, icon: Icon }) => (
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

