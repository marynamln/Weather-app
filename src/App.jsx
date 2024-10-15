import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import DashboardPage from './DashboardPage';
import Cookies from 'js-cookie';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // return (
  //   <Routes>
  //     <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
  //     <Route
  //       path="/dashboard"
  //       element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />}
  //     />
  //     <Route path="*" element={<Navigate to="/login" />} />
  //   </Routes>
  // );

  useEffect(() => {
    const authCookie = Cookies.get('auth');
    if (authCookie) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
      <Route
        path="/dashboard"
        element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />}
      />
      <Route path="/" element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;