import { useState, useCallback } from 'react';

/**
 * Custom hook para gerenciar toasts/notificações
 * @returns {Object} { toast, showToast, hideToast }
 */
export const useToast = () => {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success', duration = 3000) => {
    setToast({ message, type, duration });
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  return { toast, showToast, hideToast };
};

export default useToast;
