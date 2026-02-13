# 📁 Estrutura Completa do Projeto

## 📊 Estatísticas

```
📦 frontend-apiSocialMeli
├── 📄 80 arquivos de código (.jsx, .js, .css)
├── 📚 5 arquivos de documentação (.md)
├── 🧩 23 componentes React
├── 🪝 4 custom hooks
├── 🛠️ 20+ funções utilitárias
└── 🎨 CSS modular por componente
```

---

## 🗂️ Estrutura Detalhada

```
frontend-apiSocialMeli/
│
├── 📚 DOCUMENTAÇÃO
│   ├── README.md                 # 📘 Guia principal do projeto
│   ├── ARCHITECTURE.md           # 🏗️ Arquitetura Clean Architecture
│   ├── EXAMPLES.md               # 💡 Exemplos práticos de uso
│   ├── CHANGELOG.md              # 📝 Todas as implementações
│   ├── SUMMARY.md                # 🎉 Resumo visual
│   └── PROJECT_STRUCTURE.md      # 📁 Este arquivo
│
├── public/                       # Arquivos públicos
│   └── ...
│
└── src/                          # 📂 CÓDIGO FONTE
    │
    ├── 🎨 ASSETS
    │   └── assets/
    │       ├── logo-meli.svg
    │       └── ...
    │
    ├── 🧩 COMPONENTES (23 componentes)
    │   └── components/
    │       │
    │       ├── 🔐 auth/                    [Autenticação]
    │       │   ├── ProtectedRoute.jsx     # Proteção de rotas
    │       │   └── ProtectedRoute.css
    │       │
    │       ├── ⚡ common/                   [10 Componentes Comuns]
    │       │   ├── index.js               # Barrel export
    │       │   ├── EmptyState.jsx         # Estado vazio
    │       │   ├── EmptyState.css
    │       │   ├── ErrorMessage.jsx       # Mensagens de erro
    │       │   ├── ErrorMessage.css
    │       │   ├── Loading.jsx            # Indicador de loading
    │       │   ├── Loading.css
    │       │   ├── LoginModal.jsx         # Modal de login
    │       │   ├── LoginModal.css
    │       │   ├── ScrollToTop.jsx        # Scroll automático
    │       │   ├── ScrollToTop.css
    │       │   ├── Toast.jsx              # Notificações
    │       │   ├── Toast.css
    │       │   ├── ToastContainer.jsx     # ✨ Container de toasts
    │       │   ├── ToastContainer.css
    │       │   ├── ConfirmDialog.jsx      # ✨ Diálogo de confirmação
    │       │   ├── ConfirmDialog.css
    │       │   ├── SearchInput.jsx        # ✨ Input de busca
    │       │   ├── SearchInput.css
    │       │   ├── Badge.jsx              # ✨ Etiquetas/Tags
    │       │   └── Badge.css
    │       │
    │       ├── 🏛️ layout/                   [Layout Geral]
    │       │   ├── Header.jsx             # Cabeçalho
    │       │   ├── Header.css
    │       │   ├── Footer.jsx             # Rodapé
    │       │   ├── Footer.css
    │       │   ├── Navigation.jsx         # Menu de navegação
    │       │   ├── Navigation.css
    │       │   ├── UserSelector.jsx       # Seletor de usuário
    │       │   └── UserSelector.css
    │       │
    │       ├── 📰 post/                     [Posts/Produtos]
    │       │   ├── PostCard.jsx           # Card de post
    │       │   ├── PostCard.css
    │       │   ├── PostList.jsx           # ✨ Lista de posts
    │       │   └── PostList.css
    │       │
    │       └── 👥 user/                     [Usuários]
    │           ├── UserCard.jsx           # Card de usuário
    │           ├── UserCard.css
    │           ├── UserList.jsx           # ✨ Lista de usuários
    │           └── UserList.css
    │
    ├── 🔄 CONTEXTOS (Estado Global)
    │   └── contexts/
    │       ├── AuthContext.jsx            # Autenticação global
    │       └── UserContext.jsx            # Usuário ativo global
    │
    ├── 🪝 CUSTOM HOOKS (4 hooks)
    │   └── hooks/
    │       ├── index.js                   # Barrel export
    │       ├── useFetch.js                # ✨ Requisições HTTP
    │       ├── useForm.js                 # ✨ Gerenciamento de forms
    │       ├── useToast.js                # ✨ Notificações
    │       └── useDebounce.js             # ✨ Delay de execução
    │
    ├── 📄 PÁGINAS (10 páginas)
    │   └── pages/
    │       ├── Home.jsx                   # Página inicial
    │       ├── Home.css
    │       ├── AllUsers.jsx               # Todos os usuários
    │       ├── AllUsers.css
    │       ├── CreateUser.jsx             # Criar usuário
    │       ├── CreateUser.css
    │       ├── ExploreUsers.jsx           # Explorar usuários
    │       ├── ExploreUsers.css
    │       ├── Followers.jsx              # Seguidores
    │       ├── Followers.css
    │       ├── Following.jsx              # Seguindo
    │       ├── Following.css
    │       ├── Feed.jsx                   # Feed de posts
    │       ├── Feed.css
    │       ├── CreatePost.jsx             # Criar post
    │       ├── CreatePost.css
    │       ├── Promos.jsx                 # Promoções
    │       ├── Promos.css
    │       ├── NotFound.jsx               # Página 404
    │       └── NotFound.css
    │
    ├── 🛣️ ROTAS
    │   └── routes/
    │       └── AppRoutes.jsx              # Configuração de rotas
    │
    ├── 🌐 SERVICES (Camada de API)
    │   └── services/
    │       ├── api.js                     # Configuração Axios
    │       ├── authService.js             # Serviços de autenticação
    │       ├── userService.js             # Serviços de usuários
    │       └── postService.js             # Serviços de posts
    │
    ├── 🎨 ESTILOS GLOBAIS
    │   └── styles/
    │       ├── global.css                 # Reset e estilos base
    │       └── theme.css                  # Variáveis CSS
    │
    ├── 🛠️ UTILITÁRIOS (20+ funções)
    │   └── utils/
    │       ├── index.js                   # Barrel export
    │       ├── validators.js              # ✨ 9 validações
    │       └── formatters.js              # ✨ 10 formatações
    │
    ├── App.jsx                            # 🚀 Componente principal
    ├── App.css
    ├── main.jsx                           # 🏁 Ponto de entrada
    └── index.css

```

---

## 🎯 Componentes por Categoria

### **Componentes de UI (10)**
```
EmptyState          - Estado vazio visual
ErrorMessage        - Mensagem de erro
Loading             - Indicador de carregamento
LoginModal          - Modal de login
ScrollToTop         - Scroll para o topo
Toast               - Notificação individual
ToastContainer      - Container de notificações ✨
ConfirmDialog       - Diálogo de confirmação ✨
SearchInput         - Input de busca com debounce ✨
Badge               - Etiqueta/Tag colorida ✨
```

### **Componentes de Layout (4)**
```
Header              - Cabeçalho com logo
Footer              - Rodapé
Navigation          - Menu de navegação
UserSelector        - Seletor/Login de usuário
```

### **Componentes de Domínio (4)**
```
PostCard            - Card individual de post
PostList            - Lista de posts ✨
UserCard            - Card individual de usuário
UserList            - Lista de usuários ✨
```

### **Componentes de Autenticação (1)**
```
ProtectedRoute      - Proteção de rotas privadas
```

---

## 🪝 Custom Hooks

```jsx
useFetch(fetchFn, dependencies)
├─ data      // Dados retornados
├─ loading   // Estado de carregamento
├─ error     // Erro se houver
└─ refetch   // Função para recarregar

useForm(initialValues, onSubmit)
├─ values         // Valores do formulário
├─ errors         // Erros de validação
├─ isSubmitting   // Está submetendo
├─ handleChange   // Handler de mudança
├─ handleSubmit   // Handler de submit
├─ reset          // Resetar formulário
├─ setValues      // Setar valores
└─ setErrors      // Setar erros

useToast()
├─ toast       // Toast atual
├─ showToast   // Mostrar toast
└─ hideToast   // Esconder toast

useDebounce(value, delay)
└─ debouncedValue  // Valor com delay
```

---

## 🛠️ Utilitários

### **Validators (9 + 1)**
```js
validators.required(value, fieldName)
validators.email(value)
validators.minLength(value, min, fieldName)
validators.maxLength(value, max, fieldName)
validators.isNumber(value, fieldName)
validators.isPositive(value, fieldName)
validators.isInteger(value, fieldName)
validators.username(value)
validators.strongPassword(value)
validateForm(values, rules)  // Valida múltiplos campos
```

### **Formatters (10)**
```js
formatters.formatPrice(price)           // R$ 1.999,99
formatters.formatDate(dateString)       // 20/01/2024
formatters.formatDateTime(dateString)   // 20/01/2024 às 14:30
formatters.formatRelativeTime(date)     // há 2 dias
formatters.truncate(text, maxLength)    // Trunca texto...
formatters.formatNumber(num)            // 1.5k, 2.3M
formatters.capitalize(text)             // Primeira maiúscula
formatters.removeAccents(text)          // Remove acentos
formatters.formatCPF(cpf)               // 000.000.000-00
formatters.formatPhone(phone)           // (11) 98888-7777
```

---

## 🌐 Services (API)

### **authService**
```js
login(userName, password)          // Faz login
saveAuthData(loginData)            // Salva no localStorage
clearAuthData()                    // Remove do localStorage
getToken()                         // Recupera token
isAuthenticated()                  // Verifica autenticação
getAuthenticatedUser()             // Pega dados do usuário
```

### **userService**
```js
getAllUsers()                      // Lista todos
getUserById(id)                    // Busca por ID
createUser(userData)               // Cria usuário
updateUser(id, userData)           // Atualiza usuário
deleteUser(id)                     // Deleta usuário
followUser(userId, targetId)       // Segue usuário
unfollowUser(userId, targetId)     // Para de seguir
getFollowersCount(userId)          // Conta seguidores
getFollowersList(userId, order)    // Lista seguidores
getFollowedList(userId, order)     // Lista seguindo
```

### **postService**
```js
createPost(postData)               // Cria post
createPromoPost(promoData)         // Cria post promocional
getFollowedPosts(userId, order)    // Feed de seguidos
countPromoProducts(userId)         // Conta promoções
getPromoPostsByUser(userId)        // Lista promoções
```

---

## 📄 Páginas e Rotas

### **Rotas Públicas**
```
/                   → Home
/create-user        → CreateUser
*                   → NotFound
```

### **Rotas Protegidas** (requerem login)
```
/explore            → ExploreUsers
/all-users          → AllUsers
/followers          → Followers
/following          → Following
/feed               → Feed
/create-post        → CreatePost
/promos             → Promos
```

---

## 🎨 Estilos

### **Variáveis CSS Globais**
```css
--primary-color: #3483fa      /* Azul Mercado Livre */
--secondary-color: #FFE600    /* Amarelo Mercado Livre */
--success-color: #00a650      /* Verde */
--danger-color: #ff4444       /* Vermelho */
--text-color: #333            /* Texto principal */
--bg-color: #f5f5f5           /* Fundo */
```

### **Classes Utilitárias**
```css
.container           /* Container centralizado */
.btn, .btn-yellow    /* Botões */
.alert-*             /* Alertas */
.loading             /* Loading state */
.empty-state         /* Empty state */
.user-grid           /* Grid de usuários */
.post-list           /* Lista de posts */
```

---

## 📦 Dependências Principais

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.x",
  "axios": "^1.x"
}
```

---

## 🔄 Fluxo de Dados

```
┌──────────┐
│  PAGES   │  Páginas da aplicação
└────┬─────┘
     │
     ↓
┌──────────┐
│COMPONENTS│  Componentes reutilizáveis
└────┬─────┘
     │
     ↓
┌──────────┐
│ CONTEXTS │  Estado global (Auth, User)
└────┬─────┘
     │
     ↓
┌──────────┐
│ SERVICES │  Camada de API (HTTP)
└────┬─────┘
     │
     ↓
┌──────────┐
│ BACKEND  │  API REST (Go + Gin)
└──────────┘
```

---

## ✨ Destaques da Arquitetura

### **1. Separação de Responsabilidades**
- ✅ **Pages**: Gerenciam estado e orquestram
- ✅ **Components**: UI pura e reutilizável
- ✅ **Contexts**: Estado compartilhado
- ✅ **Services**: Comunicação com API
- ✅ **Utils**: Funções auxiliares

### **2. Reutilização**
- ✅ Componentes genéricos (PostList, UserList)
- ✅ Custom hooks (useFetch, useForm)
- ✅ Utilitários (validators, formatters)
- ✅ Barrel exports para imports limpos

### **3. Escalabilidade**
- ✅ Estrutura modular
- ✅ Fácil adicionar novas features
- ✅ CSS isolado por componente
- ✅ Código autodocumentado

### **4. Manutenibilidade**
- ✅ Nomenclatura consistente
- ✅ Documentação completa
- ✅ Exemplos práticos
- ✅ Sem código duplicado

---

## 🎓 Para Desenvolvedores

### **Começando**
1. Leia `README.md` para setup
2. Veja `ARCHITECTURE.md` para entender estrutura
3. Consulte `EXAMPLES.md` para casos de uso
4. Explore os componentes em `src/components/`

### **Adicionando Features**
1. Crie componentes em `components/`
2. Use custom hooks de `hooks/`
3. Valide com `utils/validators.js`
4. Formate com `utils/formatters.js`
5. Chame API via `services/`

### **Boas Práticas**
- ✅ Use hooks existentes antes de criar novos
- ✅ Reutilize componentes comuns
- ✅ Valide formulários com `validateForm`
- ✅ Formate dados com `formatters`
- ✅ Mantenha componentes pequenos

---

**📁 Estrutura completa e organizada!**

Total: **80 arquivos de código** + **5 arquivos de documentação** = **85 arquivos**

Desenvolvido com ❤️ por Squad 68 - Neocamp Wave 15
