import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import Dashboard from './pages/Dashboard';

// Placeholder components for routes we haven't built yet
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="p-12 text-center">
    <h2 className="text-2xl font-bold text-slate-300">{title}</h2>
    <p className="text-slate-500 mt-2">This feature is coming soon.</p>
  </div>
);

function App() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-slate-500">Loading...</div>}>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<Dashboard />} />
          <Route path="jobs" element={<PlaceholderPage title="Job Management" />} />
          <Route path="candidates" element={<PlaceholderPage title="Candidate Database" />} />
          <Route path="schedule" element={<PlaceholderPage title="Interview Schedule" />} />
          <Route path="analytics" element={<PlaceholderPage title="Analytics & Reports" />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
