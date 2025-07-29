import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Play, Search,  } from 'lucide-react';

export default function NewsFeed() {
    const samplePosts = [
        {
            id: 1,
            user: {
                name: "Emma Rodriguez",
                username: "@emma_codes",
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
                verified: true,
            },
            timestamp: "2 hours ago",
            content: "Just deployed my first full-stack app using React and Node.js! The feeling of seeing your code come to life is unmatched. Here's a sneak peek of the dashboard I built 🚀",
            type: "image",
            media: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
            tags: ["#webdev", "#react", "#nodejs", "#coding"],
            likes: 124,
            comments: 18,
            shares: 7,
        },
        {
            id: 2,
            user: {
                name: "Marcus Johnson",
                username: "@marcus_creates",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
                verified: false,
            },
            timestamp: "4 hours ago",
            content: "Behind the scenes of today's photoshoot! Sometimes the best shots happen between the planned ones. This golden hour light was absolutely perfect ✨",
            type: "video",
            media: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
            thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop",
            tags: ["#photography", "#goldenhour", "#bts"],
            likes: 89,
            comments: 12,
            shares: 4,
        },
        {
            id: 3,
            user: {
                name: "Sophia Chen",
                username: "@sophia_designs",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
                verified: true,
            },
            timestamp: "6 hours ago",
            content: "Excited to share my latest UI design for a sustainable fashion app! Clean aesthetics meet eco-consciousness. What do you think of this color palette? 🌱",
            type: "image",
            media: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
            tags: ["#uidesign", "#sustainability", "#figma"],
            likes: 156,
            comments: 23,
            shares: 11,
        },
        {
            id: 4,
            user: {
                name: "David Park",
                username: "@david_travels",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                verified: false,
            },
            timestamp: "8 hours ago",
            content: "Morning meditation session in Bali. There's something magical about starting your day with gratitude and mindfulness. The sunrise here never gets old 🧘‍♂️",
            type: "text",
            tags: ["#meditation", "#bali", "#mindfulness", "#sunrise"],
            likes: 67,
            comments: 8,
            shares: 3,
        },
        {
            id: 5,
            user: {
                name: "Alex Thompson",
                username: "@alex_fitness",
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
                verified: false,
            },
            timestamp: "10 hours ago",
            content: "New workout routine is paying off! Consistency is key, folks. Here's a quick demo of my favorite compound movement that targets multiple muscle groups 💪",
            type: "video",
            media: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
            thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
            tags: ["#fitness", "#workout", "#strength"],
            likes: 92,
            comments: 15,
            shares: 6,
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-teal-900 to-green-900">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/20">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">

                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                                <input
                                    type="text"
                                    placeholder="Search posts..."
                                    className="pl-10 pr-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-green-500 focus:border-transparent w-64"
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Feed */}
            <div className="max-w-4xl mx-auto px-4 py-6">
                <div className="space-y-6">
                    {samplePosts.map((post) => (
                        <div key={post.id} className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden hover:bg-white/15 transition-all duration-300">
                            {/* Post Header */}
                            <div className="p-6 pb-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={post.user.avatar}
                                            alt={post.user.name}
                                            className="w-12 h-12 rounded-full border-2 border-white/20"
                                        />
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-semibold text-white">{post.user.name}</h3>
                                                {post.user.verified && (
                                                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-white/60 text-sm">{post.user.username} • {post.timestamp}</p>
                                        </div>
                                    </div>
                                    <button className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Post Content */}
                            <div className="px-6 pb-4">
                                <p className="text-white leading-relaxed">{post.content}</p>
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {post.tags.map((tag, index) => (
                                        <span key={index} className="text-blue-300 hover:text-blue-200 cursor-pointer transition-colors">
                      {tag}
                    </span>
                                    ))}
                                </div>
                            </div>

                            {/* Media Content */}
                            {post.type === 'image' && (
                                <div className="px-6 pb-4">
                                    <img
                                        src={post.media}
                                        alt="Post content"
                                        className="w-full rounded-xl border border-white/10 hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
                                    />
                                </div>
                            )}

                            {post.type === 'video' && (
                                <div className="px-6 pb-4">
                                    <div className="relative rounded-xl overflow-hidden border border-white/10">
                                        <img
                                            src={post.thumbnail}
                                            alt="Video thumbnail"
                                            className="w-full aspect-video object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                                <Play className="w-8 h-8 text-white ml-1" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Post Actions */}
                            <div className="px-6 py-4 border-t border-white/10">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center gap-2 text-white/60">
                                            <Heart className="w-5 h-5" />
                                            <span className="text-sm font-medium">{post.likes}</span>
                                        </div>

                                        <div className="flex items-center gap-2 text-white/60">
                                            <MessageCircle className="w-5 h-5" />
                                            <span className="text-sm font-medium">{post.comments}</span>
                                        </div>

                                        <div className="flex items-center gap-2 text-white/60">
                                            <Share2 className="w-5 h-5" />
                                            <span className="text-sm font-medium">{post.shares}</span>
                                        </div>
                                    </div>

                                    <div className="p-2 rounded-lg text-white/60">
                                        <Bookmark className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Load More */}
                <div className="text-center py-8">
                    <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium">
                        Load More Posts
                    </button>
                </div>
            </div>
        </div>
    );
}