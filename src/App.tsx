import { BrowserRouter, Routes, Route } from 'react-router';
import JobTracker from './pages/JobTracker';
import JobDetails from './pages/JobDetails';
import { JobProvider } from './provider/JobProvider';

export default function App() {
  return (
    <BrowserRouter>
      <JobProvider>
        <Routes>
          <Route path="/" element={<JobTracker />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
        </Routes>
      </JobProvider>
    </BrowserRouter>
  );
}
