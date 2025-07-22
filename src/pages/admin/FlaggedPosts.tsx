import AdminSidebar from '../../components/AdminSidebar';
import { ShieldAlert, Trash2, CheckCircle2 } from 'lucide-react';

const flaggedPosts = [
    {
        id: 1,
        user: 'Citizen123',
        location: 'Yaba, Lagos',
        reason: 'Contains false information',
        content: 'Government increased tax to 80%!',
        date: 'Today',
    },
    {
        id: 2,
        user: 'LagosWatcher',
        location: 'Lekki, Lagos',
        reason: 'Offensive language',
        content: 'These politicians are thieves!',
        date: 'Yesterday',
    },
];

const FlaggedPosts = () => {
    return (
        <div className="flex bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
            <AdminSidebar />

            <main className="ml-64 w-full p-6">
                <h1 className="text-2xl font-bold text-blue-700 mb-6">Flagged Posts</h1>

                <div className="space-y-6">
                    {flaggedPosts.map((post) => (
                        <div
                            key={post.id}
                            className="bg-white border border-gray-100 shadow rounded-xl p-4"
                        >
                            <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                                <span>Posted by: <strong>{post.user}</strong></span>
                                <span>{post.date} • {post.location}</span>
                            </div>

                            <p className="text-gray-800 mb-2">{post.content}</p>

                            <div className="text-sm text-red-600 mb-3">
                                🚩 Flag Reason: <span className="font-medium">{post.reason}</span>
                            </div>

                            <div className="flex gap-3">
                                <button className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition">
                                    <CheckCircle2 className="w-4 h-4" />
                                    Approve Post
                                </button>

                                <button className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition">
                                    <Trash2 className="w-4 h-4" />
                                    Delete Post
                                </button>

                                <button className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition">
                                    <ShieldAlert className="w-4 h-4" />
                                    Review Later
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default FlaggedPosts;
