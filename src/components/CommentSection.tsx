import { useState } from 'react';

const CommentSection = () => {
    const [comment, setComment] = useState('');

    return (
        <div className="mt-4">
            <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <button className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition">Comment</button>
        </div>
    );
};

export default CommentSection;
