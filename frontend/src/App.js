import React from 'react';
import { Route, Routes } from  'react-router-dom';
import HomePage from './views/HomePage';
import CompanyRegistration from './views/CompanyRegistration';
import LoginPage from './views/LoginPage';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/register-company" element={<CompanyRegistration />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;