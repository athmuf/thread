'use client';

import {fetchThreads} from '../src/utils/api';

import Thread from '../src/components/Thread';
import {useEffect} from 'react';

export default function Home() {
  useEffect(() => {
    const getThreads = async () => {
      const res = await fetchThreads();
      console.log(res, 'ini res');
    };

    void getThreads();
  }, []);
  return (
    <div>
      <Thread />
    </div>
  );
}
