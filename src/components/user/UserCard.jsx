import './UserCard.css';

const UserCard = ({ user, onUnfollow, onFollow }) => {
  return (
    <div className="user-card">
      <div className="user-card-header">
        <div className="user-avatar">
          {user.user_name.charAt(0).toUpperCase()}
        </div>
        <div className="user-info">
          <h3 className="user-name">{user.user_name}</h3>
          <span className="user-id">ID: {user.user_id}</span>
        </div>
      </div>

      <div className="user-card-actions">
        {onUnfollow && (
          <button 
            className="btn btn-secondary btn-sm"
            onClick={onUnfollow}
          >
            ❌ Deixar de Seguir
          </button>
        )}
        {onFollow && (
          <button 
            className="btn btn-primary btn-sm"
            onClick={onFollow}
          >
            ➕ Seguir
          </button>
        )}
      </div>
    </div>
  );
};

export default UserCard;