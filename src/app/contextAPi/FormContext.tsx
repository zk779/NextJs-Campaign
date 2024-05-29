"use client"
import React, { createContext, useReducer, ReactNode, FC, useContext } from 'react';
import { formReducer } from './formReducer';
import { initialAppState, AppState } from './formInitialState';

interface FormContextProps {
  state: AppState;
  dispatch: React.Dispatch<any>;
}

export const FormContext = createContext<FormContextProps | undefined>(undefined);

interface FormProviderProps {
  children: ReactNode;
}

export const FormProvider: FC<FormProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, initialAppState);

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
