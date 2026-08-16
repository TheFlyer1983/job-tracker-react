import { BrowserRouter, Routes, Route } from "react-router";
import JobTracker from "./pages/JobTracker";
import JobDetails from "./pages/JobDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JobTracker />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
