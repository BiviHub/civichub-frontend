import { useState } from 'react';
import { MessageSquare, Clock, CheckCircle, MapPin, ArrowRight, Users } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const CitizenDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const myComplaints = [
        {
            id: '#C001',
            title: 'Broken Street Light',
            category: 'Street Lighting',
            status: 'In Progress',
            statusColor: 'text-yellow-600 bg-yellow-100',
            date: '2024-01-15',
            location: 'Main St & 5th Ave',
            assignedTo: 'John Smith'
        },
        {
            id: '#C002',
            title: 'Pothole on Road',
            category: 'Road Maintenance',
            status: 'Resolved',
            statusColor: 'text-green-600 bg-green-100',
            date: '2024-01-10',
            location: 'Oak Street',
            assignedTo: 'Mike Johnson'
        },
        {
            id: '#C003',
            title: 'Garbage Not Collected',
            category: 'Waste Management',
            status: 'Submitted',
            statusColor: 'text-blue-600 bg-blue-100',
            date: '2024-01-20',
            location: 'Pine Avenue',
            assignedTo: 'Pending'
        }
    ];

    const stats = [
        { label: 'Total Complaints', value: '3', icon: MessageSquare, color: 'bg-blue-500' },
        { label: 'In Progress', value: '1', icon: Clock, color: 'bg-yellow-500' },
        { label: 'Resolved', value: '1', icon: CheckCircle, color: 'bg-green-500' },
        { label: 'Pending', value: '1', icon: Users, color: 'bg-gray-500' }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Citizen Dashboard</h1>
                    <p className="text-gray-600">Welcome back! Track your complaints and report new issues.</p>
                </div>

                {/* Quick Actions */}
                <div className="mb-8">
                    <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-6 text-white">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Report a New Issue</h3>
                                <p className="text-blue-100 mb-4">Help improve your community by reporting civic issues</p>
                            </div>
                            <Link to="/report">
                                <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center">
                                    Report Issue
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-md p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                                </div>
                                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-xl shadow-md">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 px-6">
                            {[
                                { id: 'overview', label: 'My Complaints' },
                                { id: 'recent', label: 'Recent Activity' },
                                { id: 'community', label: 'Community Issues' }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                                        activeTab === tab.id
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="p-6">
                        {activeTab === 'overview' && (
                            <div className="space-y-4">
                                {myComplaints.map((complaint, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                                            <div className="flex items-center space-x-4 mb-4 md:mb-0">
                                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                                    <MessageSquare className="w-6 h-6 text-blue-600" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">{complaint.title}</h4>
                                                    <p className="text-sm text-gray-600">{complaint.id} • {complaint.category}</p>
                                                </div>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${complaint.statusColor}`}>
                                                {complaint.status}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                                            <div className="flex items-center space-x-2">
                                                <MapPin className="w-4 h-4" />
                                                <span>{complaint.location}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Clock className="w-4 h-4" />
                                                <span>Reported: {complaint.date}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Users className="w-4 h-4" />
                                                <span>Assigned: {complaint.assignedTo}</span>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex justify-end">
                                            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                                                View Details →
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'recent' && (
                            <div className="text-center py-12">
                                <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Recent Activity</h3>
                                <p className="text-gray-600">Your recent activity will appear here</p>
                            </div>
                        )}

                        {activeTab === 'community' && (
                            <div className="text-center py-12">
                                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Community Issues</h3>
                                <p className="text-gray-600">Community issues and discussions will appear here</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default CitizenDashboard;