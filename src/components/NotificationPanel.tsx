// src/components/NotificationPanel.tsx

import { X, MessageSquare, Heart, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

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

const NotificationPanel = ({ isOpen, onClose }: Props) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ duration: 0.3 }}
                    className="fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-xl z-50"
                >
                    <div className="flex items-center justify-between px-5 py-4 border-b">
                        <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-red-500 transition"
                        >
                            <X />
                        </button>
                    </div>

                    <div className="overflow-y-auto h-full px-5 py-4 space-y-4">
                        {notifications.map((notif) => (
                            <div
                                key={notif.id}
                                className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition"
                            >
                                <div className="mt-1">{notif.icon}</div>
                                <div className="flex-1">
                                    <p className="text-gray-700">{notif.message}</p>
                                    <p className="text-sm text-gray-400">{notif.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default NotificationPanel;
