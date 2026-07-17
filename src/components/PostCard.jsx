import React from 'react';
import dbservice from '../appwrite/dbconfig';
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage, $createdAt, slug }) {
  const formattedDate = $createdAt 
    ? new Date($createdAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    : 'Wednesday, July 23, 2025';

  // Use slug for SEO-friendly URLs, fallback to document ID
  const postPath = `/post/${slug || $id}`;

  return (
    <Link 
      to={postPath} 
      className="block w-full group focus-visible:outline-none"
    >
      <div className="w-full flex flex-col gap-[20px] border-2 border-border rounded-[var(--radius-card)] p-4 sm:p-6 md:p-8 bg-surface shadow-brutal hover:shadow-brutal-accent-hover hover:-translate-y-1 transition-all duration-200">
        <div className="overflow-hidden rounded-[var(--radius-image)] border-2 border-border aspect-[4/3] w-full">
          <img 
            src={dbservice.getFilePreview(featuredImage)} 
            alt={title}
            className="w-full h-full object-cover transition-all duration-300 filter grayscale dark:grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105" 
          />
        </div>
        <div className="flex flex-col gap-[12px] px-1 pb-2">
          <span className="text-[14px] font-mono font-normal text-secondary-text leading-[1.38]">
            {formattedDate}
          </span>
          <h2 className="text-[20px] font-bold font-heading text-primary-text leading-[1.2] uppercase group-hover:text-primary-accent transition-colors line-clamp-2">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;