import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Profile() {
    const { userData, role } = useSelector(state => state.auth);

    if (!userData) {
        return <div className="py-24 text-center text-primary-text font-mono text-xl animate-pulse">Loading profile...</div>;
    }

    return (
        <div className="w-full max-w-4xl mx-auto py-12 flex flex-col gap-12 mt-8 md:mt-16">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 border-b-2 border-border pb-12">
                <div className="w-32 h-32 bg-primary-accent flex items-center justify-center border-2 border-border rounded-[var(--radius-card)] shrink-0 relative overflow-hidden group shadow-brutal">
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
                    <span className="text-5xl text-white font-bold uppercase drop-shadow-md">
                        {userData.name ? userData.name.charAt(0) : "U"}
                    </span>
                </div>
                <div className="flex flex-col text-center md:text-left justify-center gap-2 min-w-0">
                    <h1 className="text-3xl sm:text-4xl font-bold font-heading text-primary-text tracking-tight break-words">{userData.name}</h1>
                    <p className="text-base sm:text-lg text-secondary-text font-mono break-all">{userData.email}</p>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-2">
                        <span className="px-3 py-1 bg-border text-background text-xs uppercase tracking-widest font-mono shadow-[2px_2px_0px_0px_var(--color-primary-accent)] rounded-full">
                            {role}
                        </span>
                        {role === 'author' && (
                            <span className="px-3 py-1 border border-primary-accent text-primary-accent text-xs uppercase tracking-widest font-mono font-bold bg-soft-accent rounded-full">
                                Verified
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 md:mt-12">
                <div className="border-2 border-border p-6 rounded-[var(--radius-card)] bg-surface shadow-brutal">
                    <h3 className="text-xs text-secondary-text font-mono uppercase tracking-widest mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary-text inline-block"></span> Member Since
                    </h3>
                    <p className="text-2xl font-bold text-primary-text">
                        {new Date(userData.$createdAt || Date.now()).toLocaleDateString("en-US", { month: 'short', year: 'numeric' })}
                    </p>
                </div>
                
                {role === 'author' && (
                    <>
                        <div className="border-2 border-border p-6 rounded-[var(--radius-card)] bg-surface shadow-brutal group cursor-default">
                            <h3 className="text-xs text-secondary-text font-mono uppercase tracking-widest mb-2 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-primary-accent inline-block group-hover:animate-pulse"></span> Total Posts
                            </h3>
                            <p className="text-3xl font-bold text-primary-text font-heading tracking-tighter">12</p>
                        </div>
                        <div className="border-2 border-border p-6 rounded-[var(--radius-card)] bg-surface shadow-brutal group cursor-default">
                            <h3 className="text-xs text-secondary-text font-mono uppercase tracking-widest mb-2 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-primary-accent inline-block group-hover:animate-pulse"></span> Total Views
                            </h3>
                            <p className="text-3xl font-bold text-primary-text font-heading tracking-tighter">1.2k</p>
                        </div>
                    </>
                )}

                {role !== 'author' && (
                    <div className="col-span-1 md:col-span-2 border-2 border-border p-6 rounded-[var(--radius-card)] bg-surface shadow-brutal flex flex-col md:flex-row items-center justify-between gap-6 hover:border-primary-accent transition-colors relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-2 h-full bg-primary-accent transform origin-left group-hover:scale-x-150 transition-transform"></div>
                        <div className="text-center md:text-left z-10">
                            <h3 className="text-xl font-bold font-heading text-primary-text mb-1 uppercase">Upgrade your account</h3>
                            <p className="text-secondary-text text-sm">Become an author and start publishing your own stories to the world.</p>
                        </div>
                        <Link to="/become-author" className="shrink-0 px-6 py-3 bg-primary-accent text-white font-bold uppercase tracking-widest text-xs hover:bg-border hover:text-background transition-colors z-10 rounded-[var(--radius-button)] shadow-brutal">
                            Upgrade
                        </Link>
                    </div>
                )}
            </div>
            
            <div className="border-2 border-border p-8 rounded-[var(--radius-card)] bg-surface shadow-brutal relative">
                 <h3 className="text-2xl font-bold font-heading text-primary-text mb-8 flex items-center gap-3 uppercase">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                         <circle cx="12" cy="12" r="3"></circle>
                         <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                     </svg>
                     Settings
                 </h3>
                 <div className="flex flex-col gap-6">
                     <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center pb-6 border-b border-gray-200 dark:border-neutral-800 group">
                          <div className="min-w-0">
                              <p className="font-bold font-heading text-primary-text text-lg group-hover:text-primary-accent transition-colors uppercase tracking-tight">Email Notifications</p>
                              <p className="text-sm text-secondary-text font-mono">Receive weekly digests and updates</p>
                          </div>
                          <button type="button" aria-label="Toggle email notifications" className="w-14 h-7 shrink-0 bg-border relative transition-colors cursor-pointer hover:bg-primary-accent rounded-full border border-border">
                              <div className="w-5 h-5 bg-background absolute right-1 top-1 rounded-full"></div>
                          </button>
                     </div>
                     <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center pb-6 border-b border-gray-200 dark:border-neutral-800 group">
                          <div className="min-w-0">
                              <p className="font-bold font-heading text-primary-text text-lg group-hover:text-primary-accent transition-colors uppercase tracking-tight">Two-Factor Authentication</p>
                              <p className="text-sm text-secondary-text font-mono">Add an extra layer of security</p>
                          </div>
                          <button type="button" aria-label="Toggle two-factor authentication" className="w-14 h-7 shrink-0 bg-surface border-2 border-border relative transition-colors cursor-pointer hover:bg-surface-hover rounded-full">
                              <div className="w-5 h-5 bg-border absolute left-1 top-0.5 rounded-full"></div>
                          </button>
                     </div>
                 </div>
            </div>
        </div>
    );
}
