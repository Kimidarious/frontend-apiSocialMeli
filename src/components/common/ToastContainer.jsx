import { createPortal } from 'react-dom';
import Toast from './Toast';
import './ToastContainer.css';

/**
 * Container para gerenciar múltiplos toasts
 * Use com o hook useToast
 */
const ToastContainer = ({ toasts = [], onClose }) => {
  if (!toasts || toasts.length === 0) return null;

  return createPortal(
    <div className="toast-container">
      {toasts.map((toast, index) => (
        <Toast
          key={toast.id || index}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => onClose(index)}
        />
      ))}
    </div>,
    document.body
  );
};

export default ToastContainer;
