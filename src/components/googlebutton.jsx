// import { ArrowUpRight } from "lucide-react";

export default function GoogleButton({
  onClick,
  loading = false,
  className = "",
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className={`
        group relative w-full
        flex items-center justify-center gap-3
        h-14 px-6

        border-2 border-black dark:border-white
        bg-white dark:bg-zinc-900

        text-black dark:text-white
        font-semibold tracking-wide

        shadow-[6px_6px_0px_#000]
        dark:shadow-[6px_6px_0px_#fff]

        transition-all duration-150

        hover:-translate-x-[2px]
        hover:-translate-y-[2px]

        hover:shadow-[8px_8px_0px_#000]
        dark:hover:shadow-[8px_8px_0px_#fff]

        active:translate-x-[4px]
        active:translate-y-[4px]
        active:shadow-none

        disabled:opacity-70
        disabled:cursor-not-allowed

        ${className}
      `}
    >
      {/* Google Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="22"
        height="22"
        className="transition-transform duration-200 group-hover:rotate-6"
      >
        <path
          fill="#FFC107"
          d="M43.611 20.083H42V20H24v8h11.303C33.651 32.657 29.197 36 24 36c-6.627 0-12-5.373-12-12S17.373 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.27 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
        />
        <path
          fill="#FF3D00"
          d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.27 4 24 4c-7.682 0-14.347 4.337-17.694 10.691z"
        />
        <path
          fill="#4CAF50"
          d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.141 35.091 26.715 36 24 36c-5.176 0-9.617-3.319-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
        />
        <path
          fill="#1976D2"
          d="M43.611 20.083H42V20H24v8h11.303c-.793 2.31-2.262 4.295-4.084 5.57l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
        />
      </svg>

      {/* Text */}
      <span className="relative overflow-hidden">
        {loading ? (
          <span className="animate-pulse tracking-widest">
            AUTHENTICATING...
          </span>
        ) : (
          <>
            Continue with Google
            <span className="opacity-0 group-hover:opacity-100 text-cyan-500 transition-opacity">
              _
            </span>
          </>
        )}
      </span>

      {/* Arrow */}
      {/* {!loading && (
        <ArrowUpRight
          size={18}
          className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      )} */}
    </button>
  );
}