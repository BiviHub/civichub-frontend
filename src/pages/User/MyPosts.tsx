
import { useEffect, useMemo, useRef, useState } from "react";
import {
    MessageCircle,
    Share2,
    MoreVertical,
    ChevronLeft,
    ChevronRight,
    X,
    ArrowLeft,
    ArrowRight,
    ImageIcon,
    Flag,
    Send,
    Loader2,
    Heart,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
    getMyReports,
    addComment as apiAddComment,
    toggleReaction as apiToggleReaction,
    flagReport as apiFlagReport,
} from "../../services/authService";
import type {
    ReportDTO,
    ReportPhoto,
    ReportComment,
    AddCommentDTO,
    AddReactionDTO,
    FlagReportDTO,
} from "../../types/AuthTypes";
import { toAbsolute } from "../../utils/url";

// -----------------------------
// Small UI helpers
// -----------------------------
function AvatarSmall({ name, photoUrl }: { name?: string; photoUrl?: string }) {
    const initial = name?.trim()?.[0]?.toUpperCase() ?? "?";
    if (photoUrl) {
        return (
            <img
                src={photoUrl}
                alt={name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-800/40"
            />
        );
    }
    return (
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-600 text-white font-semibold">
            {initial}
        </div>
    );
}

const isImageUrl = (url?: string) =>
    !!url && /\.(jpe?g|png|gif|webp|bmp|svg)(\?|$)/i.test(url.split("?")[0]);

const isVideoUrl = (url?: string) =>
    !!url && /\.(mp4|webm|ogg|mov)(\?|$)/i.test(url.split("?")[0]);

// -----------------------------
// Lightbox
// -----------------------------
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
    const touchRef = useRef<{ startX: number; startY: number } | null>(null);

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
            } catch {
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
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onTouchStart={(e) => {
                    touchRef.current = { startX: e.touches[0].clientX, startY: e.touches[0].clientY };
                }}
                onTouchEnd={(e) => {
                    if (!touchRef.current) return;
                    const deltaX = touchRef.current.startX - e.changedTouches[0].clientX;
                    const deltaY = touchRef.current.startY - e.changedTouches[0].clientY;
                    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                        if (deltaX > 0) onNext();
                        else onPrev();
                    }
                    touchRef.current = null;
                }}
            >
                <div className="relative w-full max-w-3xl max-h-[90vh]">
                    <button
                        aria-label="close"
                        onClick={onClose}
                        className="absolute top-3 right-3 z-20 bg-white/10 hover:bg-white/20 rounded-full p-2 text-white"
                    >
                        <X />
                    </button>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={onPrev}
                            className="hidden sm:flex items-center justify-center h-12 w-12 bg-white/10 hover:bg-white/20 rounded-full text-white"
                            aria-label="previous"
                        >
                            <ArrowLeft />
                        </button>

                        <div className="bg-gray-900 p-2 rounded shadow-lg max-h-[80vh] overflow-hidden flex items-center justify-center">
                            {isImageUrl(url) ? (
                                <img src={url} alt="lightbox" className="max-w-[92vw] max-h-[80vh] object-contain" />
                            ) : isVideoUrl(url) ? (
                                exists === false || mediaError ? (
                                    <div className="w-[600px] h-[400px] flex items-center justify-center text-gray-400">
                                        <ImageIcon />
                                    </div>
                                ) : (
                                    <video
                                        src={url}
                                        controls
                                        className="max-w-[92vw] max-h-[80vh] object-contain"
                                        onError={() => setMediaError(true)}
                                    />
                                )
                            ) : (
                                <div className="w-[600px] h-[400px] flex items-center justify-center text-gray-400">
                                    <ImageIcon />
                                </div>
                            )}
                        </div>

                        <button
                            onClick={onNext}
                            className="hidden sm:flex items-center justify-center h-12 w-12 bg-white/10 hover:bg-white/20 rounded-full text-white"
                            aria-label="next"
                        >
                            <ArrowRight />
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
                       showToast,
                   }: {
    open: boolean;
    onClose: () => void;
    onSubmit: (reason: string) => Promise<void>;
    reportId: number | null;
    showToast: (msg: string, type: "success" | "error" | "warning") => void;
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
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6" initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: 20 }}>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Flag this report</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                        Tell us why this report should be reviewed. Our moderators will review and take action.
                    </p>

                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        rows={4}
                        className="w-full p-3 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 mb-4"
                        placeholder="Explain why you're flagging this report..."
                    />

                    <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">Report ID: {reportId ?? "-"}</div>
                        <div className="flex gap-2">
                            <button onClick={onClose} className="px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-100">
                                Cancel
                            </button>
                            <button
                                onClick={async () => {
                                    if (!reason.trim()) {
                                        showToast("Please provide a reason.", "warning");
                                        return;
                                    }
                                    setLoading(true);
                                    try {
                                        await onSubmit(reason.trim());
                                        setLoading(false);
                                        onClose();
                                        showToast("Flag submitted. Thank you.", "success");
                                    } catch (e: unknown) {
                                        setLoading(false);
                                        console.error(e);
                                        showToast("Failed to submit flag.", "error");
                                    }
                                }}
                                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
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
                        showToast,
                    }: {
    open: boolean;
    onClose: () => void;
    post: ReportDTO | null;
    showToast: (msg: string, type: "success" | "error" | "warning") => void;
}) {
    if (!open || !post) return null;

    const shareText = encodeURIComponent(`${post.description || "Check this out"} at ${post.location || ""}`);
    const shareUrl = encodeURIComponent(window.location.href);

    const shareToFacebook = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${shareText}`, "_blank");
    const shareToTwitter = () => window.open(`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`, "_blank");
    const shareToWhatsApp = () => window.open(`https://wa.me/?text=${shareText}%20${shareUrl}`, "_blank");
    const copyLink = async () => {
        await navigator.clipboard.writeText(`${window.location.href}?post=${post.id}`);
        showToast("Link copied to clipboard!", "success");
    };

    return (
        <AnimatePresence>
            <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <motion.div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6" initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: 20 }}>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Share this post</h3>

                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={shareToFacebook} className="flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.987H7.898v-2.892h2.54V9.797c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.772-1.63 1.562v1.88h2.773l-.443 2.892h-2.33V21.879C18.343 21.128 22 16.991 22 12z"/></svg>
                            Facebook
                        </button>
                        <button onClick={shareToTwitter} className="flex items-center justify-center gap-2 p-3 bg-sky-500 text-white rounded-md hover:bg-sky-600">
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.633 7.997c.013.18.013.36.013.54 0 5.49-4.183 11.82-11.82 11.82-2.347 0-4.523-.67-6.356-1.83.33.04.66.053.99.053 1.943 0 3.732-.66 5.158-1.77-1.82-.034-3.36-1.234-3.893-2.88.256.04.513.066.78.066.377 0 .754-.053 1.105-.147-1.9-.385-3.332-2.06-3.332-4.077v-.053c.56.31 1.2.5 1.882.526-1.117-.747-1.852-2.02-1.852-3.463 0-.76.205-1.468.56-2.082 2.02 2.48 5.04 4.106 8.44 4.28-.067-.31-.1-.64-.1-.97 0-2.36 1.912-4.278 4.276-4.278 1.23 0 2.344.52 3.125 1.352.972-.19 1.886-.546 2.7-1.037-.32 1-.988 1.846-1.86 2.378.867-.093 1.7-.334 2.47-.674-.577.86-1.31 1.6-2.14 2.2z"/></svg>
                            Twitter
                        </button>
                        <button onClick={shareToWhatsApp} className="flex items-center justify-center gap-2 p-3 bg-green-500 text-white rounded-md hover:bg-green-600">
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.52 3.48A11.913 11.913 0 0012 .75 11.999 11.999 0 00.75 12c0 2.11.55 4.07 1.6 5.84L.75 23.25l5.7-1.5A11.887 11.887 0 0012 24c6.62 0 12-5.38 12-12 0-2.98-1.17-5.74-3.48-7.5zM12 21c-1.1 0-2.18-.18-3.18-.53l-.23-.07-3.38.89.89-3.29-.09-.24A9.001 9.001 0 013 12c0-4.97 4.03-9 9-9 2.4 0 4.67.94 6.36 2.64S21.36 9.6 21.36 12 17.97 21 12 21zM17.73 14.57c-.26-.13-1.54-.76-1.78-.85-.24-.09-.41-.13-.58.13-.17.26-.66.84-.81 1.01-.15.17-.29.19-.55.06-.26-.13-1.09-.4-2.08-1.28-.77-.68-1.28-1.52-1.43-1.78-.15-.26-.02-.4.11-.53.11-.11.26-.29.39-.44.13-.15.17-.27.26-.45.09-.18.04-.35-.02-.48-.06-.13-.55-1.32-.75-1.8-.2-.47-.4-.4-.55-.4-.14 0-.3-.02-.46-.02-.16 0-.42.06-.64.29-.22.23-.84.82-.84 1.99s.86 2.31.98 2.47c.12.16 1.69 2.66 4.09 3.73 2.4 1.07 2.4.72 2.83.67.43-.06 1.4-.57 1.6-1.12.2-.56.2-1.04.14-1.12-.06-.08-.25-.13-.51-.26z"/></svg>
                            WhatsApp
                        </button>
                        <button onClick={copyLink} className="flex items-center justify-center gap-2 p-3 bg-gray-600 text-white rounded-md hover:bg-gray-700">
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M3.9 12.9l1.4-1.4A3 3 0 017.6 9.6l1.4-1.4A5 5 0 005.3 13.5l-1.4-1.4zm12.6-6.6l-1.4 1.4A3 3 0 0116.4 6.4l-1.4 1.4A5 5 0 0118.7 10.5l1.4-1.4zM8.5 15.5l7-7"/></svg>
                            Copy Link
                        </button>
                    </div>

                    <button onClick={onClose} className="mt-4 w-full px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-100">
                        Close
                    </button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}


function PostMediaCarousel({
                               media,
                               onMediaClick,
                               disableControls = false
                           }: {
    media: ReportPhoto[];
    onMediaClick: (index: number) => void;
    disableControls?: boolean;
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
                if (!r.ok) r = await fetch(url, { method: "GET", headers: { Range: "bytes=0-0" } });
                if (!cancelled) setResourceOkMap((m) => ({ ...m, [idx]: r.ok }));
            } catch {
                if (!cancelled) setResourceOkMap((m) => ({ ...m, [idx]: false }));
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [index, media]);

    if (!media || media.length === 0) return null;
    const current = media[index];
    const total = media.length;
    const rawUrl = current?.photoUrl ?? "";
    const photoUrl = toAbsolute(rawUrl);
    const showPlaceholderForVideo = resourceOkMap[index] === false;

    return (
        <div className="relative w-full rounded-lg overflow-hidden bg-gray-900/10 dark:bg-gray-800 aspect-[4/3]">
            <div className="absolute inset-0 flex items-center justify-center bg-black">
                {isImageUrl(rawUrl) ? (
                    <img
                        src={photoUrl}
                        alt={`media-${index}`}
                        loading="lazy"
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={() => onMediaClick(index)}
                    />
                ) : isVideoUrl(rawUrl) ? (
                    showPlaceholderForVideo ? (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <ImageIcon />
                        </div>
                    ) : (
                        <video
                            src={photoUrl}
                            className="w-full h-full object-cover cursor-pointer"
                            controls={!disableControls}
                            preload="metadata"
                            onError={() => setResourceOkMap((m) => ({ ...m, [index]: false }))}
                            onClick={() => onMediaClick(index)}
                        />
                    )
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <ImageIcon />
                    </div>
                )}
            </div>

            {total > 1 && (
                <>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIndex((i) => (i - 1 + total) % total);
                        }}
                        aria-label="prev"
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-2 shadow"
                    >
                        <ArrowLeft />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIndex((i) => (i + 1) % total);
                        }}
                        aria-label="next"
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-2 shadow"
                    >
                        <ArrowRight />
                    </button>

                    <div className="absolute left-1/2 -translate-x-1/2 bottom-3 flex gap-2">
                        {media.map((_, i) => (
                            <button
                                key={i}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIndex(i);
                                }}
                                aria-label={`Go to ${i + 1}`}
                                className={`w-2 h-2 rounded-full ${i === index ? "bg-blue-500" : "bg-white/30"}`}
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

function buildCommentTreeTwoPass(comments: ReportComment[]): (ReportComment & { replies: ReportComment[] })[] {
    const map = new Map<number, (ReportComment & { replies: ReportComment[] })>();
    comments.forEach((c) => {
        if (c.id == null) return;
        map.set(c.id, { ...c, replies: [] });
    });
    const roots: (ReportComment & { replies: ReportComment[] })[] = [];
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

function PostCard({
                      post,
                      onReact,
                      onComment,
                      onOpenFlag,
                      onOpenLightbox,
                      onOpenShare,
                      activeComment,
                      setActiveComment,
                      commentInput,
                      setCommentInput,
                      replyingTo,
                      setReplyingTo,
                      userId,
                  }: {
    post: ReportDTO;
    onReact: (id: number, type: string) => void;
    onComment: (id: number, parentId?: number | null) => void;
    onOpenFlag: (reportId: number | null) => void;
    onOpenShare: (post: ReportDTO) => void;
    onOpenLightbox: (items: ReportPhoto[], idx: number) => void;
    activeComment: number | null;
    setActiveComment: (id: number | null) => void;
    commentInput: string;
    setCommentInput: (v: string) => void;
    replyingTo: number | null;
    setReplyingTo: (id: number | null) => void;
    userId?: string | undefined;
}) {
    const currentUserId = userId ?? "";
    const userReactionType = post.reactions?.find((r) => r.userId === currentUserId)?.reactionType;
    const userHasReacted = !!userReactionType;
    const commentsTree = buildCommentTreeTwoPass(post.comments ?? []);
    const [showReactionPicker, setShowReactionPicker] = useState(false);
    const [isLongPress, setIsLongPress] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const reactionCounts = (post.reactions ?? []).reduce((acc, r) => {
        acc[r.reactionType] = (acc[r.reactionType] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const topReactions = Object.entries(reactionCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);

    const handleMouseEnter = () => setShowReactionPicker(true);
    const handleMouseLeave = () => setShowReactionPicker(false);

    const handleTouchStart = () => {
        timerRef.current = setTimeout(() => {
            setShowReactionPicker(true);
            setIsLongPress(true);
        }, 300);
    };

    const handleTouchEnd = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
    };

    return (
        <motion.article
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-shadow"
        >
            <div className="p-4 sm:p-5">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <AvatarSmall name={post.citizenName} photoUrl={post.citizenProfilePicture} />
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-gray-900 dark:text-gray-100">{post.citizenName || "You"}</h3>
                                <div className="text-xs text-gray-500 dark:text-gray-400">{new Date(post.dateCreated).toLocaleString()}</div>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">{post.location}</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                        <button onClick={() => onOpenFlag(post.id)} className="p-1 sm:p-2 rounded-md hover:bg-gray-100/50 dark:hover:bg-white/5" title="Flag report">
                            <Flag className="text-gray-600 dark:text-gray-200 h-5 w-5" />
                        </button>
                        <button className="p-1 sm:p-2 rounded-md hover:bg-gray-100/50 dark:hover:bg-white/5">
                            <MoreVertical className="text-gray-600 dark:text-gray-200 h-5 w-5" />
                        </button>
                    </div>
                </div>

                <p className="mt-3 sm:mt-4 text-gray-800 dark:text-gray-200 whitespace-pre-wrap text-sm sm:text-base">{post.description || "No description"}</p>

                <div className="mt-3 sm:mt-4">
                    <PostMediaCarousel
                        media={post.photos ?? []}
                        onMediaClick={(idx) => onOpenLightbox(post.photos ?? [], idx)}
                        disableControls={false}
                    />
                </div>
            </div>

            <div className="px-4 sm:px-6 py-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-4 sm:gap-6">
                    {post.reactions && post.reactions.length > 0 && (
                        <div className="flex items-center gap-1">
                            <div className="flex -space-x-2">
                                {topReactions.map(([type]) => {
                                    const reaction = reactions.find((r) => r.type === type);
                                    if (!reaction) return null;
                                    return (
                                        <span key={type} className="text-base sm:text-lg rounded-full bg-gray-100 dark:bg-gray-700/50 border-2 border-gray-50 dark:border-gray-800 p-0.5">
                      {reaction.emoji}
                    </span>
                                    );
                                })}
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">{post.reactions.length}</span>
                        </div>
                    )}
                    {post.comments && post.comments.length > 0 && (
                        <div className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-200" />
                            <span className="text-sm text-gray-600 dark:text-gray-300">{post.comments.length}</span>
                        </div>
                    )}
                </div>

                <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 flex items-center gap-4 sm:gap-6">
                    <div className="relative flex-1">
                        <button
                            className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg ${userHasReacted ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-300"} hover:bg-gray-100/50 dark:hover:bg-white/5`}
                            onClick={() => {
                                if (isLongPress) {
                                    setIsLongPress(false);
                                    return;
                                }
                                onReact(post.id, "Like");
                            }}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                        >
                            <span className="text-lg sm:text-xl">{userReactionType ? reactions.find((r) => r.type === userReactionType)?.emoji : "👍"}</span>
                            <span className="text-sm">{userReactionType || "Like"}</span>
                        </button>
                        <AnimatePresence>
                            {showReactionPicker && (
                                <motion.div className="absolute bottom-full mb-2 left-0 bg-white dark:bg-gray-800 rounded-full shadow-lg p-2 flex gap-2 z-10" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                                    {reactions.map(({ type, emoji }) => (
                                        <button
                                            key={type}
                                            onClick={() => {
                                                onReact(post.id, type);
                                                setShowReactionPicker(false);
                                            }}
                                            className="p-1 text-2xl sm:text-3xl hover:scale-125 transition-transform"
                                        >
                                            {emoji}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <button onClick={() => setActiveComment(activeComment === post.id ? null : post.id)} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-white/5">
                        <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-sm">Comment</span>
                    </button>

                    <button onClick={() => onOpenShare(post)} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-white/5">
                        <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-sm">Share</span>
                    </button>
                </div>

                {/* Comments */}
                <div className="mt-4">
                    <AnimatePresence>
                        {activeComment === post.id && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <div className="max-h-60 overflow-y-auto space-y-3 pr-2">
                                    {commentsTree.length > 0 ? (
                                        commentsTree.map((c) => (
                                            <div key={c.id} className="flex items-start gap-3">
                                                <AvatarSmall name={c.userName} photoUrl={undefined} />
                                                <div className="flex-1">
                                                    <div className="bg-white dark:bg-gray-900/60 rounded-md p-3 border border-gray-200 dark:border-gray-700">
                                                        <div className="flex items-center justify-between gap-2">
                                                            <div>
                                                                <div className="font-semibold text-sm text-gray-900 dark:text-gray-100">{c.userName || "Anonymous"}</div>
                                                                <div className="text-xs text-gray-500">{new Date(c.dateCreated).toLocaleString()}</div>
                                                            </div>
                                                        </div>
                                                        <div className="mt-2 text-sm text-gray-800 dark:text-gray-200">{c.content}</div>
                                                    </div>

                                                    <div className="mt-1">
                                                        <button
                                                            onClick={() => {
                                                                setActiveComment(post.id ?? null);
                                                                setReplyingTo(c.id ?? null);
                                                                setCommentInput(`@${c.userName ?? "user"} `);
                                                            }}
                                                            className="text-xs text-blue-500 mt-1"
                                                        >
                                                            Reply
                                                        </button>
                                                    </div>

                                                    {/* replies */}
                                                    {c.replies.length > 0 && (
                                                        <div className="mt-3 ml-6 sm:ml-8 space-y-3">
                                                            {c.replies.map((r) => (
                                                                <div key={r.id} className="flex items-start gap-3">
                                                                    <AvatarSmall name={r.userName} photoUrl={undefined} />
                                                                    <div className="flex-1">
                                                                        <div className="bg-white dark:bg-gray-900/60 rounded-md p-3 border border-gray-200 dark:border-gray-700">
                                                                            <div className="flex items-center justify-between">
                                                                                <div>
                                                                                    <div className="font-semibold text-sm text-gray-900 dark:text-gray-100">{r.userName || "Anonymous"}</div>
                                                                                    <div className="text-xs text-gray-500">{new Date(r.dateCreated).toLocaleString()}</div>
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
                                        ))
                                    ) : (
                                        <div className="text-sm text-gray-500">No comments yet</div>
                                    )}
                                </div>

                                {/* composer */}
                                <div className="mt-4 flex items-center gap-2">
                                    <input value={commentInput} onChange={(e) => setCommentInput(e.target.value)} placeholder={replyingTo ? "Write a reply..." : "Write a comment..."} className="flex-1 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400" />
                                    <button
                                        onClick={() => {
                                            if (!commentInput.trim()) return;
                                            const postId = post.id ?? null;
                                            if (postId == null) {
                                                console.warn("Post id missing");
                                                return;
                                            }
                                            onComment(postId, replyingTo ?? null);
                                        }}
                                        className="p-2 sm:p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700"
                                    >
                                        <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.article>
    );
}


function SimplePostCard({
                            post,
                            onOpenModal,
                        }: {
    post: ReportDTO;
    onOpenModal: () => void;
}) {
    const reactionCount = post.reactions?.length ?? 0;
    const commentCount = post.comments?.length ?? 0;

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow relative">
            <PostMediaCarousel
                media={post.photos ?? []}
                onMediaClick={() => onOpenModal()}
                disableControls={true}
            />
            <div className="absolute bottom-0 right-0 flex gap-4 p-3 text-white bg-black/50 rounded-tl-lg text-sm">
        <span className="flex items-center gap-1">
          <Heart className="w-4 h-4" /> {reactionCount}
        </span>
                <span className="flex items-center gap-1">
          <MessageCircle className="w-4 h-4" /> {commentCount}
        </span>
            </div>
        </div>
    );
}


function PostModal({
                       open,
                       onClose,
                       post,
                       onReact,
                       onComment,
                       onOpenFlag,
                       onOpenShare,
                       onOpenLightbox,
                       activeComment,
                       setActiveComment,
                       commentInput,
                       setCommentInput,
                       replyingTo,
                       setReplyingTo,
                       userId,
                   }: {
    open: boolean;
    onClose: () => void;
    post: ReportDTO | null;
    onReact: (id: number, type: string) => void;
    onComment: (id: number, parentId?: number | null) => void;
    onOpenFlag: (reportId: number | null) => void;
    onOpenShare: (post: ReportDTO) => void;
    onOpenLightbox: (items: ReportPhoto[], idx: number) => void;
    activeComment: number | null;
    setActiveComment: (id: number | null) => void;
    commentInput: string;
    setCommentInput: (v: string) => void;
    replyingTo: number | null;
    setReplyingTo: (id: number | null) => void;
    userId?: string | undefined;
}) {
    if (!open || !post) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="w-full max-w-md sm:max-w-lg md:max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden relative max-h-[90vh] overflow-y-auto"
                    initial={{ y: 20, scale: 0.95 }}
                    animate={{ y: 0, scale: 1 }}
                    exit={{ y: 20, scale: 0.95 }}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 z-20 bg-white/10 hover:bg-white/20 rounded-full p-2 text-gray-900 dark:text-white"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    <PostCard
                        post={post}
                        onReact={onReact}
                        onComment={onComment}
                        onOpenFlag={onOpenFlag}
                        onOpenShare={onOpenShare}
                        onOpenLightbox={onOpenLightbox}
                        activeComment={activeComment}
                        setActiveComment={setActiveComment}
                        commentInput={commentInput}
                        setCommentInput={setCommentInput}
                        replyingTo={replyingTo}
                        setReplyingTo={setReplyingTo}
                        userId={userId}
                    />
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

// -----------------------------
// MyPosts main component
// -----------------------------
export default function MyPosts() {
    const [posts, setPosts] = useState<ReportDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const PAGE_SIZE = 6;

    const [activeCommentPost, setActiveCommentPost] = useState<number | null>(null);
    const [replyingTo, setReplyingTo] = useState<number | null>(null);
    const [commentInput, setCommentInput] = useState("");

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxItems, setLightboxItems] = useState<ReportPhoto[]>([]);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const [flagModalOpen, setFlagModalOpen] = useState(false);
    const [flagTargetId, setFlagTargetId] = useState<number | null>(null);
    const [shareModalOpen, setShareModalOpen] = useState(false);
    const [shareTargetPost, setShareTargetPost] = useState<ReportDTO | null>(null);

    const [selectedPost, setSelectedPost] = useState<ReportDTO | null>(null);

    const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "warning"; duration?: number } | null>(null);
    const currentUserId = localStorage.getItem("userId") ?? undefined;

    const fetchMyPosts = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await getMyReports();
            setPosts(res);
        } catch (err: unknown) {
            console.error("Failed to load MyPosts", err);
            const message = err instanceof Error ? err.message : String(err);
            setError(message || "Failed to load posts");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMyPosts();
    }, []);

    const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
    const currentPosts = useMemo(() => {
        const start = (currentPage - 1) * PAGE_SIZE;
        return posts.slice(start, start + PAGE_SIZE);
    }, [posts, currentPage]);

    const showToast = (message: string, type: "success" | "error" | "warning" = "success", duration = 6) => {
        setToast({ message, type, duration });
    };

    const handleReact = async (id: number, type: string) => {
        try {
            const dto: AddReactionDTO = { ReactionType: type };
            await apiToggleReaction(id, dto);
            await fetchMyPosts();
        } catch (e: unknown) {
            console.error("React failed:", e);
            showToast("Failed to register reaction", "error");
        }
    };

    const handleComment = async (id: number, parentId: number | null = null) => {
        if (!commentInput.trim()) return;
        try {
            const dto: AddCommentDTO = { Content: commentInput.trim(), ParentCommentId: parentId };
            await apiAddComment(id, dto);
            setCommentInput("");
            setReplyingTo(null);
            await fetchMyPosts();
        } catch (e: unknown) {
            console.error("Comment failed:", e);
            showToast("Failed to add comment", "error");
        }
    };

    const openFlagModal = (reportId: number | null) => {
        setFlagTargetId(reportId);
        setFlagModalOpen(true);
    };

    const submitFlag = async (reason: string) => {
        if (!flagTargetId) throw new Error("No target.");
        try {
            const dto: FlagReportDTO = { reportId: flagTargetId, reason };
            await apiFlagReport(dto);
            showToast("Flag submitted", "success");
            await fetchMyPosts();
        } catch (e: unknown) {
            console.error("Flag failed:", e);
            showToast("Failed to submit flag", "error");
        }
    };

    const openShareModal = (post: ReportDTO) => {
        setShareTargetPost(post);
        setShareModalOpen(true);
    };

    /* Lightbox handlers */
    const openLightbox = (items: ReportPhoto[], idx: number) => {
        setLightboxItems(items);
        setLightboxIndex(idx);
        setLightboxOpen(true);
    };
    const closeLightbox = () => setLightboxOpen(false);
    const prevLightbox = () => setLightboxIndex((i) => (i - 1 + lightboxItems.length) % lightboxItems.length);
    const nextLightbox = () => setLightboxIndex((i) => (i + 1) % lightboxItems.length);

    const openPostModal = (post: ReportDTO) => {
        setSelectedPost(post);
        setActiveCommentPost(post.id ?? null);
    };

    const closePostModal = () => {
        setSelectedPost(null);
        setActiveCommentPost(null);
        setCommentInput("");
        setReplyingTo(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 text-center">
                    <h1 className="mb-2 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">My Posts</h1>
                    <p className="text-gray-700 dark:text-gray-300">Posts you created. Click on an image to view full details.</p>
                </div>

                {isLoading ? (
                    <div className="w-full flex items-center justify-center py-20">
                        <Loader2 className="h-7 w-7 animate-spin text-blue-500" />
                    </div>
                ) : error ? (
                    <div className="text-center text-red-600 py-12">{error}</div>
                ) : posts.length === 0 ? (
                    <div className="text-center text-gray-500 py-12">You haven't made any posts yet.</div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentPosts.map((p) => (
                                <SimplePostCard
                                    key={p.id}
                                    post={p}
                                    onOpenModal={() => openPostModal(p)}
                                />
                            ))}
                        </div>

                        {/* pagination */}
                        <div className="mt-6 flex items-center justify-center gap-6">
                            <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className={`flex items-center gap-2 px-4 py-2 rounded-full transition text-sm font-medium ${currentPage === 1 ? "bg-gray-200 text-gray-400" : "bg-gradient-to-r from-blue-600 to-green-600 text-white"}`}>
                                <ChevronLeft className="h-4 w-4" /> Previous
                            </button>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Page {currentPage} of {totalPages}</span>
                            <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className={`flex items-center gap-2 px-4 py-2 rounded-full transition text-sm font-medium ${currentPage === totalPages ? "bg-gray-200 text-gray-400" : "bg-gradient-to-r from-blue-600 to-green-600 text-white"}`}>
                                Next <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </>
                )}
            </div>

            <Lightbox open={lightboxOpen} items={lightboxItems} index={lightboxIndex} onClose={closeLightbox} onPrev={prevLightbox} onNext={nextLightbox} />
            <FlagModal open={flagModalOpen} onClose={() => setFlagModalOpen(false)} onSubmit={submitFlag} reportId={flagTargetId} showToast={(m, t) => showToast(m, t)} />
            <ShareModal open={shareModalOpen} onClose={() => setShareModalOpen(false)} post={shareTargetPost} showToast={(m, t) => showToast(m, t)} />
            <PostModal
                open={!!selectedPost}
                onClose={closePostModal}
                post={selectedPost}
                onReact={handleReact}
                onComment={handleComment}
                onOpenFlag={openFlagModal}
                onOpenShare={openShareModal}
                onOpenLightbox={openLightbox}
                activeComment={activeCommentPost}
                setActiveComment={setActiveCommentPost}
                commentInput={commentInput}
                setCommentInput={setCommentInput}
                replyingTo={replyingTo}
                setReplyingTo={setReplyingTo}
                userId={currentUserId}
            />

            <AnimatePresence>
                {toast && (
                    <motion.div key="toast" initial={{ opacity: 0, x: 50, y: -20 }} animate={{ opacity: 1, x: 0, y: 0 }} exit={{ opacity: 0, x: 50, y: -20 }} transition={{ type: "spring", damping: 20, stiffness: 300 }} className="fixed top-6 right-6 z-50 w-[min(90vw,360px)] bg-white/10 backdrop-blur-md border border-white/20 text-white p-4 rounded-xl shadow-lg flex gap-3 items-start" role="status" aria-live="polite">
                        <div className="flex-none mt-0.5">
                            {toast.type === "success" ? (
                                <svg className="h-6 w-6 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                            ) : toast.type === "error" ? (
                                <svg className="h-6 w-6 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                            ) : (
                                <svg className="h-6 w-6 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8h.01M12 12h.01M12 16h.01" /><circle cx="12" cy="12" r="9" /></svg>
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold">{toast.type === "success" ? "Success" : toast.type === "error" ? "Error" : "Notice"}</p>
                            <p className="mt-0.5 text-sm text-white/90 truncate">{toast.message}</p>

                            <div className="mt-2 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                <motion.div initial={{ width: "100%" }} animate={{ width: 0 }} transition={{ duration: toast.duration ?? 6, ease: "linear" }} onAnimationComplete={() => setToast(null)} className={`h-full ${toast.type === "success" ? "bg-green-400" : toast.type === "error" ? "bg-red-400" : "bg-yellow-400"}`} />
                            </div>
                        </div>

                        <button onClick={() => setToast(null)} className="ml-2 text-sm px-2 py-1 rounded-md bg-white/10 hover:bg-white/20 transition">✕</button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}