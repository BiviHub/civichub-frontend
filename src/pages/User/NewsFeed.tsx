import {
    Heart,
    MessageCircle,
    Share2,
    Bookmark,
    MoreHorizontal,
    Search
} from 'lucide-react';

export default function NewsFeed() {
    const samplePosts = [
        {
            id: 1,
            user: {
                name: "Chika Okoro",
                username: "@chika_reports",
                avatar: "https://images.unsplash.com/photo-1603415526960-f8f56cc0d021?w=150&h=150&fit=crop&crop=face",
                verified: true,
            },
            timestamp: "2 hours ago",
            content: "This road in Gwarimpa has been in terrible condition for months. Potholes everywhere! It's causing accidents and serious traffic delays. When will the government respond? 🚧",
            type: "image",
            media: "https://images.unsplash.com/photo-1583337130417-3346a1d3a50d?w=800&h=600&fit=crop",
            tags: ["#BadRoad", "#CivicIssue", "#Abuja"],
            likes: 89,
            comments: 22,
            shares: 5,
        },
        {
            id: 2,
            user: {
                name: "Ngozi Williams",
                username: "@ngozi_cares",
                avatar: "https://images.unsplash.com/photo-1531891437562-5c1c3f52e1f3?w=150&h=150&fit=crop&crop=face",
                verified: false,
            },
            timestamp: "4 hours ago",
            content: "Refuse dump in front of the community health center is getting worse daily. We need sanitation teams to step in immediately! 🗑️",
            type: "image",
            media: "https://images.unsplash.com/photo-1582719478250-0c59d8d2965e?w=800&h=600&fit=crop",
            tags: ["#Refuse", "#Sanitation", "#CommunityHealth"],
            likes: 112,
            comments: 17,
            shares: 9,
        },
        {
            id: 3,
            user: {
                name: "Femi Adeyemi",
                username: "@femi_reports",
                avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=150&h=150&fit=crop&crop=face",
                verified: true,
            },
            timestamp: "6 hours ago",
            content: "Street lights on Airport Road haven't worked in weeks. It's a security threat at night. Please escalate this! 💡",
            type: "text",
            tags: ["#LightsOut", "#SecurityRisk", "#AirportRoad"],
            likes: 76,
            comments: 14,
            shares: 6,
        }
    ];

    return (
        <div className="relative min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            {/* Search Box */}
            <div className="max-w-4xl mx-auto px-4 pt-6">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Search civic issues..."
                        className="pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent w-full transition-all duration-300"
                    />
                    <Search className="absolute ml-3 text-gray-400 dark:text-gray-500" />
                </div>
            </div>

            {/* Feed Content */}
            <div className="max-w-4xl mx-auto px-4 py-6">
                <div className="space-y-6">
                    {samplePosts.map((post) => (
                        <div key={post.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 shadow">
                            {/* Header */}
                            <div className="p-6 pb-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={post.user.avatar}
                                            alt={post.user.name}
                                            className="w-12 h-12 rounded-full border-2 border-gray-300 dark:border-gray-600"
                                        />
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-semibold text-gray-900 dark:text-white">{post.user.name}</h3>
                                                {post.user.verified && (
                                                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{post.user.username} • {post.timestamp}</p>
                                        </div>
                                    </div>
                                    <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="px-6 pb-4">
                                <p className="text-gray-800 dark:text-gray-200">{post.content}</p>
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {post.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Media */}
                            {post.type === 'image' && (
                                <div className="px-6 pb-4">
                                    <img
                                        src={post.media}
                                        alt="Post content"
                                        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 hover:scale-[1.02] transition-transform duration-300"
                                    />
                                </div>
                            )}

                            {/* Actions */}
                            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-6 text-gray-600 dark:text-gray-300">
                                        <div className="flex items-center gap-2">
                                            <Heart className="w-5 h-5" />
                                            <span className="text-sm font-medium">{post.likes}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MessageCircle className="w-5 h-5" />
                                            <span className="text-sm font-medium">{post.comments}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Share2 className="w-5 h-5" />
                                            <span className="text-sm font-medium">{post.shares}</span>
                                        </div>
                                    </div>
                                    <div className="text-gray-500 dark:text-gray-400">
                                        <Bookmark className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Load More */}
                <div className="text-center py-8">
                    <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-xl hover:from-blue-600 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium">
                        Load More Posts
                    </button>
                </div>
            </div>
        </div>
    );
}
