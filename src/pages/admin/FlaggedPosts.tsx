import { useEffect, useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { getAllFlaggedReports } from '../../services/authService';
import type {FlaggedReportDTO} from "../../types/AuthTypes.ts";


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
        <div className="flex bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
            <AdminSidebar />
            <main className="ml-64 p-6 w-full">
                <h1 className="text-2xl font-bold text-red-600 mb-6 flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6" /> Flagged Posts
                </h1>

                {loading ? (
                    <div className="text-center text-gray-500">Loading flagged posts...</div>
                ) : flaggedReports.length === 0 ? (
                    <div className="text-center text-gray-500">No flagged posts found.</div>
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
                                className="bg-white p-4 rounded-xl shadow-md border border-gray-100 space-y-2"
                            >
                                <div className="text-red-600 font-semibold">Reason: {flag.reason}</div>
                                <div className="text-gray-600 text-sm">Report ID: {flag.reportId}</div>
                                <div className="text-gray-800 font-bold">Flagged By: {flag.flaggedBy}</div>
                                <div className="text-sm text-gray-500">
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
            </main>
        </div>
    );
};

export default FlaggedPosts;

