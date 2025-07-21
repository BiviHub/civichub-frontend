import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import PostFormModal from '../components/PostFormModal';
import PostCard from '../components/PostCard';
import LoadingSpinner from '../components/LoadingSpinner';
import samplepost from '../assets/images/sample-post.jpg';
import waste from '../assets/images/waste.jpg';
import publicSafetyVideo from '../assets/videos/Public Safety.mp4';
import road from '../assets/videos/road.mp4';
interface Post {
    date: string;
    location: string;
    content: string;
    image?: string | File;
    video?: string;
}

const mockPosts: Post[] = [
    {
        date: 'Today',
        location: 'Ikeja, Lagos',
        content: 'Broken water pipe on the road.',
        image: samplepost,
    },
    {
        date: 'Yesterday',
        location: 'Garki, Abuja',
        content: 'Uncollected waste for days!',
        image: waste,
    },
    {
        date: 'Today',
        location: 'Wuse Zone 6, Abuja',
        content: 'Video footage showing a safety violation.',
        video: publicSafetyVideo,
    },
    {
        date: 'Today',
        location: 'Wuse Zone 6, Enugu',
        content: 'Goverment are doing good roads at Enugu .',
        video: road,
    },
];

const NewsFeed = () => {
    const [posts, setPosts] = useState<Post[]>(mockPosts);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>(mockPosts);
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [sidebarExpanded, setSidebarExpanded] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        const query = searchQuery.toLowerCase();
        setFilteredPosts(
            posts.filter(
                (post) =>
                    post.content.toLowerCase().includes(query) ||
                    post.location.toLowerCase().includes(query)
            )
        );
    }, [searchQuery, posts]);

    const handleNewPost = (newPost: Post) => {
        setPosts([newPost, ...posts]);
        setSearchQuery('');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="flex bg-gradient-to-br from-green-50 to-blue-50">
            <Sidebar onToggle={(expanded: boolean) => setSidebarExpanded(expanded)} />

            <main
                className={`transition-all duration-300 ${
                    sidebarExpanded ? 'md:ml-64' : 'md:ml-16'
                } ml-0 w-full p-4 bg-gradient-to-br from-green-50 to-blue-50 min-h-screen`}
            >
                <div className="max-w-2xl mx-auto">
                    <div className="flex justify-between items-center mb-4">
                        <input
                            type="text"
                            placeholder="Search by location or content..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-2 py-1 rounded-md font-bold text-sm ml-2"
                        >
                            Report
                        </button>
                    </div>

                    {isLoading ? (
                        <LoadingSpinner />
                    ) : (
                        <>
                            {filteredPosts.map((post, i) => (
                                <PostCard key={i} post={post} />
                            ))}
                            {filteredPosts.length === 0 && (
                                <p className="text-center text-gray-500 mt-4">
                                    No reports found.
                                </p>
                            )}
                        </>
                    )}
                </div>

                {showModal && (
                    <PostFormModal onClose={() => setShowModal(false)} onPost={handleNewPost} />
                )}
            </main>
        </div>
    );
};

export default NewsFeed;





