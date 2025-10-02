import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, Flag, Share2, MessageCircle, ArrowLeft, ArrowRight, ImageIcon, Edit, Trash, MoreHorizontal, Twitter, Smartphone, Link, Facebook, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { getAllReports, toggleReaction, flagReport, editReport, deleteReport, getAllUsers } from "../../services/authService";
import type { ReportDTO, ReportPhoto, ReportComment, AddReactionDTO, FlagReportDTO, EditReportDTO } from "../../types/AuthTypes";
import { toAbsolute } from "../../utils/url";

const MySwal = withReactContent(Swal);

function AvatarSmall({ name, photoUrl }: { name?: string; photoUrl?: string }) {
    const initial = name?.trim()?.[0]?.toUpperCase() ?? "?";
    if (photoUrl) {
        return (
            <img
                src={toAbsolute(photoUrl)}
                alt={name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-300 dark:ring-gray-600"
            />
        );
    }
    return (
        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-indigo-500 text-white font-semibold text-lg">
            {initial}
        </div>
    );
}

const isImageUrl = (url?: string) =>
    !!url && /\.(jpe?g|png|gif|webp|bmp|svg)(\?|$)/i.test(url.split("?")[0]);

const isVideoUrl = (url?: string) =>
    !!url && /\.(mp4|webm|ogg|mov)(\?|$)/i.test(url.split("?")[0]);

function Lightbox({
                      open,
                      items,
                      index,
                      onClose,
                      onPrev,
                      onNext,
                  }: {
    open: boolean;
    items: ReportPhoto[];
    index: number;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
}) {
    const [mediaError, setMediaError] = useState(false);
    const [exists, setExists] = useState<boolean | null>(null);

    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") onPrev();
            if (e.key === "ArrowRight") onNext();
        }
        if (open) window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose, onPrev, onNext]);

    useEffect(() => {
        setMediaError(false);
        setExists(null);
        if (!open) return;

        const item = items[index];
        if (!item) {
            setExists(false);
            return;
        }
        const url = toAbsolute(item.photoUrl);
        let cancelled = false;

        (async function probe() {
            try {
                let r = await fetch(url, { method: "HEAD" });
                if (!r.ok) {
                    r = await fetch(url, { method: "GET", headers: { Range: "bytes=0-0" } });
                }
                if (!cancelled) setExists(r.ok);
            } catch (err) {
                console.debug("lightbox probe failed for", url, err);
                if (!cancelled) setExists(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [open, index, items]);

    if (!open) return null;
    const item = items[index] ?? null;
    const url = item ? toAbsolute(item.photoUrl) : "";

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <div className="relative w-full max-w-4xl max-h-[90vh]">
                    <button
                        aria-label="close"
                        onClick={onClose}
                        className="absolute top-4 right-4 z-20 bg-gray-800/70 hover:bg-gray-800/90 rounded-full p-3 text-white transition"
                    >
                        <X size={24} />
                    </button>

                    <div className="flex items-center gap-6">
                        <button
                            onClick={onPrev}
                            className="hidden sm:flex items-center justify-center h-14 w-14 bg-gray-800/70 hover:bg-gray-800/90 rounded-full text-white transition"
                            aria-label="previous"
                        >
                            <ArrowLeft size={24} />
                        </button>

                        <div className="bg-gray-900 p-3 rounded-xl shadow-2xl max-h-[85vh] overflow-hidden flex items-center justify-center">
                            {isImageUrl(url) ? (
                                <img
                                    src={url}
                                    alt="lightbox"
                                    className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
                                />
                            ) : isVideoUrl(url) ? (
                                exists === false || mediaError ? (
                                    <div className="w-[800px] h-[450px] flex items-center justify-center text-gray-400">
                                        <ImageIcon size={40} />
                                    </div>
                                ) : (
                                    <video
                                        src={url}
                                        controls
                                        className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
                                        onError={() => setMediaError(true)}
                                    />
                                )
                            ) : (
                                <div className="w-[800px] h-[450px] flex items-center justify-center text-gray-400">
                                    <ImageIcon size={40} />
                                </div>
                            )}
                        </div>

                        <button
                            onClick={onNext}
                            className="hidden sm:flex items-center justify-center h-14 w-14 bg-gray-800/70 hover:bg-gray-800/90 rounded-full text-white transition"
                            aria-label="next"
                        >
                            <ArrowRight size={24} />
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

function FlagModal({
                       open,
                       onClose,
                       onSubmit,
                       reportId,
                   }: {
    open: boolean;
    onClose: () => void;
    onSubmit: (reason: string) => Promise<void>;
    reportId: number | null;
}) {
    const [reason, setReason] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!open) setReason("");
    }, [open]);

    if (!open) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700"
                    initial={{ y: 20, scale: 0.95 }}
                    animate={{ y: 0, scale: 1 }}
                    exit={{ y: 20, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">Flag Report</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">Please explain why this report needs review.</p>

                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        rows={5}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 transition mb-4"
                        placeholder="Explain why you're flagging this report..."
                    />

                    <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500 dark:text-gray-400">Report ID: {reportId ?? "-"}</div>
                        <div className="flex gap-4">
                            <button
                                onClick={onClose}
                                className="px-5 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={async () => {
                                    if (!reason.trim()) {
                                        MySwal.fire({
                                            title: "Missing Reason",
                                            text: "Please provide a reason for flagging.",
                                            icon: "warning",
                                            confirmButtonColor: "#4f46e5",
                                            background: document.documentElement.classList.contains("dark") ? "#1f2937" : "#ffffff",
                                            color: document.documentElement.classList.contains("dark") ? "#e5e7eb" : "#111827",
                                        });
                                        return;
                                    }
                                    setLoading(true);
                                    try {
                                        await onSubmit(reason.trim());
                                        setLoading(false);
                                        onClose();
                                        MySwal.fire({
                                            title: "Success",
                                            text: "Flag submitted. Thank you.",
                                            icon: "success",
                                            confirmButtonColor: "#4f46e5",
                                            background: document.documentElement.classList.contains("dark") ? "#1f2937" : "#ffffff",
                                            color: document.documentElement.classList.contains("dark") ? "#e5e7eb" : "#111827",
                                        });
                                    } catch (err) {
                                        setLoading(false);
                                        console.error(err);
                                        MySwal.fire({
                                            title: "Error",
                                            text: "Failed to submit flag.",
                                            icon: "error",
                                            confirmButtonColor: "#4f46e5",
                                            background: document.documentElement.classList.contains("dark") ? "#1f2937" : "#ffffff",
                                            color: document.documentElement.classList.contains("dark") ? "#e5e7eb" : "#111827",
                                        });
                                    }
                                }}
                                className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                                disabled={loading}
                            >
                                {loading ? "Submitting..." : "Submit Flag"}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

function ShareModal({
                        open,
                        onClose,
                        post,
                    }: {
    open: boolean;
    onClose: () => void;
    post: ReportDTO | null;
}) {
    if (!open || !post) return null;

    const shareText = encodeURIComponent(`${post.description || "Check this out"} at ${post.location || ""}`);
    const shareUrl = encodeURIComponent(`${window.location.origin}/post/${post.id}`);

    const shareToFacebook = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${shareText}`, "_blank");
    };

    const shareToTwitter = () => {
        window.open(`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`, "_blank");
    };

    const shareToWhatsApp = () => {
        window.open(`https://wa.me/?text=${shareText}%20${shareUrl}`, "_blank");
    };

    const copyLink = () => {
        navigator.clipboard.writeText(`${window.location.origin}/post/${post.id}`);
        MySwal.fire({
            title: "Success",
            text: "Link copied to clipboard!",
            icon: "success",
            confirmButtonColor: "#4f46e5",
            background: document.documentElement.classList.contains("dark") ? "#1f2937" : "#ffffff",
            color: document.documentElement.classList.contains("dark") ? "#e5e7eb" : "#111827",
        });
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6"
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    exit={{ y: 20 }}
                >
                    <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Share This Post</h3>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={shareToFacebook}
                            className="flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            <Facebook size={20} />
                            Facebook
                        </button>
                        <button
                            onClick={shareToTwitter}
                            className="flex items-center justify-center gap-2 p-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition"
                        >
                            <Twitter size={20} />
                            Twitter
                        </button>
                        <button
                            onClick={shareToWhatsApp}
                            className="flex items-center justify-center gap-2 p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                        >
                            <Smartphone size={20} />
                            WhatsApp
                        </button>
                        <button
                            onClick={copyLink}
                            className="flex items-center justify-center gap-2 p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                        >
                            <Link size={20} />
                            Copy Link
                        </button>
                    </div>

                    <button
                        onClick={onClose}
                        className="mt-4 w-full px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    >
                        Close
                    </button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

function EditReportModal({
                             open,
                             onClose,
                             post,
                             onSubmit,
                         }: {
    open: boolean;
    onClose: () => void;
    post: ReportDTO | null;
    onSubmit: (reportId: number, location: string, description: string) => Promise<void>;
}) {
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open && post) {
            setLocation(post.location || "");
            setDescription(post.description || "");
        } else {
            setLocation("");
            setDescription("");
        }
    }, [open, post]);

    if (!open || !post) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700"
                    initial={{ y: 20, scale: 0.95 }}
                    animate={{ y: 0, scale: 1 }}
                    exit={{ y: 20, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">Edit Your Report</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">Update the details of your community report.</p>

                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Location</label>
                            <input
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Enter location"
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 transition"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={5}
                                placeholder="Enter description"
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 transition"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                        <div className="text-xs text-gray-500 dark:text-gray-400">Report ID: {post.id}</div>
                        <div className="flex gap-4">
                            <button
                                onClick={onClose}
                                className="px-5 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={async () => {
                                    if (!location.trim() && !description.trim()) {
                                        MySwal.fire({
                                            title: "Missing Information",
                                            text: "Please provide at least a location or description.",
                                            icon: "warning",
                                            confirmButtonColor: "#4f46e5",
                                            background: document.documentElement.classList.contains("dark") ? "#1f2937" : "#ffffff",
                                            color: document.documentElement.classList.contains("dark") ? "#e5e7eb" : "#111827",
                                        });
                                        return;
                                    }
                                    setLoading(true);
                                    try {
                                        await onSubmit(post.id, location.trim(), description.trim());
                                        setLoading(false);
                                        onClose();
                                    } catch (err: any) {
                                        setLoading(false);
                                        const message = err.message || "Failed to update report.";
                                        console.error("Edit failed:", err);
                                        MySwal.fire({
                                            title: "Error",
                                            text: message,
                                            icon: "error",
                                            confirmButtonColor: "#4f46e5",
                                            background: document.documentElement.classList.contains("dark") ? "#1f2937" : "#ffffff",
                                            color: document.documentElement.classList.contains("dark") ? "#e5e7eb" : "#111827",
                                        });
                                    }
                                }}
                                className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                                disabled={loading}
                            >
                                {loading ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

function DeleteConfirmationModal({
                                     open,
                                     onClose,
                                     onConfirm,
                                     reportId,
                                 }: {
    open: boolean;
    onClose: () => void;
    onConfirm: (reportId: number) => Promise<void>;
    reportId: number | null;
}) {
    const [loading, setLoading] = useState(false);

    if (!open || !reportId) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700"
                    initial={{ y: 20, scale: 0.95 }}
                    animate={{ y: 0, scale: 1 }}
                    exit={{ y: 20, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">Delete Report</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                        Are you sure you want to delete this report? This action cannot be undone.
                    </p>

                    <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500 dark:text-gray-400">Report ID: {reportId}</div>
                        <div className="flex gap-4">
                            <button
                                onClick={onClose}
                                className="px-5 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={async () => {
                                    setLoading(true);
                                    try {
                                        await onConfirm(reportId);
                                        setLoading(false);
                                        onClose();
                                    } catch (err) {
                                        setLoading(false);
                                        console.error(err);
                                    }
                                }}
                                className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                                disabled={loading}
                            >
                                {loading ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

interface CommentTree extends ReportComment {
    replies: CommentTree[];
}

function buildCommentTreeTwoPass(comments: ReportComment[]): CommentTree[] {
    const map = new Map<number, CommentTree>();
    comments.forEach((c) => {
        if (c.id == null) return;
        map.set(c.id, { ...c, replies: [] });
    });

    const roots: CommentTree[] = [];
    for (const [, c] of map) {
        if (c.parentCommentId != null) {
            const parent = map.get(c.parentCommentId);
            if (parent) parent.replies.push(c);
            else roots.push(c);
        } else {
            roots.push(c);
        }
    }
    return roots;
}

function PostMediaCarousel({
                               media,
                               onOpenLightbox,
                           }: {
    media: ReportPhoto[];
    onOpenLightbox: (items: ReportPhoto[], index: number) => void;
}) {
    const [index, setIndex] = useState(0);
    const [resourceOkMap, setResourceOkMap] = useState<Record<number, boolean>>({});
    const probedRef = useRef<Record<number, boolean>>({});

    useEffect(() => {
        if (!media || media.length === 0) return;
        let cancelled = false;
        const idx = index;
        const item = media[idx];
        if (!item) return;

        const url = toAbsolute(item.photoUrl);

        if (probedRef.current[idx]) return;

        probedRef.current[idx] = true;
        (async function probe() {
            try {
                let r = await fetch(url, { method: "HEAD" });
                if (!r.ok) {
                    r = await fetch(url, { method: "GET", headers: { Range: "bytes=0-0" } });
                }
                if (!cancelled) {
                    setResourceOkMap((m) => ({ ...m, [idx]: r.ok }));
                }
            } catch (err) {
                console.debug("probe failed for", url, err);
                if (!cancelled) {
                    setResourceOkMap((m) => ({ ...m, [idx]: false }));
                }
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [index, media]);

    if (!media || media.length === 0) {
        return null;
    }

    const current = media[index];
    const total = media.length;
    const rawUrl = current?.photoUrl ?? "";
    const photoUrl = toAbsolute(rawUrl);

    const showPlaceholderForVideo = resourceOkMap[index] === false;

    return (
        <div className="relative w-full rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
            <div className="w-full h-80 flex items-center justify-center bg-black">
                {isImageUrl(rawUrl) ? (
                    <img
                        src={photoUrl}
                        alt={`media-${index}`}
                        loading="lazy"
                        className="w-full h-full object-cover cursor-zoom-in transition-transform hover:scale-105"
                        onClick={() => onOpenLightbox(media, index)}
                    />
                ) : isVideoUrl(rawUrl) ? (
                    showPlaceholderForVideo ? (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <ImageIcon size={32} />
                        </div>
                    ) : (
                        <video
                            src={photoUrl}
                            className="w-full h-full object-cover"
                            controls
                            preload="metadata"
                            onError={() => setResourceOkMap((m) => ({ ...m, [index]: false }))}
                            onClick={() => onOpenLightbox(media, index)}
                        />
                    )
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <ImageIcon size={32} />
                    </div>
                )}
            </div>

            {total > 1 && (
                <>
                    <button
                        onClick={() => setIndex((i) => (i - 1 + total) % total)}
                        aria-label="prev"
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-800/70 hover:bg-gray-800/90 rounded-full p-3 text-white transition"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <button
                        onClick={() => setIndex((i) => (i + 1) % total)}
                        aria-label="next"
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-800/70 hover:bg-gray-800/90 rounded-full p-3 text-white transition"
                    >
                        <ArrowRight size={20} />
                    </button>

                    <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex gap-2">
                        {media.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setIndex(i)}
                                aria-label={`Go to ${i + 1}`}
                                className={`w-3 h-3 rounded-full transition ${i === index ? "bg-indigo-500" : "bg-gray-300/50 hover:bg-gray-300"}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

const reactions = [
    { type: "Like", emoji: "👍" },
    { type: "Love", emoji: "❤️" },
    { type: "Care", emoji: "🤗" },
    { type: "Haha", emoji: "😂" },
    { type: "Wow", emoji: "😲" },
    { type: "Sad", emoji: "😢" },
    { type: "Angry", emoji: "😡" },
];

function PostCard({
                      post,
                      onReact,
                      onOpenFlag,
                      onOpenShare,
                      onOpenLightbox,
                      onEdit,
                      onDelete,
                      activeComment,
                      setActiveComment,
                      userId,
                      userIdToNameMap,
                  }: {
    post: ReportDTO;
    onReact: (id: number, type: string) => void;
    onOpenFlag: (reportId: number | null) => void;
    onOpenShare: (post: ReportDTO) => void;
    onOpenLightbox: (items: ReportPhoto[], idx: number) => void;
    onEdit: (post: ReportDTO) => void;
    onDelete: (reportId: number) => void;
    activeComment: number | null;
    setActiveComment: (id: number | null) => void;
    userId?: string | undefined;
    userIdToNameMap: Map<string, string>;
}) {
    const currentUserId = userId ?? "";
    const userReactionType = post.reactions.find((r) => r.userId === currentUserId)?.reactionType;
    const userHasReacted = !!userReactionType;
    const commentsTree = buildCommentTreeTwoPass(post.comments);
    const [showReactionPicker, setShowReactionPicker] = useState(false);
    const isOwnPost = post.citizenId === currentUserId;

    const reactionCounts = post.reactions.reduce((acc, r) => {
        acc[r.reactionType] = (acc[r.reactionType] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const handleMouseEnter = () => setShowReactionPicker(true);
    const handleMouseLeave = () => setShowReactionPicker(false);

    const getDisplayName = (comment: ReportComment) => {
        if (comment.userName?.trim()) {
            return comment.userName.trim();
        }
        const nameFromMap = comment.userId ? userIdToNameMap.get(comment.userId) : undefined;
        return nameFromMap?.trim() || `User-${comment.userId?.slice(0, 6) || 'unknown'}`;
    };

    return (
        <motion.article
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
            <div className="p-6">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                        <AvatarSmall name={post.citizenName || "You"} photoUrl={post.citizenProfilePicture} />
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{post.citizenName || "You"}</h3>
                                <div className="text-xs text-gray-500 dark:text-gray-400">{new Date(post.dateCreated).toLocaleString()}</div>
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">{post.location}</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => onOpenFlag(post.id)}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                            title="Flag report"
                        >
                            <Flag className="text-gray-600 dark:text-gray-200" size={20} />
                        </button>
                        {isOwnPost && (
                            <>
                                <button
                                    onClick={() => onEdit(post)}
                                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                                    title="Edit report"
                                >
                                    <Edit className="text-gray-600 dark:text-gray-200" size={20} />
                                </button>
                                <button
                                    onClick={() => onDelete(post.id)}
                                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                                    title="Delete report"
                                >
                                    <Trash className="text-gray-600 dark:text-gray-200" size={20} />
                                </button>
                            </>
                        )}
                        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                            <MoreHorizontal className="text-gray-600 dark:text-gray-200" size={20} />
                        </button>
                    </div>
                </div>

                <p className="mt-4 text-gray-800 dark:text-gray-200 text-base leading-relaxed">{post.description || "No description"}</p>

                <div className="mt-6">
                    <PostMediaCarousel media={post.photos ?? []} onOpenLightbox={onOpenLightbox} />
                </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-6">
                    {post.reactions.length > 0 && (
                        <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                                {Object.entries(reactionCounts).map(([type, count]) => {
                                    const reaction = reactions.find((r) => r.type === type);
                                    if (!reaction || count === 0) return null;
                                    return (
                                        <span key={type} className="text-lg rounded-full bg-gray-100 dark:bg-gray-600/50 border-2 border-gray-50 dark:border-gray-700 p-1">
                                            {reaction.emoji}
                                        </span>
                                    );
                                })}
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-300">{post.reactions.length}</span>
                        </div>
                    )}
                    {post.comments.length > 0 && (
                        <div className="flex items-center gap-2">
                            <MessageCircle className="w-5 h-5 text-gray-600 dark:text-gray-200" />
                            <span className="text-sm text-gray-600 dark:text-gray-300">{post.comments.length}</span>
                        </div>
                    )}
                </div>

                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600 flex items-center gap-6">
                    <div className="relative flex-1" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <button
                            className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg ${userHasReacted ? "text-indigo-600 dark:text-indigo-400" : "text-gray-600 dark:text-gray-300"} hover:bg-gray-100 dark:hover:bg-gray-600 transition`}
                        >
                            <span className="text-xl">
                                {userReactionType ? reactions.find((r) => r.type === userReactionType)?.emoji : "👍"}
                            </span>
                            <span className="text-sm">{userReactionType || "Like"}</span>
                        </button>
                        <AnimatePresence>
                            {showReactionPicker && (
                                <motion.div
                                    className="absolute bottom-full mb-2 left-0 bg-white dark:bg-gray-700 rounded-full shadow-lg p-2 flex gap-2 z-10"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                >
                                    {reactions.map(({ type, emoji }) => (
                                        <button
                                            key={type}
                                            onClick={() => {
                                                onReact(post.id, type);
                                                setShowReactionPicker(false);
                                            }}
                                            className="p-1 text-2xl hover:scale-125 transition-transform"
                                        >
                                            {emoji}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <button
                        onClick={() => setActiveComment(activeComment === post.id ? null : post.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                    >
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm">View Comments</span>
                    </button>

                    <button
                        onClick={() => onOpenShare(post)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                    >
                        <Share2 className="w-5 h-5" />
                        <span className="text-sm">Share</span>
                    </button>
                </div>

                <div className="mt-4">
                    <AnimatePresence>
                        {activeComment === post.id && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <div className="max-h-64 overflow-y-auto space-y-4">
                                    {commentsTree.map((c) => (
                                        <div key={c.id} className="flex items-start gap-3">
                                            <AvatarSmall name={getDisplayName(c)} photoUrl={undefined} />
                                            <div className="flex-1">
                                                <div className="bg-white dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <div>
                                                            <div className="font-semibold text-sm text-gray-900 dark:text-gray-100">{getDisplayName(c)}</div>
                                                            <div className="text-xs text-gray-500 dark:text-gray-400">{new Date(c.dateCreated).toLocaleString()}</div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-2 text-sm text-gray-800 dark:text-gray-200">{c.content}</div>
                                                </div>

                                                {c.replies.length > 0 && (
                                                    <div className="mt-3 ml-8 space-y-3">
                                                        {c.replies.map((r) => (
                                                            <div key={r.id} className="flex items-start gap-3">
                                                                <AvatarSmall name={getDisplayName(r)} photoUrl={undefined} />
                                                                <div className="flex-1">
                                                                    <div className="bg-white dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                                                                        <div className="flex items-center justify-between">
                                                                            <div>
                                                                                <div className="font-semibold text-sm text-gray-900 dark:text-gray-100">{getDisplayName(r)}</div>
                                                                                <div className="text-xs text-gray-500 dark:text-gray-400">{new Date(r.dateCreated).toLocaleString()}</div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="mt-2 text-sm text-gray-800 dark:text-gray-200">{r.content}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.article>
    );
}

const MyPosts = () => {
    const [posts, setPosts] = useState<ReportDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const PAGE_SIZE = 3;

    const [activeCommentPost, setActiveCommentPost] = useState<number | null>(null);

    const [flagModalOpen, setFlagModalOpen] = useState(false);
    const [flagTargetId, setFlagTargetId] = useState<number | null>(null);
    const [shareModalOpen, setShareModalOpen] = useState(false);
    const [shareTargetPost, setShareTargetPost] = useState<ReportDTO | null>(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editTargetPost, setEditTargetPost] = useState<ReportDTO | null>(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxItems, setLightboxItems] = useState<ReportPhoto[]>([]);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const [userIdToNameMap, setUserIdToNameMap] = useState<Map<string, string>>(new Map());

    const currentUserId = localStorage.getItem("userId") ?? "";

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users = await getAllUsers();
                const nameMap = new Map<string, string>();
                users.forEach((user) => {
                    if (user.id) {
                        const fullName = `${user.firstName} ${user.lastName}`.trim();
                        nameMap.set(user.id, fullName);
                    }
                });
                setUserIdToNameMap(nameMap);
            } catch (err) {
                console.error("Failed to fetch users:", err);
                MySwal.fire({
                    title: "Error",
                    text: "Failed to load user names.",
                    icon: "error",
                    confirmButtonColor: "#4f46e5",
                    background: document.documentElement.classList.contains("dark") ? "#1f2937" : "#ffffff",
                    color: document.documentElement.classList.contains("dark") ? "#e5e7eb" : "#111827",
                });
            }
        };
        fetchUsers();
    }, []);

    const fetchMyPosts = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await getAllReports();
            const myPosts = res.filter((p: ReportDTO) => p.citizenId === currentUserId);
            setPosts(myPosts);
        } catch (err: unknown) {
            console.error("Failed to load MyPosts", err);
            const message = err instanceof Error ? err.message : String(err);
            setError(message || "Failed to load posts");
            MySwal.fire({
                title: "Error",
                text: message || "Failed to load posts.",
                icon: "error",
                confirmButtonColor: "#4f46e5",
                background: document.documentElement.classList.contains("dark") ? "#1f2937" : "#ffffff",
                color: document.documentElement.classList.contains("dark") ? "#e5e7eb" : "#111827",
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMyPosts();
    }, []);

    const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
    const currentPosts = useMemo(() => posts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE), [posts, currentPage]);

    const handleReact = async (id: number, type: string) => {
        try {
            const dto: AddReactionDTO = { ReactionType: type, UserId: currentUserId };
            await toggleReaction(id, dto);
            fetchMyPosts();
        } catch (err: any) {
            console.error("React failed:", err);
            MySwal.fire({
                title: "Error",
                text: err.message === "Please log in to react." ? "Please log in to react." : "Failed to add reaction.",
                icon: "error",
                confirmButtonColor: "#4f46e5",
                background: document.documentElement.classList.contains("dark") ? "#1f2937" : "#ffffff",
                color: document.documentElement.classList.contains("dark") ? "#e5e7eb" : "#111827",
            });
        }
    };

    const openFlagModal = (reportId: number | null) => {
        setFlagTargetId(reportId);
        setFlagModalOpen(true);
    };

    const submitFlag = async (reason: string) => {
        if (!flagTargetId || !currentUserId) {
            MySwal.fire({
                title: "Error",
                text: "No target or user ID.",
                icon: "error",
                confirmButtonColor: "#4f46e5",
                background: document.documentElement.classList.contains("dark") ? "#1f2937" : "#ffffff",
                color: document.documentElement.classList.contains("dark") ? "#e5e7eb" : "#111827",
            });
            return;
        }
        try {
            const dto: FlagReportDTO = { reportId: flagTargetId, reason, flaggedByUserId: currentUserId };
            await flagReport(dto);
            await fetchMyPosts();
            MySwal.fire({
                title: "Success",
                text: "Flag submitted. Thank you.",
                icon: "success",
                confirmButtonColor: "#4f46e5",
                background: document.documentElement.classList.contains("dark") ? "#1f2937" : "#ffffff",
                color: document.documentElement.classList.contains("dark") ? "#e5e7eb" : "#111827",
            });
        } catch (err: any) {
            console.error("Flag failed:", err);
            MySwal.fire({
                title: "Error",
                text: err.message || "Failed to flag report.",
                icon: "error",
                confirmButtonColor: "#4f46e5",
                background: document.documentElement.classList.contains("dark") ? "#1f2937" : "#ffffff",
                color: document.documentElement.classList.contains("dark") ? "#e5e7eb" : "#111827",
            });
        }
    };

    const openShareModal = (post: ReportDTO) => {
        setShareTargetPost(post);
        setShareModalOpen(true);
    };

    const openEditModal = (post: ReportDTO) => {
        setEditTargetPost(post);
        setEditModalOpen(true);
    };

    const submitEdit = async (reportId: number, location: string, description: string) => {
        try {
            const dto: EditReportDTO = {
                Location: location.trim() || undefined,
                Description: description.trim() || undefined,
            };
            const response = await editReport(reportId, dto);
            await fetchMyPosts();
            MySwal.fire({
                title: "Success",
                text: response.message || "Report updated successfully.",
                icon: "success",
                confirmButtonColor: "#4f46e5",
                background: document.documentElement.classList.contains("dark") ? "#1f2937" : "#ffffff",
                color: document.documentElement.classList.contains("dark") ? "#e5e7eb" : "#111827",
            });
        } catch (err: any) {
            const message = err.message || "Failed to update report.";
            console.error("Edit failed:", err);
            MySwal.fire({
                title: "Error",
                text: message,
                icon: "error",
                confirmButtonColor: "#4f46e5",
                background: document.documentElement.classList.contains("dark") ? "#1f2937" : "#ffffff",
                color: document.documentElement.classList.contains("dark") ? "#e5e7eb" : "#111827",
            });
        }
    };

    const openDeleteModal = (reportId: number) => {
        setDeleteTargetId(reportId);
        setDeleteModalOpen(true);
    };

    const handleDelete = async (reportId: number) => {
        try {
            const response = await deleteReport(reportId);
            MySwal.fire({
                title: "Success",
                text: response.message || "Report deleted successfully.",
                icon: "success",
                confirmButtonColor: "#4f46e5",
                background: document.documentElement.classList.contains("dark") ? "#1f2937" : "#ffffff",
                color: document.documentElement.classList.contains("dark") ? "#e5e7eb" : "#111827",
            });
            await fetchMyPosts();
        } catch (err: any) {
            const message = err.message || "Failed to delete report.";
            console.error("Delete failed:", err);
            MySwal.fire({
                title: "Error",
                text: message,
                icon: "error",
                confirmButtonColor: "#4f46e5",
                background: document.documentElement.classList.contains("dark") ? "#1f2937" : "#ffffff",
                color: document.documentElement.classList.contains("dark") ? "#e5e7eb" : "#111827",
            });
        }
    };

    const openLightbox = (items: ReportPhoto[], idx: number) => {
        setLightboxItems(items);
        setLightboxIndex(idx);
        setLightboxOpen(true);
    };
    const closeLightbox = () => setLightboxOpen(false);
    const prevLightbox = () => setLightboxIndex((i) => (i - 1 + lightboxItems.length) % lightboxItems.length);
    const nextLightbox = () => setLightboxIndex((i) => (i + 1) % lightboxItems.length);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
                <div className="mb-12 text-center">
                    <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">My Posts</h1>
                    <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">View your created reports</p>
                </div>

                {isLoading ? (
                    <div className="w-full flex items-center justify-center py-20">
                        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 text-lg py-12">{error}</div>
                ) : posts.length === 0 ? (
                    <div className="text-center text-gray-500 text-lg py-12">You haven't made any posts yet.</div>
                ) : (
                    <>
                        <div className="space-y-6">
                            {currentPosts.map((p) => (
                                <PostCard
                                    key={p.id}
                                    post={p}
                                    userId={currentUserId}
                                    userIdToNameMap={userIdToNameMap}
                                    onReact={handleReact}
                                    onOpenFlag={openFlagModal}
                                    onOpenShare={openShareModal}
                                    onOpenLightbox={openLightbox}
                                    onEdit={openEditModal}
                                    onDelete={openDeleteModal}
                                    activeComment={activeCommentPost}
                                    setActiveComment={setActiveCommentPost}
                                />
                            ))}
                        </div>
                        <div className="mt-8 flex items-center justify-center gap-4">
                            <button
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition ${
                                    currentPage === 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gradient-to-br from-blue-500 to-green-500 text-white"
                                }`}
                            >
                                <ChevronLeft className="h-5 w-5" /> Previous
                            </button>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Page {currentPage} of {totalPages}</span>
                            <button
                                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition ${
                                    currentPage === totalPages ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gradient-to-br from-blue-500 to-green-500 text-white"
                                }`}
                            >
                                Next <ChevronRight className="h-5 w-5" />
                            </button>
                        </div>
                    </>
                )}
            </div>

            <Lightbox open={lightboxOpen} items={lightboxItems} index={lightboxIndex} onClose={closeLightbox} onPrev={prevLightbox} onNext={nextLightbox} />
            <FlagModal open={flagModalOpen} onClose={() => setFlagModalOpen(false)} onSubmit={submitFlag} reportId={flagTargetId} />
            <ShareModal open={shareModalOpen} onClose={() => setShareModalOpen(false)} post={shareTargetPost} />
            <EditReportModal
                open={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                post={editTargetPost}
                onSubmit={submitEdit}
            />
            <DeleteConfirmationModal
                open={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleDelete}
                reportId={deleteTargetId}
            />
        </div>
    );
};

export default React.memo(MyPosts);