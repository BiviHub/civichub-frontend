import { useEffect, useRef, useState } from 'react';
import ReactionButtons from './ReactionButtons';
import CommentSection from './CommentSection';
import ReportPostModal from './ReportPostModal';
interface Post {
    date: string;
    location: string;
    content: string;
    image?: string | File;
    video?: string;
}

interface PostCardProps {
    post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);


    useEffect(() => {
        if (post.image instanceof File) {
            const objectUrl = URL.createObjectURL(post.image);
            setPreviewUrl(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        } else if (typeof post.image === 'string') {
            setPreviewUrl(post.image);
        }
    }, [post.image]);

    const handleVideoClick = () => {
        if (!videoRef.current) return;
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };
    const handleReport = (reason: string) => {
        console.log(`Reported post: "${post.content}" for reason: ${reason}`);
        // You could push this to backend later
        alert(`Post reported for: ${reason}`);
    };
    return (
        <div className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="mb-2 text-sm text-gray-500">
                {post.date} • {post.location}
            </div>
            <p className="text-gray-800 mb-4">{post.content}</p>

            {previewUrl && (
                <img src={previewUrl} alt="Post" className="w-full rounded-md mb-4" />
            )}

            {post.video && (
                <div className="relative">
                    <video
                        ref={videoRef}
                        src={post.video}
                        className="w-full rounded-md mb-4 cursor-pointer"
                        onClick={handleVideoClick}
                        controls
                        muted={false}
                        loop={false}
                    />
                    {/* Optional Play Status Indicator */}
                    <span className="absolute bottom-3 right-4 bg-black bg-opacity-50 text-white px-2 py-1 text-xs rounded">
            {isPlaying ? 'Playing' : 'Paused'}
        </span>
                </div>
            )}


            <ReactionButtons />
            <CommentSection />
            <div className="mt-4 text-right">
                <button
                    onClick={() => setShowReportModal(true)}
                    className="text-sm text-red-600 hover:underline"
                >
                    Report this post
                </button>
            </div>

            {showReportModal && (
                <ReportPostModal
                    onClose={() => setShowReportModal(false)}
                    onSubmit={handleReport}
                />
            )}
        </div>
    );
};

export default PostCard;


