import { useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const stored = localStorage.getItem(key);
  const [value, setValue] = useState(
    stored ? JSON.parse(stored) : initialValue
  );

  const updateValue = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, updateValue];
};

export default useLocalStorage;
