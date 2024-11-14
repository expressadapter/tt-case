'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

type State = {
  uploadedFile: string | null;
};

type Action = { type: 'SET_UPLOADED_FILE'; payload: string | null };

const initialState: State = {
  uploadedFile: null,
};

function appReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_UPLOADED_FILE':
      return { ...state, uploadedFile: action.payload };
    default:
      return state;
  }
}

const AppContext = createContext<
  | {
      state: State;
      dispatch: React.Dispatch<Action>;
    }
  | undefined
>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
