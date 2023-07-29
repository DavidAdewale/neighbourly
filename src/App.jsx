import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DarkModeProvider } from './context/DarkModeContext';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import GlobalStyles from './styles/GlobalStyles';
import AppLayout from './ui/AppLayout';
import Dashboard from './pages/Dashboard';
import { Toaster } from 'react-hot-toast';
import SignUp from './pages/SignUp';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <GlobalStyles />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route element={<AppLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-right"
          gutter={12}
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            success: { duration: 3000 },
            error: { duration: 5000 },
            style: {
              fontSize: '14px',
              maxWidth: '500px',
              padding: '14px 22px',
              backgroundColor: 'var(--color-bg)',
              color: 'var(--color-text)',
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
