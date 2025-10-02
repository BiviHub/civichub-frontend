import { useState, useEffect } from 'react';
import {
    User,
    Bell,
    Shield,
    Lock,
    Eye,
    Globe,
    Palette,
    Trash2,
    SettingsIcon,
    Moon,
    Camera,
} from 'lucide-react';
import { useTheme } from '../../Context/useTheme';
import { useProfile } from '../../Context/ProfileContext';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const { profile, setProfile } = useProfile();
    const [editedProfile, setEditedProfile] = useState({ firstName: '', lastName: '', email: '', phoneNumber: '' });
    const { isDarkMode, toggleDarkMode } = useTheme();

    // Toggle states (unchanged for other tabs)
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [smsNotifications, setSmsNotifications] = useState(false);
    const [pushNotifications, setPushNotifications] = useState(false);
    const [twoFactorAuth, setTwoFactorAuth] = useState(false);
    const [followedUsers, setFollowedUsers] = useState(true);
    const [localPosts, setLocalPosts] = useState(false);
    const [generalActivity, setGeneralActivity] = useState(true);

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'privacy', label: 'Privacy', icon: Eye },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'appearance', label: 'Appearance', icon: Palette },
    ];

    const settingsBoxClass = 'bg-white/10 dark:bg-white/5 rounded-2xl p-6 border border-white/20 backdrop-blur-sm';

    interface ToggleSwitchProps {
        checked: boolean;
        onChange: (value: boolean) => void;
        label: string;
    }

    const ToggleSwitch = ({ checked, onChange, label }: ToggleSwitchProps) => (
        <div className="flex items-center justify-between">
            <span className="text-white/90">{label}</span>
            <button
                onClick={() => onChange(!checked)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    checked ? 'bg-green-500' : 'bg-white/30'
                }`}
            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        checked ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
            </button>
        </div>
    );

    // Sync editedProfile with profile from context
    useEffect(() => {
        console.log("Profile data in Settings:", profile); // Debug log
        if (profile) {
            setEditedProfile({
                firstName: profile.firstName || '',
                lastName: profile.lastName || '',
                email: profile.email || '',
                phoneNumber: profile.phoneNumber || '',
            });
        } else {
            console.warn("Profile is null or undefined. Ensure it’s loaded from context.");
        }
    }, [profile]);

    // Handle save changes for profile tab
    const handleSaveProfile = () => {
        if (profile) {
            const updatedProfile = {
                ...profile,
                firstName: editedProfile.firstName,
                lastName: editedProfile.lastName,
                email: editedProfile.email,
                phoneNumber: editedProfile.phoneNumber,
            };
            setProfile(updatedProfile);
            console.log("Profile saved:", updatedProfile);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 to-green-500 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8 text-white">
            <div className="max-w-7xl mx-auto relative">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-xl rounded-full mb-6 border border-white/30">
                        <SettingsIcon className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-5xl font-extrabold mb-3">Settings</h1>
                    <p className="text-white/80 text-lg">Manage your account preferences</p>
                </div>

                {/* Tabs */}
                <div className="bg-white/10 dark:bg-white/5 p-2 mb-8 border border-white/20 rounded-2xl backdrop-blur-xl">
                    <div className="flex flex-wrap gap-2">
                        {tabs.map(({ id, label, icon: Icon }) => (
                            <button
                                key={id}
                                onClick={() => setActiveTab(id)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                                    activeTab === id
                                        ? 'bg-white text-blue-600 dark:text-blue-500 shadow-lg scale-105'
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
                <div className="bg-white/15 dark:bg-white/10 p-8 rounded-3xl border border-white/20 backdrop-blur-xl">
                    {activeTab === 'profile' && (
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold mb-4">Profile</h2>

                            {/* Profile Picture Section */}
                            <div className={settingsBoxClass}>
                                <h3 className="text-lg font-semibold mb-4">Profile Picture</h3>
                                <div className="flex flex-col sm:flex-row items-center gap-6">
                                    <div className="relative">
                                        <div className="w-24 h-24 rounded-full bg-white/20 border-2 border-white/30 overflow-hidden flex items-center justify-center">
                                            <img
                                                src={profile?.profilePictureUrl || "https://i.pravatar.cc/300?img=45"}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    console.error("Image load error:", profile?.profilePictureUrl);
                                                    (e.target as HTMLImageElement).src = "https://i.pravatar.cc/300?img=45";
                                                }}
                                            />
                                        </div>
                                        <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white text-blue-600 dark:text-blue-500 rounded-full flex items-center justify-center border-2 border-blue-600 hover:bg-white/90 transition-colors">
                                            <Camera className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <p className="text-white/60 dark:text-white/50 text-sm mt-4">
                                    Recommended: Square image, at least 200x200 pixels
                                </p>
                            </div>

                            {/* Name Fields in One Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className={settingsBoxClass}>
                                    <h3 className="text-sm font-semibold mb-2">First Name</h3>
                                    <input
                                        type="text"
                                        value={editedProfile.firstName || 'Not available'}
                                        onChange={(e) => setEditedProfile({ ...editedProfile, firstName: e.target.value })}
                                        className="w-full bg-white/10 dark:bg-white/5 border border-white/20 p-3 rounded-xl text-white placeholder-white/50"
                                    />
                                </div>
                                <div className={settingsBoxClass}>
                                    <h3 className="text-sm font-semibold mb-2">Last Name</h3>
                                    <input
                                        type="text"
                                        value={editedProfile.lastName || 'Not available'}
                                        onChange={(e) => setEditedProfile({ ...editedProfile, lastName: e.target.value })}
                                        className="w-full bg-white/10 dark:bg-white/5 border border-white/20 p-3 rounded-xl text-white placeholder-white/50"
                                    />
                                </div>
                            </div>

                            {/* Email and Phone Number Fields in One Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className={settingsBoxClass}>
                                    <h3 className="text-sm font-semibold mb-2">Email Address</h3>
                                    <input
                                        type="email"
                                        value={editedProfile.email || 'Not available'}
                                        onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                                        className="w-full bg-white/10 dark:bg-white/5 border border-white/20 p-3 rounded-xl text-white placeholder-white/50"
                                    />
                                </div>
                                <div className={settingsBoxClass}>
                                    <h3 className="text-sm font-semibold mb-2">Phone Number</h3>
                                    <input
                                        type="tel"
                                        value={editedProfile.phoneNumber || 'Not available'}
                                        onChange={(e) => setEditedProfile({ ...editedProfile, phoneNumber: e.target.value })}
                                        className="w-full bg-white/10 dark:bg-white/5 border border-white/20 p-3 rounded-xl text-white placeholder-white/50"
                                    />
                                </div>
                            </div>

                            {/* Save Button */}
                            <div className="text-right">
                                <button
                                    onClick={handleSaveProfile}
                                    className="px-6 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors"
                                >
                                    Save Changes
                                </button>
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
                                <button className="bg-white text-blue-600 dark:text-blue-500 px-4 py-2 rounded-xl font-semibold hover:bg-white/90">
                                    Change Password
                                </button>
                            </div>

                            <div className={settingsBoxClass}>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        <Shield className="w-6 h-6" />
                                        <div>
                                            <h3 className="text-xl font-semibold">Two-Factor Authentication</h3>
                                            <p className="text-white/70">Add extra security to your account with 2FA.</p>
                                        </div>
                                    </div>
                                    <ToggleSwitch
                                        checked={twoFactorAuth}
                                        onChange={setTwoFactorAuth}
                                        label=""
                                    />
                                </div>
                            </div>

                            <div className={settingsBoxClass}>
                                <div className="flex items-center gap-4 mb-3">
                                    <Globe className="w-6 h-6" />
                                    <h3 className="text-xl font-semibold">Active Sessions</h3>
                                </div>
                                <p className="text-white/70 mb-4">Review devices currently signed in to your account.</p>
                                <button className="bg-white text-blue-600 dark:text-blue-500 px-4 py-2 rounded-xl font-semibold hover:bg-white/90">
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
                                <select className="w-full bg-white dark:bg-white border border-white/20 p-3 rounded-xl text-black dark:text-black">
                                    <option value="public" className="bg-white text-black">Public</option>
                                    <option value="private" className="bg-white text-black">Private</option>
                                    <option value="friends" className="bg-white text-black">Friends Only</option>
                                </select>
                            </div>

                            <div className={settingsBoxClass}>
                                <h3 className="text-lg font-semibold mb-2">Download My Data</h3>
                                <p className="text-white/70 mb-4">You can request a copy of your data.</p>
                                <button className="bg-white text-blue-600 dark:text-blue-500 px-4 py-2 rounded-xl font-semibold hover:bg-white/90">
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
                                <ToggleSwitch
                                    checked={emailNotifications}
                                    onChange={setEmailNotifications}
                                    label="Email Notifications"
                                />
                                <p className="text-white/60 dark:text-white/50 text-sm mt-2">Receive emails for updates</p>
                            </div>

                            <div className={settingsBoxClass}>
                                <ToggleSwitch
                                    checked={smsNotifications}
                                    onChange={setSmsNotifications}
                                    label="SMS Notifications"
                                />
                                <p className="text-white/60 dark:text-white/50 text-sm mt-2">Receive SMS for important alerts</p>
                            </div>

                            <div className={settingsBoxClass}>
                                <ToggleSwitch
                                    checked={pushNotifications}
                                    onChange={setPushNotifications}
                                    label="Push Notifications"
                                />
                                <p className="text-white/60 dark:text-white/50 text-sm mt-2">Enable app notifications</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                                <div className="bg-white/10 dark:bg-white/5 rounded-xl p-4 flex items-center justify-between border border-white/20">
                                    <span className="text-white/80 text-sm">Get updates from people you follow</span>
                                    <ToggleSwitch
                                        checked={followedUsers}
                                        onChange={setFollowedUsers}
                                        label=""
                                    />
                                </div>
                                <div className="bg-white/10 dark:bg-white/5 rounded-xl p-4 flex items-center justify-between border border-white/20">
                                    <span className="text-white/80 text-sm">Get alerts from nearby users</span>
                                    <ToggleSwitch
                                        checked={localPosts}
                                        onChange={setLocalPosts}
                                        label=""
                                    />
                                </div>
                                <div className="bg-white/10 dark:bg-white/5 rounded-xl p-4 flex items-center justify-between border border-white/20">
                                    <span className="text-white/80 text-sm">Get notified of general site activity</span>
                                    <ToggleSwitch
                                        checked={generalActivity}
                                        onChange={setGeneralActivity}
                                        label=""
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'appearance' && (
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold mb-4">Appearance</h2>

                            <div className={settingsBoxClass}>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <Moon className="w-4 h-4" />
                                        <h3 className="text-lg font-semibold">Dark Mode</h3>
                                    </div>
                                    <ToggleSwitch
                                        checked={isDarkMode}
                                        onChange={toggleDarkMode}
                                        label=""
                                    />
                                </div>
                                <p className="text-white/60 dark:text-white/50 text-sm">Enable dark mode interface</p>
                            </div>

                            <div className={settingsBoxClass}>
                                <h3 className="text-lg font-semibold mb-2">Theme Color</h3>
                                <select className="w-full bg-white dark:bg-white border border-white/20 p-3 rounded-xl text-black dark:text-black">
                                    <option value="default" className="bg-white text-black">Default</option>
                                    <option value="ocean" className="bg-white text-black">Ocean Blue</option>
                                    <option value="emerald" className="bg-white text-black">Dark Emerald</option>
                                </select>
                            </div>

                            <div className={settingsBoxClass}>
                                <h3 className="text-lg font-semibold mb-2 text-red-300 flex items-center gap-2">
                                    <Trash2 className="w-4 h-4" />
                                    Deactivate / Delete Account
                                </h3>
                                <p className="text-white/70 mb-4">Deleting your account is permanent and cannot be undone.</p>
                                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-semibold">
                                    Delete Account
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Buttons (unchanged) */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
                    <button className="px-4 py-2 text-white border border-white/30 rounded-xl bg-transparent hover:bg-white/10 transition">
                        Cancel
                    </button>
                    <button className="px-4 py-2 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;