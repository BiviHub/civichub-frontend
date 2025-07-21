import { Pencil, Trash2 } from 'lucide-react';

const mockUserPosts = [
    {
        id: 1,
        content: 'Blocked drainage at Yaba road!',
        date: '3 days ago',
        status: 'Pending',
    },
    {
        id: 2,
        content: 'Broken streetlight in Surulere.',
        date: 'Last week',
        status: 'Resolved',
    },
];

const MyPosts = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
            <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6">
                <h2 className="text-2xl font-bold text-blue-700 mb-4">My Reports</h2>

                {mockUserPosts.map((post) => (
                    <div key={post.id} className="border-b py-4">
                        <div className="flex justify-between items-center mb-2">
                            <div>
                                <p className="text-lg text-gray-800">{post.content}</p>
                                <p className="text-sm text-gray-500">{post.date} • Status: <span className={`font-medium ${post.status === 'Resolved' ? 'text-green-600' : 'text-yellow-600'}`}>{post.status}</span></p>
                            </div>
                            <div className="flex gap-3">
                                <button className="text-blue-600 hover:underline flex items-center gap-1">
                                    <Pencil className="w-4 h-4" /> Edit
                                </button>
                                <button className="text-red-600 hover:underline flex items-center gap-1">
                                    <Trash2 className="w-4 h-4" /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyPosts;
