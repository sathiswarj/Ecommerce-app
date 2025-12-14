import React, { createContext, useState, useEffect, useContext } from 'react';
import { getUserToken, getUserData, saveData, saveObject, removeData } from "../utils/storage"

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await getUserToken();
      const user = await getUserData();
      
      setUserToken(token);
      setUserData(user);
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (token, user) => {
    try {
      await saveData('userToken', token);
      if (user) {
        await saveObject('userData', user);
        if (user.userId) {
          await saveData('userId', user.userId.toString());
        }
        if (user.email) {
          await saveData('userEmail', user.email);
        }
      }
      setUserToken(token);
      setUserData(user);
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await removeData('userToken');
      await removeData('userData');
      await removeData('userId');
      await removeData('userEmail');
      await removeData('loginResponse');
      setUserToken(null);
      setUserData(null);
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  };

  const updateUser = async (user) => {
    try {
      await saveObject('userData', user);
      setUserData(user);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        userData,
        isLoading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};