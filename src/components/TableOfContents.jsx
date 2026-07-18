import React from 'react';

const TableOfContents = ({ headings = [], activeHeadingId = "" }) => {
  if (headings.length === 0) {
    return null;
  }
  return (
    <nav className="w-full max-w-xs p-6 border-2 border-border bg-surface rounded-[var(--radius-card)] shadow-brutal">
      <h3 className="mb-4 text-sm font-bold tracking-widest text-primary-text uppercase font-heading flex items-center gap-2">
        <span className="w-2.5 h-2.5 bg-primary-accent inline-block"></span>
        Table of Contents
      </h3>
      <ul className="space-y-2.5 text-sm font-mono">
        {headings.map((heading) => {
          // Dynamic indentation based on level: h2 = pl-0, h3 = pl-4, h4 = pl-8
          const indentClass = heading.level > 2 ? `pl-${(heading.level - 2) * 4}` : 'pl-0';
          const isActive = heading.id === activeHeadingId;

          return (
            <li 
              key={heading.id} 
              className={indentClass}
            >
              <a 
                href={`#${heading.id}`}
                className={`
                  inline-block py-1.5 border-l-4 transition-all duration-200 ease-in-out pl-3 rounded-r-md
                  ${isActive 
                    ? 'border-primary-accent text-primary-accent font-bold bg-soft-accent pr-4' 
                    : 'border-transparent text-secondary-text hover:text-primary-text hover:border-border'
                  }
                `}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default TableOfContents;