import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue = null) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key)) || initialValue;
    } catch (err) {
      console.error("Error accessing localStorage:", err);
      return initialValue;
    }
  });

  useEffect(() => {
    if (storedValue === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(storedValue));
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
