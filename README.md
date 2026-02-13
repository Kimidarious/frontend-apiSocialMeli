# 🎨 SocialMeli Frontend

Frontend da rede social SocialMeli, construído com **React + Vite**.

---

## 🚀 Tecnologias

- **React 18** - Biblioteca UI
- **Vite** - Build tool
- **React Router** - Roteamento
- **Axios** - Cliente HTTP
- **Context API** - Gerenciamento de estado
- **CSS Modules** - Estilização

---

## 📁 Estrutura do Projeto

```
src/
├── assets/              # Recursos estáticos
├── components/          # Componentes reutilizáveis
│   ├── auth/           # Autenticação (ProtectedRoute)
│   ├── common/         # Componentes comuns
│   ├── layout/         # Layout (Header, Footer, Nav)
│   ├── post/           # Componentes de posts
│   └── user/           # Componentes de usuários
├── contexts/           # Context API (Auth, User)
├── hooks/              # Custom hooks
├── pages/              # Páginas da aplicação
├── routes/             # Configuração de rotas
├── services/           # Camada de API
├── styles/             # Estilos globais
└── utils/              # Utilitários (validators, formatters)
```

Veja [ARCHITECTURE.md](./ARCHITECTURE.md) para detalhes completos.

---

## 🛠️ Instalação

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz:

```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

---

## 🔐 Autenticação

O sistema usa **JWT (JSON Web Token)** para autenticação:

### Fluxo de Login:

1. Usuário preenche credenciais no `LoginModal`
2. `AuthContext` chama `authService.login()`
3. Backend retorna `token`, `user_id`, `user_name`, `user_type`
4. Token é salvo no `localStorage`
5. Interceptor do Axios adiciona `Authorization: Bearer {token}` em todas as requisições

### Proteção de Rotas:

```jsx
import ProtectedRoute from './components/auth/ProtectedRoute';

<Route path="/feed" element={
  <ProtectedRoute>
    <Feed />
  </ProtectedRoute>
} />
```

---

## 📦 Componentes Principais

### **1. Componentes Comuns**

#### **EmptyState** - Estado vazio
```jsx
<EmptyState 
  icon="📭"
  message="Nenhum resultado encontrado"
/>
```

#### **Loading** - Indicador de carregamento
```jsx
<Loading message="Carregando dados..." />
```

#### **ErrorMessage** - Mensagem de erro
```jsx
<ErrorMessage message="Erro ao carregar dados" />
```

#### **Toast** - Notificação
```jsx
<Toast 
  message="Operação concluída!"
  type="success"
  onClose={() => {}}
/>
```

#### **ConfirmDialog** - Diálogo de confirmação
```jsx
<ConfirmDialog
  isOpen={isOpen}
  title="Confirmar exclusão"
  message="Tem certeza que deseja excluir?"
  onConfirm={handleConfirm}
  onCancel={handleCancel}
  type="danger"
/>
```

#### **SearchInput** - Input de busca com debounce
```jsx
<SearchInput 
  onSearch={(term) => console.log(term)}
  placeholder="Buscar usuários..."
  delay={500}
/>
```

#### **Badge** - Etiqueta/Tag
```jsx
<Badge variant="success" size="md">
  Aprovado
</Badge>
```

---

### **2. Componentes de Layout**

- **Header** - Cabeçalho com logo
- **Navigation** - Menu de navegação
- **Footer** - Rodapé
- **UserSelector** - Seletor de usuário/Login

---

### **3. Componentes de Domínio**

#### **PostCard** - Card de post/produto
```jsx
<PostCard post={post} />
```

#### **PostList** - Lista de posts
```jsx
<PostList 
  posts={posts}
  emptyMessage="Nenhuma publicação encontrada"
/>
```

#### **UserCard** - Card de usuário
```jsx
<UserCard 
  user={user}
  onFollow={handleFollow}
  onUnfollow={handleUnfollow}
/>
```

#### **UserList** - Lista de usuários
```jsx
<UserList 
  users={users}
  onFollow={handleFollow}
  onUnfollow={handleUnfollow}
/>
```

---

## 🪝 Custom Hooks

### **useFetch** - Simplifica requisições HTTP

```jsx
import { useFetch } from './hooks';

const { data, loading, error, refetch } = useFetch(
  () => userService.getAllUsers(),
  [] // dependencies
);
```

### **useForm** - Gerencia formulários

```jsx
import { useForm } from './hooks';

const { values, errors, handleChange, handleSubmit } = useForm(
  { username: '', password: '' },
  async (values) => {
    await authService.login(values.username, values.password);
  }
);
```

### **useToast** - Gerencia notificações

```jsx
import { useToast } from './hooks';

const { toast, showToast, hideToast } = useToast();

showToast('Operação realizada com sucesso!', 'success');
```

### **useDebounce** - Debounce de valores

```jsx
import { useDebounce } from './hooks';

const [searchTerm, setSearchTerm] = useState('');
const debouncedSearch = useDebounce(searchTerm, 500);

useEffect(() => {
  // Só executa 500ms após parar de digitar
  fetchResults(debouncedSearch);
}, [debouncedSearch]);
```

---

## 🛡️ Utilitários

### **Validators** - Validações

```js
import { validators, validateForm } from './utils/validators';

const errors = validateForm(
  { username: 'john', email: 'invalid' },
  {
    username: [
      validators.required, 
      validators.username
    ],
    email: [
      validators.required, 
      validators.email
    ]
  }
);
```

### **Formatters** - Formatação de dados

```js
import formatters from './utils/formatters';

formatters.formatPrice(1999.99);        // R$ 1.999,99
formatters.formatDate('2024-01-20');    // 20/01/2024
formatters.formatRelativeTime(date);    // há 2 dias
formatters.truncate(text, 100);         // Trunca texto...
formatters.formatNumber(1500);          // 1.5k
```

---

## 🎨 Estilos Globais

### **Variáveis CSS** (`styles/theme.css`)

```css
:root {
  --primary-color: #3483fa;
  --secondary-color: #FFE600;
  --success-color: #00a650;
  --danger-color: #ff4444;
  --text-color: #333;
  --bg-color: #f5f5f5;
}
```

### **Classes Utilitárias**

```html
<!-- Container -->
<div class="container">...</div>

<!-- Botões -->
<button class="btn btn-yellow">Confirmar</button>
<button class="btn btn-primary">Salvar</button>
<button class="btn btn-secondary">Cancelar</button>

<!-- Grid -->
<div class="user-grid">...</div>

<!-- Estados -->
<div class="loading">...</div>
<div class="empty-state">...</div>
<div class="alert alert-error">...</div>
```

---

## 📡 Services (API)

### **authService**

```js
import { authService } from './services/authService';

// Login
const response = await authService.login('username', 'password');

// Verificar autenticação
const isAuth = authService.isAuthenticated();

// Obter usuário autenticado
const user = authService.getAuthenticatedUser();

// Logout
authService.clearAuthData();
```

### **userService**

```js
import { userService } from './services/userService';

// Listar todos
const users = await userService.getAllUsers();

// Buscar por ID
const user = await userService.getUserById(1);

// Criar
await userService.createUser(userData);

// Seguir
await userService.followUser(userId, userIdToFollow);

// Deixar de seguir
await userService.unfollowUser(userId, userIdToUnfollow);

// Seguidores
const followers = await userService.getFollowersList(userId, 'name_asc');

// Seguindo
const following = await userService.getFollowedList(userId);
```

### **postService**

```js
import { postService } from './services/postService';

// Criar post
await postService.createPost(postData);

// Criar post promocional
await postService.createPromoPost(promoData);

// Feed de seguidos
const feed = await postService.getFollowedPosts(userId, 'date_desc');

// Contar promoções
const count = await postService.countPromoProducts(userId);

// Listar promoções
const promos = await postService.getPromoPostsByUser(userId);
```

---

## 🧪 Exemplo de Uso Completo

```jsx
import { useState, useEffect } from 'react';
import { useFetch, useToast } from './hooks';
import { userService } from './services/userService';
import UserList from './components/user/UserList';
import Loading from './components/common/Loading';
import ErrorMessage from './components/common/ErrorMessage';

const UsersPage = () => {
  const { data, loading, error, refetch } = useFetch(
    () => userService.getAllUsers()
  );
  
  const { toast, showToast, hideToast } = useToast();

  const handleFollow = async (userId) => {
    try {
      await userService.followUser(activeUserId, userId);
      showToast('Usuário seguido com sucesso!', 'success');
      refetch();
    } catch (err) {
      showToast('Erro ao seguir usuário', 'error');
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container">
      <h1>Usuários</h1>
      <UserList 
        users={data}
        onFollow={handleFollow}
      />
      {toast && <Toast {...toast} onClose={hideToast} />}
    </div>
  );
};
```

---

## 📝 Boas Práticas

### **1. Componentização**
- Componentes pequenos e com responsabilidade única
- Props bem definidas
- CSS isolado por componente

### **2. Estado**
- Use Context API para estado global (Auth, User)
- useState para estado local de componentes
- Custom hooks para lógica reutilizável

### **3. Performance**
- Use React.memo para componentes pesados
- useCallback para funções passadas como props
- useMemo para cálculos pesados

### **4. Nomenclatura**
- Componentes: PascalCase (ex: `UserCard.jsx`)
- Hooks: camelCase com prefixo "use" (ex: `useFetch.js`)
- Services: camelCase (ex: `userService.js`)
- Constantes: UPPER_CASE (ex: `API_URL`)

### **5. Importações**
```jsx
// 1. Bibliotecas externas
import { useState, useEffect } from 'react';
import axios from 'axios';

// 2. Componentes internos
import UserCard from './components/UserCard';

// 3. Hooks e utils
import { useFetch } from './hooks';

// 4. Estilos
import './styles.css';
```

---

## 🐛 Debug

### **Verificar token no localStorage**
```js
localStorage.getItem('token')
localStorage.getItem('userId')
localStorage.getItem('userName')
```

### **Logs de requisições**
O interceptor do Axios já loga automaticamente:
- 🔵 Requisições iniciadas
- ✅ Requisições bem-sucedidas
- ❌ Erros

### **React DevTools**
Instale a extensão React DevTools para inspecionar componentes e estado.

---

## 🚀 Deploy

### **Build para produção**
```bash
npm run build
```

Os arquivos estarão em `dist/`.

### **Variáveis de produção**
```env
VITE_API_BASE_URL=https://api.socialmeli.com/api/v1
```

---

## 📚 Recursos

- [Documentação React](https://react.dev)
- [Vite Guide](https://vitejs.dev/guide/)
- [React Router](https://reactrouter.com)
- [Axios Docs](https://axios-http.com)

---

## 👥 Equipe

Projeto desenvolvido pelo **Squad 68 - Neocamp Wave 15**.

---

## 📄 Licença

Este projeto é parte de um desafio educacional.

---

**Desenvolvido com ❤️ usando React + Vite**
