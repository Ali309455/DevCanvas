import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { APP_COMMANDS } from '../utils/commands';
import { logout } from '../Store/authSlice';
import authService from '../appwrite/auth';

function CommandPaletteModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const authStatus = useSelector((state) => state.auth.status);

  const filteredCommands = useMemo(() => {
    const cleanQuery = query.toLowerCase().trim();
    
    return APP_COMMANDS.filter((command) => {
      if (command.auth === 'guest' && authStatus) return false;
      if (command.auth === 'protected' && !authStatus) return false;

      if (!cleanQuery) return true;
      
      return (
        command.label.toLowerCase().includes(cleanQuery) ||
        command.description.toLowerCase().includes(cleanQuery) ||
        command.keywords.some((keyword) => keyword.toLowerCase().includes(cleanQuery))
      );
    });
  }, [query, authStatus]);

  const executeCommand = (command) => {
    if (!command) return;

    onClose();
    setQuery('');

    if (command.id === 'logout') {
      authService.logout().then(() => {
        dispatch(logout());
        navigate('/login');
      });
    } else {
      navigate(command.route);
    }
  };

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        setQuery('');
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => 
          prev === filteredCommands.length - 1 ? 0 : prev + 1
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => 
          prev === 0 ? filteredCommands.length - 1 : prev - 1
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          executeCommand(filteredCommands[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-start justify-center bg-border/40 p-4 pt-4 sm:pt-[12vh] backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl max-h-[min(80dvh,32rem)] overflow-hidden rounded-[var(--radius-card)] bg-surface border-2 border-border shadow-brutal flex flex-col text-primary-text"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b-2 border-border px-4 py-3">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search..."
            className="h-11 w-full min-w-0 bg-transparent text-primary-text placeholder:text-secondary-text text-base outline-none"
          />
          <kbd className="hidden sm:inline-block shrink-0 rounded bg-soft-accent px-2 py-0.5 text-xs font-semibold text-secondary-text border border-border font-mono">
            ESC
          </kbd>
        </div>

        {filteredCommands.length > 0 ? (
          <ul className="flex-1 overflow-y-auto p-2 space-y-0.5">
            {filteredCommands.map((command, index) => {
              const IconComponent = command.icon;
              const isSelected = index === selectedIndex;
              
              return (
                <li key={command.id}>
                  <button
                    type="button"
                    onClick={() => executeCommand(command)}
                    className={`w-full flex items-center gap-4 rounded-[var(--radius-button)] px-3 py-3 min-h-11 text-left transition-colors duration-150 group cursor-pointer outline-none
                      ${isSelected
                        ? 'bg-soft-accent text-primary-text'
                        : 'hover:bg-surface-hover text-primary-text'}`}
                  >
                    {IconComponent && (
                      <IconComponent className={`h-5 w-5 shrink-0 transition-colors ${isSelected ? 'text-primary-accent' : 'text-secondary-text'}`} />
                    )}
                    
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-medium truncate">
                        {command.label}
                      </span>
                      <span className={`text-xs truncate ${isSelected ? 'text-secondary-text' : 'text-secondary-text'}`}>
                        {command.description}
                      </span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="py-12 text-center text-sm text-secondary-text px-4">
            No active actions discovered for "{query}"
          </div>
        )}

        <div className="flex justify-between items-center bg-surface-hover px-4 py-2.5 text-xs text-secondary-text border-t-2 border-border">
          <div className="hidden sm:flex gap-4 font-mono">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
          </div>
          <span className="sm:hidden font-mono">Tap to select</span>
          <button 
            type="button"
            onClick={onClose}
            className="hover:text-primary-accent transition-colors cursor-pointer font-medium min-h-11 px-2"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

export default CommandPaletteModal;
