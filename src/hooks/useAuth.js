// src/hooks/useAuth.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth as useAuthContext } from '../contexts/AuthContext';

export const useAuth = () => {
  const { signIn, signUp, signOut, resetPassword, updatePassword, user } = useAuthContext();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (action, ...args) => {
    setError(null);
    setLoading(true);
    try {
      await action(...args);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const login = (email, password) => handleAuth(signIn, email, password);
  const register = (email, password) => handleAuth(signUp, email, password);
  const logout = () => handleAuth(signOut);
  const forgotPassword = (email) => handleAuth(resetPassword, email);
  const changePassword = (newPassword) => handleAuth(updatePassword, newPassword);

  return {
    user,
    error,
    loading,
    login,
    register,
    logout,
    forgotPassword,
    changePassword,
    isAuthenticated: !!user
  };
};

export default useAuth;