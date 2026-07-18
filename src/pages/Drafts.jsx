import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import dbservice from '../appwrite/dbconfig';
import ArticleCardSkeleton from '../components/skeleton/ArticleCardSkeleton';
import EmptyState from '../components/feedback/EmptyState';
import ErrorState from '../components/feedback/ErrorState';

export default function Drafts() {
    const { userData } = useSelector(state => state.auth);
    const [drafts, setDrafts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDrafts = () => {
        if (!userData?.$id) return;
        setLoading(true);
        setError(null);
        dbservice.listDrafts(userData.$id)
            .then(data => {
                if (data && data.rows) {
                    setDrafts(data.rows);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load drafts:", err);
                setError("Failed to download drafts database stream.");
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchDrafts();
    }, [userData?.$id]);

    if (loading) {
        return (
            <div className="w-full max-w-4xl mx-auto py-12 flex flex-col gap-8">
                <h1 className="text-3xl sm:text-4xl font-bold font-heading text-primary-text uppercase tracking-tight">Your Drafts</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ArticleCardSkeleton />
                    <ArticleCardSkeleton />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full py-24 flex items-center justify-center">
                <ErrorState
                    title="Drafts Sync Failed"
                    description={error}
                    onRetry={fetchDrafts}
                />
            </div>
        );
    }

    if (drafts.length === 0) {
        return (
            <div className="w-full py-24 flex items-center justify-center">
                <EmptyState
                    title="No Drafts Saved"
                    description="You don't have any saved drafts in progress."
                    actionLabel="Write New Article"
                    actionHref="/add-post"
                    icon={
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                    }
                />
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto py-12 flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 border-b-2 border-border pb-4">
                <h1 className="text-3xl sm:text-4xl font-bold font-heading text-primary-text uppercase tracking-tight">Your Drafts</h1>
                <span className="font-mono text-sm text-secondary-text">// Total: {drafts.length} drafts</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {drafts.map((draft) => {
                    const formattedDate = draft.$createdAt 
                        ? new Date(draft.$createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                        : 'Unsaved Date';

                    return (
                        <Link 
                            key={draft.$id} 
                            to={`/edit-post/${draft.slug || draft.$id}`}
                            className="border-2 border-border p-6 rounded-[var(--radius-card)] bg-surface shadow-brutal hover:shadow-brutal-accent-hover hover:-translate-y-1 transition-all flex flex-col gap-4 group"
                        >
                            <div className="flex justify-between items-start">
                                <span className="px-2 py-0.5 border-2 border-border rounded-full text-xs font-mono font-bold uppercase tracking-widest text-primary-accent bg-soft-accent group-hover:bg-primary-accent group-hover:text-white transition-colors duration-200">
                                    // {draft.category}
                                </span>
                                <span className="text-xs font-mono text-secondary-text">{formattedDate}</span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold font-heading text-primary-text leading-tight group-hover:text-primary-accent transition-colors line-clamp-2 uppercase tracking-tight">
                                    {draft.title || "[ Untitled Draft ]"}
                                </h2>
                                <p className="text-sm text-secondary-text font-sans mt-2 line-clamp-2">
                                    {draft.content ? draft.content.replace(/<[^>]*>/g, '') : "No content text started yet."}
                                </p>
                            </div>
                            <div className="mt-auto pt-4 border-t border-gray-100 dark:border-neutral-800 text-sm font-mono text-primary-accent flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                Resume Editing
                                <span>→</span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
