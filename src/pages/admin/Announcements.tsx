import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Pencil, X, Eye } from 'lucide-react';
import AdminLayout from '../../components/Layout/AdminLayout';
import type { AnnouncementDTO } from '../../types/AuthTypes';
import {
    getAnnouncements,
    createAnnouncement,
    editAnnouncement,
    deleteAnnouncement,
    getAnnouncementById,
    getCurrentUserRole,
} from '../../services/authService';

const formatDate = (iso?: string) => {
    if (!iso) return '';
    try {
        const d = new Date(iso);
        return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    } catch {
        return iso;
    }
};

const Announcements: React.FC = () => {
    const [announcements, setAnnouncements] = useState<AnnouncementDTO[]>([]);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{ type: 'success'|'error'; message: string } | null>(null);

    // modal state
    const [isOpen, setIsOpen] = useState(false);
    const [editing, setEditing] = useState<AnnouncementDTO | null>(null);
    const [viewing, setViewing] = useState<AnnouncementDTO | null>(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const role = getCurrentUserRole();
    const isAdmin = !!role && role.toLowerCase() === 'admin';


    // initial load
    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const list = await getAnnouncements();
                const normalized = (list || []).map(a => ({
                    ...a,
                    dateCreated: a.dateCreated ?? undefined,
                }));
                setAnnouncements(normalized);
            } catch (err) {
                console.error(err);
                setToast({ type: 'error', message: 'Failed to load announcements' });
                setTimeout(() => setToast(null), 3000);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    // open create modal
    const openCreate = () => {
        setEditing(null);
        setTitle('');
        setContent('');
        setIsOpen(true);
    };

    // open edit modal (only if id exists)
    const openEdit = (ann: AnnouncementDTO) => {
        if (!ann.id) {
            setToast({ type: 'error', message: 'This announcement is read-only (no ID provided).' });
            setTimeout(() => setToast(null), 2500);
            return;
        }
        setEditing(ann);
        setTitle(ann.title ?? '');
        setContent(ann.content ?? '');
        setIsOpen(true);
    };

    const openView = async (ann: AnnouncementDTO) => {
        if (ann.id) {
            try {
                const fresh = await getAnnouncementById(ann.id);
                setViewing(fresh);
                return;
            } catch {
                // fallback to local
            }
        }
        setViewing(ann);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            setToast({ type: 'error', message: 'Title and content are required.' });
            setTimeout(() => setToast(null), 2500);
            return;
        }
        setLoading(true);
        try {
            const dto: AnnouncementDTO = { title: title.trim(), content: content.trim() };
            if (editing && editing.id) {
                const res = await editAnnouncement(editing.id, dto);
                // optimistic update: update local state
                setAnnouncements(prev => prev.map(x => (x.id === editing.id ? { ...x, ...dto } : x)));
                setToast({ type: 'success', message: res?.message ?? 'Announcement updated.' });
            } else {
                const res = await createAnnouncement(dto);
                // server returns id - insert new announcement at the top
                const newItem: AnnouncementDTO = {
                    id: typeof res?.id === 'number' ? res.id : undefined,
                    title: dto.title,
                    content: dto.content,
                    dateCreated: (new Date()).toISOString(),
                    createdBy: undefined,
                };
                setAnnouncements(prev => [newItem, ...prev]);
                setToast({ type: 'success', message: res?.message ?? 'Announcement created.' });
            }
            setIsOpen(false);
        } catch (err) {
            console.error(err);
            setToast({ type: 'error', message: (err as Error)?.message ?? 'Operation failed.' });
        } finally {
            setLoading(false);
            setEditing(null);
            setTimeout(() => setToast(null), 3000);
        }
    };

    const handleDelete = async (ann: AnnouncementDTO) => {
        if (!ann.id) {
            setToast({ type: 'error', message: 'Cannot delete: announcement has no ID.' });
            setTimeout(() => setToast(null), 2500);
            return;
        }
        if (!confirm('Are you sure you want to delete this announcement?')) return;
        setLoading(true);
        try {
            const res = await deleteAnnouncement(ann.id);
            setAnnouncements(prev => prev.filter(x => x.id !== ann.id));
            setToast({ type: 'success', message: res?.message ?? 'Announcement deleted.' });
        } catch (err) {
            console.error(err);
            setToast({ type: 'error', message: (err as Error)?.message ?? 'Delete failed.' });
        } finally {
            setLoading(false);
            setTimeout(() => setToast(null), 2500);
        }
    };

    return (
        <AdminLayout>
            <div className="min-h-screen p-6 bg-gradient-to-br from-slate-50 to-sky-50 dark:from-slate-900 dark:to-sky-800 text-slate-900 dark:text-slate-100">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-extrabold text-sky-700 dark:text-sky-300">Announcements</h1>
                        <p className="text-sm text-slate-500 mt-1">Manage system-wide announcements and push updates to users.</p>
                    </div>

                    {isAdmin ? (
                        <button onClick={openCreate} className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg shadow">
                            <Plus className="w-4 h-4" /> New Announcement
                        </button>
                    ) : (
                        <div className="text-sm text-slate-500">You do not have permission to manage announcements.</div>
                    )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {loading && announcements.length === 0 ? (
                        <div className="text-sm text-slate-500">Loading announcements…</div>
                    ) : announcements.length === 0 ? (
                        <div className="text-sm text-slate-500">No announcements available.</div>
                    ) : announcements.map(ann => (
                        <article key={ann.id ?? ann.title} className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700">
                            <div className="flex justify-between items-start gap-3">
                                <div>
                                    <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{ann.title}</h2>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                        {formatDate(ann.dateCreated)}{ann.createdBy ? ` • ${ann.createdBy}` : ''}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => openView(ann)} title="View" className="p-1">
                                        <Eye className="w-4 h-4 text-slate-500" />
                                    </button>
                                    {isAdmin && (
                                        <>
                                            <button onClick={() => openEdit(ann)} title="Edit" className="p-1">
                                                <Pencil className="w-4 h-4 text-slate-500" />
                                            </button>
                                            <button onClick={() => handleDelete(ann)} title="Delete" className="p-1">
                                                <Trash2 className="w-4 h-4 text-slate-500" />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                            <p className="text-slate-700 dark:text-slate-300 mt-3 line-clamp-4">{ann.content}</p>
                        </article>
                    ))}
                </div>

                {/* Create / Edit Modal */}
                {isOpen && (
                    <div className="fixed inset-0 z-40 flex items-center justify-center px-4">
                        <div className="absolute inset-0 bg-black/40" onClick={() => setIsOpen(false)} />
                        <form onSubmit={handleSubmit} className="relative z-50 w-full max-w-2xl bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{editing ? 'Edit Announcement' : 'New Announcement'}</h3>
                                <button type="button" onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-slate-700">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-slate-600 dark:text-slate-300 mb-1">Title</label>
                                    <input value={title} onChange={e => setTitle(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900" placeholder="Short, descriptive title" />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-600 dark:text-slate-300 mb-1">Content</label>
                                    <textarea value={content} onChange={e => setContent(e.target.value)} rows={6} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900" placeholder="Full announcement body" />
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end items-center gap-3">
                                <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 rounded-lg text-sm">Cancel</button>
                                <button type="submit" disabled={loading} className={`px-4 py-2 rounded-lg text-sm text-white ${loading ? 'bg-slate-400' : 'bg-sky-600 hover:bg-sky-700'}`}>
                                    {loading ? 'Saving...' : (editing ? 'Save Changes' : 'Post Announcement')}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* View modal */}
                {viewing && (
                    <div className="fixed inset-0 z-40 flex items-center justify-center px-4">
                        <div className="absolute inset-0 bg-black/40" onClick={() => setViewing(null)} />
                        <div className="relative z-50 w-full max-w-2xl bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{viewing.title}</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{formatDate(viewing.dateCreated)}{viewing.createdBy ? ` • ${viewing.createdBy}` : ''}</p>
                                </div>
                                <button onClick={() => setViewing(null)} className="text-slate-500 hover:text-slate-700">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="mt-4 text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{viewing.content}</div>
                        </div>
                    </div>
                )}

                {toast && (
                    <div className={`fixed right-6 bottom-6 z-50 px-4 py-3 rounded-lg shadow-md ${toast.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'}`}>
                        {toast.message}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default Announcements;
