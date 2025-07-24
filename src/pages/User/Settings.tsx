import { useState } from 'react';
import {
    User,
    Bell,
    Shield,
    Lock,
    Eye,
    Globe,
    Palette,
    Trash2,
    Moon,
    Settings as SettingsIcon,
} from 'lucide-react';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('profile');

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'privacy', label: 'Privacy', icon: Eye },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'appearance', label: 'Appearance', icon: Palette },
    ];

    const settingsBoxClass =
        'bg-white/10 rounded-2xl p-6 border border-white/20 backdrop-blur-sm';

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 to-green-500 p-4 md:p-8 text-white">
            <div className="max-w-7xl mx-auto relative">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-xl rounded-full mb-6 border border-white/30">
                        <SettingsIcon className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-5xl font-extrabold mb-3">Settings</h1>
                    <p className="text-white/80 text-lg">Manage your account preferences</p>
                </div>

                {/* Tabs */}
                <div className="bg-white/10 p-2 mb-8 border border-white/20 rounded-2xl backdrop-blur-xl">
                    <div className="flex flex-wrap gap-2">
                        {tabs.map(({ id, label, icon: Icon }) => (
                            <button
                                key={id}
                                onClick={() => setActiveTab(id)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                                    activeTab === id
                                        ? 'bg-white text-blue-600 shadow-lg scale-105'
                                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                <Icon className="w-4 h-4" />
                                <span className="hidden sm:inline">{label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="bg-white/15 p-8 rounded-3xl border border-white/20 backdrop-blur-xl">
                    {activeTab === 'profile' && (
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold mb-4">Profile</h2>

                            <div className={settingsBoxClass}>
                                <h3 className="text-lg font-semibold mb-2">Full Name</h3>
                                <input
                                    type="text"
                                    defaultValue="John Doe"
                                    className="w-full bg-white/10 border border-white/20 p-3 rounded-xl text-white"
                                />
                            </div>

                            <div className={settingsBoxClass}>
                                <h3 className="text-lg font-semibold mb-2">Email Address</h3>
                                <input
                                    type="email"
                                    defaultValue="john@example.com"
                                    className="w-full bg-white/10 border border-white/20 p-3 rounded-xl text-white"
                                />
                            </div>

                            <div className={settingsBoxClass}>
                                <h3 className="text-lg font-semibold mb-2">Username</h3>
                                <input
                                    type="text"
                                    defaultValue="johndoe"
                                    className="w-full bg-white/10 border border-white/20 p-3 rounded-xl text-white"
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold mb-4">Security Settings</h2>

                            <div className={settingsBoxClass}>
                                <div className="flex items-center gap-4 mb-3">
                                    <Lock className="w-6 h-6" />
                                    <h3 className="text-xl font-semibold">Change Password</h3>
                                </div>
                                <p className="text-white/70 mb-4">Update your account password securely.</p>
                                <button className="bg-white text-blue-600 px-4 py-2 rounded-xl font-semibold hover:bg-white/90">
                                    Change Password
                                </button>
                            </div>

                            <div className={settingsBoxClass}>
                                <div className="flex items-center gap-4 mb-3">
                                    <Shield className="w-6 h-6" />
                                    <h3 className="text-xl font-semibold">Two-Factor Authentication</h3>
                                </div>
                                <p className="text-white/70 mb-4">Add extra security to your account with 2FA.</p>
                                <button className="bg-white text-blue-600 px-4 py-2 rounded-xl font-semibold hover:bg-white/90">
                                    Enable 2FA
                                </button>
                            </div>

                            <div className={settingsBoxClass}>
                                <div className="flex items-center gap-4 mb-3">
                                    <Globe className="w-6 h-6" />
                                    <h3 className="text-xl font-semibold">Active Sessions</h3>
                                </div>
                                <p className="text-white/70 mb-4">Review devices currently signed in to your account.</p>
                                <button className="bg-white text-blue-600 px-4 py-2 rounded-xl font-semibold hover:bg-white/90">
                                    View Sessions
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'privacy' && (
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold mb-4">Privacy Settings</h2>

                            <div className={settingsBoxClass}>
                                <h3 className="text-lg font-semibold mb-2">Account Visibility</h3>
                                <p className="text-white/70 mb-4">Set your profile to public or private.</p>
                                <select className="w-full bg-white/10 border border-white/20 p-3 rounded-xl text-white">
                                    <option>Public</option>
                                    <option>Private</option>
                                    <option>Friends Only</option>
                                </select>
                            </div>

                            <div className={settingsBoxClass}>
                                <h3 className="text-lg font-semibold mb-2">Download My Data</h3>
                                <p className="text-white/70 mb-4">You can request a copy of your data.</p>
                                <button className="bg-white text-blue-600 px-4 py-2 rounded-xl font-semibold hover:bg-white/90">
                                    Request Download
                                </button>
                            </div>

                            <div className={settingsBoxClass}>
                                <h3 className="text-lg font-semibold mb-2">Blocked Users</h3>
                                <p className="text-white/70">Manage who you've blocked from contacting you.</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold mb-4">Notification Settings</h2>

                            <div className={settingsBoxClass}>
                                <h3 className="text-lg font-semibold mb-2">Email Notifications</h3>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" defaultChecked className="accent-blue-600 w-4 h-4" />
                                    Receive emails for updates
                                </label>
                            </div>

                            <div className={settingsBoxClass}>
                                <h3 className="text-lg font-semibold mb-2">SMS Notifications</h3>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" className="accent-blue-600 w-4 h-4" />
                                    Receive SMS for important alerts
                                </label>
                            </div>

                            <div className={settingsBoxClass}>
                                <h3 className="text-lg font-semibold mb-2">Push Notifications</h3>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" className="accent-blue-600 w-4 h-4" />
                                    Enable app notifications
                                </label>
                            </div>
                        </div>
                    )}

                    {activeTab === 'appearance' && (
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold mb-4">Appearance</h2>

                            <div className={settingsBoxClass}>
                                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                    <Moon className="w-4 h-4" />
                                    Dark Mode
                                </h3>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" defaultChecked className="accent-blue-600 w-4 h-4" />
                                    Enable dark mode
                                </label>
                            </div>

                            <div className={settingsBoxClass}>
                                <h3 className="text-lg font-semibold mb-2">Theme Color</h3>
                                <select className="w-full bg-white/10 border border-white/20 p-3 rounded-xl text-white">
                                    <option>Default</option>
                                    <option>Ocean Blue</option>
                                    <option>Dark Emerald</option>
                                </select>
                            </div>

                            <div className={settingsBoxClass}>
                                <h3 className="text-lg font-semibold mb-2 text-red-300 flex items-center gap-2">
                                    <Trash2 className="w-4 h-4" />
                                    Deactivate / Delete Account
                                </h3>
                                <p className="text-white/70 mb-4">
                                    Deleting your account is permanent and cannot be undone.
                                </p>
                                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-semibold">
                                    Delete Account
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-center gap-4 mt-10">
                    <button className="px-8 py-4 bg-white/20 border border-white/30 rounded-2xl hover:bg-white/30 transition-all">
                        Cancel
                    </button>
                    <button className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-semibold hover:bg-white/90 shadow-lg">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
