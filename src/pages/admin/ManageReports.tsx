import { useEffect, useState } from 'react';
import type {ReportDTO} from '../../types/AuthTypes';
import { getAllReports } from '../../services/authService';
import { ImageIcon, MapPin, MessagesSquare, ThumbsUp } from 'lucide-react';
import { motion } from 'framer-motion';

const ManageReports = () => {
    const [reports, setReports] = useState<ReportDTO[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await getAllReports();
                setReports(response);
            } catch (error) {
                console.error('Failed to fetch reports:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchReports();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-blue-700">Manage All Reports</h1>

            {loading ? (
                <p className="text-gray-500">Loading reports...</p>
            ) : reports.length === 0 ? (
                <p className="text-gray-500">No reports found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {reports.map((report) => (
                        <motion.div
                            key={report.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-xl shadow-md p-6 border border-gray-200"
                        >
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">{report.citizenName || 'Unknown User'}</h2>
                            <p className="text-gray-600 mb-1 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-blue-500" />
                                {report.location || 'Not specified'}
                            </p>
                            <p className="text-gray-700 mb-3">{report.description}</p>

                            <div className="mb-3">
                                <h3 className="font-medium text-gray-800 mb-1 flex items-center gap-2">
                                    <ImageIcon className="w-4 h-4 text-green-500" /> Photos
                                </h3>
                                <div className="flex gap-2 overflow-x-auto">
                                    {report.photos.length > 0 ? (
                                        report.photos.map((photo) => (
                                            <img
                                                key={photo.id}
                                                src={photo.photoUrl}
                                                alt="Report"
                                                className="w-24 h-24 object-cover rounded-lg border"
                                            />
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-500">No photos attached.</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                    <MessagesSquare className="w-4 h-4" />
                                    {report.comments.length} Comments
                                </div>
                                <div className="flex items-center gap-1">
                                    <ThumbsUp className="w-4 h-4" />
                                    {report.reactions.length} Reactions
                                </div>
                            </div>

                            <p className="mt-4 text-xs text-gray-400">Posted on {new Date(report.dateCreated).toLocaleString()}</p>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageReports;




