'use client';

import { Suspense } from 'react';
import HomeContent from '@/components/cuitin/home-content';
import SkeletonThreads from '@/components/cuitin/threads/skeleton-threads';

export default function Home() {
  return (
    <Suspense fallback={<SkeletonThreads />}>
      <HomeContent />
    </Suspense>
  );
}
