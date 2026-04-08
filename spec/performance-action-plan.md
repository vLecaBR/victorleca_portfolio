# Plano de Ação Orientado a Especificações (Spec-Driven) para Otimização de Performance

## 1. Visão Geral do Problema
O repositório foi analisado com base nas métricas de performance fornecidas:
- **First Contentful Paint (FCP):** 5.46s (Muito alto)
- **Largest Contentful Paint (LCP):** 5.74s (Muito alto)
- **Interaction to Next Paint (INP):** 680ms (Muito alto)

O acesso nos Estados Unidos apresenta alta latência. Como o site não utiliza um framework SSR nativo (como Next.js ou Remix), mas sim Vite + React (CSR - Client-Side Rendering), todo o HTML, CSS e JavaScript precisam ser baixados, parseados e executados antes que a primeira tela (Hero) seja visível. Além disso, a thread principal está sendo bloqueada, gerando um INP alto. 

O objetivo é **não alterar o estilo visual**, aplicando apenas refatorações arquiteturais, otimizações de carregamento e mudanças na infraestrutura.

---

## 2. Diagnóstico a partir do Repositório

1. **FCP e LCP Lentos:**
   - O arquivo `index.html` não possui conteúdo estrutural do Hero. Ele contém apenas `<div id="root"></div>`. O usuário vê uma tela preta/em branco até o download e execução completa do bundle JS principal (que inclui React, Framer Motion, App.tsx, Hero.tsx, etc.).
   - Analytics e SpeedInsights da Vercel estão no nível do `App.tsx` e são renderizados logo no início, podendo competir por banda com os recursos críticos.
   - Existe uma distância de rede (latência) se os servidores ou funções Serverless da Vercel estiverem configurados apenas no Brasil ou em uma região distante dos EUA, não aproveitando eficientemente a Edge Network para os assets estáticos.

2. **INP Alto (Bloqueio de Main Thread):**
   - O componente `Hero` utiliza `useScroll` e `useTransform` da biblioteca `motion/react`, que realizam cálculos atrelados ao evento de rolagem.
   - Há a renderização de partículas na tela que, apesar de estarem usando `will-change: transform` e CSS animations, são injetadas de forma dinâmica no `useEffect` com múltiplos elementos absolutos na DOM.
   - A hidratação/renderização inicial do React está demorando muito, acumulando tarefas longas (Long Tasks) na Main Thread do navegador.

---

## 3. Plano de Ação (Step-by-Step)

### Etapa 1: Redução do Bundle Principal (Code Splitting & Deferring)
O objetivo é que o navegador baixe apenas o estritamente necessário para pintar a tela inicial (`Hero`) o mais rápido possível.

- **1.1. Adiamento de Scripts Analíticos:**
  Mover o `<Analytics />` e `<SpeedInsights />` para serem carregados dinamicamente ou envelopá-los em um `Suspense` para que não concorram na thread principal durante o First Contentful Paint.
- **1.2. Otimização do Framer Motion:**
  O `motion` está sendo importado diretamente (`import { motion } from "motion/react"`). Para reduzir o tamanho inicial, deve-se usar a versão "m" do framer-motion junto com o `LazyMotion` de forma mais restrita, garantindo que as animações sejam carregadas de forma assíncrona.
- **1.3. Ajuste no Vite Config (Chunk Splitting):**
  Adicionar regras no `vite.config.ts` (`build.rollupOptions.output.manualChunks`) para separar dependências pesadas (`react`, `react-dom`, `framer-motion`, `lucide-react`) em arquivos `.js` distintos. Isso permite cache paralelo e mais eficiente.

### Etapa 2: Pré-renderização e Priorização de LCP (HTML Estático)
Como estamos usando Vite CSR, o navegador não sabe o que pintar até ler o JS.

- **2.1. Uso do Vite Plugin SSG ou Prerender:**
  Implementar um plugin como `vite-plugin-prerender` para injetar o HTML estrutural do componente `Hero` diretamente no `index.html` gerado no build. Assim, assim que o HTML for baixado, a página já exibe o texto "Victor Leça" e o fundo (melhorando o FCP e LCP de ~5s para <1s), enquanto o JS hidrata o restante em segundo plano.
- **2.2. Preconnect e Preload:**
  Adicionar `<link rel="preload">` no `index.html` para as fontes críticas (caso houverem fontes customizadas baixadas) e para a imagem de LCP, se ela for dinâmica.
- **2.3. Suspense no ScrollProgress e NavBar:**
  Caso a Navbar não seja absolutamente crítica para o LCP, ela também pode sofrer lazy load, garantindo 100% de prioridade à renderização do `Hero`.

### Etapa 3: Correção do INP (Interaction to Next Paint)
Otimizar a execução do JavaScript para evitar "engasgos" quando o usuário tenta rolar a página ou clicar.

- **3.1. Otimização das Partículas do Hero:**
  Substituir a criação das partículas via array do React no `useEffect` por um elemento de Canvas (ex: leve script de partículas) ou exportar as partículas puramente em um arquivo `.css` estático (usando variáveis CSS no lugar de JS em tempo de execução). Isso tira o peso de cálculo do React.
- **3.2. Throttle/Debounce no Scroll:**
  O hook `useScroll` deve ser verificado. Se possível, usar animações orientadas via CSS puro com `animation-timeline` (uma feature moderna) ou aplicar um layout mais otimizado de intersection observer.
- **3.3. Rendimento da Thread (Yielding):**
  Usar `startTransition` do React para atualizar estados secundários (como a visibilidade das seções do lazy load), garantindo que inputs do usuário tenham prioridade na thread de execução.

### Etapa 4: Configuração de Infraestrutura e Borda (Vercel)
A queixa principal é o tempo de carregamento específico nos Estados Unidos.

- **4.1. Edge Caching:**
  Adicionar configurações no arquivo `vercel.json` estipulando os cabeçalhos corretos (`Cache-Control`) para assets imutáveis e forçando a Vercel a servir todo o diretório `/dist` a partir do Global CDN Edge.
- **4.2. Região de Função Serverless (se aplicável):**
  Se houvessem API routes envolvidas, seria necessário mudar a região em `vercel.json`. Como é estático, o problema nos EUA indica que a CDN não está fazendo cache corretamente nas edges norte-americanas ("MISS" no cache do CDN).
- **4.3. Brotli / Gzip:**
  Verificar e forçar a compressão do payload na Vercel adicionando regras para reduzir drasticamente a quantidade de KBs que cruzam o oceano e o continente.

---

## 4. Próximos Passos Imediatos
Se você quiser que eu comece a aplicar essas correções no código para atingir métricas aceitáveis, os primeiros passos que eu realizarei serão:
1. Ajustar o `vite.config.ts` para separar as dependências pesadas (Chunks).
2. Refatorar a importação de bibliotecas no `App.tsx` e `Hero.tsx`.
3. Adicionar uma etapa de Prerender estático no build para corrigir o FCP e LCP instantaneamente.
4. Adicionar as regras adequadas de CDN no arquivo `vercel.json`.