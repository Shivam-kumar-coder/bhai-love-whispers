
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import { LoginForm } from '@/components/auth/LoginForm';
import { SignupForm } from '@/components/auth/SignupForm';
import { Sidebar } from '@/components/layout/Sidebar';
import { Dashboard } from '@/pages/Dashboard';
import { NewOrders } from '@/pages/NewOrders';

const AuthWrapper: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, signup } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      {isLogin ? (
        <LoginForm
          onLogin={login}
          onSwitchToSignup={() => setIsLogin(false)}
        />
      ) : (
        <SignupForm
          onSignup={signup}
          onSwitchToLogin={() => setIsLogin(true)}
        />
      )}
    </div>
  );
};

const AppLayout: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div className="flex h-screen bg-background">
      <Sidebar onLogout={logout} />
      <main className="flex-1 overflow-y-auto p-6">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/new-orders" element={<NewOrders />} />
          <Route path="/my-orders" element={<div>My Orders - Coming Soon</div>} />
          <Route path="/wallet" element={<div>Wallet - Coming Soon</div>} />
          <Route path="/support" element={<div>Support - Coming Soon</div>} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
};

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <AppLayout /> : <AuthWrapper />;
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
        <Toaster />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
