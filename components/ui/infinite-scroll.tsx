'use client';

import { useEffect, useRef } from 'react';

type InfiniteScrollProps = {
  next: () => void;
  hasMore: boolean;
  isLoading: boolean;
  threshold?: number;
  rootMargin?: string;
  children?: React.ReactNode;
};

export default function InfiniteScroll({
  next,
  hasMore,
  isLoading,
  threshold = 0.7,
  rootMargin = '0px 0px 150px 0px',
  children,
}: InfiniteScrollProps) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore || isLoading || !sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          next();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, isLoading, next, threshold, rootMargin]);

  return (
    <div ref={sentinelRef} className="w-full">
      {children}
    </div>
  );
}
