# 📘 Guia de Exemplos - SocialMeli Frontend

Este documento contém exemplos práticos de uso dos componentes, hooks e utilitários do projeto.

---

## 🪝 Custom Hooks

### **1. useFetch - Requisições HTTP Simples**

```jsx
import { useFetch } from './hooks';
import { userService } from './services/userService';
import Loading from './components/common/Loading';
import ErrorMessage from './components/common/ErrorMessage';

const UsersPage = () => {
  const { data, loading, error, refetch } = useFetch(
    () => userService.getAllUsers()
  );

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <h1>Usuários ({data?.length})</h1>
      <button onClick={refetch}>Recarregar</button>
      <ul>
        {data?.map(user => (
          <li key={user.user_id}>{user.user_name}</li>
        ))}
      </ul>
    </div>
  );
};
```

---

### **2. useForm - Gerenciamento de Formulários**

```jsx
import { useForm } from './hooks';
import { userService } from './services/userService';

const CreateUserForm = () => {
  const { 
    values, 
    errors, 
    isSubmitting,
    handleChange, 
    handleSubmit,
    reset 
  } = useForm(
    {
      user_name: '',
      user_type: 'buyer'
    },
    async (formValues) => {
      await userService.createUser(formValues);
      alert('Usuário criado!');
      reset();
    }
  );

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          name="user_name"
          value={values.user_name}
          onChange={handleChange}
        />
        {errors.user_name && <span>{errors.user_name}</span>}
      </div>

      <div>
        <label>Tipo:</label>
        <select
          name="user_type"
          value={values.user_type}
          onChange={handleChange}
        >
          <option value="buyer">Comprador</option>
          <option value="seller">Vendedor</option>
        </select>
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Criando...' : 'Criar'}
      </button>
    </form>
  );
};
```

---

### **3. useToast - Notificações**

```jsx
import { useState } from 'react';
import { useToast } from './hooks';
import Toast from './components/common/Toast';

const ActionPage = () => {
  const { toast, showToast, hideToast } = useToast();

  const handleSuccess = () => {
    showToast('Operação realizada com sucesso!', 'success', 3000);
  };

  const handleError = () => {
    showToast('Erro ao realizar operação', 'error', 5000);
  };

  const handleInfo = () => {
    showToast('Informação importante', 'info', 4000);
  };

  return (
    <div>
      <button onClick={handleSuccess}>Sucesso</button>
      <button onClick={handleError}>Erro</button>
      <button onClick={handleInfo}>Info</button>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={hideToast}
        />
      )}
    </div>
  );
};
```

---

### **4. useDebounce - Busca com Delay**

```jsx
import { useState, useEffect } from 'react';
import { useDebounce } from './hooks';
import { userService } from './services/userService';

const SearchUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (!debouncedSearch) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      try {
        const users = await userService.getAllUsers();
        const filtered = users.filter(u => 
          u.user_name.toLowerCase().includes(debouncedSearch.toLowerCase())
        );
        setResults(filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedSearch]);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar usuários..."
      />
      
      {loading && <p>Buscando...</p>}
      
      <ul>
        {results.map(user => (
          <li key={user.user_id}>{user.user_name}</li>
        ))}
      </ul>
    </div>
  );
};
```

---

## 🧩 Componentes

### **1. ConfirmDialog - Diálogo de Confirmação**

```jsx
import { useState } from 'react';
import ConfirmDialog from './components/common/ConfirmDialog';
import { userService } from './services/userService';

const DeleteUserButton = ({ userId }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      await userService.deleteUser(userId);
      alert('Usuário deletado!');
    } catch (err) {
      alert('Erro ao deletar');
    }
  };

  return (
    <>
      <button onClick={() => setShowConfirm(true)}>
        🗑️ Deletar
      </button>

      <ConfirmDialog
        isOpen={showConfirm}
        title="Deletar Usuário"
        message="Tem certeza que deseja deletar este usuário? Esta ação não pode ser desfeita."
        confirmText="Sim, deletar"
        cancelText="Cancelar"
        type="danger"
        onConfirm={handleDelete}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
};
```

---

### **2. SearchInput - Input de Busca**

```jsx
import { useState } from 'react';
import SearchInput from './components/common/SearchInput';
import UserList from './components/user/UserList';

const SearchablePage = () => {
  const [allUsers, setAllUsers] = useState([...]);
  const [filteredUsers, setFilteredUsers] = useState(allUsers);

  const handleSearch = (term) => {
    if (!term) {
      setFilteredUsers(allUsers);
      return;
    }

    const filtered = allUsers.filter(user =>
      user.user_name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  return (
    <div>
      <h1>Buscar Usuários</h1>
      <SearchInput
        onSearch={handleSearch}
        placeholder="Digite o nome do usuário..."
        delay={300}
      />
      <UserList users={filteredUsers} />
    </div>
  );
};
```

---

### **3. Badge - Etiquetas/Tags**

```jsx
import Badge from './components/common/Badge';

const UserProfile = ({ user }) => {
  return (
    <div className="user-profile">
      <h2>{user.user_name}</h2>
      
      {/* Badge de tipo de usuário */}
      <Badge 
        variant={user.user_type === 'seller' ? 'primary' : 'success'}
        size="md"
      >
        {user.user_type === 'seller' ? '🏪 Vendedor' : '🛒 Comprador'}
      </Badge>

      {/* Badge de status */}
      {user.is_verified && (
        <Badge variant="success" size="sm">
          ✓ Verificado
        </Badge>
      )}

      {/* Badge de contagem */}
      <Badge variant="info" size="sm">
        {user.followers_count} seguidores
      </Badge>
    </div>
  );
};
```

---

### **4. PostList & UserList - Listas com Estado Vazio**

```jsx
import PostList from './components/post/PostList';
import UserList from './components/user/UserList';

const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  return (
    <div>
      {/* Lista de posts */}
      <PostList
        posts={posts}
        emptyMessage="Você ainda não segue ninguém. Comece seguindo vendedores!"
      />

      {/* Lista de usuários */}
      <UserList
        users={users}
        emptyMessage="Nenhum usuário encontrado"
        emptyIcon="🔍"
        onFollow={handleFollow}
        onUnfollow={handleUnfollow}
      />
    </div>
  );
};
```

---

## 🛡️ Utilitários

### **1. Validators - Validação de Formulários**

```jsx
import { useForm } from './hooks';
import { validators, validateForm } from './utils/validators';

const RegisterForm = () => {
  const validate = (values) => {
    return validateForm(values, {
      username: [
        (v) => validators.required(v, 'Username'),
        validators.username,
        (v) => validators.minLength(v, 3, 'Username'),
        (v) => validators.maxLength(v, 15, 'Username')
      ],
      email: [
        (v) => validators.required(v, 'Email'),
        validators.email
      ],
      password: [
        (v) => validators.required(v, 'Senha'),
        validators.strongPassword
      ],
      age: [
        (v) => validators.required(v, 'Idade'),
        (v) => validators.isNumber(v, 'Idade'),
        (v) => validators.isPositive(v, 'Idade')
      ]
    });
  };

  const handleSubmit = async (values) => {
    const errors = validate(values);
    
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    // Continua com o submit...
  };

  // resto do componente...
};
```

---

### **2. Formatters - Formatação de Dados**

```jsx
import formatters from './utils/formatters';

const ProductCard = ({ product, post }) => {
  return (
    <div className="product-card">
      <h3>{product.product_name}</h3>
      
      {/* Preço formatado */}
      <p className="price">
        {formatters.formatPrice(product.price)}
      </p>

      {/* Data formatada */}
      <p className="date">
        Publicado em {formatters.formatDate(post.date)}
      </p>

      {/* Data relativa */}
      <p className="time-ago">
        {formatters.formatRelativeTime(post.created_at)}
      </p>

      {/* Truncar descrição */}
      <p className="description">
        {formatters.truncate(product.description, 100)}
      </p>

      {/* Número de visualizações */}
      <p className="views">
        {formatters.formatNumber(post.views)} visualizações
      </p>
    </div>
  );
};
```

---

## 🔐 Autenticação

### **Verificar se está autenticado**

```jsx
import { useAuth } from './contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const ProfilePage = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>Olá, {user.userName}!</h1>
      <p>ID: {user.userId}</p>
      <p>Tipo: {user.userType}</p>
    </div>
  );
};
```

---

### **Login Programático**

```jsx
import { useAuth } from './contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const QuickLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleQuickLogin = async () => {
    const result = await login('demo_user', 'demo123');
    
    if (result.success) {
      navigate('/feed');
    } else {
      alert(result.error);
    }
  };

  return (
    <button onClick={handleQuickLogin}>
      Login Rápido (Demo)
    </button>
  );
};
```

---

### **Logout**

```jsx
import { useAuth } from './contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Deseja realmente sair?')) {
      logout();
      navigate('/');
    }
  };

  return (
    <button onClick={handleLogout}>
      🚪 Sair
    </button>
  );
};
```

---

## 🌐 Chamadas à API

### **Tratamento de Erros Completo**

```jsx
import { useState } from 'react';
import { userService } from './services/userService';
import { useToast } from './hooks';

const FollowButton = ({ userId, userIdToFollow }) => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleFollow = async () => {
    setLoading(true);
    
    try {
      await userService.followUser(userId, userIdToFollow);
      showToast('Usuário seguido com sucesso!', 'success');
    } catch (error) {
      // Erro do backend
      if (error.response?.data?.error) {
        showToast(error.response.data.error, 'error');
      }
      // Erro de rede
      else if (error.message === 'Network Error') {
        showToast('Erro de conexão. Verifique sua internet.', 'error');
      }
      // Erro genérico
      else {
        showToast('Erro ao seguir usuário', 'error');
      }
      console.error('Follow error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleFollow} disabled={loading}>
      {loading ? 'Seguindo...' : '➕ Seguir'}
    </button>
  );
};
```

---

### **Requisições em Paralelo**

```jsx
import { useEffect, useState } from 'react';
import { userService, postService } from './services';

const Dashboard = ({ userId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        // Busca tudo em paralelo
        const [user, followers, following, posts, promos] = await Promise.all([
          userService.getUserById(userId),
          userService.getFollowersList(userId),
          userService.getFollowedList(userId),
          postService.getFollowedPosts(userId),
          postService.countPromoProducts(userId)
        ]);

        setData({ user, followers, following, posts, promos });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [userId]);

  if (loading) return <div>Carregando dashboard...</div>;

  return (
    <div>
      <h1>Dashboard de {data.user.user_name}</h1>
      <p>Seguidores: {data.followers.followers.length}</p>
      <p>Seguindo: {data.following.followed.length}</p>
      <p>Posts: {data.posts.posts.length}</p>
      <p>Promoções: {data.promos.promo_products_count}</p>
    </div>
  );
};
```

---

## 🎨 Estilização

### **Classes Utilitárias**

```jsx
const Page = () => {
  return (
    <div className="container">
      {/* Cabeçalho da página */}
      <div className="page-header">
        <h1 className="page-title">Título</h1>
        <p className="page-subtitle">Subtítulo</p>
      </div>

      {/* Card de estatísticas */}
      <div className="stats-card">
        <div className="stat">
          <span className="stat-value">150</span>
          <span className="stat-label">Seguidores</span>
        </div>
      </div>

      {/* Alertas */}
      <div className="alert alert-success">✓ Sucesso!</div>
      <div className="alert alert-error">✗ Erro!</div>
      <div className="alert alert-warning">⚠ Atenção!</div>

      {/* Loading */}
      <div className="loading">
        <div className="spinner"></div>
        <p>Carregando...</p>
      </div>

      {/* Empty State */}
      <div className="empty-state">
        <p className="empty-icon">📭</p>
        <p className="empty-text">Nenhum resultado</p>
      </div>

      {/* Grid de usuários */}
      <div className="user-grid">
        {/* cards aqui */}
      </div>

      {/* Lista de posts */}
      <div className="post-list">
        {/* cards aqui */}
      </div>
    </div>
  );
};
```

---

## 💡 Dicas e Truques

### **1. Evitar Re-renders Desnecessários**

```jsx
import { memo, useCallback } from 'react';

// Memorizar componente
const UserCard = memo(({ user, onFollow }) => {
  return (
    <div>
      <h3>{user.user_name}</h3>
      <button onClick={onFollow}>Seguir</button>
    </div>
  );
});

// No componente pai
const ParentComponent = () => {
  // Memorizar callback
  const handleFollow = useCallback((userId) => {
    // lógica
  }, []);

  return <UserCard user={user} onFollow={handleFollow} />;
};
```

---

### **2. Composição de Componentes**

```jsx
// Ao invés de passar muitas props
<Button 
  text="Salvar"
  icon="💾"
  color="yellow"
  size="md"
  disabled={false}
/>

// Use composição (children)
<Button variant="yellow" size="md">
  <span>💾</span>
  <span>Salvar</span>
</Button>
```

---

### **3. Extrair Lógica para Custom Hooks**

```jsx
// ❌ Ruim - lógica repetida em vários componentes
const Component1 = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    fetch('/api/data')
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);
  
  // render...
};

// ✅ Bom - extrair para hook
const useApiData = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [url]);
  
  return { data, loading };
};

// Usar em qualquer componente
const Component1 = () => {
  const { data, loading } = useApiData('/api/data');
  // render...
};
```

---

**Pronto! Agora você tem exemplos práticos de tudo no projeto!** 🚀
