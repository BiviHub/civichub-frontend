import { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import { LogOut, KeyRound, User, Mail, ImagePlus } from 'lucide-react';

const Profile = () => {
    const [fullName, setFullName] = useState('Admin John');
    const [email, setEmail] = useState('admin@example.com');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [profileImage, setProfileImage] = useState<string | null>('/assets/images/admin-avatar.png'); // default
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const handleUpdateProfile = () => {
        alert('Profile updated successfully!');
        // Add update logic here
    };

    const handleChangePassword = () => {
        alert('Password changed successfully!');
        // Add change password logic here
    };

    const handleLogout = () => {
        alert('You have been logged out!');
        // Add logout logic here
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            setProfileImage(URL.createObjectURL(file)); // Preview
        }
    };

    const handleSaveImage = () => {
        if (selectedImage) {
            // You can upload `selectedImage` to server here
            alert('Profile picture updated!');
        }
    };

    return (
        <div className="flex bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
            <AdminSidebar />

            <main className="ml-64 w-full p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-blue-700">My Profile</h1>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-red-600 hover:underline"
                    >
                        <LogOut className="w-5 h-5" />
                        Log Out
                    </button>
                </div>

                {/* ✅ Profile Picture Section */}
                <section className="bg-white rounded-xl shadow p-6 mb-8 border">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-800">
                        <ImagePlus className="w-5 h-5" />
                        Profile Picture
                    </h2>

                    <div className="flex items-center gap-6">
                        <img
                            src={profileImage || '/assets/images/admin-avatar.png'}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
                        />

                        <div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="block text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                            />
                            {selectedImage && (
                                <button
                                    onClick={handleSaveImage}
                                    className="mt-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded shadow hover:opacity-90"
                                >
                                    Save Picture
                                </button>
                            )}
                        </div>
                    </div>
                </section>

                {/* ✅ Account Details Section */}
                <section className="bg-white rounded-xl shadow p-6 mb-8 border">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-800">
                        <User className="w-5 h-5" />
                        Account Details
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm mb-1">Full Name</label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                        <div>
                            <label className="block text-sm mb-1 flex items-center gap-1">
                                <Mail className="w-4 h-4 text-gray-500" />
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleUpdateProfile}
                        className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded shadow hover:opacity-90"
                    >
                        Update Profile
                    </button>
                </section>

                {/* ✅ Change Password Section */}
                <section className="bg-white rounded-xl shadow p-6 border">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-800">
                        <KeyRound className="w-5 h-5" />
                        Change Password
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm mb-1">Current Password</label>
                            <input
                                type="password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                        <div>
                            <label className="block text-sm mb-1">New Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleChangePassword}
                        className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded shadow hover:opacity-90"
                    >
                        Change Password
                    </button>
                </section>
            </main>
        </div>
    );
};

export default Profile;

