import { Plus, Trash2, Pencil } from 'lucide-react';
import AdminLayout from '../../components/Layout/AdminLayout';

const categories = ['Infrastructure', 'Security', 'Health', 'Utilities'];
const staticPages = ['About CivicHub', 'Terms of Service', 'Privacy Policy'];

const ContentManagement = () => {
    return (
        <AdminLayout>
            <div className="min-h-screen p-6 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
                <h1 className="text-2xl font-bold text-blue-700 dark:text-white mb-6">Content Management</h1>

                {/* Report Categories Section */}
                <section className="mb-10">
                    <h2 className="text-xl font-semibold mb-4">Report Categories</h2>
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-3">
                        {categories.map((cat, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-2 last:border-b-0"
                            >
                                <span className="text-gray-700 dark:text-gray-300">{cat}</span>
                                <div className="flex gap-2">
                                    <button className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400">
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                    <button className="text-red-600 hover:text-red-800 dark:hover:text-red-400">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button className="mt-4 text-sm flex items-center text-blue-600 dark:text-blue-400 hover:underline">
                            <Plus className="w-4 h-4 mr-1" />
                            Add Category
                        </button>
                    </div>
                </section>

                {/* Static Pages Section */}
                <section>
                    <h2 className="text-xl font-semibold mb-4">Static Pages</h2>
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-3">
                        {staticPages.map((page, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-2 last:border-b-0"
                            >
                                <span className="text-gray-700 dark:text-gray-300">{page}</span>
                                <div className="flex gap-2">
                                    <button className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400">
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button className="mt-4 text-sm flex items-center text-blue-600 dark:text-blue-400 hover:underline">
                            <Plus className="w-4 h-4 mr-1" />
                            Add Page
                        </button>
                    </div>
                </section>
            </div>
        </AdminLayout>
    );
};

export default ContentManagement;
