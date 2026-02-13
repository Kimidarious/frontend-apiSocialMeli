import { useState, useEffect } from 'react';

/**
 * Custom hook para debounce (atrasar execução)
 * Útil para search/filtros
 * @param {any} value - Valor a ser "atrasado"
 * @param {number} delay - Delay em ms (default: 500ms)
 * @returns {any} Valor com delay
 */
export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
