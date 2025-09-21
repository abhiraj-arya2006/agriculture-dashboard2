import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const { isAuthenticated = false, loading = false } = useAuth() || {};

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }
  return (
    <Routes>
      <Route 
        path="/" 
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <AuthPage />} 
      />
      <Route 
        path="/auth" 
        element={!isAuthenticated ? <AuthPage /> : <Navigate to="/dashboard" replace />} 
      />
      <Route 
        path="/dashboard" 
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/auth" replace />} 
      />
      <Route 
        path="*" 
        element={<Navigate to="/" replace />} 
      />
    </Routes>
  )
}

export default App