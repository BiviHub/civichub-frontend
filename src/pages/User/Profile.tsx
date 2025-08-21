import { useState, useRef } from "react"; // Added useRef
import { Pencil, X } from "lucide-react";
import { useTheme } from "../../Context/useTheme";

const Profile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null); // State for image preview
    const fileInputRef = useRef<HTMLInputElement>(null); // Ref for file input
    useTheme();

    const profileData = [
        { label: "Email", value: "obiora@example.com" },
        { label: "Phone", value: "+234 801 234 5678" },
        { label: "Address", value: "21 Civic Way, Unity Town" },
        { label: "City", value: "Enugu" },
        { label: "State", value: "Enugu State" },
        { label: "Country", value: "Nigeria" },
        { label: "Date of Birth", value: "January 10, 1998" },
        { label: "Gender", value: "Male" },
    ];

    const formFields = [
        { label: "First Name", value: "Obiora" },
        { label: "Last Name", value: "Bright" },
        { label: "Email", value: "obiora@example.com" },
        { label: "Phone", value: "+234 801 234 5678" },
        { label: "Address", value: "21 Civic Way, Unity Town" },
        { label: "City", value: "Enugu" },
        { label: "State", value: "Enugu State" },
        { label: "Country", value: "Nigeria" },
        { label: "Date of Birth", value: "1998-01-10", type: "date" },
        { label: "Gender", value: "Male" },
    ];

    // Handle file selection and preview
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
        }
    };

    // Trigger file input click
    const handleChangePhotoClick = () => {
        fileInputRef.current?.click();
    };

    // Clean up preview URL when modal closes
    const handleCloseModal = () => {
        setIsModalOpen(false);
        if (previewImage) {
            URL.revokeObjectURL(previewImage); // Free memory
            setPreviewImage(null);
        }
    };

    return (
        <div className="p-6 md:p-10 min-h-screen bg-gradient-to-br from-blue-600 to-green-500 dark:from-gray-900 dark:to-black text-white">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/30 shadow-lg">
                    <img
                        src="https://i.pravatar.cc/300?img=45"
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="text-center md:text-left">
                    <h1 className="text-3xl font-bold">Obiora Bright</h1>
                    <p className="text-white/80">Community Organizer at CivicHub</p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-md shadow transition"
                    >
                        <Pencil className="w-4 h-4" />
                        Edit Profile
                    </button>
                </div>
            </div>

            {/* Profile Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/10 dark:bg-white/5 p-6 rounded-xl shadow-xl border border-white/20">
                {profileData.map((field, index) => (
                    <div key={index}>
                        <p className="text-sm text-white/70">{field.label}</p>
                        <p className="text-lg font-medium">{field.value}</p>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/30"
                        onClick={handleCloseModal} // Updated to clean up preview
                    ></div>

                    {/* Modal Content */}
                    <div
                        className="relative z-50 w-full max-w-3xl bg-white/20 dark:bg-white/10 rounded-xl shadow-2xl p-6 border border-white/30 backdrop-blur-md animate-fadeInScale"
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleCloseModal} // Updated to clean up preview
                            className="absolute top-4 right-4 text-white/70 hover:text-red-500 transition"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Modal Header */}
                        <h3 className="text-xl font-bold mb-4 text-white">Edit Profile</h3>

                        {/* Profile Pic Upload */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white/30 shadow">
                                <img
                                    src={previewImage || "https://i.pravatar.cc/150?img=45"} // Show preview if available
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden" // Hide file input
                                />
                                <button
                                    onClick={handleChangePhotoClick}
                                    className="text-sm bg-gradient-to-r from-blue-600 to-green-500 text-white px-4 py-1.5 rounded-md hover:opacity-90 transition"
                                >
                                    Change Photo
                                </button>
                            </div>
                        </div>

                        {/* Form Fields */}
                        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-1">
                            {formFields.map((field, index) => (
                                <div key={index}>
                                    <label className="text-sm text-white/80">{field.label}</label>
                                    <input
                                        type={field.type || "text"}
                                        defaultValue={field.value}
                                        className="w-full mt-1 px-3 py-2 rounded-md border border-white/20 bg-white/10 dark:bg-white/5 text-white text-sm placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/40 transition"
                                    />
                                </div>
                            ))}
                        </form>

                        {/* Action Buttons */}
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={handleCloseModal} // Updated to clean up preview
                                className="px-4 py-2 rounded-md border border-white/30 text-white text-sm hover:bg-white/10 transition"
                            >
                                Cancel
                            </button>
                            <button className="px-5 py-2 bg-gradient-to-r from-blue-600 to-green-500 text-white font-semibold rounded-md text-sm hover:opacity-90 transition">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;