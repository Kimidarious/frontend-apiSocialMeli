import './Loading.css';

const Loading = ({ message = 'Carregando...' }) => {
  return (
    <div className="loading">
      <div className="spinner"></div>
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default Loading;