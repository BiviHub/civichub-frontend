import AdminSidebar from '../../components/AdminSidebar';
import { Plus, Trash2, Pencil } from 'lucide-react';

const announcements = [
    {
        title: 'Power Outage Update',
        content: 'We are aware of a major power outage affecting some areas. Please stay safe.',
        date: '2025-07-10',
    },
    {
        title: 'Water Pipe Repairs in Surulere',
        content: 'Repairs will begin tomorrow and may cause traffic delays.',
        date: '2025-07-08',
    },
];

const Announcements = () => {
    return (
        <div className="flex bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
            <AdminSidebar />

            <main className="ml-64 w-full p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-blue-700">Announcements</h1>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm flex items-center">
                        <Plus className="w-4 h-4 mr-1" />
                        New Announcement
                    </button>
                </div>

                <div className="space-y-4">
                    {announcements.map((ann, index) => (
                        <div
                            key={index}
                            className="bg-white p-4 rounded-xl shadow flex flex-col gap-1 border"
                        >
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-semibold text-gray-800">{ann.title}</h2>
                                <div className="flex gap-2">
                                    <button className="text-blue-600 hover:text-blue-800">
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                    <button className="text-red-600 hover:text-red-800">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600">{ann.date}</p>
                            <p className="text-gray-700 mt-1">{ann.content}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Announcements;
