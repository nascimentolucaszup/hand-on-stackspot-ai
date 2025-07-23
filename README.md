# 📄 Document Extractor com StackSpot AI

Este projeto é uma aplicação web desenvolvida em **Next.js** para upload, processamento e extração de dados estruturados a partir de documentos PDF ou PNG, integrando-se à StackSpot AI para análise inteligente e extração automatizada. O objetivo é facilitar o envio, processamento e visualização de informações extraídas, com possibilidade de exportação e futura persistência em banco de dados.

## ✨ Objetivo

Permitir que usuários enviem documentos (PDF/PNG), processem com agentes inteligentes (StackSpot AI), visualizem e exportem os dados extraídos, visando automação e padronização de fluxos de extração de dados.

## 🚀 Tecnologias Utilizadas

- [Next.js](https://nextjs.org/) (React, SSR/SSG)
- [TypeScript](https://www.typescriptlang.org/)
- [StackSpot AI](https://stackspot.com/)
- [Jest](https://jestjs.io/) (testes)
- [MongoDB](https://www.mongodb.com/) (planejado para persistência futura)
- [Tailwind CSS](https://tailwindcss.com/) (opcional, se usado para UI)
- Outras: [Vercel](https://vercel.com/) (deploy), [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)

## 🛠️ Instalação e Execução

1. **Clone o repositório:**
   ```bash
   git clone git@github.com:nascimentolucaszup/hand-on-stackspot-ai-pv.git
   cd seu-repo
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configuração de variáveis de ambiente:**
   - Crie um arquivo `.env.local` na raiz do projeto.
   - Exemplo de variáveis necessárias:
     ```
      STACKSPOT_REALM=
      STACKSPOT_CLIENT_ID=
      STACKSPOT_CLIENT_SECRET=
     ```

4. **Execute o servidor de desenvolvimento:**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. **Acesse a aplicação:**
   - Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 🧩 Funcionalidades

- Upload de arquivos PDF/PNG com validação de formato.
- Integração com StackSpot AI para extração de dados.
- Visualização dos dados extraídos (em desenvolvimento).
- Exportação dos dados para CSV/JSON (em desenvolvimento).
- Persistência dos dados extraídos em MongoDB (planejado).
- Testes automatizados com Jest.

## 📂 Estrutura do Projeto

```

.
├── app/                # Páginas e componentes Next.js
├── components/         # Componentes React reutilizáveis
├── api/                # Rotas de API (upload, integração StackSpot)
├── tests/              # Testes automatizados
├── public/             # Arquivos estáticos
├── README.md
└── ...
```

## 🧪 Testes

Execute os testes automatizados com:
```bash
npm test
# ou
yarn test
```

## 📝 Roadmap

- [x] Upload e validação de arquivos
- [x] Integração com StackSpot AI
- [x] Visualização estruturada dos dados extraídos
- [ ] Exportação para CSV/JSON
- [ ] Persistência em MongoDB

## 🤝 Contribuição

Contribuições são bem-vindas! Siga os passos:

1. Fork este repositório
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas alterações (`git commit -m 'feat: nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

---

> Desenvolvido por [Lucas Ribeiro/SA] — [StackSpot AI](https://stackspot.com/)