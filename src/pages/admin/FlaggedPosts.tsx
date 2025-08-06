import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { getAllFlaggedReports } from '../../services/authService';
import type { FlaggedReportDTO } from '../../types/AuthTypes';
import AdminLayout from '../../components/Layout/AdminLayout';

const FlaggedPosts = () => {
    const [flaggedReports, setFlaggedReports] = useState<FlaggedReportDTO[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFlaggedReports = async () => {
            try {
                const result = await getAllFlaggedReports();
                setFlaggedReports(result);
            } catch (error) {
                console.error('Error fetching flagged reports:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFlaggedReports();
    }, []);

    return (
        <AdminLayout>
            <div className="min-h-screen p-6 flex flex-col gap-6 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
                <h1 className="text-3xl font-bold text-blue-700 dark:text-white flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6" /> Flagged Posts
                </h1>

                {loading ? (
                    <div className="text-center text-gray-500 dark:text-gray-400">Loading flagged posts...</div>
                ) : flaggedReports.length === 0 ? (
                    <div className="text-center text-gray-500 dark:text-gray-400">No flagged posts found.</div>
                ) : (
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {flaggedReports.map((flag) => (
                            <div
                                key={flag.reportId}
                                className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow border border-gray-200 dark:border-gray-700 space-y-2"
                            >
                                <div className="text-red-600 font-semibold">Reason: {flag.reason}</div>
                                <div className="text-gray-600 dark:text-gray-400 text-sm">Report ID: {flag.reportId}</div>
                                <div className="text-gray-800 dark:text-white font-bold">Flagged By: {flag.flaggedBy}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-300">
                                    Status:{' '}
                                    {flag.isReviewed ? (
                                        <span className="text-green-600 font-semibold flex items-center gap-1">
                                            <CheckCircle className="w-4 h-4" /> Reviewed
                                        </span>
                                    ) : (
                                        <span className="text-yellow-600 font-semibold">Pending Review</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                )}
            </div>
        </AdminLayout>
    );
};

export default FlaggedPosts;
