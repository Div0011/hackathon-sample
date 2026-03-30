import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RoleState {
  isAdmin: boolean;
  isOrganizer: boolean;
  isVIP: boolean;
}

interface RoleContextType {
  roles: RoleState;
  setRoles: React.Dispatch<React.SetStateAction<RoleState>>;
}

const defaultState: RoleState = {
  isAdmin: true, // Default Admin access ON per user request
  isOrganizer: false,
  isVIP: false,
};

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [roles, setRoles] = useState<RoleState>(defaultState);

  return (
    <RoleContext.Provider value={{ roles, setRoles }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};
