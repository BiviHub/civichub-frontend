import AdminSidebar from '../../components/AdminSidebar';
import { CheckCircle, Star, Trash2, Tag } from 'lucide-react';
import samplepost from '@/assets/images/sample-post.jpg';
import waste from '@/assets/images/waste.jpg';
import publicSafetyVideo from '@/assets/videos/Public Safety.mp4';
import road from "@/assets/videos/road.mp4";

const mockReports = [
    {
        id: 1,
        date: 'Today',
        location: 'Ikeja, Lagos',
        content: 'Broken water pipe on the road.',
        image: samplepost,
    },
    {
        id: 2,
        date: 'Yesterday',
        location: 'Garki, Abuja',
        content: 'Uncollected waste for days!',
        image: waste,
    },
    {
        id: 3,
        date: 'Today',
        location: 'Wuse Zone 6, Abuja',
        content: 'Video footage showing a safety violation.',
        video: publicSafetyVideo,
    },
    {
        id: 4,
        date: 'Today',
        location: 'Wuse Zone 6, Enugu',
        content: 'Government are doing good roads at Enugu.',
        video: road,
    },
];

const ManageReports = () => {
    return (
        <div className="flex bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
            <AdminSidebar />

            <main className="ml-64 w-full p-6">
                <h1 className="text-2xl font-bold text-blue-700 mb-6">Manage Reports</h1>

                <div className="grid gap-6">
                    {mockReports.map((report) => (
                        <div
                            key={report.id}
                            className="bg-white rounded-xl shadow p-4 border border-gray-100"
                        >
                            <div className="text-sm text-gray-500 mb-1">
                                {report.date} • {report.location}
                            </div>
                            <p className="text-gray-800 mb-4">{report.content}</p>

                            {report.image && (
                                <div className="relative w-full aspect-video overflow-hidden rounded-md shadow mb-4">
                                    <div className="w-full flex justify-center mb-4">
                                        <img
                                            src={report.image}
                                            alt="Report"
                                            className="rounded-xl shadow max-w-2xl w-full object-contain"
                                        />
                                    </div>

                                </div>
                            )}

                            {report.video && (
                                <div className="relative w-full aspect-video overflow-hidden rounded-md shadow mb-4">
                                    <div className="w-full flex justify-center mb-4">
                                        <video
                                            src={report.video}
                                            controls
                                            className="rounded-xl shadow max-w-2xl w-full object-contain"
                                        />
                                    </div>

                                </div>
                            )}

                            <div className="flex flex-wrap gap-3 mt-2">
                                <button className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition">
                                    <CheckCircle className="w-4 h-4" />
                                    Mark Resolved
                                </button>

                                <button className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition">
                                    <Star className="w-4 h-4" />
                                    Feature Post
                                </button>

                                <button className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition">
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                </button>

                                <button className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition">
                                    <Tag className="w-4 h-4" />
                                    Tag Category
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default ManageReports;

