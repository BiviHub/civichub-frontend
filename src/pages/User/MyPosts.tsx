import { useState } from 'react';
import {
    Heart,
    MessageCircle,
    Share2,
    MoreVertical,
    Edit,
    Trash2,
    Eye,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';

const MyPosts = () => {
    const [dropdownStates, setDropdownStates] = useState(Array(6).fill(false));
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 3;

    const toggleDropdown = (index: number) => {
        const newStates = [...dropdownStates];
        newStates[index] = !newStates[index];
        setDropdownStates(newStates);
    };

    const posts = [
        {
            id: 1,
            category: 'Clean-up Drive',
            title: 'Monthly Community Clean-Up at Central Park',
            description:
                'Join us as we bring together residents to clean our beloved Central Park. Gloves, trash bags, and refreshments will be provided...',
            timeAgo: '2 days ago',
            likes: 35,
            comments: 10,
            shares: 5,
        },
        {
            id: 2,
            category: 'Youth Forum',
            title: 'Empowering the Youth for Tomorrow’s Challenges',
            description:
                'An open forum to engage with young leaders, share insights, and plan impactful community projects...',
            timeAgo: '1 week ago',
            likes: 48,
            comments: 16,
            shares: 8,
        },
        {
            id: 3,
            category: 'Awareness Campaign',
            title: 'Road Safety Awareness Walk',
            description:
                'Highlighting the importance of safe driving and pedestrian rights through a peaceful march and distribution of flyers...',
            timeAgo: '1 week ago',
            likes: 27,
            comments: 12,
            shares: 4,
        },
        {
            id: 4,
            category: 'Town Hall',
            title: 'Quarterly Town Hall with Local Representatives',
            description:
                'Residents discuss issues, propose ideas, and receive updates from community leaders...',
            timeAgo: '2 weeks ago',
            likes: 61,
            comments: 18,
            shares: 10,
        },
        {
            id: 5,
            category: 'Fundraiser',
            title: 'Fundraising Gala for Orphanage Renovation',
            description:
                'A special evening with music and dinner aimed at raising funds to renovate and modernize the local children’s home...',
            timeAgo: '3 weeks ago',
            likes: 79,
            comments: 25,
            shares: 13,
        },
        {
            id: 6,
            category: 'Tree Planting',
            title: 'Greening Our Streets – Tree Planting Day',
            description:
                'Planting trees along key roads to enhance air quality and beautify our neighborhoods. Volunteers welcome...',
            timeAgo: '1 month ago',
            likes: 43,
            comments: 14,
            shares: 6,
        },
    ];


    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(posts.length / postsPerPage);

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div className="min-h-screen from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 bg-gradient-to-br py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 mb-4">
                        My Posts
                    </h1>
                    <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                        Here are my latest civic engagements, events, and volunteer activities shared with the community.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {currentPosts.map((post, index) => (
                        <div
                            key={post.id}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group relative border border-gray-100 dark:border-gray-700"
                        >
                            <div className="absolute top-4 right-4 z-20">
                                <button
                                    onClick={() => toggleDropdown(index)}
                                    className="w-8 h-8 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 transition"
                                >
                                    <MoreVertical className="w-4 h-4" />
                                </button>
                                {dropdownStates[index] && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg py-2 z-30 border border-gray-100 dark:border-gray-600">
                                        <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <Edit className="w-4 h-4 mr-2" />
                                            Edit Post
                                        </button>
                                        <button className="w-full flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900">
                                            <Trash2 className="w-4 h-4 mr-2" />
                                            Delete Post
                                        </button>
                                        <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <Eye className="w-4 h-4 mr-2" />
                                            View Comments
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="p-6 pt-12">
                <span className="inline-block bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                  {post.category}
                </span>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">{post.description}</p>
                                <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">{post.timeAgo}</div>
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-600">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-300 hover:text-red-500 cursor-pointer">
                                            <Heart className="w-4 h-4" />
                                            <span className="text-sm font-medium">{post.likes}</span>
                                        </div>
                                        <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-300 hover:text-blue-500 cursor-pointer">
                                            <MessageCircle className="w-4 h-4" />
                                            <span className="text-sm font-medium">{post.comments}</span>
                                        </div>
                                        <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-300 hover:text-green-500 cursor-pointer">
                                            <Share2 className="w-4 h-4" />
                                            <span className="text-sm font-medium">{post.shares}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center gap-6 mt-6">
                    <button
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full transition text-sm font-medium ${
                            currentPage === 1
                                ? 'bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed'
                                : 'bg-gradient-to-r from-blue-600 to-green-600 text-white hover:opacity-90'
                        }`}
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                    </button>

                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </span>

                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full transition text-sm font-medium ${
                            currentPage === totalPages
                                ? 'bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed'
                                : 'bg-gradient-to-r from-blue-600 to-green-600 text-white hover:opacity-90'
                        }`}
                    >
                        Next
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyPosts;
