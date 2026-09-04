import { BrowserRouter, Routes, Route } from 'react-router';
import JobTracker from './pages/JobTracker';
import JobDetails from './pages/JobDetails';
import { JobProvider } from './provider/JobProvider';
import { NotificationProvider } from './provider/NotificationProvider';
import ToastContainer from './components/toast/ToastContainer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <NotificationProvider>
          <ToastContainer />
          <JobProvider>
            <Routes>
              <Route path="/" element={<JobTracker />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
            </Routes>
          </JobProvider>
        </NotificationProvider>
      </BrowserRouter>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
