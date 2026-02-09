# 🔐 Feature: Sistema de Login

## 📋 **DESCRIÇÃO DA TAREFA**

Substituir o input que recebia ID de usuário por um sistema completo de autenticação com login/logout.

**Requisitos:**
- ✅ Remover input de ID de usuário
- ✅ Adicionar botão de Login na navegação
- ✅ Criar modal de login com username e senha
- ✅ Integrar com API de autenticação do back-end
- ✅ Salvar token JWT no localStorage
- ✅ Mostrar ID e nome do usuário quando logado
- ✅ Adicionar botão de Logout

---

## 🏗️ **ARQUITETURA IMPLEMENTADA**

### **1. Arquivos Criados**

```
src/
├── contexts/
│   └── AuthContext.jsx         ✅ NOVO - Context de autenticação
│
├── services/
│   └── authService.js          ✅ NOVO - Integração com API de login
│
└── components/
    └── common/
        ├── LoginModal.jsx      ✅ NOVO - Interface de login
        └── LoginModal.css      ✅ NOVO - Estilos do modal
```

### **2. Arquivos Modificados**

```
src/
├── App.jsx                     ✏️ MODIFICADO - Adicionado AuthProvider
├── services/
│   └── api.js                  ✏️ MODIFICADO - Interceptor JWT
│
└── components/
    └── layout/
        ├── UserSelector.jsx    ✏️ MODIFICADO - Botão login + exibição user
        └── UserSelector.css    ✏️ MODIFICADO - Novos estilos
```

### **3. Arquivos de Configuração**

```
.env                            ✅ NOVO - Variáveis de ambiente
.env.example                    ✅ NOVO - Template de configuração
.gitignore                      ✏️ MODIFICADO - Ignora .env
```

---

## 🔄 **FLUXO DE AUTENTICAÇÃO**

### **1. Usuário NÃO Logado**

```
┌──────────────────────────────┐
│  Navigation Bar              │
├──────────────────────────────┤
│  🏠 Home | 🔍 Explorar       │
│                              │
│         [🔐 Login]  ← Botão  │
└──────────────────────────────┘
```

**Ao clicar em "Login":**
1. Abre o modal `LoginModal`
2. Usuário digita username e senha
3. Envia `POST /auth/login` para o back-end
4. Back-end retorna token JWT + dados do usuário
5. Front salva no localStorage e AuthContext

### **2. Usuário Logado**

```
┌──────────────────────────────────┐
│  Navigation Bar                  │
├──────────────────────────────────┤
│  🏠 Home | 🔍 Explorar           │
│                                  │
│  👤 Logado como: joao #1  [Sair] │
└──────────────────────────────────┘
```

**Ao clicar em "Sair":**
1. Remove token e dados do localStorage
2. Limpa o AuthContext
3. Volta para o estado não logado

---

## 📦 **COMPONENTES CRIADOS**

### **1. AuthContext (`src/contexts/AuthContext.jsx`)**

**Responsabilidade:** Gerenciar estado global de autenticação

**Estados:**
- `isAuthenticated` - Boolean indicando se está logado
- `user` - Objeto com dados do usuário (userId, userName, userType)
- `loading` - Boolean para carregamento inicial

**Métodos:**
- `login(userName, password)` - Faz login
- `logout()` - Faz logout

**Exemplo de uso:**
```jsx
import { useAuth } from './contexts/AuthContext';

function MyComponent() {
  const { isAuthenticated, user, login, logout } = useAuth();
  
  if (isAuthenticated) {
    return <div>Olá, {user.userName}!</div>;
  }
  
  return <button onClick={() => login('joao', '123')}>Login</button>;
}
```

---

### **2. authService (`src/services/authService.js`)**

**Responsabilidade:** Comunicação com API de autenticação

**Métodos:**

| Método | Descrição |
|--------|-----------|
| `login(userName, password)` | Faz login no back-end |
| `saveAuthData(loginData)` | Salva token e dados no localStorage |
| `clearAuthData()` | Remove dados do localStorage |
| `getToken()` | Recupera token salvo |
| `isAuthenticated()` | Verifica se está autenticado |
| `getAuthenticatedUser()` | Recupera dados do usuário logado |

**Integração com Back-end:**
```javascript
// Request
POST http://localhost:8080/api/v1/auth/login
Content-Type: application/json

{
  "user_name": "joao",
  "password": "senha123"
}

// Response
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user_id": 1,
  "user_name": "joao",
  "user_type": "Buyer"
}
```

---

### **3. LoginModal (`src/components/common/LoginModal.jsx`)**

**Responsabilidade:** Interface de login

**Props:**
- `isOpen` (boolean) - Controla visibilidade do modal
- `onClose` (function) - Callback ao fechar

**Estados internos:**
- `userName` - Input de username
- `password` - Input de senha
- `loading` - Estado de carregamento
- `error` - Mensagem de erro

**Validações:**
- ✅ Campos obrigatórios
- ✅ Feedback visual de erros
- ✅ Loading durante requisição
- ✅ Limpa formulário após sucesso

**Estilos:**
- Modal centralizado com overlay
- Animações suaves (fadeIn, slideUp)
- Responsivo para mobile
- Feedback visual de erros

---

### **4. UserSelector Atualizado (`src/components/layout/UserSelector.jsx`)**

**Antes:**
```jsx
// Input para digitar ID
<input type="number" placeholder="Digite seu ID" />
<button>Entrar</button>
```

**Depois:**
```jsx
// Usuário NÃO logado
<button onClick={openLoginModal}>🔐 Login</button>

// Usuário LOGADO
<div>
  👤 Logado como: {userName} #{userId}
  <button onClick={logout}>🚪 Sair</button>
</div>
```

---

## 🔧 **INTERCEPTOR JWT**

### **Atualização em `api.js`**

**Antes:**
```javascript
api.interceptors.request.use((config) => {
  console.log(`🔵 [API] ${config.method} ${config.url}`);
  return config;
});
```

**Depois:**
```javascript
api.interceptors.request.use((config) => {
  // Adiciona token JWT automaticamente
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  console.log(`🔵 [API] ${config.method} ${config.url}`);
  return config;
});
```

**Benefício:** Todas as requisições autenticadas automaticamente incluem o token!

---

## 🧪 **COMO TESTAR**

### **1. Iniciar o Back-end**
```bash
cd projeto-pratico-neocamp-wave15-squad68
go run cmd/api/main.go
```

### **2. Iniciar o Front-end**
```bash
cd frontend-apiSocialMeli
npm run dev
```

### **3. Testar Fluxo Completo**

**Passo 1:** Abrir http://localhost:5173

**Passo 2:** Clicar no botão "🔐 Login"

**Passo 3:** Digitar credenciais:
- Username: (usuário cadastrado no banco)
- Senha: (senha do usuário)

**Passo 4:** Verificar que aparece:
```
👤 Logado como: [nome] #[id]  [Sair]
```

**Passo 5:** Clicar em "Sair" e verificar que volta para:
```
[🔐 Login]
```

---

## 🎯 **DADOS SALVOS NO LOCALSTORAGE**

Quando o usuário faz login, os seguintes dados são salvos:

```javascript
localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIs...');
localStorage.setItem('userId', '1');
localStorage.setItem('userName', 'joao');
localStorage.setItem('userType', 'Buyer');
```

**Benefício:** Usuário permanece logado mesmo após recarregar a página!

---

## 🔒 **SEGURANÇA**

### **Token JWT**
- ✅ Token salvo no localStorage
- ✅ Enviado automaticamente em todas requisições (Bearer Token)
- ✅ Expira em 24 horas (configurado no back-end)

### **Senha**
- ✅ NUNCA salva no front-end
- ✅ Enviada apenas no momento do login
- ✅ Validada e hasheada no back-end

### **Logout**
- ✅ Remove todos os dados do localStorage
- ✅ Limpa estado do AuthContext
- ✅ Redireciona para estado não autenticado

---

## 📱 **RESPONSIVIDADE**

### **Desktop**
```
┌────────────────────────────────────────────┐
│  Navigation Bar                            │
│  🏠 Home | 🔍 Explorar    [🔐 Login]      │
└────────────────────────────────────────────┘
```

### **Mobile**
```
┌──────────────────┐
│  Nav Bar         │
│  🏠 🔍           │
│     [🔐 Login]   │
└──────────────────┘
```

Modal de login se adapta para 95% da largura em telas pequenas.

---

## 🚀 **PRÓXIMAS MELHORIAS (Futuro)**

- [ ] Adicionar "Esqueci minha senha"
- [ ] Adicionar "Lembrar-me" (checkbox)
- [ ] Refresh token automático
- [ ] Proteção de rotas privadas
- [ ] Exibir tipo de usuário (Buyer/Seller)
- [ ] Perfil do usuário

---

## 🐛 **TROUBLESHOOTING**

### **Erro: "Failed to fetch"**
- ✅ Verificar se o back-end está rodando
- ✅ Verificar URL em `.env` (VITE_API_BASE_URL)

### **Erro: "Invalid username or password"**
- ✅ Verificar se o usuário existe no banco
- ✅ Verificar se a senha está correta

### **Token não está sendo enviado**
- ✅ Verificar console do navegador
- ✅ Verificar Network tab (deve ter header `Authorization: Bearer ...`)

### **Usuário desloga sozinho**
- ✅ Token pode ter expirado (24h)
- ✅ Fazer login novamente

---

## 📊 **COMPARAÇÃO: ANTES vs DEPOIS**

### **ANTES**
```
❌ Input de ID numérico
❌ Sem autenticação real
❌ Sem segurança
❌ Qualquer um podia se passar por qualquer usuário
```

### **DEPOIS**
```
✅ Login com username e senha
✅ Autenticação com JWT
✅ Token enviado automaticamente
✅ Usuário precisa de credenciais válidas
✅ Logout seguro
✅ Persistência de sessão
```

---

## 👨‍💻 **CRÉDITOS**

**Implementado por:** Eliakim Simoes  
**Data:** 06/02/2026  
**Tarefa:** [Front] - Substituir input de ID por botão de login
