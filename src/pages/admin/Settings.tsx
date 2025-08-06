import { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import AdminLayout from '../../components/Layout/AdminLayout';

const Settings = () => {
    const [autoApprove, setAutoApprove] = useState(false);
    const [limitDaily, setLimitDaily] = useState(true);
    const [editWindow, setEditWindow] = useState(30);
    const [darkMode, setDarkMode] = useState(false);

    return (
        <AdminLayout>
            <div className="flex bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 min-h-screen text-gray-900 dark:text-white">
                <main className="w-full p-6">
                    <h1 className="text-2xl font-bold text-blue-700 dark:text-white mb-6">Settings</h1>

                    {/* Moderation */}
                    <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-8 border border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-semibold mb-4">Moderation</h2>
                        <div className="space-y-4">
                            <label className="flex items-center justify-between">
                                <span>Auto-approve Reports</span>
                                <input
                                    type="checkbox"
                                    checked={autoApprove}
                                    onChange={() => setAutoApprove(!autoApprove)}
                                    className="toggle toggle-primary"
                                />
                            </label>
                            <label className="flex items-center justify-between">
                                <span>Limit Daily Reports per User</span>
                                <input
                                    type="checkbox"
                                    checked={limitDaily}
                                    onChange={() => setLimitDaily(!limitDaily)}
                                    className="toggle toggle-primary"
                                />
                            </label>
                            <div className="flex items-center justify-between">
                                <span>Post Edit Window (minutes)</span>
                                <input
                                    type="number"
                                    min={0}
                                    value={editWindow}
                                    onChange={(e) => setEditWindow(Number(e.target.value))}
                                    className="w-20 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Appearance */}
                    <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-8 border border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-semibold mb-4">Appearance</h2>
                        <label className="flex items-center justify-between">
                            <span>Dark Mode</span>
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-green-600 text-white text-sm"
                            >
                                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                                {darkMode ? 'Light Mode' : 'Dark Mode'}
                            </button>
                        </label>
                    </section>

                    {/* Notifications */}
                    <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-semibold mb-4">Notifications</h2>
                        <div className="space-y-4">
                            <label className="flex items-center justify-between">
                                <span>Notify on New Reports</span>
                                <input type="checkbox" className="toggle toggle-primary" />
                            </label>
                            <label className="flex items-center justify-between">
                                <span>Alert on Flagged Posts</span>
                                <input type="checkbox" className="toggle toggle-primary" />
                            </label>
                        </div>
                    </section>
                </main>
            </div>
        </AdminLayout>
    );
};

export default Settings;
