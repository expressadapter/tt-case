import { useState } from 'react';

const useSessionStorageState = (key: string, initialValue: any = null) => {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') return initialValue;

    try {
      const storedValue = sessionStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error('Error reading from sessionStorage:', error);
      return initialValue;
    }
  });

  const setStorageValue = (newValue: any) => {
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

export default useSessionStorageState;
