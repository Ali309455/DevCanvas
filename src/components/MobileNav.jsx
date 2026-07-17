import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import LogoutBtn from "./LogoutBtn";

export default function MobileNav({ isOpen, onClose, navItems }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { status: authStatus } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  const handleNavigate = (slug) => {
    navigate(slug);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40 md:hidden"
          />

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 bg-surface border-t-2 border-border p-6 z-50 md:hidden flex flex-col gap-6 rounded-t-[var(--radius-card)] shadow-[0_-8px_24px_rgba(0,0,0,0.1)] max-h-[85dvh] overflow-y-auto pb-[max(1.5rem,env(safe-area-inset-bottom))]"
          >
            <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-neutral-800">
              <span className="font-heading font-bold text-xl text-primary-text">// NAVIGATION</span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="min-w-11 min-h-11 flex items-center justify-center border-2 border-border bg-surface rounded-[var(--radius-button)] font-bold text-primary-text hover:bg-surface-hover"
              >
                ✕
              </button>
            </div>

            <ul className="flex flex-col gap-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <button
                    type="button"
                    onClick={() => handleNavigate(item.slug)}
                    className={`w-full text-left min-h-11 py-2 text-lg font-semibold border-b-2 transition-all 
                      ${location.pathname === item.slug
                        ? "border-primary-accent text-primary-accent"
                        : "border-transparent text-primary-text hover:border-primary-accent"
                      }`}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
              {authStatus && (
                <li className="pt-4 border-t border-gray-200 dark:border-neutral-800 flex justify-end">
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
