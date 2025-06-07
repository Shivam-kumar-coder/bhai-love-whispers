
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import { LoginForm } from '@/components/auth/LoginForm';
import { SignupForm } from '@/components/auth/SignupForm';
import { Sidebar } from '@/components/layout/Sidebar';
import { Dashboard } from '@/pages/Dashboard';
import { NewOrders } from '@/pages/NewOrders';
import { MyOrders } from '@/pages/MyOrders';
import { Wallet } from '@/pages/Wallet';
import { Support } from '@/pages/Support';
import Index from '@/pages/Index';

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
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/support" element={<Support />} />
          <Route path="/panel" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
};

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<AuthWrapper />} />
      <Route path="/panel/*" element={
        isAuthenticated ? <AppLayout /> : <Navigate to="/auth" replace />
      } />
      <Route path="/dashboard" element={
        isAuthenticated ? <Navigate to="/panel/dashboard" replace /> : <Navigate to="/auth" replace />
      } />
      <Route path="/new-orders" element={
        isAuthenticated ? <Navigate to="/panel/new-orders" replace /> : <Navigate to="/auth" replace />
      } />
      <Route path="/my-orders" element={
        isAuthenticated ? <Navigate to="/panel/my-orders" replace /> : <Navigate to="/auth" replace />
      } />
      <Route path="/wallet" element={
        isAuthenticated ? <Navigate to="/panel/wallet" replace /> : <Navigate to="/auth" replace />
      } />
      <Route path="/support" element={
        isAuthenticated ? <Navigate to="/panel/support" replace /> : <Navigate to="/auth" replace />
      } />
    </Routes>
  );
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
