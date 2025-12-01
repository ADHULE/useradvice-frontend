import { useEffect } from "react";

const useKeyboard = (key, callback) => {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === key) callback(e);
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [key, callback]);
};

export default useKeyboard;
