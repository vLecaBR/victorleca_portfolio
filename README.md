# 🌐 Leça — Portfolio

Repositório do meu portfólio pessoal, desenvolvido para apresentar meus projetos, habilidades e experiências como **Full-Stack Developer**.
O site foi otimizado para ser rápido, fluido e com animações suaves, oferecendo uma navegação moderna e clean.

- [📘 Portfolio Online](https://victorleca-portfolio.vercel.app/)

# 🛠️ Tecnologias utilizadas

- **React + TypeScript** – Estrutura principal da aplicação
- **Vite** – Build tool super rápida
- **TailwindCSS** – Estilização responsiva e customizável
- **Framer Motion** – Animações fluidas
- **Lucide Icons** – Ícones modernos
- **Zustand** (quando necessário) – Gerenciamento de estado simples e eficaz

# 📁 Estrutura do projeto
```
├── 📁 .github
│   └── 📁 workflows
│       └── ⚙️ ci.yml
├── 📁 public
│   ├── 📁 assets
│   │   ├── 🖼️ VL.svg
│   │   ├── 🖼️ cliqz.png
│   │   ├── 🖼️ cliqz2.png
│   │   ├── 🖼️ djfranzoni.png
│   │   ├── 🖼️ djfranzoni2.png
│   │   ├── 🖼️ eastqg.png
│   │   ├── 🖼️ eastqg2.png
│   │   ├── 🖼️ react.svg
│   │   ├── 🖼️ sales.png
│   │   ├── 🖼️ sales2.png
│   │   └── 🖼️ sales3.png
│   └── 🖼️ VL.svg
├── 📁 src
│   ├── 📁 components
│   │   ├── 📁 About
│   │   │   └── 📄 About.tsx
│   │   ├── 📁 Contact
│   │   │   └── 📄 Contact.tsx
│   │   ├── 📁 Experience
│   │   │   └── 📄 Experience.tsx
│   │   ├── 📁 Footer
│   │   │   └── 📄 Footer.tsx
│   │   ├── 📁 Hero
│   │   │   └── 📄 Hero.tsx
│   │   ├── 📁 NavBar
│   │   │   └── 📄 NavBar.tsx
│   │   ├── 📁 Projects
│   │   │   └── 📄 Projects.tsx
│   │   ├── 📁 ScrollProgress
│   │   │   └── 📄 ScrollProgress.tsx
│   │   └── 📁 Skills
│   │       └── 📄 Skills.tsx
│   ├── 📁 context
│   │   └── 📄 LanguageContext.tsx
│   ├── 📁 figma
│   │   └── 📄 ImageWithFallback.tsx
│   ├── 📁 locales
│   │   └── 📄 translations.ts
│   ├── 📁 styles
│   │   ├── 🎨 globals.css
│   │   └── 🎨 tailwind.css
│   ├── 📄 App.tsx
│   └── 📄 main.tsx
├── ⚙️ .gitignore
├── 📝 README.md
├── 📄 eslint.config.js
├── 🌐 index.html
├── ⚙️ package-lock.json
├── ⚙️ package.json
├── 📄 tailwind.config.ts
├── ⚙️ tsconfig.app.json
├── ⚙️ tsconfig.json
├── ⚙️ tsconfig.node.json
└── 📄 vite.config.ts
```

# ⚙️ Como rodar o projeto

- **Clone o repositório**:
```
git clone <url-do-repo>
```

- **Instale as dependências**:
```
npm install
```

- **Execute o ambiente de desenvolvimento**:
```
npm run dev
```
> O projeto roda por padrão em:
> 🌍 `http://localhost:5173`


# 📌 Organização dos projetos

- **Cada projeto incluído no portfólio contém**:
```
Título
Descrição
Tecnologias
githubUrlFront — Repositório do front-end
githubUrlBack — Repositório do back-end (se houver)
hosting — Link da hospedagem (front/back)
Imagem — Preview do projeto
Essas informações são carregadas dinamicamente através do arquivo projectsData.ts.
```

# 🔹 Estrutura do objeto de projeto
```
{
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  githubUrlFront: string;
  githubUrlBack?: string;
  hosting?: string;
}
```

# 📱 Responsividade

- **O layout foi refinado manualmente para mobile, garantindo**:
```
Navegação fluida
Menu mobile animado
Grid reorganizado
Componentes mais leves
Melhor UX em telas pequenas
```

# 🚀 Deploy

- **Recomendado utilizar**:
```
Vercel (o que foi utilizado)
Netlify
Ambos fazem deploy automaticamente via GitHub.
```

# 📬 Contato

- **Se quiser trocar ideia, colaborar ou só dar um feedback:

Email: vitartasleca@gmail.com
- [📘 LinkedIn](https://www.linkedin.com/in/victor-leca-vlkbr/)
- [📘 Portfolio Online](https://victorleca-portfolio.vercel.app/)


## 📄 Licença
> Projeto distribuído sob a licença MIT.