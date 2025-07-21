import { useState, useEffect } from 'react';
import { ImagePlus, MapPin, Loader2, X } from 'lucide-react';

interface Post {
    content: string;
    image?: File;
    video?: string;
    location: string;
    date: string;
}

interface PostFormModalProps {
    onClose: () => void;
    onPost: (post: Post) => void;
}

const PostFormModal = ({ onClose, onPost }: PostFormModalProps) => {
    const [text, setText] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isVideo, setIsVideo] = useState(false);
    const [location, setLocation] = useState('Detecting location...');
    const [loadingLocation, setLoadingLocation] = useState(true);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (selected) {
            setFile(selected);
            setIsVideo(selected.type.startsWith('video/'));
            setPreviewUrl(URL.createObjectURL(selected));
        }
    };

    const handleSubmit = () => {
        if (!text.trim()) return alert('Please enter a description.');
        onPost({
            content: text,
            image: !isVideo ? file ?? undefined : undefined,
            video: isVideo && previewUrl ? previewUrl : undefined,
            location,
            date: new Date().toLocaleString(),
        });
        onClose();
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const { latitude, longitude } = pos.coords;
                try {
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
                    );
                    const data = await response.json();
                    const readable = data.display_name || `Lat: ${latitude}, Lng: ${longitude}`;
                    setLocation(readable);
                } catch (error) {
                    console.error('Reverse geocoding failed:', error);
                    setLocation(`Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`);
                } finally {
                    setLoadingLocation(false);
                }
            },
            () => {
                setLocation('Unable to fetch location');
                setLoadingLocation(false);
            }
        );
    }, []);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
                <button
                    className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-xl"
                    onClick={onClose}
                >
                    <X />
                </button>

                <h2 className="text-xl font-semibold mb-4">Report an Issue</h2>

                <textarea
                    className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    rows={4}
                    placeholder="What's the issue?"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    {loadingLocation ? <Loader2 className="animate-spin w-4 h-4" /> : <span>{location}</span>}
                </div>

                {previewUrl && (
                    <div className="mb-4">
                        {isVideo ? (
                            <video
                                controls
                                className="w-full max-h-64 rounded-md"
                                src={previewUrl}
                            />
                        ) : (
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="w-full max-h-64 object-contain rounded-md"
                            />
                        )}
                    </div>
                )}

                <label className="flex items-center gap-2 cursor-pointer text-blue-600 hover:underline mb-4">
                    <ImagePlus className="w-5 h-5" />
                    <input
                        type="file"
                        accept="image/*,video/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    Upload Image or Video
                </label>

                <button
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-2 rounded-md font-medium hover:opacity-90"
                >
                    Submit Report
                </button>
            </div>
        </div>
    );
};

export default PostFormModal;


