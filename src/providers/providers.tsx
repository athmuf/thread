'use client';

import store from '@/app/store';
import { Provider } from 'react-redux';
import { PropsWithChildren } from 'react';

export default function Providers({ children }: PropsWithChildren) {
  return <Provider store={store}>{children}</Provider>;
}
