# 🇯🇵 Aprenda Japonês - Plataforma de Aprendizado de Idiomas

Uma aplicação web moderna e interativa para aprender japonês, desde o básico até o avançado. Construída com Next.js 14, React, TypeScript e Tailwind CSS.

## 🌟 Funcionalidades

- ✅ **Sistema de Autenticação** - Login seguro com NextAuth.js
- 📚 **Lições Interativas** - Aprenda Hiragana, Katakana, Vocabulário e Gramática
- 🎯 **Quizzes de Prática** - Teste seus conhecimentos com quizzes interativos
- 📊 **Perfil do Usuário** - Acompanhe seu progresso e estatísticas
- 🔥 **Sistema de Sequência** - Mantenha sua motivação estudando diariamente
- 📱 **Design Responsivo** - Funciona perfeitamente em mobile, tablet e desktop

## 🛠️ Tecnologias Utilizadas

### **Frontend**
- **[Next.js 14](https://nextjs.org/)** - Framework React com App Router
- **[React 18](https://react.dev/)** - Biblioteca JavaScript para UI
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática para JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utility-first
- **[Lucide React](https://lucide.dev/)** - Ícones modernos e elegantes

### **Backend & Autenticação**
- **[NextAuth.js (Auth.js)](https://next-auth.js.org/)** - Autenticação completa para Next.js
- **[Prisma](https://www.prisma.io/)** - ORM (Object-Relational Mapping) moderno
- **[PostgreSQL (Neon)](https://neon.tech/)** - Banco de dados relacional serverless

### **Gerenciamento de Estado**
- **React Hooks** - useState, useEffect, useSession
- **Next.js Server Components** - Renderização server-side otimizada

### **Validação & Formulários**
- **Zod** - Validação de schemas TypeScript-first
- **React Hook Form** - Gerenciamento de formulários performático

### **Deploy & Hospedagem**
- **[Vercel](https://vercel.com/)** - Plataforma de deploy otimizada para Next.js
- **[Neon](https://neon.tech/)** - Banco de dados PostgreSQL serverless

## 📁 Estrutura do Projeto

```
japanese-learning-app/
├── app/                          # App Router (Next.js 14)
│   ├── api/                      # API Routes
│   │   └── auth/[...nextauth]/   # Configuração NextAuth.js
│   ├── auth/                     # Páginas de autenticação
│   │   └── signin/               # Página de login
│   ├── lessons/                  # Páginas de lições
│   │   ├── [id]/                 # Lição individual (dynamic route)
│   │   └── page.tsx              # Lista de lições
│   ├── practice/                 # Quiz de prática
│   ├── profile/                  # Perfil do usuário
│   ├── layout.tsx                # Layout raiz
│   ├── page.tsx                  # Página inicial
│   └── globals.css               # Estilos globais
├── components/                   # Componentes React reutilizáveis
│   ├── navbar.tsx                # Barra de navegação
│   ├── providers.tsx             # Providers (SessionProvider)
│   ├── ui/                       # Componentes de UI
│   ├── lessons/                  # Componentes de lições
│   └── quiz/                     # Componentes de quiz
├── lib/                          # Utilitários e configurações
│   ├── prisma.ts                 # Cliente Prisma
│   └── utils.ts                  # Funções auxiliares
├── prisma/                       # Configuração do banco de dados
│   └── schema.prisma             # Schema do Prisma (modelos de dados)
├── types/                        # Definições de tipos TypeScript
│   └── next-auth.d.ts            # Tipos customizados NextAuth
├── .env                          # Variáveis de ambiente (não commitado)
├── .gitignore                    # Arquivos ignorados pelo Git
├── next.config.ts                # Configuração Next.js
├── package.json                  # Dependências do projeto
├── tailwind.config.ts            # Configuração Tailwind CSS
└── tsconfig.json                 # Configuração TypeScript
```

## 🗄️ Estrutura do Banco de Dados

### **Modelos Prisma**

```prisma
User              # Usuários da plataforma
├── id
├── email
├── name
├── progress      # Relação 1:N com Progress
└── quizResults   # Relação 1:N com QuizResult

Lesson            # Conteúdo das lições
├── id
├── title         # Título em japonês
├── titlePt       # Título em português
├── content       # Conteúdo JSON
├── type          # HIRAGANA, KATAKANA, VOCABULARY, GRAMMAR
└── difficulty    # BEGINNER, INTERMEDIATE, ADVANCED

Progress          # Progresso do usuário
├── id
├── userId
├── lessonId
├── completed
└── score

Quiz              # Quizzes
├── id
├── title
├── questions     # Perguntas em JSON
└── results       # Relação 1:N com QuizResult

QuizResult        # Resultados dos quizzes
├── id
├── userId
├── quizId
├── score
└── answers

Vocabulary        # Palavras salvas pelo usuário
├── id
├── userId
├── word
├── reading
├── meaning
└── mastered
```

## 🚀 Como Executar Localmente

### **Pré-requisitos**
- Node.js 18+ instalado
- Conta no GitHub
- Conta no Neon (para banco de dados)

### **1. Clone o repositório**
```bash
git clone https://github.com/seu-usuario/japanese-learning-app.git
cd japanese-learning-app
```

### **2. Instale as dependências**
```bash
npm install
```

### **3. Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto:

```env
# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# NextAuth
NEXTAUTH_SECRET="seu-secret-aqui"
NEXTAUTH_URL="http://localhost:3000"
```

### **4. Configure o banco de dados**
```bash
npx prisma db push
npx prisma generate
```

### **5. Execute o servidor de desenvolvimento**
```bash
npm run dev
```

Acesse http://localhost:3000 no navegador.

### **6. (Opcional) Visualize o banco de dados**
```bash
npx prisma studio
```

## 📦 Scripts Disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Cria build de produção
npm run start        # Inicia servidor de produção
npm run lint         # Executa ESLint
npx prisma studio    # Abre interface visual do banco de dados
npx prisma db push   # Sincroniza schema com banco de dados
```

## 🎨 Páginas e Rotas

| Rota | Descrição | Autenticação |
|------|-----------|--------------|
| `/` | Página inicial (landing page) | Não |
| `/auth/signin` | Página de login | Não |
| `/lessons` | Lista de lições disponíveis | Não |
| `/lessons/[id]` | Conteúdo da lição específica | Não |
| `/practice` | Quiz de prática | Não |
| `/profile` | Perfil e estatísticas do usuário | ✅ Sim |

## 🔐 Sistema de Autenticação

- **Provedor**: NextAuth.js com Credentials Provider
- **Sessão**: JWT (JSON Web Token)
- **Banco de Dados**: Informações armazenadas no PostgreSQL via Prisma
- **Modo Demo**: Login simplificado (apenas email, sem senha real)

## 🎯 Estado Atual do Projeto

### ✅ **Implementado**
- Sistema de autenticação funcional
- Interface de usuário responsiva e moderna
- Páginas de lições com conteúdo educativo
- Sistema de quiz interativo
- Navegação fluida entre páginas
- Perfil do usuário com estatísticas (mock data)
- Deploy configurado no Vercel

### 🚧 **Em Desenvolvimento**
- Salvar progresso das lições no banco de dados
- Salvar resultados dos quizzes
- Sistema de pontos e gamificação
- Mais lições e conteúdos
- Sistema de revisão espaçada (SRS)
- Audio para pronúncia dos caracteres

### 💡 **Futuras Melhorias**
- Adicionar mais níveis (intermediário, avançado)
- Sistema de conquistas (achievements)
- Modo escuro (dark mode)
- Exportar progresso
- Compartilhamento em redes sociais
- PWA (Progressive Web App)

## 🌐 Deploy

### **Vercel (Recomendado)**

1. Conecte seu repositório GitHub ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push na branch main

### **Variáveis de Ambiente (Produção)**
```env
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://seu-dominio.vercel.app
```

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 👨‍💻 Autor

Desenvolvido com ❤️ para a comunidade brasileira que aprende japonês.

## 📞 Suporte

Se você tiver alguma dúvida ou sugestão, abra uma issue no GitHub!

---

⭐ Se este projeto te ajudou, considere dar uma estrela no GitHub!
