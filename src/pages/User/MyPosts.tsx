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
    X,
    Edit2,
    Upload,
    Check,
} from 'lucide-react';
import { useState } from 'react';

const MyPosts = () => {
    const [dropdownStates, setDropdownStates] = useState(Array(6).fill(false));
    const [currentPage, setCurrentPage] = useState(1);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState<number | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [postToEdit, setPostToEdit] = useState<number | null>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // Track selected files
    const postsPerPage = 3;

    const [posts, setPosts] = useState([
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
    ]);

    const toggleDropdown = (index: number) => {
        const newStates = [...dropdownStates];
        newStates[index] = !newStates[index];
        setDropdownStates(newStates);
    };

    const handleDeleteClick = (postId: number) => {
        setPostToDelete(postId);
        setIsDeleteModalOpen(true);
        const newStates = [...dropdownStates].map(() => false);
        setDropdownStates(newStates);
    };

    const confirmDelete = () => {
        if (postToDelete !== null) {
            setPosts(posts.filter((post) => post.id !== postToDelete));
        }
        setIsDeleteModalOpen(false);
        setPostToDelete(null);
    };

    const cancelDelete = () => {
        setIsDeleteModalOpen(false);
        setPostToDelete(null);
    };

    const handleEditClick = (postId: number) => {
        setPostToEdit(postId);
        setIsEditModalOpen(true);
        setSelectedFiles([]); // Reset files when opening modal
        const newStates = [...dropdownStates].map(() => false);
        setDropdownStates(newStates);
    };

    const cancelEdit = () => {
        setIsEditModalOpen(false);
        setPostToEdit(null);
        setSelectedFiles([]); // Clear files on cancel
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newFiles = Array.from(files).slice(0, 5 - selectedFiles.length); // Limit to 5 files
            setSelectedFiles([...selectedFiles, ...newFiles]);
        }
    };

    const removeFile = (index: number) => {
        setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
    };

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

    const selectedPost = posts.find((post) => post.id === postToEdit) || posts[0];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
            <style>
                {`
                    @keyframes fadeInScale {
                        0% {
                            opacity: 0;
                            transform: scale(0.9) translateY(20px);
                        }
                        100% {
                            opacity: 1;
                            transform: scale(1) translateY(0);
                        }
                    }
                    .animate-fadeInScale {
                        animation: fadeInScale 0.4s ease-out forwards;
                    }
                `}
            </style>
            <div className="mx-auto max-w-7xl">
                <div className="mb-12 text-center">
                    <h1 className="mb-4 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 md:text-5xl">
                        My Posts
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-gray-700 dark:text-gray-300">
                        Here are my latest civic engagements, events, and volunteer activities shared with the community.
                    </p>
                </div>

                <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {currentPosts.map((post, index) => (
                        <div
                            key={post.id}
                            className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                        >
                            <div className="absolute right-4 top-4 z-20">
                                <button
                                    onClick={() => toggleDropdown(index)}
                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                >
                                    <MoreVertical className="h-4 w-4" />
                                </button>
                                {dropdownStates[index] && (
                                    <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-100 bg-white py-2 shadow-lg dark:border-gray-600 dark:bg-gray-700 z-30">
                                        <button
                                            onClick={() => handleEditClick(post.id)}
                                            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-600"
                                        >
                                            <Edit className="mr-2 h-4 w-4" />
                                            Edit Post
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(post.id)}
                                            className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900"
                                        >
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Delete Post
                                        </button>
                                        <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-600">
                                            <Eye className="mr-2 h-4 w-4" />
                                            View Comments
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="p-6 pt-12">
                                <span className="mb-2 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-600 dark:bg-green-900 dark:text-green-300">
                                    {post.category}
                                </span>
                                <h3 className="mb-2 line-clamp-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-green-600 dark:text-white">
                                    {post.title}
                                </h3>
                                <p className="mb-4 line-clamp-3 leading-relaxed text-gray-600 dark:text-gray-300">{post.description}</p>
                                <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">{post.timeAgo}</div>
                                <div className="flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-600">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex cursor-pointer items-center space-x-1 text-gray-500 hover:text-red-500 dark:text-gray-300">
                                            <Heart className="h-4 w-4" />
                                            <span className="text-sm font-medium">{post.likes}</span>
                                        </div>
                                        <div className="flex cursor-pointer items-center space-x-1 text-gray-500 hover:text-blue-500 dark:text-gray-300">
                                            <MessageCircle className="h-4 w-4" />
                                            <span className="text-sm font-medium">{post.comments}</span>
                                        </div>
                                        <div className="flex cursor-pointer items-center space-x-1 text-gray-500 hover:text-green-500 dark:text-gray-300">
                                            <Share2 className="h-4 w-4" />
                                            <span className="text-sm font-medium">{post.shares}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex items-center justify-center gap-6">
                    <button
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full transition text-sm font-medium ${
                            currentPage === 1
                                ? 'bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed'
                                : 'bg-gradient-to-r from-blue-600 to-green-600 text-white hover:opacity-90'
                        }`}
                    >
                        <ChevronLeft className="h-4 w-4" />
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
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>

                {/* Delete Confirmation Modal */}
                {isDeleteModalOpen && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300"
                        onClick={cancelDelete}
                    >
                        <div
                            className="bg-white/90 dark:bg-gray-900/90 rounded-3xl shadow-xl p-8 w-[90%] max-w-md transform animate-fadeInScale border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-lg"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-center items-center mb-8 relative">
                                <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent dark:text-white tracking-tight">
                                    Confirm Deletion
                                </h2>
                                <button
                                    onClick={cancelDelete}
                                    className="absolute right-0 w-8 h-8 bg-gray-100 dark:bg-gray-800 hover:bg-red-100 dark:hover:bg-red-900 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200"
                                    aria-label="Close"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="flex flex-col items-center space-y-6">
                                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full">
                                    <Trash2 className="w-8 h-8 text-white" />
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 text-center text-sm leading-relaxed">
                                    Are you sure you want to delete this post? This action cannot be undone.
                                </p>
                            </div>
                            <div className="flex justify-center gap-4 mt-8">
                                <button
                                    onClick={cancelDelete}
                                    className="px-6 py-2.5 text-sm font-medium rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 w-32"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="px-6 py-2.5 text-sm font-medium rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-md w-32"
                                >
                                    Delete Post
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Edit Post Modal */}
                {isEditModalOpen && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-slideIn"
                        onClick={cancelEdit}
                    >
                        <div
                            className="w-[90%] max-w-md rounded-3xl border border-gray-200/50 bg-white/90 p-8 shadow-xl backdrop-blur-lg dark:border-gray-700/50 dark:bg-gray-900/90 animate-slideIn"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative mb-8 flex items-center justify-center">
                                <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-500 dark:text-white tracking-tight">
                                    Edit Post
                                </h2>
                                <button
                                    onClick={cancelEdit}
                                    className="absolute right-0 w-8 h-8 bg-gray-100 dark:bg-gray-800 hover:bg-red-100 dark:hover:bg-red-900 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200"
                                    aria-label="Close"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-base font-semibold text-gray-800 dark:text-white">
                                        <Edit2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                                        Post Title
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter post title..."
                                        value={selectedPost.title}
                                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-800 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-green-400 dark:focus:ring-green-800"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-base font-semibold text-gray-800 dark:text-white">
                                        <Upload className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                        Upload Images or Videos (Max 5)
                                    </label>
                                    <label className="cursor-pointer rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 transition hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 block">
                                        {selectedFiles.length > 0 ? (
                                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                                                {selectedFiles.map((file, index) => (
                                                    <div key={index} className="relative">
                                                        {file.type.startsWith('image/') ? (
                                                            <img
                                                                src={URL.createObjectURL(file)}
                                                                alt={`Preview ${index + 1}`}
                                                                className="h-24 w-full rounded-lg object-cover shadow-sm"
                                                            />
                                                        ) : (
                                                            <video
                                                                src={URL.createObjectURL(file)}
                                                                className="h-24 w-full rounded-lg object-cover shadow-sm"
                                                                muted
                                                            />
                                                        )}
                                                        <button
                                                            onClick={() => removeFile(index)}
                                                            className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white transition hover:bg-red-600 shadow-sm"
                                                            aria-label="Remove file"
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <>
                                                <Upload className="mx-auto h-8 w-8 text-gray-500 dark:text-gray-400" />
                                                <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
                                                    Click to open gallery and select images or videos (Max 5)
                                                </p>
                                                <input
                                                    type="file"
                                                    accept="image/*,video/*"
                                                    multiple
                                                    className="hidden"
                                                    onChange={handleFileChange}
                                                />
                                            </>
                                        )}
                                    </label>
                                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                        Supported: Images (PNG, JPG, etc.), Videos (MP4, etc.). Max 5 files total.
                                    </p>
                                </div>
                            </div>
                            <div className="mt-8 flex justify-end gap-4">
                                <button
                                    onClick={cancelEdit}
                                    className="w-32 py-2.5 text-sm font-medium rounded-full bg-gray-300 dark:bg-gray-700 text-blue-700 dark:text-blue-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
                                >
                                    Cancel
                                </button>
                                <button className="flex w-32 items-center justify-center gap-0 py-2.5 text-sm font-medium rounded-full bg-gradient-to-r from-blue-600 to-green-500 text-white hover:from-blue-700 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-md">
                                    <Check className="h-5 w-5" />
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyPosts;