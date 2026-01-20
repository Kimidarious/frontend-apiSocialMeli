import { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import './AllUsers.css';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await userService.getAllUsers();
      setUsers(response);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Tem certeza que deseja deletar este usuário?')) return;

    try {
      await userService.deleteUser(userId);
      alert('✅ Usuário deletado com sucesso!');
      fetchUsers();
    } catch (err) {
      alert('❌ Erro ao deletar: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <h1 className="page-title">👥 Todos os Usuários</h1>
          <p className="page-subtitle">Gerenciar usuários do sistema</p>
        </div>
        <button className="btn btn-yellow" onClick={() => navigate('/create-user')}>
          ➕ Novo Usuário
        </button>
      </div>

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="users-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Tipo</th>
                <th>Criado em</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.user_id}>
                  <td>#{user.user_id}</td>
                  <td><strong>{user.user_name}</strong></td>
                  <td>
                    <span className={`badge badge-${user.user_type.toLowerCase()}`}>
                      {user.user_type}
                    </span>
                  </td>
                  <td>{new Date(user.created_at).toLocaleDateString('pt-BR')}</td>
                  <td>
                    <button 
                      className="btn-icon btn-danger"
                      onClick={() => handleDelete(user.user_id)}
                      title="Deletar"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllUsers;