'use client';

import { createContext, useContext, useState } from 'react';

const CallContext = createContext();
const VoiceAuthorizedContext = createContext();

export function CallProvider({ children }) {
  const [calls, setCalls] = useState([]);

  return (
    <CallContext.Provider value={{ calls, setCalls }}>
      {children}
    </CallContext.Provider>
  );
}

export function VoiceAuthorizedProvider({ children }) {
  const [voiceAuthorized, setVoiceAuthorized] = useState(false);

  return (
    <VoiceAuthorizedContext.Provider value={{ voiceAuthorized, setVoiceAuthorized }}>
      {children}
    </VoiceAuthorizedContext.Provider>
  );
}

export function useCall() {
  return useContext(CallContext);
}

export function useVoiceAuthorized() {
  return useContext(VoiceAuthorizedContext);
}
