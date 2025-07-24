import { MessageSquare, Heart, UserPlus, Check } from 'lucide-react';

const notifications = [
    {
        id: 1,
        icon: <Heart className="text-pink-500 w-5 h-5" />,
        message: 'Someone liked your post',
        time: '2 hours ago',
    },
    {
        id: 2,
        icon: <MessageSquare className="text-blue-500 w-5 h-5" />,
        message: 'New comment on your post',
        time: '3 hours ago',
    },
    {
        id: 3,
        icon: <UserPlus className="text-green-500 w-5 h-5" />,
        message: 'You have a new follower',
        time: '1 day ago',
    },
];

const Notification = () => {
    return (
        <div className="fixed bottom-0 inset-x-0 z-50">
            <div className="max-w-2xl mx-auto bg-white rounded-t-3xl shadow-xl border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center px-4 pt-4 pb-2 border-b">
                    <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
                    <button className="text-xs bg-gradient-to-r from-blue-600 to-green-600 text-white px-3 py-1 rounded-md flex items-center gap-1 hover:opacity-90 transition">
                        <Check className="w-3 h-3" />
                        Mark all as read
                    </button>
                </div>

                {/* Scrollable Notification List */}
                <div className="max-h-72 overflow-y-auto px-4 py-3 space-y-3">
                    {notifications.map((notif) => (
                        <div
                            key={notif.id}
                            className="bg-gray-50 rounded-xl p-3 flex items-start gap-4 hover:bg-gray-100 transition"
                        >
                            <div className="mt-1">{notif.icon}</div>
                            <div>
                                <p className="text-gray-800 text-sm">{notif.message}</p>
                                <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Notification;
