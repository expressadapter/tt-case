import { useState, useEffect } from "react";

const useSessionStorage = (key: string, initialValue = null) => {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') return initialValue;
    
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from sessionStorage:', error);
      return initialValue;
    }
  });

  const setStorageValue = (newValue:any) => {
    try {
      setValue(newValue);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(key, JSON.stringify(newValue));
      }
    } catch (error) {
      console.error('Error writing to sessionStorage:', error);
    }
  };

  return [value, setStorageValue];
};

export default useSessionStorage;