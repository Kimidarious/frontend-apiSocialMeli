import './Badge.css';

/**
 * Componente de badge/etiqueta
 */
const Badge = ({ 
  children, 
  variant = 'primary', // 'primary', 'success', 'warning', 'danger', 'info'
  size = 'md', // 'sm', 'md', 'lg'
  className = ''
}) => {
  return (
    <span className={`badge badge-${variant} badge-${size} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
