import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Logo, LogoutBtn } from "./index";
import ThemeToggle from "./ui/ThemeToggle";
import MobileNav from "./MobileNav";

const Header = ({ onOpenSearch }) => {
  const { status: authStatus, role } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getNavItems = () => {
    const currentRole = authStatus ? role : 'guest';
    
    switch(currentRole) {
      case 'author':
      case 'admin':
        return [
          { name: "Dashboard", slug: "/dashboard" },
          { name: "Drafts", slug: "/drafts" },
          { name: "Create Post", slug: "/add-post" },
          { name: "Profile", slug: "/profile" }
        ];
      case 'reader':
        return [
          { name: "Home", slug: "/" },
          { name: "Articles", slug: "/all-posts" },
          { name: "Become Author", slug: "/become-author" },
          { name: "Profile", slug: "/profile" }
        ];
      case 'guest':
      default:
        return [
          { name: "Home", slug: "/" },
          { name: "Articles", slug: "/all-posts" },
          { name: "Login", slug: "/login" },
          { name: "Signup", slug: "/signup" },
        ];
    }
  };

  const navItems = getNavItems();

  return (
    <header className="w-full max-w-[var(--page-max-width)] mx-auto px-4 sm:px-6 md:px-12 pt-6 md:pt-12 pb-6">
      <nav className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-6 md:gap-12 min-w-0">
          <Link to="/" className="focus-visible:outline-2 focus-visible:outline-primary-accent shrink-0">
            <Logo />
          </Link>
          
          <ul className="hidden md:flex gap-[20px]">
            {navItems.map((item) => (
                <li key={item.name} className="flex items-center">
                  <button
                    onClick={() => navigate(item.slug)}
                    className={`text-[16px] font-semibold transition-all pb-0.5 border-b-2 cursor-pointer focus-visible:outline-none focus-visible:border-primary-accent
                      ${location.pathname === item.slug 
                          ? "border-primary-accent text-primary-accent" 
                          : "border-transparent text-primary-text hover:border-primary-accent"}`}
                  >
                    {item.name}
                  </button>
                </li>
            ))}
            {authStatus && (
              <li className="flex items-center">
                <LogoutBtn />
              </li>
            )}
          </ul>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Open search"
            className="min-w-11 min-h-11 text-[16px] font-semibold text-primary-text flex items-center justify-center gap-1 cursor-pointer hover:text-primary-accent transition-colors focus-visible:outline-2 focus-visible:outline-primary-accent rounded-[var(--radius-button)]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <span className="hidden sm:inline">Search</span>
          </button>
          
          <ThemeToggle />

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 border-2 border-border bg-surface hover:bg-surface-hover rounded-[var(--radius-button)] gap-1.5 focus-visible:outline-2 focus-visible:outline-primary-accent cursor-pointer"
            aria-label="Open menu"
          >
            <span className="w-5 h-0.5 bg-primary-text" />
            <span className="w-5 h-0.5 bg-primary-text" />
            <span className="w-5 h-0.5 bg-primary-text" />
          </button>
        </div>
      </nav>

      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={navItems}
      />
    </header>
  );
};

export default Header;
