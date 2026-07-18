import { useEffect, useState } from "react";

export default function useScrollProgress(ref) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();

      // Absolute position of article
      const articleTop = window.scrollY + rect.top;
      const articleBottom = articleTop + element.offsetHeight;
        
      // Current reading position (middle of viewport)
      const current = window.scrollY + window.innerHeight ;
      const percentage = ((current - articleTop) / (articleBottom - articleTop)) * 100;

      setProgress(Math.max(0, Math.min(100, percentage)));
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [ref]);
  return progress;
}