import { useState } from "react";
import { X, AlertTriangle, Upload, Image, Video, FileText, Send } from "lucide-react";
import { useTheme } from "../../Context/useTheme";

const ReportIssue = () => {
    useTheme();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 to-green-500 dark:from-gray-900 dark:to-black flex items-center justify-center p-4">
            {/* Trigger Button */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-green-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
                <AlertTriangle className="w-5 h-5" />
                Report Issue
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Background Overlay */}
                    <div
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                        onClick={() => setIsModalOpen(false)}
                    ></div>

                    {/* Modal Content */}
                    <div
                        className="relative z-10 w-full max-w-2xl bg-white/10 dark:bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 dark:border-white/10 overflow-hidden animate-fadeInScale"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600/20 dark:from-gray-800/20 to-green-500/20 dark:to-black/20 p-4 border-b border-white/10 dark:border-white/5">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-500 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center shadow-lg">
                                        <AlertTriangle className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-white">Report an Issue</h2>
                                        <p className="text-white/70 dark:text-white/50 text-xs">Help us improve by reporting problems</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="w-8 h-8 bg-white/10 dark:bg-white/5 hover:bg-blue-600/20 dark:hover:bg-gray-700/20 rounded-full flex items-center justify-center border border-white/20 dark:border-white/10 hover:border-blue-600/30 dark:hover:border-gray-500/30 transition-all duration-300 group"
                                >
                                    <X className="w-4 h-4 text-white/70 dark:text-white/50 group-hover:text-blue-400 dark:group-hover:text-gray-300 transition-colors" />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-4 space-y-4">
                            {/* Description Field */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-white dark:text-white font-semibold text-base">
                                    <FileText className="w-4 h-4" />
                                    Describe the Issue
                                </label>
                                <textarea
                                    rows={3}
                                    className="w-full px-3 py-2 bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-xl text-white dark:text-white placeholder-white/50 dark:placeholder-white/30 focus:border-white/40 dark:focus:border-white/20 focus:bg-white/15 dark:focus:bg-white/10 focus:ring-2 focus:ring-white/20 dark:focus:ring-white/10 transition-all duration-300 outline-none resize-none"
                                    placeholder="Briefly describe the issue..."
                                />
                                <p className="text-white/60 dark:text-white/40 text-xs">
                                    0/500 characters
                                </p>
                            </div>

                            {/* File Upload Area */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-white dark:text-white font-semibold text-base">
                                    <Upload className="w-4 h-4" />
                                    Attach Files (Optional)
                                </label>
                                <div
                                    className="border-2 border-dashed rounded-xl p-4 transition-all duration-300 bg-white/5 dark:bg-white/5 border-white/30 dark:border-white/10 hover:bg-white/10 dark:hover:bg-white/10"
                                >
                                    <div className="text-center space-y-2">
                                        <div className="flex justify-center gap-2">
                                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-500 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center">
                                                <Image className="w-4 h-4 text-white" />
                                            </div>
                                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-500 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center">
                                                <Video className="w-4 h-4 text-white" />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-white font-medium text-base">
                                                Drop files here or click to browse
                                            </p>
                                            <p className="text-white/60 dark:text-white/40 text-xs mt-1">
                                                Support images and videos (PNG, JPG, MP4, etc.)
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="bg-gradient-to-r from-white/5 dark:from-gray-900/5 to-white/10 dark:to-gray-900/10 p-4 border-t border-white/10 dark:border-white/5">
                            <div className="flex justify-end gap-2">
                                <button
                                    className="px-4 py-2 text-white dark:text-white border border-white/30 dark:border-white/10 rounded-xl bg-white/5 dark:bg-white/5 hover:bg-white/10 dark:hover:bg-white/10 transition-all duration-300 font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-green-500 dark:from-gray-700 dark:to-gray-800 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-green-600 dark:hover:from-gray-600 dark:hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-1"
                                >
                                    <Send className="w-3 h-3" />
                                    Submit Report
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReportIssue;