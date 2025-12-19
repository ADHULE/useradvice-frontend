// src/context/LanguageContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import useLanguage from "../hooks/useLanguage";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const languageHook = useLanguage();

  return (
    <LanguageContext.Provider value={languageHook}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error(
      "useLanguageContext must be used within a LanguageProvider"
    );
  }
  return context;
};
