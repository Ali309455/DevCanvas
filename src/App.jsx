import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import authService from './appwrite/auth';
import { login, logout } from './Store/authSlice';
import { useKeyboardShortcut, useCommandPalette } from './hooks/';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import { CommandPaletteModal } from './components';
import './index.css';

function AppContent() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { isOpen, close, toggle } = useCommandPalette();
  useKeyboardShortcut(toggle);

  useEffect(() => {
    authService.getCurrentUser().then((useData) => {
      if (useData) {
        dispatch(login(useData));
      } else {
        dispatch(logout());
      }
    }).catch((error) => {
        console.log("Get Current User Error: ", error);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center gap-4">
          {/* Branded loading — animated typing lines */}
          <div className="flex flex-col gap-3 w-64">
            <div className="h-4 bg-surface-hover rounded-full overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-accent/20 to-transparent" style={{ animation: 'shimmer 1.5s infinite' }} />
            </div>
            <div className="h-4 bg-surface-hover rounded-full w-48 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-accent/20 to-transparent" style={{ animation: 'shimmer 1.5s infinite 0.15s' }} />
            </div>
            <div className="h-4 bg-surface-hover rounded-full w-56 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-accent/20 to-transparent" style={{ animation: 'shimmer 1.5s infinite 0.3s' }} />
            </div>
          </div>
          <p className="text-secondary-text font-mono text-sm mt-4 animate-pulse">Loading Glitch Blog...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-background text-primary-text flex flex-col transition-colors duration-200">
      <Header onOpenSearch={toggle} />
      <main className="w-full max-w-[var(--page-max-width)] mx-auto px-4 sm:px-6 md:px-12 flex-grow">
        <Outlet/>
      </main>
      <Footer /> 
      <CommandPaletteModal isOpen={isOpen} onClose={close} />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App
