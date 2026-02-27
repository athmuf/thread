'use client';

import Link from 'next/link';
import { PencilLine } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FloatingButton = () => {
  return (
    <div className="fixed bottom-10 md:right-80 z-50">
      <Link href="/create">
        <Button
          variant="ghost"
          className="shadow-lg hover:shadow-xl transition bg-orange-300 hover:bg-orange-400  rounded-full cursor-pointer text-orange-900"
        >
          <div className="flex justify-center items-center px-6">
            <PencilLine />
            <span className="ml-2 font-semibold">Posting</span>
          </div>
        </Button>
      </Link>
    </div>
  );
};

export default FloatingButton;
