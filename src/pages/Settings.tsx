import { useState } from 'react';
import { Lock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Settings = () => {
    const [notifications, setNotifications] = useState(true);
    const [privacy, setPrivacy] = useState('public');

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6 space-y-8">
                <h2 className="text-2xl font-bold text-blue-700">Account Settings</h2>

                {/* Password */}
                <div className="space-y-1">
                    <h3 className="font-semibold text-gray-800">Password</h3>
                    <p className="text-sm text-gray-600">Last changed: 03 Jan 2024</p>
                    <Link
                        to="/reset-password"
                        className="mt-2 flex items-center gap-2 text-sm text-blue-600 hover:underline"
                    >
                        <Lock className="w-4 h-4" />
                        Change Password
                    </Link>

                </div>

                {/* Two-Factor Authentication */}
                <div className="space-y-1">
                    <h3 className="font-semibold text-gray-800">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-600">Receive login codes via SMS or email.</p>
                    <Link to="/two-factor-settings" className="text-sm text-blue-600 hover:underline">
                        Manage 2FA
                    </Link>
                </div>

                {/* Google Auth */}
                <div className="space-y-1">
                    <h3 className="font-semibold text-gray-800">Google Authentication</h3>
                    <p className="text-sm text-gray-600">Connected</p>
                    <button className="text-sm text-red-600 hover:underline">Disconnect Google</button>
                </div>

                {/* Phone Verification */}
                <div className="space-y-1">
                    <h3 className="font-semibold text-gray-800">Phone Number</h3>
                    <div className="flex items-center gap-2 text-green-600 text-sm">
                        <CheckCircle className="w-4 h-4" />
                        Verified: +99264710583
                    </div>
                </div>

                {/* Email Verification */}
                <div className="space-y-1">
                    <h3 className="font-semibold text-gray-800">Email Address</h3>
                    <div className="flex items-center gap-2 text-green-600 text-sm">
                        <CheckCircle className="w-4 h-4" />
                        Verified: info@example.com
                    </div>
                </div>

                {/* Notifications */}
                <div className="space-y-1">
                    <label className="block font-medium text-gray-800">Email Notifications</label>
                    <label className="inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={notifications}
                            onChange={() => setNotifications(!notifications)}
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-green-500 relative transition-all">
                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md peer-checked:translate-x-full transition-transform" />
                        </div>
                        <span className="ml-3 text-gray-700">{notifications ? 'Enabled' : 'Disabled'}</span>
                    </label>
                </div>

                {/* Privacy */}
                <div className="space-y-1">
                    <label className="block font-medium text-gray-800">Privacy</label>
                    <select
                        className="w-full p-2 border rounded-md"
                        value={privacy}
                        onChange={(e) => setPrivacy(e.target.value)}
                    >
                        <option value="public">Public Profile</option>
                        <option value="private">Private Profile</option>
                    </select>
                </div>

                {/* Save */}
                <div className="pt-4 border-t mt-4">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;

