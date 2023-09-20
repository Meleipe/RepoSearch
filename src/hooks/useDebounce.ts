import { useState, useEffect } from 'react';

function useDebounce(value: string, debounceValue: number = 2000) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, debounceValue);
    return () => {
      clearTimeout(timerId);
    };
  }, [value, debounceValue]);
  return debouncedValue;
}

export default useDebounce;
