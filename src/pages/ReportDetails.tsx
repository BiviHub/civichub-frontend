import { useParams } from 'react-router-dom';
import { ThumbsUp, Heart, MessageCircle, Clock } from 'lucide-react';
import { useState } from 'react';

const mockReport = {
    id: 1,
    author: 'Wisdom Iloh',
    content: 'There’s a leaking water pipe on the main road causing traffic!',
    timestamp: '2 hours ago',
    image: '/assets/images/leak.jpg',
    reactions: {
        like: 12,
        love: 8,
    },
    comments: [
        { id: 1, user: 'Grace', text: 'Thanks for reporting this!', time: '1h ago' },
        { id: 2, user: 'Admin', text: 'We’ve assigned this to a field officer.', time: '30m ago' },
    ],
};

const ReportDetails = () => {
    const { id } = useParams();
    void id;


    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(mockReport.comments);

    const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (comment.trim() === '') return;

        const newComment = {
            id: comments.length + 1,
            user: 'You',
            text: comment,
            time: 'Just now',
        };

        setComments([...comments, newComment]);
        setComment('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
                {/* Post Header */}
                <div className="mb-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-blue-700">Report Details</h2>
                        <span className="text-gray-500 text-sm flex items-center gap-1">
              <Clock className="w-4 h-4" /> {mockReport.timestamp}
            </span>
                    </div>
                    <p className="mt-1 text-gray-700">
                        <span className="font-semibold">By:</span> {mockReport.author}
                    </p>
                </div>

                {/* Post Content */}
                <p className="text-gray-800 text-lg mb-4">{mockReport.content}</p>
                {mockReport.image && (
                    <img
                        src={mockReport.image}
                        alt="Issue"
                        className="w-full h-auto rounded-md mb-6"
                    />
                )}

                {/* Reactions */}
                <div className="flex items-center gap-4 text-gray-600 mb-6">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
                        <ThumbsUp className="w-5 h-5" />
                        <span>{mockReport.reactions.like}</span>
                    </div>
                    <div className="flex items-center gap-1 cursor-pointer hover:text-red-600">
                        <Heart className="w-5 h-5" />
                        <span>{mockReport.reactions.love}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <MessageCircle className="w-5 h-5" />
                        <span>{comments.length}</span>
                    </div>
                </div>

                {/* Comment Section */}
                <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-3">Comments</h3>
                    <div className="space-y-4 mb-6">
                        {comments.map((c) => (
                            <div key={c.id} className="bg-gray-100 p-3 rounded-md">
                                <p className="text-sm text-gray-700">
                                    <span className="font-semibold">{c.user}</span>: {c.text}
                                </p>
                                <p className="text-xs text-gray-500">{c.time}</p>
                            </div>
                        ))}
                    </div>

                    {/* Add Comment */}
                    <form onSubmit={handleCommentSubmit} className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Write a comment..."
                            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReportDetails;


