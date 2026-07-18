import React from 'react'

function Logo({ width = '32', showWordmark = true }) {
  return (
    <div className="flex items-center gap-2 min-w-0">
      <svg
        width={width}
        height={width}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        aria-hidden="true"
      >
        <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="var(--color-glitch-magenta)"/>
        <path d="M2 17L12 22L22 17" stroke="var(--color-glitch-magenta)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="var(--color-glitch-magenta)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      {showWordmark && (
        <div className="hidden sm:flex min-w-0">
          <span className="text-[20px] font-bold text-primary-text leading-none">Dev</span>
          <span className="text-[20px] font-normal text-primary-text leading-none ml-1">Canvas</span>
        </div>
      )}
      <span className="sr-only">Dev Canvas</span>
    </div>
  )
}

export default Logo
