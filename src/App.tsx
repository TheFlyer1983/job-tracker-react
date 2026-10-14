import { BrowserRouter, Routes, Route } from 'react-router';
import JobTracker from './pages/JobTracker';
import JobDetails from './pages/JobDetails';
import { NotificationProvider } from './provider/NotificationProvider';
import ToastContainer from './components/toast/ToastContainer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ProtectedLayouts } from './components/auth/ProtectedLayouts';
import Login from './pages/Login';
import Register from './pages/Register';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <NotificationProvider>
          <Routes>
            <Route element={<ProtectedLayouts />}>
              <Route path="/" element={<JobTracker />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Register />} />
          </Routes>

          <ToastContainer />
        </NotificationProvider>
      </BrowserRouter>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
