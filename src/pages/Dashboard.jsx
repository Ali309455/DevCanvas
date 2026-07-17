import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    return (
        <div className="w-full max-w-4xl mx-auto py-12 px-4 flex flex-col gap-8">
            <h1 className="text-4xl font-bold font-heading text-primary-text uppercase tracking-tight">Author Dashboard</h1>
            <p className="text-lg text-secondary-text font-mono border-l-4 border-primary-accent pl-4">
                Welcome to your author dashboard. From here you can manage your content and draft new streams.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <Link to="/add-post" className="border-2 border-border p-6 rounded-[var(--radius-card)] shadow-brutal hover:shadow-brutal-accent-hover hover:-translate-y-1 hover:border-primary-accent transition-all bg-surface block">
                    <h2 className="text-2xl font-bold font-heading mb-2 text-primary-text uppercase tracking-tight">Create New Post</h2>
                    <p className="text-secondary-text font-sans">Start writing a new article for your readers.</p>
                </Link>
                <Link to="/drafts" className="border-2 border-border p-6 rounded-[var(--radius-card)] shadow-brutal hover:shadow-brutal-accent-hover hover:-translate-y-1 hover:border-primary-accent transition-all bg-surface block">
                    <h2 className="text-2xl font-bold font-heading mb-2 text-primary-text uppercase tracking-tight">Manage Drafts</h2>
                    <p className="text-secondary-text font-sans">Continue working on your unpublished articles.</p>
                </Link>
            </div>
        </div>
    );
}
