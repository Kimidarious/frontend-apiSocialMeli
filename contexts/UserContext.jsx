import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [activeUserId, setActiveUserId] = useState(null);
  const [activeUserName, setActiveUserName] = useState('');

  const setActiveUser = (userId, userName) => {
    setActiveUserId(userId);
    setActiveUserName(userName);
    localStorage.setItem('activeUserId', userId);
    localStorage.setItem('activeUserName', userName);
  };

  const clearActiveUser = () => {
    setActiveUserId(null);
    setActiveUserName('');
    localStorage.removeItem('activeUserId');
    localStorage.removeItem('activeUserName');
  };

  // Recuperar do localStorage ao carregar
  useState(() => {
    const storedUserId = localStorage.getItem('activeUserId');
    const storedUserName = localStorage.getItem('activeUserName');
    if (storedUserId) {
      setActiveUserId(Number(storedUserId));
      setActiveUserName(storedUserName || '');
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        activeUserId,
        activeUserName,
        setActiveUser,
        clearActiveUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};