// src/pages/ManageReports.tsx
import { useEffect, useState } from "react";
import type { ReportDTO } from "../../types/AuthTypes";
import { getAllReports } from "../../services/authService";
import { ImageIcon, MapPin, MessagesSquare, ThumbsUp, Search, Trash2, Eye } from "lucide-react";
import { motion } from "framer-motion";
import AdminLayout from "../../components/Layout/AdminLayout";

const ManageReports = () => {
    const [reports, setReports] = useState<ReportDTO[]>([]);
    const [filteredReports, setFilteredReports] = useState<ReportDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const apiBase = (import.meta.env.VITE_API_URL as string | undefined) ?? window.location.origin;
    const baseNoSlash = apiBase.replace(/\/+$/, "");

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await getAllReports();
                const sortedReports = Array.isArray(response) ? response.sort((a: ReportDTO, b: ReportDTO) => {
                    return new Date(b.dateCreated ?? 0).getTime() - new Date(a.dateCreated ?? 0).getTime();
                }) : [];
                setReports(sortedReports);
                setFilteredReports(sortedReports);
            } catch (error) {
                console.error("Failed to fetch reports:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchReports();
    }, []);

    useEffect(() => {
        const lowerQuery = searchQuery.toLowerCase();
        const filtered = reports.filter(report =>
            (report.citizenName ?? "").toLowerCase().includes(lowerQuery) ||
            (report.description ?? "").toLowerCase().includes(lowerQuery) ||
            (report.location ?? "").toLowerCase().includes(lowerQuery)
        );
        setFilteredReports(filtered);
    }, [searchQuery, reports]);

    const buildSrc = (raw?: string) => {
        if (!raw) return "";
        if (/^https?:\/\//i.test(raw)) return raw;
        const path = raw.replace(/^\/+/, "");
        return `${baseNoSlash}/${path}`;
    };

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return "Unknown";
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const handleDelete = (id: string) => {
        // Placeholder for delete functionality
        console.log(`Delete report ${id}`);
        // In real implementation: call delete service and refresh reports
    };

    return (
        <AdminLayout>
            <div className="flex flex-col gap-6 min-h-screen p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Manage Reports</h1>
                    {!loading && (
                        <p className="text-lg font-medium text-gray-600 dark:text-gray-300">Total: {filteredReports.length}</p>
                    )}
                </div>

                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by name, description, or location..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-3 pl-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                </div>

                {loading ? (
                    <p className="text-gray-600 dark:text-gray-300">Loading reports...</p>
                ) : filteredReports.length === 0 ? (
                    <p className="text-gray-600 dark:text-gray-300">No reports found.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredReports.map(report => (
                            <motion.div
                                key={report.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{report.citizenName ?? 'Unknown User'}</h2>
                                    <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">ID: {report.id}</span>
                                </div>

                                <p className="text-gray-600 dark:text-gray-300 mb-1 flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-blue-500" />
                                    {report.location ?? 'Not specified'}
                                </p>

                                <p className="text-gray-700 dark:text-gray-300 mb-3 line-clamp-3">{report.description}</p>

                                <div className="mb-3">
                                    <h3 className="font-medium text-gray-800 dark:text-gray-100 mb-1 flex items-center gap-2">
                                        <ImageIcon className="w-4 h-4 text-green-500" /> Photos ({report.photos?.length ?? 0})
                                    </h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {report.photos && report.photos.length > 0 ? (
                                            report.photos.slice(0, 4).map(photo => {
                                                const src = buildSrc(photo.photoUrl);
                                                return (
                                                    <a
                                                        key={photo.id}
                                                        href={src}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="block relative"
                                                    >
                                                        <img
                                                            src={src}
                                                            alt="Report photo"
                                                            className="w-full h-20 object-cover rounded-lg border border-gray-300 dark:border-gray-600 hover:opacity-90 transition-opacity duration-200"
                                                            onError={(e) => {
                                                                console.warn('Image load failed', { src, photo, reportId: report.id });
                                                                (e.currentTarget as HTMLImageElement).style.display = 'none';
                                                            }}
                                                        />
                                                    </a>
                                                );
                                            })
                                        ) : (
                                            <p className="text-sm text-gray-500 dark:text-gray-400 col-span-2">No photos attached.</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 mt-4 text-sm text-gray-600 dark:text-gray-300">
                                    <div className="flex items-center gap-1"><MessagesSquare className="w-4 h-4" /> {(report.comments ?? []).length}</div>
                                    <div className="flex items-center gap-1"><ThumbsUp className="w-4 h-4" /> {(report.reactions ?? []).length}</div>
                                </div>

                                <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">Posted on {formatDate(report.dateCreated)}</p>

                                <div className="mt-4 flex justify-end gap-2">
                                    <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                                        <Eye className="w-4 h-4" /> View
                                    </button>
                                    <button
                                        onClick={() => handleDelete(report.citizenId)}
                                        className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" /> Delete
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default ManageReports;