import React, { createContext, useContext, ReactNode } from 'react';
import { useAuth, UserRole } from './AuthContext';

interface RoleState {
  isAdmin: boolean;
  isOrganizer: boolean;
  role: UserRole | null;
}

interface RoleContextType {
  roles: RoleState;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();

  const roles: RoleState = {
    isAdmin: currentUser?.role === 'admin',
    isOrganizer: currentUser?.role === 'organiser',
    role: currentUser?.role ?? null,
  };

  return (
    <RoleContext.Provider value={{ roles }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) throw new Error('useRole must be used within a RoleProvider');
  return context;
};
