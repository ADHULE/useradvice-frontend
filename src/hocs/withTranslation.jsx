// src/hocs/withTranslation.jsx
import React from "react";
import { useLanguageContext } from "../context/LanguageContext";

export const withTranslation = (WrappedComponent) => {
  return (props) => {
    const { t } = useLanguageContext();
    return <WrappedComponent {...props} t={t} />;
  };
};
