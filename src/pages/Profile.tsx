import { useState, useRef } from 'react';
import { Pencil, Trash2, Upload } from 'lucide-react';

const Profile = () => {
    const [editMode, setEditMode] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [user, setUser] = useState({
        firstName: 'Wisdom',
        lastName: 'Iloh',
        email: 'wisdom@example.com',
        phone: '08012345678',
        address: '123 Civic Street',
        country: 'Nigeria',
        state: 'Enugu',
        city: 'Enugu',
        postalCode: '400001',
    });

    const handleSave = () => {
        setEditMode(false);
        // Save logic goes here (e.g., API call)
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setPreviewImage(previewUrl);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6 text-blue-700">Profile Settings</h2>

                {/* Profile Image */}
                <div className="flex items-center gap-4 mb-6">
                    <img
                        src={previewImage || '/assets/images/avatar.png'}
                        alt="Profile"
                        className="w-16 h-16 rounded-full object-cover border"
                    />
                    {editMode && (
                        <div>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                            />
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="flex items-center gap-2 text-blue-600 hover:underline"
                            >
                                <Upload className="w-4 h-4" /> Change Photo
                            </button>
                            <p className="text-sm text-gray-500">Recommended size: 40x40px</p>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* First Name */}
                    <div>
                        <label className="block font-medium text-gray-700">First Name</label>
                        {editMode ? (
                            <input
                                type="text"
                                className="w-full mt-1 p-2 border rounded-md"
                                value={user.firstName}
                                onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                            />
                        ) : (
                            <p className="mt-1 text-gray-800">{user.firstName}</p>
                        )}
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="block font-medium text-gray-700">Last Name</label>
                        {editMode ? (
                            <input
                                type="text"
                                className="w-full mt-1 p-2 border rounded-md"
                                value={user.lastName}
                                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                            />
                        ) : (
                            <p className="mt-1 text-gray-800">{user.lastName}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block font-medium text-gray-700">Email</label>
                        {editMode ? (
                            <input
                                type="email"
                                className="w-full mt-1 p-2 border rounded-md"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                            />
                        ) : (
                            <p className="mt-1 text-gray-800">{user.email}</p>
                        )}
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block font-medium text-gray-700">Phone</label>
                        {editMode ? (
                            <input
                                type="tel"
                                className="w-full mt-1 p-2 border rounded-md"
                                value={user.phone}
                                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                            />
                        ) : (
                            <p className="mt-1 text-gray-800">{user.phone}</p>
                        )}
                    </div>

                    {/* Address */}
                    <div className="md:col-span-2">
                        <label className="block font-medium text-gray-700">Address</label>
                        {editMode ? (
                            <input
                                type="text"
                                className="w-full mt-1 p-2 border rounded-md"
                                value={user.address}
                                onChange={(e) => setUser({ ...user, address: e.target.value })}
                            />
                        ) : (
                            <p className="mt-1 text-gray-800">{user.address}</p>
                        )}
                    </div>

                    {/* Country */}
                    <div>
                        <label className="block font-medium text-gray-700">Country</label>
                        {editMode ? (
                            <input
                                type="text"
                                className="w-full mt-1 p-2 border rounded-md"
                                value={user.country}
                                onChange={(e) => setUser({ ...user, country: e.target.value })}
                            />
                        ) : (
                            <p className="mt-1 text-gray-800">{user.country}</p>
                        )}
                    </div>

                    {/* State */}
                    <div>
                        <label className="block font-medium text-gray-700">State</label>
                        {editMode ? (
                            <input
                                type="text"
                                className="w-full mt-1 p-2 border rounded-md"
                                value={user.state}
                                onChange={(e) => setUser({ ...user, state: e.target.value })}
                            />
                        ) : (
                            <p className="mt-1 text-gray-800">{user.state}</p>
                        )}
                    </div>

                    {/* City */}
                    <div>
                        <label className="block font-medium text-gray-700">City</label>
                        {editMode ? (
                            <input
                                type="text"
                                className="w-full mt-1 p-2 border rounded-md"
                                value={user.city}
                                onChange={(e) => setUser({ ...user, city: e.target.value })}
                            />
                        ) : (
                            <p className="mt-1 text-gray-800">{user.city}</p>
                        )}
                    </div>

                    {/* Postal Code */}
                    <div>
                        <label className="block font-medium text-gray-700">Postal Code</label>
                        {editMode ? (
                            <input
                                type="text"
                                className="w-full mt-1 p-2 border rounded-md"
                                value={user.postalCode}
                                onChange={(e) => setUser({ ...user, postalCode: e.target.value })}
                            />
                        ) : (
                            <p className="mt-1 text-gray-800">{user.postalCode}</p>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-6">
                    {editMode ? (
                        <button
                            onClick={handleSave}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                            Save Changes
                        </button>
                    ) : (
                        <button
                            onClick={() => setEditMode(true)}
                            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            <Pencil className="w-4 h-4" /> Edit Profile
                        </button>
                    )}

                </div>

                {/* Danger Zone */}
                <div className="mt-10 border-t pt-4">
                    <h3 className="text-red-600 font-semibold mb-2">Danger Zone</h3>
                    <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                        <Trash2 className="w-4 h-4" /> Delete / Disable Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;

