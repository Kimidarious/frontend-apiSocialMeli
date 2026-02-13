import { useState, useEffect } from 'react';
import { useDebounce } from '../../hooks';
import './SearchInput.css';

/**
 * Input de busca com debounce
 * @param {Function} onSearch - Callback chamado após delay (recebe o termo de busca)
 * @param {number} delay - Delay do debounce em ms (default: 500)
 * @param {string} placeholder - Placeholder do input
 */
const SearchInput = ({ 
  onSearch, 
  delay = 500, 
  placeholder = 'Buscar...',
  className = ''
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, delay);

  // Chama onSearch quando o valor debounced muda
  useEffect(() => {
    if (onSearch) {
      onSearch(debouncedSearch);
    }
  }, [debouncedSearch, onSearch]);

  const handleClear = () => {
    setSearchTerm('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <div className={`search-input ${className}`}>
      <span className="search-icon">🔍</span>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="search-field"
      />
      {searchTerm && (
        <button 
          className="search-clear"
          onClick={handleClear}
          type="button"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchInput;
