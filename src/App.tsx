import React, { useMemo } from 'react';
import { useAppSelector } from './hooks/redux.hook';
import { AppRouter, AuthRouter } from './routes';
import { authState } from './store/slices/authSlice';
import { SecureStorageEnum } from './types/secureStorage.enum';
import secureStorage from './utils/secureStorage';

export default function App() {
  const { status } = useAppSelector(authState);
  const token = secureStorage.getItem(SecureStorageEnum.accessToken);

  const isAuthenticated = token || status;

  const render = useMemo(() => {
    if (isAuthenticated) return <AppRouter />;

    return <AuthRouter />;
  }, [isAuthenticated]);

  return <div className='w-full min-h-screen'>{render}</div>;
}
