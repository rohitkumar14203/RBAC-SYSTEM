import React, { createContext, useContext, useState } from 'react';

// Mock user database
const mockUsers = [
  {
    id: 1,
    email: 'admin@example.com',
    password: 'admin',
    name: 'Admin User',
    role: 'admin',
    permissions: ['read', 'write', 'delete', 'manage_users', 'manage_roles']
  },
  {
    id: 2,
    email: 'editor@example.com',
    password: 'editor',
    name: 'Editor User',
    role: 'editor',
    permissions: ['read', 'write']
  },
  {
    id: 3,
    email: 'viewer@example.com',
    password: 'viewer',
    name: 'Viewer User',
    role: 'viewer',
    permissions: ['read']
  }
];

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    // Find user in mock database
    const foundUser = mockUsers.find(u => u.email === credentials.email && u.password === credentials.password);
    
    if (foundUser) {
      // Remove password from user object before setting in state
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const hasPermission = (permission) => {
    return user?.permissions.includes(permission);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};