import { useState } from 'react';
import { Users, MessageSquare, Clock, CheckCircle, TrendingUp, MapPin, BarChart3, Settings, Search, Filter, Download, Eye, UserCheck, AlertTriangle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const dashboardStats = [
        { label: 'Total Users', value: '2,547', icon: Users, color: 'bg-blue-500', change: '+12%' },
        { label: 'Total Complaints', value: '1,234', icon: MessageSquare, color: 'bg-purple-500', change: '+8%' },
        { label: 'Active Workers', value: '45', icon: UserCheck, color: 'bg-green-500', change: '+5%' },
        { label: 'Pending Issues', value: '89', icon: Clock, color: 'bg-yellow-500', change: '-15%' },
        { label: 'Resolved Today', value: '23', icon: CheckCircle, color: 'bg-emerald-500', change: '+25%' },
        { label: 'Overdue Tasks', value: '12', icon: AlertTriangle, color: 'bg-red-500', change: '-8%' }
    ];

    const recentComplaints = [
        {
            id: '#C1234',
            title: 'Broken Street Light',
            citizen: 'John Doe',
            category: 'Street Lighting',
            status: 'Pending',
            priority: 'High',
            location: 'Main St & 5th Ave',
            submittedDate: '2024-01-20',
            assignedWorker: 'Unassigned',
            comments: 3
        },
        {
            id: '#C1235',
            title: 'Pothole on Highway',
            citizen: 'Jane Smith',
            category: 'Road Maintenance',
            status: 'In Progress',
            priority: 'Critical',
            location: 'Highway 101',
            submittedDate: '2024-01-19',
            assignedWorker: 'Mike Johnson',
            comments: 7
        },
        {
            id: '#C1236',
            title: 'Garbage Collection Missed',
            citizen: 'Bob Wilson',
            category: 'Waste Management',
            status: 'Resolved',
            priority: 'Medium',
            location: 'Oak Street',
            submittedDate: '2024-01-18',
            assignedWorker: 'Sarah Davis',
            comments: 5
        }
    ];

    const users = [
        { id: 1, name: 'John Doe', role: 'Citizen', email: 'john@email.com', status: 'Active', joinDate: '2024-01-15', complaints: 5 },
        { id: 2, name: 'Mike Johnson', role: 'Field Worker', email: 'mike@email.com', status: 'Active', joinDate: '2023-12-10', complaints: 0 },
        { id: 3, name: 'Sarah Davis', role: 'Inspector', email: 'sarah@email.com', status: 'Active', joinDate: '2023-11-05', complaints: 0 },
        { id: 4, name: 'Bob Wilson', role: 'Citizen', email: 'bob@email.com', status: 'Inactive', joinDate: '2024-01-20', complaints: 2 }
    ];

    const categories = [
        { name: 'Road Maintenance', count: 234, percentage: 35 },
        { name: 'Street Lighting', count: 156, percentage: 23 },
        { name: 'Waste Management', count: 123, percentage: 18 },
        { name: 'Water Supply', count: 89, percentage: 13 },
        { name: 'Public Safety', count: 67, percentage: 10 },
        { name: 'Others', count: 45, percentage: 7 }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Pending': return 'text-yellow-600 bg-yellow-100';
            case 'In Progress': return 'text-blue-600 bg-blue-100';
            case 'Resolved': return 'text-green-600 bg-green-100';
            case 'Rejected': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'Critical': return 'text-red-600 bg-red-100';
            case 'High': return 'text-orange-600 bg-orange-100';
            case 'Medium': return 'text-yellow-600 bg-yellow-100';
            case 'Low': return 'text-green-600 bg-green-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
                        <p className="text-gray-600">Monitor and manage all civic activities</p>
                    </div>
                    <div className="flex space-x-4">
                        <button className="bg-white border border-gray-300 px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-50 inline-flex items-center">
                            <Download className="w-4 h-4 mr-2" />
                            Export Report
                        </button>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 inline-flex items-center">
                            <Settings className="w-4 h-4 mr-2" />
                            Settings
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
                    {dashboardStats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-md p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                                <span className={`text-xs font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                    {stat.change}
                                </span>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                <p className="text-gray-600 text-sm">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content Tabs */}
                <div className="bg-white rounded-xl shadow-md">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 px-6">
                            {[
                                { id: 'overview', label: 'Overview', icon: BarChart3 },
                                { id: 'complaints', label: 'All Complaints', icon: MessageSquare },
                                { id: 'users', label: 'User Management', icon: Users },
                                { id: 'analytics', label: 'Analytics', icon: TrendingUp }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors inline-flex items-center ${
                                        activeTab === tab.id
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    <tab.icon className="w-4 h-4 mr-2" />
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="p-6">
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                {/* Recent Activity */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Complaints</h3>
                                    <div className="space-y-4">
                                        {recentComplaints.slice(0, 3).map((complaint, index) => (
                                            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900">{complaint.title}</h4>
                                                        <p className="text-sm text-gray-600">{complaint.id} • By {complaint.citizen}</p>
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(complaint.priority)}`}>
                                                            {complaint.priority}
                                                        </span>
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                                                            {complaint.status}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                                                    <div className="flex items-center space-x-1">
                                                        <MapPin className="w-3 h-3" />
                                                        <span>{complaint.location}</span>
                                                    </div>
                                                    <div>Category: {complaint.category}</div>
                                                    <div>Worker: {complaint.assignedWorker}</div>
                                                    <div className="flex items-center space-x-1">
                                                        <MessageSquare className="w-3 h-3" />
                                                        <span>{complaint.comments} comments</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Categories Overview */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Complaints by Category</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {categories.map((category, index) => (
                                            <div key={index} className="bg-gray-50 rounded-lg p-4">
                                                <div className="flex justify-between items-center mb-2">
                                                    <h4 className="font-medium text-gray-900">{category.name}</h4>
                                                    <span className="text-sm text-gray-600">{category.count}</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-blue-600 h-2 rounded-full"
                                                        style={{ width: `${category.percentage}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'complaints' && (
                            <div>
                                {/* Filters */}
                                <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
                                    <div className="flex space-x-4">
                                        <div className="relative">
                                            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="text"
                                                placeholder="Search complaints..."
                                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                            <option value="all">All Status</option>
                                            <option value="pending">Pending</option>
                                            <option value="in-progress">In Progress</option>
                                            <option value="resolved">Resolved</option>
                                        </select>
                                    </div>
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 inline-flex items-center">
                                        <Filter className="w-4 h-4 mr-2" />
                                        Filter
                                    </button>
                                </div>

                                {/* Complaints Table */}
                                <div className="overflow-x-auto">
                                    <table className="min-w-full">
                                        <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Complaint</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Citizen</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Worker</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comments</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                        {recentComplaints.map((complaint, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">{complaint.title}</div>
                                                        <div className="text-sm text-gray-500">{complaint.id} • {complaint.category}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{complaint.citizen}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                                                            {complaint.status}
                                                        </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(complaint.priority)}`}>
                                                            {complaint.priority}
                                                        </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{complaint.assignedWorker}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{complaint.comments}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === 'users' && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700">
                                        Add New User
                                    </button>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="min-w-full">
                                        <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Complaints</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                        {users.map((user, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                        <div className="text-sm text-gray-500">{user.email}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.role}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                            user.status === 'Active' ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
                                                        }`}>
                                                            {user.status}
                                                        </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.joinDate}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.complaints}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                                                    <button className="text-red-600 hover:text-red-900">Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === 'analytics' && (
                            <div className="text-center py-12">
                                <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Dashboard</h3>
                                <p className="text-gray-600">Detailed analytics and reports will appear here</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AdminDashboard;