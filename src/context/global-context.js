'use client';

import { createContext, useContext, useState } from 'react';

const CallContext = createContext();

export function CallProvider({ children }) {
  const [calls, setCalls] = useState([]);

  return (
    <CallContext.Provider value={{ calls, setCalls }}>
      {children}
    </CallContext.Provider>
  );
}

export function useCall() {
  return useContext(CallContext);
}