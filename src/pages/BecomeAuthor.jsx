import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateRole } from '../Store/authSlice';
import authService from '../appwrite/auth';
import { Button } from '../components';

export default function BecomeAuthor() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleBecomeAuthor = async () => {
        setLoading(true);
        try {
            await authService.account.updatePrefs({ role: 'author' });
            dispatch(updateRole('author'));
            navigate('/dashboard');
        } catch (error) {
            console.error("Failed to update role:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto py-24 px-6 text-center flex flex-col gap-8 bg-surface rounded-[var(--radius-card)] border-2 border-border shadow-brutal mt-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-primary-text uppercase tracking-tight">Ready to share your voice?</h1>
            <p className="text-lg text-secondary-text font-sans">
                Join our community of writers. Get access to the author dashboard, drafting tools, and start publishing your articles today.
            </p>
            <div className="max-w-sm mx-auto w-full">
                <Button
                    onClick={handleBecomeAuthor}
                    disabled={loading}
                    variant="primary"
                    size="large"
                    className="w-full justify-center shadow-brutal-accent hover:shadow-brutal-accent-hover"
                >
                    {loading ? "Upgrading..." : "Become an Author Now"}
                </Button>
            </div>
        </div>
    );
}