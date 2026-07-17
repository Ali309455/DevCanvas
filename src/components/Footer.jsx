import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="w-full max-w-[var(--page-max-width)] mx-auto px-4 sm:px-6 md:px-12 py-12">
      <div className="border-t border-hairline-gray w-full mb-6"></div>
      <div className="flex justify-center sm:justify-end">
        <Link to="/all-posts" className="text-[16px] font-semibold text-glitch-magenta flex items-center group min-h-11">
          All Stories
          <span className="ml-1 group-hover:translate-x-1 transition-transform">›</span>
        </Link>
      </div>
    </footer>
  )
}

export default Footer