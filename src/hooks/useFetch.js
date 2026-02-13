import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook para facilitar requisições HTTP
 * @param {Function} fetchFn - Função que retorna uma Promise (ex: () => userService.getAllUsers())
 * @param {Array} dependencies - Dependências para recarregar (opcional)
 * @returns {Object} { data, loading, error, refetch }
 */
export const useFetch = (fetchFn, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Erro ao carregar dados');
      console.error('useFetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [fetchFn]);

  useEffect(() => {
    fetchData();
  }, [...dependencies, fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
};

export default useFetch;
