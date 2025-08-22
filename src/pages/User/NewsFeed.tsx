import { useEffect, useRef, useState } from "react";
import {
    MessageCircle,
    Send,
    Share2,
    ArrowLeft,
    ArrowRight,
    Flag,
    X,
    Search,
    MoreHorizontal,
    ImageIcon,
    Facebook,
    Twitter,
    Link,
    Smartphone,
} from "lucide-react";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
    getAllReports,
    addComment,
    toggleReaction,
    flagReport,
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
import type { Toast } from "../../types/AuthTypes";

/* -------------------------------------------------------------------------- */
/*  Small helpers & types                                                      */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*  Lightbox modal                                                             */
/* -------------------------------------------------------------------------- */

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
        // reset when opening different item
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
                // HEAD first (some servers disallow HEAD -> fall back to tiny GET)
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
    const imagePlaceholder = "/images/placeholder.png";
    const videoPlaceholder = "/images/video-placeholder.png";

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
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
                                <img
                                    src={url}
                                    alt="lightbox"
                                    className="max-w-[92vw] max-h-[80vh] object-contain"
                                    onError={(e) => {
                                        (e.currentTarget as HTMLImageElement).src = imagePlaceholder;
                                    }}
                                />
                            ) : isVideoUrl(url) ? (
                                exists === false || mediaError ? (
                                    <img
                                        src={videoPlaceholder}
                                        alt="video placeholder"
                                        className="max-w-[92vw] max-h-[80vh] object-contain"
                                    />
                                ) : (
                                    <video
                                        src={url}
                                        poster={videoPlaceholder}
                                        controls
                                        className="max-w-[92vw] max-h-[80vh] object-contain"
                                        onError={() => setMediaError(true)}
                                    />
                                )
                            ) : (
                                <div className="w-[600px] h-[400px] flex items-center justify-center text-gray-400">
                                    <ImageIcon size={32} />
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

/* -------------------------------------------------------------------------- */
/*  Flag modal                                                                 */
/* -------------------------------------------------------------------------- */

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
    showToast: (msg: string, type: 'success' | 'error' | 'warning') => void;
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
                <motion.div
                    className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6"
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    exit={{ y: 20 }}
                >
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
                            <button
                                onClick={onClose}
                                className="px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={async () => {
                                    if (!reason.trim()) {
                                        showToast("Please provide a reason.", 'warning');
                                        return;
                                    }
                                    setLoading(true);
                                    try {
                                        await onSubmit(reason.trim());
                                        setLoading(false);
                                        onClose();
                                        showToast("Flag submitted. Thank you.", 'success');
                                    } catch (err) {
                                        setLoading(false);
                                        console.error(err);
                                        showToast("Failed to submit flag.", 'error');
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

/* -------------------------------------------------------------------------- */
/*  Share modal                                                                */
/* -------------------------------------------------------------------------- */

function ShareModal({
                        open,
                        onClose,
                        post,
                        showToast,
                    }: {
    open: boolean;
    onClose: () => void;
    post: ReportDTO | null;
    showToast: (msg: string, type: 'success' | 'error' | 'warning') => void;
}) {
    if (!open || !post) return null;

    const shareText = encodeURIComponent(`${post.description || 'Check this out'} at ${post.location || ''}`);
    const shareUrl = encodeURIComponent(window.location.href); // Placeholder, in production use actual post URL

    const shareToFacebook = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${shareText}`, '_blank');
    };

    const shareToTwitter = () => {
        window.open(`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`, '_blank');
    };

    const shareToWhatsApp = () => {
        window.open(`https://wa.me/?text=${shareText}%20${shareUrl}`, '_blank');
    };

    const copyLink = () => {
        navigator.clipboard.writeText(`${window.location.href}?post=${post.id}`);
        showToast('Link copied to clipboard!', 'success');
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="w-full max-w-md bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6"
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    exit={{ y: 20 }}
                >
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Share this post</h3>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={shareToFacebook}
                            className="flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            <Facebook size={20} />
                            Facebook
                        </button>
                        <button
                            onClick={shareToTwitter}
                            className="flex items-center justify-center gap-2 p-3 bg-sky-500 text-white rounded-md hover:bg-sky-600"
                        >
                            <Twitter size={20} />
                            Twitter
                        </button>
                        <button
                            onClick={shareToWhatsApp}
                            className="flex items-center justify-center gap-2 p-3 bg-green-500 text-white rounded-md hover:bg-green-600"
                        >
                            <Smartphone size={20} />
                            WhatsApp
                        </button>
                        <button
                            onClick={copyLink}
                            className="flex items-center justify-center gap-2 p-3 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                        >
                            <Link size={20} />
                            Copy Link
                        </button>
                    </div>

                    <button
                        onClick={onClose}
                        className="mt-4 w-full px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-100"
                    >
                        Close
                    </button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

/* -------------------------------------------------------------------------- */
/*  Comment tree builder                                                       */
/* -------------------------------------------------------------------------- */

interface CommentTree extends ReportComment {
    replies: CommentTree[];
}

function buildCommentTreeTwoPass(comments: ReportComment[]): CommentTree[] {
    const map = new Map<number, CommentTree>();
    // only index comments that have a numeric id
    comments.forEach((c) => {
        if (c.id == null) return; // guard: skip undefined/null ids
        map.set(c.id, { ...c, replies: [] });
    });

    const roots: CommentTree[] = [];
    for (const [, c] of map) {
        if (c.parentCommentId != null) {
            const parent = map.get(c.parentCommentId);
            if (parent) parent.replies.push(c);
            else roots.push(c); // orphan
        } else {
            roots.push(c);
        }
    }
    return roots;
}


/* -------------------------------------------------------------------------- */
/*  Post Media Carousel (open lightbox + video fallback + poster)             */
/* -------------------------------------------------------------------------- */

function PostMediaCarousel({
                               media,
                               onOpenLightbox,
                           }: {
    media: ReportPhoto[];
    onOpenLightbox: (items: ReportPhoto[], index: number) => void;
}) {
    // hooks always declared first
    const [index, setIndex] = useState(0);
    const [resourceOkMap, setResourceOkMap] = useState<Record<number, boolean>>({});
    const probedRef = useRef<Record<number, boolean>>({});

    // probe effect: always called but returns early if no media
    useEffect(() => {
        if (!media || media.length === 0) return;
        let cancelled = false;
        const idx = index;
        const item = media[idx];
        if (!item) return;

        const url = toAbsolute(item.photoUrl);

        // skip if already probed
        if (probedRef.current[idx]) return;

        probedRef.current[idx] = true;

        (async function probe() {
            try {
                // HEAD first
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

    const imgPlaceholder = "/images/placeholder.png";
    const videoPlaceholder = "/images/video-placeholder.png";

    // if no media, show placeholder
    if (!media || media.length === 0) {
        return (
            <div className="w-full h-64 sm:h-72 md:h-96 flex items-center justify-center bg-gray-900/10 dark:bg-gray-800 rounded-lg overflow-hidden">
                <img
                    src={imgPlaceholder}
                    alt="placeholder"
                    className="max-w-full max-h-full object-contain"
                />
            </div>
        );
    }

    const current = media[index];
    const total = media.length;
    const rawUrl = current?.photoUrl ?? "";
    const photoUrl = toAbsolute(rawUrl);

    const showPlaceholderForVideo = resourceOkMap[index] === false;

    return (
        <div className="relative w-full rounded-lg overflow-hidden bg-gray-900/10 dark:bg-gray-800">
            <div className="w-full h-64 sm:h-72 md:h-96 flex items-center justify-center bg-black">
                {isImageUrl(rawUrl) ? (
                    <img
                        src={photoUrl}
                        alt={`media-${index}`}
                        loading="lazy"
                        className="w-full h-full object-cover cursor-zoom-in"
                        onClick={() => onOpenLightbox(media, index)}
                        onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = imgPlaceholder;
                        }}
                    />
                ) : isVideoUrl(rawUrl) ? (
                    showPlaceholderForVideo ? (
                        <img
                            src={videoPlaceholder}
                            alt="video placeholder"
                            className="max-w-full max-h-full object-contain cursor-zoom-in"
                            onClick={() => onOpenLightbox(media, index)}
                        />
                    ) : (
                        <video
                            src={photoUrl}
                            poster={videoPlaceholder}
                            className="w-full h-full object-cover"
                            controls
                            preload="metadata"
                            onError={() => setResourceOkMap((m) => ({ ...m, [index]: false }))}
                            onClick={() => onOpenLightbox(media, index)}
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
                        onClick={() => setIndex((i) => (i - 1 + total) % total)}
                        aria-label="prev"
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-2 shadow"
                    >
                        <ArrowLeft />
                    </button>
                    <button
                        onClick={() => setIndex((i) => (i + 1) % total)}
                        aria-label="next"
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-2 shadow"
                    >
                        <ArrowRight />
                    </button>

                    <div className="absolute left-1/2 -translate-x-1/2 bottom-3 flex gap-2">
                        {media.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setIndex(i)}
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

/* -------------------------------------------------------------------------- */
/*  Post card                                                                  */
/* -------------------------------------------------------------------------- */

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
    const userReactionType = post.reactions.find((r) => r.userId === currentUserId)?.reactionType;
    const userHasReacted = !!userReactionType;
    const commentsTree = buildCommentTreeTwoPass(post.comments);
    const [showReactionPicker, setShowReactionPicker] = useState(false);

    const reactionCounts = post.reactions.reduce((acc, r) => {
        acc[r.reactionType] = (acc[r.reactionType] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const handleMouseEnter = () => setShowReactionPicker(true);
    const handleMouseLeave = () => setShowReactionPicker(false);

    return (
        <motion.article
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-700 overflow-hidden hover:shadow-2xl transition-shadow"
        >
            <div className="p-5">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                        <AvatarSmall name={post.citizenName} photoUrl={post.citizenProfilePicture} />
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-gray-900 dark:text-gray-100">{post.citizenName || "Anonymous"}</h3>
                                <div className="text-xs text-gray-500 dark:text-gray-400">{new Date(post.dateCreated).toLocaleString()}</div>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">{post.location}</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => onOpenFlag(post.id)}
                            className="p-2 rounded-md hover:bg-gray-100/50 dark:hover:bg-white/5"
                            title="Flag report"
                        >
                            <Flag className="text-gray-600 dark:text-gray-200" />
                        </button>
                        <button className="p-2 rounded-md hover:bg-gray-100/50 dark:hover:bg-white/5">
                            <MoreHorizontal className="text-gray-600 dark:text-gray-200" />
                        </button>
                    </div>
                </div>

                <p className="mt-4 text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{post.description || "No description"}</p>

                <div className="mt-4">
                    <PostMediaCarousel media={post.photos ?? []} onOpenLightbox={onOpenLightbox} />
                </div>
            </div>

            <div className="px-6 py-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-700">
                <div className="flex items-center gap-6">
                    {post.reactions.length > 0 && (
                        <div className="flex items-center gap-1">
                            <div className="flex -space-x-2">
                                {Object.entries(reactionCounts).map(([type, count]) => {
                                    const reaction = reactions.find((r) => r.type === type);
                                    if (!reaction || count === 0) return null;
                                    return (
                                        <span key={type} className="text-lg rounded-full bg-gray-100 dark:bg-gray-700/50 border-2 border-gray-50 dark:border-gray-800">
                                            {reaction.emoji}
                                        </span>
                                    );
                                })}
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">{post.reactions.length}</span>
                        </div>
                    )}
                    {post.comments.length > 0 && (
                        <div className="flex items-center gap-1">
                            <MessageCircle className="w-5 h-5 text-gray-600 dark:text-gray-200" />
                            <span className="text-sm text-gray-600 dark:text-gray-300">{post.comments.length}</span>
                        </div>
                    )}
                </div>

                <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 flex items-center gap-6">
                    <div className="relative flex-1" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <button
                            className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg ${userHasReacted ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-300"} hover:bg-gray-100/50 dark:hover:bg-white/5`}
                        >
                            <span className="text-xl">
                                {userReactionType ? reactions.find(r => r.type === userReactionType)?.emoji : '👍'}
                            </span>
                            <span className="text-sm">{userReactionType || 'Like'}</span>
                        </button>
                        <AnimatePresence>
                            {showReactionPicker && (
                                <motion.div
                                    className="absolute bottom-full mb-2 left-0 bg-white dark:bg-gray-800 rounded-full shadow-lg p-2 flex gap-2 z-10"
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
                                            className="p-1 text-3xl hover:scale-125 transition-transform"
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
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-white/5"
                    >
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm">Comment</span>
                    </button>

                    <button
                        onClick={() => onOpenShare(post)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-white/5"
                    >
                        <Share2 className="w-5 h-5" />
                        <span className="text-sm">Share</span>
                    </button>
                </div>

                {/* Comments */}
                <div className="mt-4">
                    <AnimatePresence>
                        {activeComment === post.id && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <div className="max-h-60 overflow-y-auto space-y-3">
                                    {commentsTree.map((c) => (
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
                                                            setActiveComment(post.id ?? null);      // ensure number | null
                                                            setReplyingTo(c.id ?? null);           // ensure number | null
                                                            setCommentInput(`@${c.userName ?? "user"} `);
                                                        }}
                                                        className="text-xs text-blue-500 mt-1"
                                                    >
                                                        Reply
                                                    </button>

                                                </div>

                                                {/* replies */}
                                                {c.replies.length > 0 && (
                                                    <div className="mt-3 ml-8 space-y-3">
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
                                    ))}
                                </div>

                                {/* composer */}
                                <div className="mt-4 flex items-center gap-2">
                                    <input
                                        value={commentInput}
                                        onChange={(e) => setCommentInput(e.target.value)}
                                        placeholder={replyingTo ? "Write a reply..." : "Write a comment..."}
                                        className="flex-1 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
                                    />
                                    <button
                                        onClick={() => {
                                            if (!commentInput.trim()) return;
                                            const postId = post.id ?? null;
                                            if (postId == null) {
                                                console.warn("Post id is missing — cannot add comment.");
                                                return;
                                            }
                                            onComment(postId, replyingTo ?? null);
                                        }}
                                        className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700"
                                    >
                                        <Send />
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

/* -------------------------------------------------------------------------- */
/*  Main NewsFeed                                                              */
/* -------------------------------------------------------------------------- */

export default function NewsFeed() {
    const [posts, setPosts] = useState<ReportDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeCommentPost, setActiveCommentPost] = useState<number | null>(null);
    const [replyingTo, setReplyingTo] = useState<number | null>(null);
    const [commentInput, setCommentInput] = useState("");

    const [search, setSearch] = useState("");
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxItems, setLightboxItems] = useState<ReportPhoto[]>([]);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const [flagModalOpen, setFlagModalOpen] = useState(false);
    const [flagTargetId, setFlagTargetId] = useState<number | null>(null);

    const [shareModalOpen, setShareModalOpen] = useState(false);
    const [shareTargetPost, setShareTargetPost] = useState<ReportDTO | null>(null);

    const [toast, setToast] = useState<Toast | null>(null);

    // read once and pass down
    const currentUserId = localStorage.getItem("userId") ?? undefined;

    const fetchPosts = async () => {
        try {
            setIsLoading(true);
            const res = await getAllReports();
            setPosts(res);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const showToast = (message: string, type: 'success' | 'error' | 'warning' = 'success') => {
        setToast({ message, type });
    };

    const handleReact = async (id: number, type: string) => {
        try {
            const dto: AddReactionDTO = { ReactionType: type };
            await toggleReaction(id, dto);
            fetchPosts();
        } catch (err) {
            console.error("React failed:", err);
        }
    };

    const handleComment = async (id: number, parentId: number | null = null) => {
        if (!commentInput.trim()) return;
        try {
            const dto: AddCommentDTO = { Content: commentInput.trim(), ParentCommentId: parentId };
            await addComment(id, dto);
            setCommentInput("");
            setReplyingTo(null);
            fetchPosts();
        } catch (err) {
            console.error("Comment failed:", err);
        }
    };

    const openFlagModal = (reportId: number | null) => {
        setFlagTargetId(reportId);
        setFlagModalOpen(true);
    };

    const submitFlag = async (reason: string) => {
        if (!flagTargetId) throw new Error("No target.");
        const dto: FlagReportDTO = { reportId: flagTargetId, reason };
        await flagReport(dto);
        await fetchPosts();
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

    /* Search filter */
    const filtered = posts.filter((p) => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return (
            (p.description ?? "").toLowerCase().includes(q) ||
            (p.location ?? "").toLowerCase().includes(q) ||
            (p.citizenName ?? "").toLowerCase().includes(q)
        );
    });

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
            {/* sticky header with search */}
            <div className="sticky top-0 z-40 backdrop-blur-md bg-white/60 dark:bg-gray-900/60 border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-500">CivicHub</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300 hidden sm:block">Community Feed</div>
                    </div>

                    <div className="flex-1">
                        <div className="relative max-w-2xl">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by location, user or text..."
                                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-3">
                        <button className="px-3 py-2 rounded-md bg-blue-600 text-white">New Post</button>
                        <button className="px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800">My Posts</button>
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <header className="text-center mb-6">
                    <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">
                        Community Feed
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">See what's happening in your community — {new Date().toLocaleString()}</p>
                </header>

                {/* feed */}
                <div className="flex flex-col gap-6">
                    {isLoading ? (
                        <div className="w-full flex items-center justify-center py-20">
                            <Loader2 className="h-7 w-7 animate-spin text-blue-500" />
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="text-center text-gray-500 py-12">No posts found.</div>
                    ) : (
                        filtered.map((p) => (
                            <PostCard
                                key={p.id}
                                post={p}
                                userId={currentUserId}
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
                            />
                        ))
                    )}
                </div>
            </div>

            <Lightbox open={lightboxOpen} items={lightboxItems} index={lightboxIndex} onClose={closeLightbox} onPrev={prevLightbox} onNext={nextLightbox} />
            <FlagModal open={flagModalOpen} onClose={() => setFlagModalOpen(false)} onSubmit={submitFlag} reportId={flagTargetId} showToast={showToast} />
            <ShareModal open={shareModalOpen} onClose={() => setShareModalOpen(false)} post={shareTargetPost} showToast={showToast} />

            /* Paste inside your component where `toast` and `setToast` are available */
            <AnimatePresence>
                {toast && (
                    <motion.div
                        key="toast-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
                        aria-live="polite"
                        role="status"
                    >
                        <motion.div
                            key="toast"
                            initial={{ y: -8, opacity: 0, scale: 0.98 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: -8, opacity: 0, scale: 0.98 }}
                            transition={{ type: "spring", damping: 18, stiffness: 300 }}
                            className={`pointer-events-auto w-[min(92vw,760px)] bg-white/6 backdrop-blur-md border border-white/8 text-white p-5 md:p-6 rounded-2xl shadow-2xl flex gap-4 items-start`}
                        >
                            {/* icon */}
                            <div className="flex-none mt-0.5">
                                {toast.type === "success" ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 md:h-8 md:w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : toast.type === "error" ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 md:h-8 md:w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 md:h-8 md:w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01" />
                                        <circle cx="12" cy="12" r="9" />
                                    </svg>
                                )}
                            </div>

                            {/* content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="min-w-0">
                                        <p className="text-sm md:text-base font-semibold">
                                            {toast.title ?? (toast.type === "success" ? "Success" : toast.type === "error" ? "Error" : "Notice")}
                                        </p>
                                        <p className="mt-1 text-sm md:text-[15px] leading-snug text-white/90 truncate">
                                            {toast.message}
                                        </p>
                                    </div>

                                    <div className="flex-shrink-0 ml-2">
                                        <button
                                            onClick={() => setToast(null)}
                                            aria-label="Dismiss notification"
                                            className="px-3 py-1 rounded-md bg-white/10 hover:bg-white/16 text-sm font-medium transition"
                                        >
                                            OK
                                        </button>
                                    </div>
                                </div>

                                {/* progress bar */}
                                <div className="mt-3 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: "100%" }}
                                        animate={{ width: 0 }}
                                        transition={{
                                            duration: toast.duration ?? 10, // seconds (override by attaching a `duration` on toast)
                                            ease: "linear",
                                        }}
                                        onAnimationComplete={() => setToast(null)}
                                        className={`h-full ${toast.type === "success" ? "bg-green-400" : toast.type === "error" ? "bg-red-400" : "bg-yellow-400"}`}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}