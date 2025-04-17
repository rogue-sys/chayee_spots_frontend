import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/home-page/HomePage';
import AddPlacePage from './pages/add-place/AddPlacePage';
import EditPlacePage from './pages/edit-place/EditPlacePage';
import AuthPage from '../src/pages/auth-page/authPage';
import { AuthContext, AuthProvider } from '../src/context/authContext';

const PrivateRoute = ({ element }) => {
  const { user } = useContext(AuthContext);
  console.log('🔒 PrivateRoute check - user:', user);
  return user ? element : <Navigate to="/auth" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/" element={<PrivateRoute element={<HomePage />} />} />
          <Route path="/add" element={<PrivateRoute element={<AddPlacePage />} />} />
          <Route path="/edit/:id" element={<PrivateRoute element={<EditPlacePage />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
