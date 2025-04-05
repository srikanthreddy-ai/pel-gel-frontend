import React, { createContext, useContext, useState } from 'react';

// Create the Context
const EmailContext = createContext();

// Create a Provider Component
export const EmailProvider = ({ children }) => {
  const [email, setEmail] = useState(null); // Email state

  return (
    <EmailContext.Provider value={{ email, setEmail }}>
      {children}
    </EmailContext.Provider>
  );
};

// Create a custom hook to use the email context
export const useEmail = () => useContext(EmailContext);
