export default function ReadingProgressBar({ progress }) {
  return (
    <div className="fixed top-0 left-0 z-50 h-1 w-full bg-transparent">
      <div
        className="h-full bg-glitch-magenta  transition-[width] duration-500 ease-in-out rounded-full"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}