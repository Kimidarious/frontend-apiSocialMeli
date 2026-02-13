# 🏗️ Arquitetura do Frontend - SocialMeli

## 📐 Estrutura de Pastas (Clean Architecture Adaptada)

```
src/
├── assets/                 # 🎨 Recursos estáticos (imagens, fontes, ícones)
│
├── components/             # 🧩 Componentes reutilizáveis
│   ├── auth/              # Componentes de autenticação
│   │   ├── ProtectedRoute.jsx
│   │   └── ProtectedRoute.css
│   │
│   ├── common/            # Componentes compartilhados
│   │   ├── EmptyState.jsx
│   │   ├── ErrorMessage.jsx
│   │   ├── Loading.jsx
│   │   ├── LoginModal.jsx
│   │   ├── ScrollToTop.jsx
│   │   └── Toast.jsx
│   │
│   ├── layout/            # Componentes de layout
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Navigation.jsx
│   │   └── UserSelector.jsx
│   │
│   ├── post/              # Componentes de posts/produtos
│   │   ├── PostCard.jsx
│   │   └── PostList.jsx
│   │
│   └── user/              # Componentes de usuários
│       ├── UserCard.jsx
│       └── UserList.jsx
│
├── contexts/              # 🔄 Context API (Estado Global)
│   ├── AuthContext.jsx    # Gerencia autenticação
│   └── UserContext.jsx    # Gerencia usuário ativo
│
├── hooks/                 # 🪝 Custom Hooks (vazios removidos)
│   └── (vazio por enquanto)
│
├── pages/                 # 📄 Páginas da aplicação
│   ├── Home.jsx
│   ├── AllUsers.jsx
│   ├── CreateUser.jsx
│   ├── ExploreUsers.jsx
│   ├── Followers.jsx
│   ├── Following.jsx
│   ├── Feed.jsx
│   ├── CreatePost.jsx
│   ├── Promos.jsx
│   └── NotFound.jsx
│
├── routes/                # 🛣️ Configuração de rotas
│   └── AppRoutes.jsx
│
├── services/              # 🌐 Camada de Serviços (API)
│   ├── api.js            # Configuração Axios + Interceptors
│   ├── authService.js    # Serviços de autenticação
│   ├── userService.js    # Serviços de usuários
│   └── postService.js    # Serviços de posts/produtos
│
├── styles/                # 🎨 Estilos globais
│   ├── global.css        # Reset e estilos base
│   └── theme.css         # Variáveis CSS (cores, fontes)
│
├── App.jsx                # 🚀 Componente principal
├── main.jsx               # 🏁 Ponto de entrada
└── index.css              # 📝 Estilos base

```

---

## 🔄 Fluxo de Dados (Clean Architecture)

### **Camada de Apresentação → Camada de Negócio → Camada de Dados**

```
┌─────────────────────────────────────────────────────┐
│  PAGES (Páginas)                                    │
│  - Home.jsx, Feed.jsx, etc.                         │
│  - Renderiza componentes                            │
│  - Gerencia estado local                            │
└──────────────────┬──────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────┐
│  COMPONENTS (Componentes Reutilizáveis)            │
│  - PostCard, UserCard, LoginModal                   │
│  - Recebe props                                     │
│  - Emite eventos (callbacks)                        │
└──────────────────┬──────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────┐
│  CONTEXTS (Estado Global)                           │
│  - AuthContext, UserContext                         │
│  - Compartilha estado entre componentes             │
└──────────────────┬──────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────┐
│  SERVICES (Camada de API)                           │
│  - authService, userService, postService            │
│  - Faz requisições HTTP                             │
│  - Retorna dados ou erros                           │
└──────────────────┬──────────────────────────────────┘
                   │ HTTP (REST)
┌──────────────────▼──────────────────────────────────┐
│  BACKEND API (Go + Gin)                             │
│  - http://localhost:8080/api/v1                     │
└─────────────────────────────────────────────────────┘
```

---

## 📦 Responsabilidades de Cada Camada

### **1. Pages (Páginas)**
- **Responsabilidade:** Container de alto nível
- **O que faz:**
  - Gerencia estado da página (loading, error, data)
  - Chama services para buscar dados
  - Renderiza componentes
  - Trata navegação
- **Não deve:**
  - Fazer requisições HTTP diretamente
  - Conter lógica de negócio complexa

**Exemplo:**
```jsx
const Feed = () => {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    postService.getFollowedPosts(userId)
      .then(data => setPosts(data))
      .catch(err => console.error(err));
  }, [userId]);
  
  return <PostList posts={posts} />;
};
```

---

### **2. Components (Componentes)**
- **Responsabilidade:** UI reutilizável e isolada
- **O que faz:**
  - Recebe dados via props
  - Renderiza UI
  - Emite eventos via callbacks
  - Gerencia estado interno simples (ex: aberto/fechado)
- **Não deve:**
  - Fazer requisições HTTP
  - Conhecer o Context diretamente (exceto se necessário)

**Exemplo:**
```jsx
const PostCard = ({ post, onLike }) => {
  return (
    <div className="post-card">
      <h3>{post.title}</h3>
      <button onClick={() => onLike(post.id)}>❤️</button>
    </div>
  );
};
```

---

### **3. Contexts (Estado Global)**
- **Responsabilidade:** Compartilhar estado entre componentes
- **O que faz:**
  - Gerencia autenticação (AuthContext)
  - Gerencia usuário ativo (UserContext)
  - Provê dados e funções para componentes filhos
- **Quando usar:**
  - Dados acessados por muitos componentes
  - Evitar prop drilling

**Exemplo:**
```jsx
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const login = async (username, password) => {
    const data = await authService.login(username, password);
    setIsAuthenticated(true);
  };
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, login }}>
      {children}
    </AuthContext.Provider>
  );
};
```

---

### **4. Services (Camada de API)**
- **Responsabilidade:** Comunicação com backend
- **O que faz:**
  - Faz requisições HTTP (GET, POST, PUT, DELETE)
  - Trata erros de rede
  - Retorna dados ou lança exceções
  - Configuração global (Axios interceptors)
- **Não deve:**
  - Gerenciar estado da UI
  - Renderizar componentes

**Exemplo:**
```js
export const userService = {
  getAllUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },
  
  followUser: async (userId, userIdToFollow) => {
    const response = await api.post(`/users/${userId}/follow/${userIdToFollow}`);
    return response.data;
  }
};
```

---

### **5. Routes (Rotas)**
- **Responsabilidade:** Configuração de navegação
- **O que faz:**
  - Define rotas e componentes associados
  - Aplica proteção de rotas (ProtectedRoute)
  - Gerencia rotas públicas vs privadas

**Exemplo:**
```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/feed" element={
    <ProtectedRoute>
      <Feed />
    </ProtectedRoute>
  } />
</Routes>
```

---

## 🔐 Fluxo de Autenticação

```
1. Usuário clica em "Login"
   └─> LoginModal abre

2. Usuário preenche credenciais
   └─> Clica em "Entrar"

3. LoginModal chama AuthContext.login()
   └─> AuthContext chama authService.login()

4. authService faz POST /auth/login
   └─> Backend valida e retorna token + dados

5. authService.saveAuthData()
   └─> Salva token no localStorage

6. AuthContext atualiza estado
   └─> isAuthenticated = true
   └─> user = { userId, userName, userType }

7. ProtectedRoute permite acesso
   └─> Componentes podem fazer requisições autenticadas

8. api.js intercepta requisições
   └─> Adiciona header: Authorization: Bearer {token}
```

---

## 🛡️ Proteção de Rotas

### **Rotas Públicas:**
- `/` - Home
- `/create-user` - Criar Usuário
- `*` - NotFound

### **Rotas Protegidas (requerem login):**
- `/explore` - Explorar Usuários
- `/all-users` - Todos os Usuários
- `/followers` - Seguidores
- `/following` - Seguindo
- `/feed` - Feed de Posts
- `/create-post` - Criar Post
- `/promos` - Promoções

---

## 📝 Convenções de Código

### **Nomenclatura:**
- **Componentes:** PascalCase (ex: `UserCard.jsx`)
- **Arquivos CSS:** mesmo nome do componente (ex: `UserCard.css`)
- **Services:** camelCase (ex: `userService.js`)
- **Contexts:** PascalCase + Context (ex: `AuthContext.jsx`)
- **Hooks:** camelCase + use (ex: `useAuth.js`)

### **Estrutura de Componente:**
```jsx
// 1. Imports
import { useState } from 'react';
import './Component.css';

// 2. Definição do Componente
const Component = ({ prop1, prop2 }) => {
  // 3. State e Hooks
  const [state, setState] = useState(null);
  
  // 4. Handlers
  const handleClick = () => {
    // lógica
  };
  
  // 5. Render
  return (
    <div className="component">
      {/* JSX */}
    </div>
  );
};

// 6. Export
export default Component;
```

---

## 🎯 Melhorias Futuras (Opcional)

### **1. Custom Hooks**
Criar hooks reutilizáveis:
```jsx
// hooks/useFetch.js
export const useFetch = (fetchFn) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // lógica de fetch
  
  return { data, loading, error, refetch };
};

// Uso na página:
const { data, loading, error } = useFetch(() => postService.getFeed(userId));
```

### **2. Validações com Yup/Zod**
Validar formulários de forma declarativa

### **3. Testes Unitários**
- Vitest para testes
- React Testing Library para componentes

---

## 🚀 Conclusão

A estrutura atual está **bem organizada** e segue princípios de Clean Architecture:

✅ **Separação de responsabilidades** (UI → Logic → Data)  
✅ **Componentes reutilizáveis** bem isolados  
✅ **Services centralizados** para API  
✅ **Context API** para estado global  
✅ **Proteção de rotas** implementada  
✅ **Interceptors** para token JWT automático  

O projeto está **pronto para crescer** mantendo a qualidade e organização! 🎉
