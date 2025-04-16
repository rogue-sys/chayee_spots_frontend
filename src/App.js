import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home-page/HomePage';
import AddPlacePage from './pages/add-place/AddPlacePage';
import EditPlacePage from './pages/edit-place/EditPlacePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddPlacePage />} />
        <Route path="/edit/:id" element={<EditPlacePage />} />
      </Routes>
    </Router>
  );
};

export default App;
