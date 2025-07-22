import { ThumbsUp, Heart, ThumbsDown } from 'lucide-react';

const ReactionButtons = () => {
    return (
        <div className="flex gap-4 text-gray-500 text-sm">
            <button className="flex items-center gap-1 hover:text-blue-600"><ThumbsUp className="w-4 h-4" />Like</button>
            <button className="flex items-center gap-1 hover:text-pink-500"><Heart className="w-4 h-4" />Love</button>
            <button className="flex items-center gap-1 hover:text-red-500"><ThumbsDown className="w-4 h-4" />Dislike</button>
        </div>
    );
};

export default ReactionButtons;
