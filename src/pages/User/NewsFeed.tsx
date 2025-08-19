import { useEffect, useState, useRef, useCallback } from "react";
import { Heart, MessageCircle, Share2, ThumbsDown, MoreHorizontal, Play, Send, Bookmark, Zap, Search, X, ChevronLeft, ChevronRight } from "lucide-react";

// Define types for the post and comment data
interface Comment {
    id: string;
    user: string;
    text: string;
    timestamp: string;
    avatar: string;
}

interface Media {
    type: "image" | "video";
    url: string;
    thumbnail?: string;
}

interface Post {
    id: string;
    user: {
        name: string;
        avatar: string;
        username: string;
    };
    content: string;
    media?: Media[];
    timestamp: string;
    likes: number;
    comments: Comment[];
    shares: number;
    isLiked: boolean;
    isDisliked: boolean;
}

const mockPosts: Post[] = [
    {
        id: "1",
        user: { name: "John Doe", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face", username: "johnd" },
        content: "The road on Main Street is full of potholes, making it dangerous for drivers. #BadRoads",
        media: [
            { type: "image", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop" },
            { type: "image", url: "https://images.unsplash.com/photo-1600585154526-990d8f4e0c3a?w=600&h=400&fit=crop" },
            {
                type: "video",
                url: "https://player.vimeo.com/progressive_redirect/playback/682191771/rendition/360p?loc=external&signature=3b1a2b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b",
                thumbnail: "https://images.unsplash.com/photo-1600585154526-990d8f4e0c3a?w=600&h=400&fit=crop",
            },
        ],
        timestamp: "1h",
        likes: 15,
        comments: [
            { id: "c1", user: "Alice", text: "This is a serious issue! Needs fixing ASAP.", timestamp: "30m", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop" },
            { id: "c2", user: "Bob", text: "I almost crashed here yesterday! #BadRoads", timestamp: "15m", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop" },
            { id: "c3", user: "Carol", text: "The city needs to prioritize this!", timestamp: "10m", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop" },
            { id: "c4", user: "Dave", text: "Reported this last month, no response.", timestamp: "5m", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop" },
        ],
        shares: 5,
        isLiked: false,
        isDisliked: false,
    },
    {
        id: "2",
        user: { name: "Jane Smith", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face", username: "janes" },
        content: "A massive refuse dump near the market is attracting pests and spreading disease. #RefuseDump",
        media: [
            { type: "image", url: "https://images.unsplash.com/photo-1593076526884-19b6b8e6e2d8?w=600&h=400&fit=crop" },
        ],
        timestamp: "3h",
        likes: 28,
        comments: [
            { id: "c5", user: "Charlie", text: "The smell is unbearable!", timestamp: "2h", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf3356de?w=40&h=40&fit=crop" },
        ],
        shares: 10,
        isLiked: false,
        isDisliked: false,
    },
    {
        id: "3",
        user: { name: "Mike Brown", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face", username: "mikeb" },
        content: "Heavy flooding after the rain has submerged parts of the town. Drainage needed! #Flooding",
        media: [
            {
                type: "video",
                url: "https://player.vimeo.com/progressive_redirect/playback/682191771/rendition/360p?loc=external&signature=3b1a2b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b",
                thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop",
            },
        ],
        timestamp: "5h",
        likes: 10,
        comments: [],
        shares: 4,
        isLiked: false,
        isDisliked: false,
    },
    {
        id: "4",
        user: { name: "Emily White", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face", username: "emilyw" },
        content: "Streetlights are out on Elm Road, leaving it dark and unsafe at night. #StreetlightIssue",
        media: [
            { type: "image", url: "https://images.unsplash.com/photo-1600585154526-990d8f4e0c3a?w=600&h=400&fit=crop" },
        ],
        timestamp: "7h",
        likes: 19,
        comments: [
            { id: "c6", user: "Dave", text: "I reported this last week, still no action!", timestamp: "6h", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop" },
        ],
        shares: 8,
        isLiked: false,
        isDisliked: false,
    },
];

export const NewsFeed: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [activeCommentPost, setActiveCommentPost] = useState<string | null>(null);
    const [newComment, setNewComment] = useState("");
    const [visiblePosts, setVisiblePosts] = useState<number>(2);
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState(mockPosts);
    const [dropdownPostId, setDropdownPostId] = useState<string | null>(null);
    const [filterByTag, setFilterByTag] = useState<string | null>(null);
    const [visibleComments, setVisibleComments] = useState<{ [key: string]: number }>({});
    const [selectedMedia, setSelectedMedia] = useState<{ media: Media; postId: string; index: number } | null>(null);
    const observerRef = useRef<HTMLDivElement | null>(null);
    const modalRef = useRef<HTMLDivElement | null>(null);

    // Infinite Scroll
    const handleObserver = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const target = entries[0];
            if (target.isIntersecting && !isLoading && visiblePosts < posts.length) {
                console.log("Intersection observed, loading more posts...");
                setIsLoading(true);
                setTimeout(() => {
                    setVisiblePosts((prev) => {
                        const newCount = Math.min(prev + 2, posts.length);
                        console.log(`Loaded ${newCount} of ${posts.length} posts`);
                        return newCount;
                    });
                    setIsLoading(false);
                }, 1500);
            }
        },
        [isLoading, visiblePosts, posts.length]
    );

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: "100px",
            threshold: 0.1,
        });

        const currentRef = observerRef.current;
        if (currentRef) {
            observer.observe(currentRef);
            console.log("Observer attached to sentinel");
        } else {
            console.warn("observerRef.current is null, cannot observe");
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
                console.log("Observer detached from sentinel");
            }
            observer.disconnect();
        };
    }, [handleObserver]);

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

    // Keyboard navigation for modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!selectedMedia) return;
            if (e.key === "ArrowLeft") navigateMedia("prev");
            if (e.key === "ArrowRight") navigateMedia("next");
            if (e.key === "Escape") closeMediaModal();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedMedia]);

    const handleToggleSearch = () => {
        setIsExpanded((prev) => !prev);
        if (!isExpanded) {
            setSearchValue("");
            setFilterByTag(null);
        }
    };

    const toggleComment = (id: string) => {
        setActiveCommentPost((prev) => (prev === id ? null : id));
        setNewComment("");
        setVisibleComments((prev) => ({ ...prev, [id]: prev[id] || 2 }));
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

    const toggleShare = (id: string) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === id
                    ? { ...post, shares: post.shares + 1 }
                    : post
            )
        );
        navigator.clipboard.writeText(`https://example.com/post/${id}`);
        alert("Post link copied to clipboard!");
    };

    const toggleDropdown = (id: string) => {
        setDropdownPostId(dropdownPostId === id ? null : id);
    };

    const addComment = (postId: string) => {
        if (newComment.trim() === "") return;
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === postId
                    ? {
                        ...post,
                        comments: [
                            {
                                id: `c${Date.now()}`,
                                user: "Current User",
                                text: newComment,
                                timestamp: "Just now",
                                avatar: "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?w=40&h=40&fit=crop",
                            },
                            ...post.comments,
                        ],
                    }
                    : post
            )
        );
        setNewComment("");
        setVisibleComments((prev) => ({ ...prev, [postId]: Math.max(prev[postId] || 2, 2) }));
        setTimeout(() => setActiveCommentPost(null), 500);
    };

    const loadMoreComments = (postId: string) => {
        setVisibleComments((prev) => ({
            ...prev,
            [postId]: Math.min((prev[postId] || 2) + 5, posts.find((p) => p.id === postId)!.comments.length),
        }));
    };

    const handleMediaClick = (media: Media, postId: string, index: number) => {
        setSelectedMedia({ media, postId, index });
    };

    const closeMediaModal = () => {
        setSelectedMedia(null);
    };

    const navigateMedia = (direction: "prev" | "next") => {
        if (!selectedMedia) return;
        const post = posts.find((p) => p.id === selectedMedia.postId);
        if (!post || !post.media || post.media.length <= 1) return;
        const mediaCount = post.media.length;
        let newIndex = selectedMedia.index;
        if (direction === "prev") {
            newIndex = (newIndex - 1 + mediaCount) % mediaCount;
        } else {
            newIndex = (newIndex + 1) % mediaCount;
        }
        setSelectedMedia({ media: post.media[newIndex], postId: selectedMedia.postId, index: newIndex });
    };

    const renderContentWithHashtags = (content: string, postId: string) => {
        const hashtagRegex = /(#\w+)/g;
        const parts = content.split(hashtagRegex);
        return parts.map((part, index) => {
            if (part.match(hashtagRegex)) {
                return (
                    <button
                        key={`${postId}-hashtag-${index}`}
                        className="text-blue-600 hover:underline dark:text-blue-400"
                        onClick={() => setFilterByTag(part)}
                    >
                        {part}
                    </button>
                );
            }
            return <span key={`${postId}-text-${index}`}>{part}</span>;
        });
    };

    const filteredPosts = filterByTag
        ? posts.filter((post) => post.content.includes(filterByTag))
        : posts;

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            {/* Media Modal */}
            {selectedMedia && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center" onClick={closeMediaModal}>
                    <div
                        className="relative max-w-4xl w-full max-h-[90vh] p-4"
                        onClick={(e) => e.stopPropagation()}
                        ref={modalRef}
                        tabIndex={0}
                    >
                        <div className="relative">
                            {selectedMedia.media.type === "image" ? (
                                <img
                                    src={selectedMedia.media.url}
                                    alt="Full-size media"
                                    className="w-full h-auto max-h-[80vh] object-contain rounded-lg transition-opacity duration-300"
                                />
                            ) : (
                                <video
                                    src={selectedMedia.media.url}
                                    controls
                                    autoPlay
                                    className="w-full h-auto max-h-[80vh] object-contain rounded-lg transition-opacity duration-300"
                                />
                            )}
                            <button
                                className="absolute top-2 right-2 p-2 bg-gray-800/80 text-white rounded-full hover:bg-gray-800"
                                onClick={closeMediaModal}
                                aria-label="Close media modal"
                            >
                                <X className="h-6 w-6" />
                            </button>
                            {(() => {
                                const post = posts.find((p) => p.id === selectedMedia.postId);
                                return post && post.media && post.media.length > 1 ? (
                                    <>
                                        <button
                                            className="absolute top-1/2 left-2 p-2 bg-gray-800/80 text-white rounded-full transform -translate-y-1/2 hover:bg-gray-800"
                                            onClick={() => navigateMedia("prev")}
                                            aria-label="Previous media"
                                        >
                                            <ChevronLeft className="h-6 w-6" />
                                        </button>
                                        <button
                                            className="absolute top-1/2 right-2 p-2 bg-gray-800/80 text-white rounded-full transform -translate-y-1/2 hover:bg-gray-800"
                                            onClick={() => navigateMedia("next")}
                                            aria-label="Next media"
                                        >
                                            <ChevronRight className="h-6 w-6" />
                                        </button>
                                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                                            {post.media.map((_, index) => (
                                                <span
                                                    key={`indicator-${index}`}
                                                    className={`h-2 w-2 rounded-full ${
                                                        index === selectedMedia.index ? "bg-white" : "bg-gray-500/50"
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                ) : null;
                            })()}
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Search Bar */}
            <div className="search-container fixed top-16 right-4 z-50">
                <div
                    className={`transition-all duration-300 ease-in-out rounded-full shadow-xl flex items-center border-2 ${
                        isExpanded
                            ? "w-96 px-4 py-2 bg-white/90 dark:bg-gray-800/90 border-blue-400 dark:border-blue-600 backdrop-blur-md"
                            : "w-14 h-14 justify-center bg-gradient-to-r from-blue-600 to-emerald-500 border-transparent"
                    }`}
                    onClick={() => {
                        if (!isExpanded) handleToggleSearch();
                    }}
                >
                    {isExpanded ? (
                        <>
                            <Search className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3" />
                            <input
                                value={searchValue}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
                                placeholder="Search civic issues..."
                                className="border-0 bg-transparent outline-none flex-1 text-sm text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                                autoFocus={isScrolled && isExpanded}
                            />
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleToggleSearch();
                                }}
                                className="ml-2 p-1 rounded-full transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
                                aria-label="Close search"
                            >
                                <X className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            </button>
                        </>
                    ) : (
                        <Search className="h-6 w-6 text-white" />
                    )}
                </div>
            </div>

            <div className="px-4 py-8 mx-auto max-w-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent mb-2 dark:from-gray-300 dark:to-gray-100">
                        Civic Issues Feed
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">Report and discuss community problems</p>
                    {filterByTag && (
                        <div className="mt-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                Filtering by: {filterByTag}
                            </span>
                            <button
                                className="ml-2 text-sm text-blue-600 hover:underline dark:text-blue-400"
                                onClick={() => setFilterByTag(null)}
                            >
                                Clear
                            </button>
                        </div>
                    )}
                </div>

                <div className="mb-6">
                    {filteredPosts.slice(0, visiblePosts).map((post) => (
                        <div
                            key={post.id}
                            className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden mb-8 transition-all hover:shadow-lg dark:bg-gray-800 dark:border-gray-700"
                        >
                            {/* Header */}
                            <div className="relative p-6">
                                <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-r from-blue-600 to-emerald-500 opacity-10 rounded-t-2xl dark:from-gray-900 dark:to-gray-800" />
                                <div className="relative flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <img
                                                src={post.user.avatar}
                                                alt={`${post.user.name}'s avatar`}
                                                className="w-14 h-14 rounded-full border-4 border-blue-200 shadow-md dark:border-gray-600"
                                            />
                                            <div className="absolute bottom-[-0.25rem] right-[-0.25rem] w-5 h-5 bg-yellow-300 rounded-full border-2 border-white shadow-md flex items-center justify-center dark:bg-yellow-500">
                                                <Zap className="w-3 h-3 text-amber-900" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3
                                                className="font-bold text-xl text-gray-900 transition-colors hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
                                                onMouseEnter={(e) => e.currentTarget.classList.add("text-blue-600", "dark:text-blue-400")}
                                                onMouseLeave={(e) => e.currentTarget.classList.remove("text-blue-600", "dark:text-blue-400")}
                                            >
                                                {post.user.name}
                                            </h3>
                                            <p className="text-gray-500 text-sm font-medium dark:text-gray-400">@{post.user.username} • {post.timestamp}</p>
                                        </div>
                                    </div>
                                    <div className="relative flex items-center gap-2">
                                        <button
                                            className="rounded-full p-2 bg-transparent transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
                                            onMouseEnter={(e) => e.currentTarget.classList.add("bg-gray-200", "dark:bg-gray-700")}
                                            onMouseLeave={(e) => e.currentTarget.classList.remove("bg-gray-200", "dark:bg-gray-700")}
                                            aria-label="Bookmark post"
                                        >
                                            <Bookmark className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                        </button>
                                        <button
                                            onClick={() => toggleDropdown(post.id)}
                                            className="rounded-full p-2 bg-transparent transition-colors hover:text-gray-900 dark:hover:text-gray-100"
                                            onMouseEnter={(e) => e.currentTarget.classList.add("text-gray-900", "dark:text-gray-100")}
                                            onMouseLeave={(e) => e.currentTarget.classList.remove("text-gray-900", "dark:text-gray-100")}
                                            aria-label="More options"
                                        >
                                            <MoreHorizontal className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                        </button>
                                        {dropdownPostId === post.id && (
                                            <div className="absolute top-full right-0 bg-white rounded-lg shadow-md p-2 mt-1 min-w-32 dark:bg-gray-700">
                                                <button className="block w-full px-4 py-1 text-left text-gray-900 transition-colors hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-600">
                                                    Report
                                                </button>
                                                <button className="block w-full px-4 py-1 text-left text-gray-900 transition-colors hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-600">
                                                    Block
                                                </button>
                                                <button className="block w-full px-4 py-1 text-left text-gray-900 transition-colors hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-600">
                                                    Mute
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="mt-6 px-6">
                                    <p className="text-gray-900 leading-relaxed text-lg font-medium dark:text-gray-100">
                                        {renderContentWithHashtags(post.content, post.id)}
                                    </p>
                                </div>
                            </div>

                            {/* Media */}
                            {post.media && post.media.length > 0 && (
                                <div className="p-6">
                                    {post.media.length === 1 && post.media[0] ? (
                                        <div className="relative rounded-xl overflow-hidden bg-gray-200 shadow-md dark:bg-gray-700">
                                            {post.media[0].type === "image" ? (
                                                <img
                                                    src={post.media[0].url}
                                                    alt="Civic issue media"
                                                    className="w-full max-h-96 object-cover transition-transform hover:scale-105 cursor-pointer"
                                                    onClick={() => handleMediaClick(post.media![0], post.id, 0)}
                                                    onMouseEnter={(e) => e.currentTarget.classList.add("scale-105")}
                                                    onMouseLeave={(e) => e.currentTarget.classList.remove("scale-105")}
                                                />
                                            ) : (
                                                <div className="relative">
                                                    <img
                                                        src={post.media[0].thumbnail || post.media[0].url}
                                                        alt="Video thumbnail"
                                                        className="w-full max-h-96 object-cover"
                                                    />
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                                        <button
                                                            className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white rounded-full h-20 w-20 shadow-md flex items-center justify-center transition-all hover:scale-110 dark:from-gray-600 dark:to-gray-500"
                                                            onClick={() => handleMediaClick(post.media![0], post.id, 0)}
                                                            aria-label="Play video"
                                                        >
                                                            <Play className="h-8 w-8 ml-1" />
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {post.media.map((media, index) => (
                                                <div
                                                    key={`${post.id}-media-${index}`}
                                                    className="relative rounded-xl overflow-hidden bg-gray-200 shadow-md dark:bg-gray-700"
                                                >
                                                    {media.type === "image" ? (
                                                        <img
                                                            src={media.url}
                                                            alt={`Civic issue media ${index + 1}`}
                                                            className="w-full max-h-96 object-cover transition-transform hover:scale-105 cursor-pointer"
                                                            onClick={() => handleMediaClick(media, post.id, index)}
                                                            onMouseEnter={(e) => e.currentTarget.classList.add("scale-105")}
                                                            onMouseLeave={(e) => e.currentTarget.classList.remove("scale-105")}
                                                        />
                                                    ) : (
                                                        <div className="relative">
                                                            <img
                                                                src={media.thumbnail || media.url}
                                                                alt={`Video thumbnail ${index + 1}`}
                                                                className="w-full max-h-96 object-cover"
                                                            />
                                                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                                                <button
                                                                    className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white rounded-full h-20 w-20 shadow-md flex items-center justify-center transition-all hover:scale-110 dark:from-gray-600 dark:to-gray-500"
                                                                    onClick={() => handleMediaClick(media, post.id, index)}
                                                                    aria-label={`Play video ${index + 1}`}
                                                                >
                                                                    <Play className="h-8 w-8 ml-1" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Action Bar */}
                            <div className="p-6">
                                <div className="bg-gray-200 rounded-xl p-4 border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => toggleLike(post.id)}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                                                    post.isLiked ? "bg-blue-100 text-blue-600" : "bg-transparent text-gray-900 dark:text-gray-100"
                                                } hover:${post.isLiked ? "bg-blue-100" : "bg-gray-200 dark:bg-gray-600"}`}
                                                onMouseEnter={(e) =>
                                                    e.currentTarget.classList.add(post.isLiked ? "bg-blue-100" : "bg-gray-200", post.isLiked ? "" : "dark:bg-gray-600")
                                                }
                                                onMouseLeave={(e) =>
                                                    e.currentTarget.classList.remove(post.isLiked ? "bg-blue-100" : "bg-gray-200", post.isLiked ? "" : "dark:bg-gray-600")
                                                }
                                                aria-label={post.isLiked ? "Unlike post" : "Like post"}
                                            >
                                                <Heart className={`h-5 w-5 ${post.isLiked ? "text-blue-600" : "dark:text-gray-100"}`} />
                                                <span className="font-semibold">{post.likes}</span>
                                            </button>

                                            <button
                                                onClick={() => toggleComment(post.id)}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                                                    activeCommentPost === post.id
                                                        ? "bg-yellow-100 text-amber-900 shadow-md scale-105"
                                                        : "bg-transparent text-gray-900 dark:text-gray-100"
                                                }`}
                                                aria-label="Toggle comments"
                                            >
                                                <MessageCircle className="h-5 w-5" />
                                                <span className="font-semibold">{post.comments.length}</span>
                                            </button>

                                            <button
                                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors hover:bg-red-200 dark:hover:bg-red-800"
                                                onMouseEnter={(e) => e.currentTarget.classList.add("bg-red-200", "dark:bg-red-800")}
                                                onMouseLeave={(e) => e.currentTarget.classList.remove("bg-red-200", "dark:bg-red-800")}
                                                aria-label="Dislike post"
                                            >
                                                <ThumbsDown className="h-5 w-5" />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => toggleShare(post.id)}
                                            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors hover:bg-gray-200 dark:hover:bg-gray-600"
                                            onMouseEnter={(e) => e.currentTarget.classList.add("bg-gray-200", "dark:bg-gray-600")}
                                            onMouseLeave={(e) => e.currentTarget.classList.remove("bg-gray-200", "dark:bg-gray-600")}
                                            aria-label="Share post"
                                        >
                                            <Share2 className="h-5 w-5 text-gray-900 dark:text-gray-100" />
                                            <span className="font-semibold">{post.shares}</span>
                                        </button>
                                    </div>

                                    {/* Comment Section */}
                                    {activeCommentPost === post.id && (
                                        <div className="mt-4">
                                            {/* Display limited comments */}
                                            {post.comments.length > 0 ? (
                                                <div className="mb-2 space-y-2">
                                                    {post.comments.slice(0, visibleComments[post.id] || 2).map((comment) => (
                                                        <div key={comment.id} className="flex items-start gap-2 animate-fadeIn">
                                                            <img
                                                                src={comment.avatar}
                                                                alt={`${comment.user}'s avatar`}
                                                                className="w-8 h-8 rounded-full"
                                                            />
                                                            <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
                                                                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{comment.user}</p>
                                                                <p className="text-sm text-gray-700 dark:text-gray-300">{comment.text}</p>
                                                                <p className="text-xs text-gray-500 dark:text-gray-400">{comment.timestamp}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    {post.comments.length > (visibleComments[post.id] || 2) && (
                                                        <button
                                                            onClick={() => loadMoreComments(post.id)}
                                                            className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                                                        >
                                                            More comments
                                                        </button>
                                                    )}
                                                </div>
                                            ) : (
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">No comments yet.</p>
                                            )}
                                            {/* Comment Input */}
                                            <div className="flex items-center gap-2 mt-2">
                                                <img
                                                    src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?w=40&h=40&fit=crop"
                                                    alt="Current user's avatar"
                                                    className="w-8 h-8 rounded-full"
                                                />
                                                <input
                                                    type="text"
                                                    value={newComment}
                                                    onChange={(e) => setNewComment(e.target.value)}
                                                    placeholder="Write a comment..."
                                                    className="flex-1 p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-300 dark:border-gray-600 focus:outline-none text-sm text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                                                    aria-label="Add a comment to post"
                                                />
                                                <button
                                                    onClick={() => addComment(post.id)}
                                                    className="p-2 bg-gradient-to-r from-blue-600 to-emerald-500 text-white rounded-full hover:scale-105 transition-transform"
                                                    aria-label="Submit comment"
                                                >
                                                    <Send className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* Sentinel element for each post */}
                            {filteredPosts.indexOf(post) === visiblePosts - 1 && visiblePosts < posts.length && (
                                <div ref={observerRef} className="h-1" />
                            )}
                        </div>
                    ))}
                    {/* Loading indicator for infinite scroll */}
                    {isLoading && (
                        <div className="text-center py-4">
                            <span className="text-gray-600 text-sm font-medium dark:text-gray-400 animate-pulse">Loading...</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NewsFeed;