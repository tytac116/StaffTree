import React from 'react';
import { Route, Routes } from  'react-router-dom';
import HomePage from './views/HomePage';
import CompanyRegistration from './views/CompanyRegistration';
import LoginPage from './views/LoginPage';
import HierarchyPage from './views/HierarchyPage';
import CompleteRegistration from './views/CompleteRegistration';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/register-company" element={<CompanyRegistration />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/hierarchy" element={<HierarchyPage />} />
        <Route path="/complete-registration" element={<CompleteRegistration />} />

      </Routes>
    </div>
  );
}

export default App;