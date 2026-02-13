import UserCard from './UserCard';
import EmptyState from '../common/EmptyState';
import './UserList.css';

const UserList = ({ 
  users, 
  onFollow, 
  onUnfollow, 
  emptyMessage = 'Nenhum usuário encontrado',
  emptyIcon = '👥'
}) => {
  if (!users || users.length === 0) {
    return (
      <EmptyState 
        icon={emptyIcon}
        message={emptyMessage}
      />
    );
  }

  return (
    <div className="user-list">
      {users.map((user) => (
        <UserCard 
          key={user.user_id} 
          user={user}
          onFollow={onFollow ? () => onFollow(user.user_id) : undefined}
          onUnfollow={onUnfollow ? () => onUnfollow(user.user_id) : undefined}
        />
      ))}
    </div>
  );
};

export default UserList;
