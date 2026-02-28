'use client';

import store from '@/app/store';
import { Provider } from 'react-redux';
import { PropsWithChildren } from 'react';
import { AuthInitializer } from './auth-initializer';
import { Toaster } from '@/components/ui/sonner';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      <AuthInitializer />
      {children}
      <Toaster position="top-center" />
    </Provider>
  );
}
