import './ConfirmDialog.css';

/**
 * Componente de diálogo de confirmação
 * Alternativa ao window.confirm() nativo
 */
const ConfirmDialog = ({ 
  isOpen, 
  title = 'Confirmação',
  message, 
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm, 
  onCancel,
  type = 'warning' // 'warning', 'danger', 'info'
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onCancel(); // Fecha o dialog
  };

  const getIcon = () => {
    switch (type) {
      case 'danger': return '⚠️';
      case 'info': return 'ℹ️';
      case 'warning':
      default: return '❓';
    }
  };

  return (
    <div className="confirm-overlay" onClick={onCancel}>
      <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-header">
          <span className="confirm-icon">{getIcon()}</span>
          <h3 className="confirm-title">{title}</h3>
        </div>

        <div className="confirm-body">
          <p className="confirm-message">{message}</p>
        </div>

        <div className="confirm-footer">
          <button 
            className="btn btn-secondary"
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button 
            className={`btn ${type === 'danger' ? 'btn-danger' : 'btn-yellow'}`}
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
