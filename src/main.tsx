import React from 'react';
import ReactDOM from 'react-dom/client';
import { PrimeReactProvider } from 'primereact/api';
import { Provider as ReduxProvider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import App from './App';
import { store } from './store';
import './index.css';
import '@/styles/layout/layout.scss';
import '@/styles/demo/Demos.scss';

import { LayoutProvider } from './context/layoutcontext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <LayoutProvider>
            <App />
          </LayoutProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ReduxProvider>
    </PrimeReactProvider>
  </React.StrictMode>
);
