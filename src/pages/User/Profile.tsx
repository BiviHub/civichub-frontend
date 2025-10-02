import { useState, useEffect } from "react";
import { Pencil, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../../Context/useTheme";
import Swal from "sweetalert2";
import api from "../../api";
import type { UserDTO, ProfileDTO } from "../../types/AuthTypes";
import { updateProfile } from "../../services/authService";
import { useProfile } from "../../Context/ProfileContext";

const Profile = () => {
    const { profile, setProfile } = useProfile();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useTheme();

    console.log("Profile component mounted, profile from context:", profile);

    useEffect(() => {
        if (profile) {
            console.log("Profile already loaded from context");
            setLoading(false);
            return;
        }

        const fetchProfile = async () => {
            try {
                console.log("Starting profile fetch in Profile component");
                Swal.fire({
                    title: "Loading Profile",
                    text: "Please wait...",
                    allowOutsideClick: false,
                    didOpen: () => Swal.showLoading(),
                });
                const token = localStorage.getItem("token");
                console.log("Profile Token:", token ? `${token.substring(0, 10)}...` : "null");
                if (!token) {
                    setError("Please log in to view your profile.");
                    setLoading(false);
                    Swal.fire({
                        icon: "error",
                        title: "Authentication Error",
                        text: "No token found. Please log in again.",
                    });
                    return;
                }
                const response = await api.get("/Account/profile");
                console.log("Profile Response:", response.data);
                const fullName = response.data.fullName?.trim() || "";
                const nameParts = fullName.split(" ").filter(Boolean);
                const newProfile: UserDTO = {
                    id: response.data.id || "",
                    firstName: response.data.firstName || (nameParts[0] || "Guest"),
                    lastName: response.data.lastName || (nameParts.slice(1).join(" ") || ""),
                    email: response.data.email || "",
                    phoneNumber: response.data.phoneNumber || "",
                    address: response.data.address || "",
                    gender: response.data.gender || "",
                    profilePictureUrl: response.data.userProfilePicture || "",
                    role: response.data.role || "",
                };
                console.log("Setting profile in context:", newProfile);
                setProfile(newProfile);
                setLoading(false);
                Swal.close();
            } catch (err: any) {
                console.error("Profile fetch error:", {
                    status: err.response?.status,
                    response: err.response?.data,
                    message: err.message,
                });
                setError(
                    err.response?.status === 401
                        ? "Please log in again."
                        : err.response?.data?.message || "Failed to load profile."
                );
                setLoading(false);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text:
                        err.response?.status === 401
                            ? "Please log in again."
                            : err.response?.data?.message || "Failed to load profile.",
                });
            }
        };
        fetchProfile();
    }, [setProfile]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        const formData = new FormData(e.currentTarget);

        try {
            const token = localStorage.getItem("token");
            console.log("Token for update:", token ? `${token.substring(0, 10)}...` : "null");
            if (!token) {
                setError("Please log in to update your profile.");
                Swal.fire({
                    icon: "error",
                    title: "Authentication Error",
                    text: "No token found. Please log in again.",
                });
                return;
            }

            const payload: ProfileDTO = {
                firstName: formData.get("firstName") as string || "",
                lastName: formData.get("lastName") as string || "",
                phoneNumber: formData.get("phoneNumber") as string || profile?.phoneNumber || "",
                address: formData.get("address") as string || "",
            };

            console.log("Payload sent to /Account/update-profile:", payload);
            const result = await updateProfile(payload);

            const updatedProfile = {
                ...profile!,
                firstName: payload.firstName,
                lastName: payload.lastName,
                phoneNumber: payload.phoneNumber,
                address: payload.address,
            };
            setProfile(updatedProfile);
            console.log("Profile updated in context:", updatedProfile);

            Swal.fire({
                icon: "success",
                title: "Success",
                text: result.message || "Profile updated successfully!",
                timer: 3000,
                showConfirmButton: false,
            });
            handleCloseModal();
        } catch (err: any) {
            console.error("Update error details:", {
                status: err.response?.status,
                data: err.response?.data,
                message: err.message,
            });
            setError(err.response?.data?.message || "Failed to update profile.");
            Swal.fire({
                icon: "error",
                title: "Error",
                text: err.response?.data?.message || "Failed to update profile.",
            });
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    if (loading) {
        return (
            <div className="p-6 min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-green-500 dark:from-gray-900 dark:to-black text-white">
                Loading profile...
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-green-500 dark:from-gray-900 dark:to-black text-red-500">
                {error} <Link to="/login" className="underline">Go to Login</Link>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="p-6 min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-green-500 dark:from-gray-900 dark:to-black text-white">
                Profile data not available. <Link to="/login" className="underline">Please log in</Link>.
            </div>
        );
    }

    return (
        <div className="p-6 md:p-10 min-h-screen bg-gradient-to-br from-blue-600 to-green-500 dark:from-gray-900 dark:to-black text-white">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/30 shadow-lg">
                    <img
                        src={profile.profilePictureUrl || "https://i.pravatar.cc/300?img=45"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            console.error("Image load error:", profile.profilePictureUrl);
                            (e.target as HTMLImageElement).src = "https://i.pravatar.cc/300?img=45";
                        }}
                    />
                </div>
                <div className="text-center md:text-left">
                    <h1 className="text-3xl font-bold">{profile.firstName || "Guest"} {profile.lastName || ""}</h1>
                    <p className="text-white/80">Community Organizer at CivicHub</p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-full shadow transition-transform hover:scale-105"
                    >
                        <Pencil className="w-4 h-4" />
                        Edit Profile
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/10 dark:bg-white/5 p-6 rounded-xl shadow-xl border border-white/30">
                {[
                    { label: "First Name", value: profile.firstName },
                    { label: "Last Name", value: profile.lastName },
                    { label: "Email", value: profile.email },
                    { label: "Phone Number", value: profile.phoneNumber },
                    { label: "Address", value: profile.address },
                    { label: "Gender", value: profile.gender },
                ].map((field, index) => (
                    <div key={index}>
                        <p className="text-sm text-white/70">{field.label}</p>
                        <p className="text-lg font-medium">{field.value || "Not set"}</p>
                    </div>
                ))}
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in-up">
                    <div
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                        onClick={handleCloseModal}
                    ></div>
                    <div className="relative w-full max-w-md bg-white/20 dark:bg-gray-800/20 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-6 md:p-8 transform transition-all duration-300 scale-100">
                        {/* Close Button */}
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors duration-200"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Header */}
                        <h3 className="text-2xl font-bold mb-2 text-white text-center">Edit Profile</h3>
                        <p className="text-white/60 mb-8 text-center text-sm">Update your information below</p>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {[
                                { label: "First Name", name: "firstName", value: profile?.firstName, type: "text" as const },
                                { label: "Last Name", name: "lastName", value: profile?.lastName, type: "text" as const },
                                { label: "Phone Number", name: "phoneNumber", value: profile?.phoneNumber, type: "tel" as const },
                                { label: "Address", name: "address", value: profile?.address, type: "text" as const },
                            ].map((field) => (
                                <div key={field.name} className="relative">
                                    <label
                                        htmlFor={field.name}
                                        className="block text-sm font-medium text-white/70 mb-1"
                                    >
                                        {field.label}
                                    </label>
                                    <input
                                        type={field.type}
                                        id={field.name}
                                        name={field.name}
                                        defaultValue={field.value || ""}
                                        required
                                        className="w-full px-4 py-2 bg-white/10 dark:bg-gray-900/50 border border-white/20 dark:border-gray-600/50 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
                                        placeholder={field.label}
                                    />
                                </div>
                            ))}

                            {/* Buttons */}
                            <div className="flex gap-2 pt-4">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="flex-1 px-4 py-2 text-xs font-semibold border border-white/30 dark:border-gray-600/50 text-white rounded-lg hover:bg-white/10 dark:hover:bg-gray-700/20 transition-all duration-200 hover:scale-105"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-green-500 text-white font-semibold rounded-lg text-xs hover:opacity-90 transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-blue-500/50 flex items-center justify-center gap-1"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Profile;