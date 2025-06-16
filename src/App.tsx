import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import { Dashboard } from './components/Dashboard';
import MainRoutes from './MainRoutes';

export const App = () => (
  <TaskProvider>
    <Router>
      <Routes>
      <Route path="/" element={<MainRoutes />}>
        <Route index element={<Dashboard />} /> 
        <Route path="completed" element={<Dashboard />} />
        <Route path="all" element={<Dashboard />} />
      </Route>
    </Routes>
    </Router>
  </TaskProvider>
);

export default App;