import { useState } from 'react';
import { Clock, CheckCircle, MapPin, Camera, FileText, AlertTriangle, MessageSquare } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const WorkerDashboard = () => {
    const [activeTab, setActiveTab] = useState('assigned');

    const stats = [
        { label: 'Assigned Tasks', value: '8', icon: Clock, color: 'bg-blue-500' },
        { label: 'In Progress', value: '3', icon: AlertTriangle, color: 'bg-yellow-500' },
        { label: 'Completed Today', value: '5', icon: CheckCircle, color: 'bg-green-500' },
        { label: 'Total Resolved', value: '156', icon: FileText, color: 'bg-purple-500' }
    ];

    const assignedTasks = [
        {
            id: '#C1234',
            title: 'Broken Street Light on Main Street',
            category: 'Street Lighting',
            priority: 'High',
            status: 'Assigned',
            location: 'Main St & 5th Ave',
            assignedDate: '2024-01-20 10:30 AM',
            dueDate: '2024-01-22',
            description: 'The street light has been out for 3 days, causing safety concerns for pedestrians.',
            citizenName: 'John Doe',
            inspectorNotes: 'High priority due to safety concerns. Replace bulb and check electrical connections.',
            comments: 2
        },
        {
            id: '#C1235',
            title: 'Large Pothole on Highway 101',
            category: 'Road Maintenance',
            priority: 'Critical',
            status: 'In Progress',
            location: 'Highway 101, Mile Marker 45',
            assignedDate: '2024-01-19 02:15 PM',
            dueDate: '2024-01-21',
            description: 'Dangerous pothole causing vehicle damage. Multiple cars affected.',
            citizenName: 'Jane Smith',
            inspectorNotes: 'Critical repair needed immediately. Use heavy-duty asphalt mix.',
            comments: 5
        },
        {
            id: '#C1236',
            title: 'Garbage Collection Route Issue',
            category: 'Waste Management',
            priority: 'Medium',
            status: 'Assigned',
            location: 'Oak Street, Block 15',
            assignedDate: '2024-01-20 09:00 AM',
            dueDate: '2024-01-23',
            description: 'Weekly garbage collection was missed. Bins are overflowing.',
            citizenName: 'Bob Wilson',
            inspectorNotes: 'Coordinate with collection team. Check route scheduling.',
            comments: 1
        }
    ];

    const completedTasks = [
        {
            id: '#C1200',
            title: 'Water Leak on Pine Street',
            category: 'Water Supply',
            completedDate: '2024-01-19',
            location: 'Pine Street & 3rd Ave',
            citizenFeedback: 'Excellent work! Fixed quickly and professionally.',
            rating: 5
        },
        {
            id: '#C1201',
            title: 'Broken Sidewalk Repair',
            category: 'Road Maintenance',
            completedDate: '2024-01-18',
            location: 'Elm Street',
            citizenFeedback: 'Good repair, but took longer than expected.',
            rating: 4
        }
    ];

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'Critical': return 'text-red-600 bg-red-100';
            case 'High': return 'text-orange-600 bg-orange-100';
            case 'Medium': return 'text-yellow-600 bg-yellow-100';
            case 'Low': return 'text-green-600 bg-green-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Assigned': return 'text-blue-600 bg-blue-100';
            case 'In Progress': return 'text-yellow-600 bg-yellow-100';
            case 'Completed': return 'text-green-600 bg-green-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const [, setSelectedTask] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Field Worker Dashboard</h1>
                    <p className="text-gray-600">Manage your assigned tasks and update progress</p>
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

                {/* Main Content Tabs */}
                <div className="bg-white rounded-xl shadow-md">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 px-6">
                            {[
                                { id: 'assigned', label: 'Assigned Tasks', icon: Clock },
                                { id: 'completed', label: 'Completed Tasks', icon: CheckCircle }
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
                        {activeTab === 'assigned' && (
                            <div className="space-y-6">
                                {assignedTasks.map((task, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                                                <p className="text-sm text-gray-600">{task.id} • Reported by {task.citizenName}</p>
                                            </div>
                                            <div className="flex space-x-2">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                                                    {task.priority}
                                                </span>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                                                    {task.status}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm text-gray-600">
                                            <div className="flex items-center space-x-1">
                                                <MapPin className="w-4 h-4" />
                                                <span>{task.location}</span>
                                            </div>
                                            <div>Category: {task.category}</div>
                                            <div>Due: {task.dueDate}</div>
                                        </div>

                                        <div className="mb-4">
                                            <h4 className="font-medium text-gray-900 mb-2">Description:</h4>
                                            <p className="text-gray-700 text-sm">{task.description}</p>
                                        </div>

                                        <div className="mb-4">
                                            <h4 className="font-medium text-gray-900 mb-2">Inspector Notes:</h4>
                                            <p className="text-gray-700 text-sm bg-blue-50 p-3 rounded">{task.inspectorNotes}</p>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center space-x-1 text-sm text-gray-600">
                                                <MessageSquare className="w-4 h-4" />
                                                <span>{task.comments} comments</span>
                                            </div>
                                            <div className="flex space-x-2">
                                                {task.status === 'Assigned' && (
                                                    <button
                                                        className="bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700"
                                                        onClick={() => {
                                                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                                            // @ts-expect-error
                                                            setSelectedTask(task);
                                                        }}
                                                    >
                                                        Start Work
                                                    </button>
                                                )}
                                                {task.status === 'In Progress' && (
                                                    <button
                                                        className="bg-green-600 text-white px-4 py-2 rounded font-medium hover:bg-green-700"
                                                        onClick={() => setShowUpdateModal(true)}
                                                    >
                                                        Update Progress
                                                    </button>
                                                )}
                                                <button className="bg-gray-600 text-white px-4 py-2 rounded font-medium hover:bg-gray-700">
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'completed' && (
                            <div className="space-y-4">
                                {completedTasks.map((task, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                                                <p className="text-sm text-gray-600">{task.id} • {task.category}</p>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i} className={`text-lg ${i < task.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                                                        ⭐
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                                            <div className="flex items-center space-x-1">
                                                <MapPin className="w-4 h-4" />
                                                <span>{task.location}</span>
                                            </div>
                                            <div>Completed: {task.completedDate}</div>
                                        </div>

                                        <div className="mb-4">
                                            <h4 className="font-medium text-gray-900 mb-2">Citizen Feedback:</h4>
                                            <p className="text-gray-700 text-sm bg-green-50 p-3 rounded">"{task.citizenFeedback}"</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Update Progress Modal */}
                {showUpdateModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Task Progress</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Status Update</label>
                                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                        <option>In Progress</option>
                                        <option>Completed</option>
                                        <option>Need Materials</option>
                                        <option>Issue Encountered</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Progress Notes</label>
                                    <textarea
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        rows={3}
                                        placeholder="Describe the work completed..."
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload Photos</label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                        <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                        <p className="text-sm text-gray-600">Click to upload progress photos</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex space-x-3 mt-6">
                                <button
                                    className="flex-1 bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700"
                                    onClick={() => setShowUpdateModal(false)}
                                >
                                    Update Progress
                                </button>
                                <button
                                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded font-medium hover:bg-gray-400"
                                    onClick={() => setShowUpdateModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default WorkerDashboard;