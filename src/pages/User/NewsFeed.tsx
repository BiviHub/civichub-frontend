import { useEffect, useState } from "react";
import { Heart, MessageCircle, Share2, ThumbsDown, MoreHorizontal, Play, Send, Bookmark, Zap, Search, X } from "lucide-react";
import { Loader2 } from "lucide-react";

// Define types for the post data
interface Post {
    id: string;
    user: {
        name: string;
        avatar: string;
        username: string;
    };
    content: string;
    media?: {
        type: "image" | "video";
        url: string;
        thumbnail?: string;
    };
    timestamp: string;
    likes: number;
    comments: number;
    shares: number;
    isLiked: boolean;
    isDisliked: boolean;
}

const mockPosts: Post[] = [
    {
        id: "1",
        user: { name: "Alex Johnson", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face", username: "alexj" },
        content: "Just had an amazing experience at the new tech conference! The innovations in AI are absolutely mind-blowing. Can't wait to implement some of these ideas in our next project. 🚀",
        media: { type: "image" as const, url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop" },
        timestamp: "2h",
        likes: 42,
        comments: 8,
        shares: 12,
        isLiked: false,
        isDisliked: false,
    },
    {
        id: "2",
        user: { name: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face", username: "sarahc" },
        content: "Beautiful sunset from my hiking trip this weekend! Nature always has a way of putting things into perspective. 🌅 #nature #hiking #mindfulness",
        media: { type: "video" as const, url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop" },
        timestamp: "4h",
        likes: 128,
        comments: 23,
        shares: 45,
        isLiked: false,
        isDisliked: false,
    },
    {
        id: "3",
        user: { name: "Mike Rodriguez", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face", username: "mikerodz" },
        content: "Excited to share that our team just launched a new sustainability initiative! Every small step counts towards a greener future. What are you doing to help the environment? 🌱",
        timestamp: "6h",
        likes: 87,
        comments: 15,
        shares: 28,
        isLiked: false,
        isDisliked: false,
    },
    {
        id: "4",
        user: { name: "Emma Thompson", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face", username: "emmat" },
        content: "Coffee and code - the perfect combination for a productive morning! Working on some exciting new features that I can't wait to share with you all. ☕️💻",
        media: { type: "image" as const, url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop" },
        timestamp: "8h",
        likes: 203,
        comments: 34,
        shares: 67,
        isLiked: false,
        isDisliked: false,
    },
];

export const NewsFeed: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [activeCommentPost, setActiveCommentPost] = useState<string | null>(null);
    const [visiblePosts, setVisiblePosts] = useState<number>(2);
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState(mockPosts);
    const [dropdownPostId, setDropdownPostId] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
            if (window.scrollY > 100) setIsExpanded(false);
        };
        const handleBackgroundClick = (e: MouseEvent) => {
            if (isExpanded && !(e.target as HTMLElement).closest(".search-container")) setIsExpanded(false);
        };
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("click", handleBackgroundClick);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("click", handleBackgroundClick);
        };
    }, [isExpanded]);

    const handleToggleSearch = () => {
        setIsExpanded(!isExpanded);
        if (!isExpanded) setSearchValue("");
    };

    const toggleComment = (id: string) => {
        setActiveCommentPost((prev) => (prev === id ? null : id));
    };

    const toggleLike = (id: string) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === id
                    ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
                    : post
            )
        );
    };

    const loadMorePosts = () => {
        setIsLoading(true);
        setTimeout(() => {
            setVisiblePosts((prev) => Math.min(prev + 2, posts.length));
            setIsLoading(false);
        }, 1500);
    };

    const toggleDropdown = (id: string) => {
        setDropdownPostId(dropdownPostId === id ? null : id);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
            {/* Search Bar */}
            <div className="search-container fixed top-24 right-4 z-50 transition-all">
                <div
                    className={`bg-white/80 backdrop-blur-md rounded-full shadow-md transition-all ${
                        isExpanded ? "w-96 h-auto" : "w-12 h-12"
                    }`}
                    onMouseEnter={(e) => (e.currentTarget.classList.add("shadow-lg"), e.currentTarget.classList.remove("shadow-md"))}
                    onMouseLeave={(e) => (e.currentTarget.classList.remove("shadow-lg"), e.currentTarget.classList.add("shadow-md"))}
                >
                    {isExpanded ? (
                        <div className="flex items-center p-3">
                            <Search className="h-5 w-5 text-gray-500 mr-3" />
                            <input
                                value={searchValue}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
                                placeholder="Search posts, users, topics..."
                                className="border-0 bg-transparent outline-none flex-1 text-sm"
                                autoFocus={isScrolled && isExpanded}
                            />
                            <button
                                onClick={handleToggleSearch}
                                className="ml-2 p-1 rounded-full bg-transparent transition-colors hover:bg-gray-200"
                                onMouseEnter={(e) => e.currentTarget.classList.add("bg-gray-200")}
                                onMouseLeave={(e) => e.currentTarget.classList.remove("bg-gray-200")}
                            >
                                <X className="h-4 w-4 text-gray-500" />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleToggleSearch}
                            className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full transition-all hover:shadow-lg"
                            onMouseEnter={(e) => e.currentTarget.classList.add("shadow-lg")}
                            onMouseLeave={(e) => e.currentTarget.classList.remove("shadow-lg")}
                        >
                            <Search className="h-5 w-5 text-white" />
                        </button>
                    )}
                </div>
            </div>

            <div className="px-4 py-8 mx-auto max-w-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent mb-2">
                        Social Feed
                    </h1>
                    <p className="text-gray-500">Discover amazing content from your community</p>
                </div>

                <div className="mb-6">
                    {posts.slice(0, visiblePosts).map((post) => (
                        <div
                            key={post.id}
                            className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden mb-8 transition-all hover:shadow-lg"
                        >
                            {/* Header with floating style */}
                            <div className="relative p-6">
                                <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-r from-blue-600 to-emerald-500 opacity-10 rounded-t-2xl" />
                                <div className="relative flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <img
                                                src={post.user.avatar}
                                                alt={`${post.user.name}'s avatar`}
                                                className="w-14 h-14 rounded-full border-4 border-blue-200 shadow-md"
                                            />
                                            <div className="absolute bottom-[-0.25rem] right-[-0.25rem] w-5 h-5 bg-yellow-300 rounded-full border-2 border-white shadow-md flex items-center justify-center">
                                                <Zap className="w-3 h-3 text-amber-900" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3
                                                className="font-bold text-xl text-gray-900 transition-colors hover:text-blue-600"
                                                onMouseEnter={(e) => e.currentTarget.classList.add("text-blue-600")}
                                                onMouseLeave={(e) => e.currentTarget.classList.remove("text-blue-600")}
                                            >
                                                {post.user.name}
                                            </h3>
                                            <p className="text-gray-500 text-sm font-medium">@{post.user.username} • {post.timestamp}</p>
                                        </div>
                                    </div>
                                    <div className="relative flex items-center gap-2">
                                        <button
                                            className="rounded-full p-2 bg-transparent transition-colors hover:bg-gray-200"
                                            onMouseEnter={(e) => e.currentTarget.classList.add("bg-gray-200")}
                                            onMouseLeave={(e) => e.currentTarget.classList.remove("bg-gray-200")}
                                        >
                                            <Bookmark className="h-5 w-5 text-gray-500" />
                                        </button>
                                        <button
                                            onClick={() => toggleDropdown(post.id)}
                                            className="rounded-full p-2 bg-transparent transition-colors hover:text-gray-900"
                                            onMouseEnter={(e) => e.currentTarget.classList.add("text-gray-900")}
                                            onMouseLeave={(e) => e.currentTarget.classList.remove("text-gray-900")}
                                        >
                                            <MoreHorizontal className="h-5 w-5 text-gray-500" />
                                        </button>
                                        {dropdownPostId === post.id && (
                                            <div className="absolute top-full right-0 bg-white rounded-lg shadow-md p-2 mt-1 min-w-32">
                                                <button className="block w-full px-4 py-1 text-left text-gray-900 transition-colors hover:bg-gray-200">
                                                    Edit
                                                </button>
                                                <button className="block w-full px-4 py-1 text-left text-gray-900 transition-colors hover:bg-gray-200">
                                                    Delete
                                                </button>
                                                <button className="block w-full px-4 py-1 text-left text-gray-900 transition-colors hover:bg-gray-200">
                                                    Share
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="mt-6 px-6">
                                    <p className="text-gray-900 leading-relaxed text-lg font-medium">{post.content}</p>
                                </div>
                            </div>

                            {/* Media */}
                            {post.media && (
                                <div className="p-6">
                                    <div className="relative rounded-xl overflow-hidden bg-gray-200 shadow-md">
                                        {post.media.type === "image" ? (
                                            <img
                                                src={post.media.url}
                                                alt="Post media"
                                                className="w-full max-h-96 object-cover transition-transform hover:scale-105"
                                                onMouseEnter={(e) => e.currentTarget.classList.add("scale-105")}
                                                onMouseLeave={(e) => e.currentTarget.classList.remove("scale-105")}
                                            />
                                        ) : (
                                            <div className="relative">
                                                <img
                                                    src={post.media.thumbnail || post.media.url}
                                                    alt="Video thumbnail"
                                                    className="w-full max-h-96 object-cover"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                                    <button className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white rounded-full h-20 w-20 shadow-md flex items-center justify-center transition-all hover:scale-110">
                                                        <Play className="h-8 w-8 ml-1" />
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Action Bar */}
                            <div className="p-6">
                                <div className="bg-gray-200 rounded-xl p-4 border border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => toggleLike(post.id)}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                                                    post.isLiked ? "bg-blue-100 text-blue-600" : "bg-transparent text-gray-900"
                                                } hover:${post.isLiked ? "bg-blue-100" : "bg-gray-200"}`}
                                                onMouseEnter={(e) => e.currentTarget.classList.add(post.isLiked ? "bg-blue-100" : "bg-gray-200")}
                                                onMouseLeave={(e) => e.currentTarget.classList.remove(post.isLiked ? "bg-blue-100" : "bg-gray-200")}
                                            >
                                                <Heart className={`h-5 w-5 ${post.isLiked ? "text-blue-600" : ""}`} />
                                                <span className="font-semibold">{post.likes}</span>
                                            </button>

                                            <button
                                                onClick={() => toggleComment(post.id)}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                                                    activeCommentPost === post.id
                                                        ? "bg-yellow-100 text-amber-900 shadow-md scale-105"
                                                        : "bg-transparent text-gray-900"
                                                } hover:${activeCommentPost === post.id ? "bg-yellow-100" : "bg-yellow-100 text-amber-900 scale-105"}`}
                                                onMouseEnter={(e) => {
                                                    if (activeCommentPost !== post.id) {
                                                        e.currentTarget.classList.add("bg-yellow-100", "text-amber-900", "scale-105");
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    if (activeCommentPost !== post.id) {
                                                        e.currentTarget.classList.remove("bg-yellow-100", "text-amber-900", "scale-105");
                                                    }
                                                }}
                                            >
                                                <MessageCircle className="h-5 w-5" />
                                                <span className="font-semibold">{post.comments}</span>
                                            </button>

                                            <button
                                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors hover:bg-red-200"
                                                onMouseEnter={(e) => e.currentTarget.classList.add("bg-red-200")}
                                                onMouseLeave={(e) => e.currentTarget.classList.remove("bg-red-200")}
                                            >
                                                <ThumbsDown className="h-5 w-5" />
                                            </button>
                                        </div>

                                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors hover:bg-gray-200">
                                            <Share2 className="h-5 w-5" />
                                            <span className="font-semibold">{post.shares}</span>
                                        </button>
                                    </div>

                                    {/* Comment Section */}
                                    {activeCommentPost === post.id && (
                                        <div className="mt-4 flex items-center gap-2">
                                            <input
                                                type="text"
                                                placeholder="Add a comment..."
                                                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <button className="p-2 bg-gradient-to-r from-blue-600 to-emerald-500 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                                <Send className="h-5 w-5" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    {visiblePosts < posts.length && (
                        <button
                            onClick={loadMorePosts}
                            className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-emerald-500 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-50"
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Load More Posts"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NewsFeed;