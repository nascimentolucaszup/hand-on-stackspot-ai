# Histórias de usuários

## 1. Receber Documento para Processamento
**Como um** usuário, **eu quero** enviar documentos em formato PDF ou PNG para o sistema, **para que** eu possa iniciar o processo de extração de dados.

- **Tipo:** Funcional
- **Subclassificação:** User Story
- **Story Points:** 5
- **Critérios de Aceitação:**
  - O sistema deve permitir o upload de documentos nos formatos PDF e PNG.
  - O usuário deve receber uma confirmação visual de que o documento foi enviado com sucesso.
  - O sistema deve validar o formato do arquivo e rejeitar arquivos que não sejam PDF ou PNG.
  - Todos os uploads devem ser registrados para auditoria futura.
- **Interação com outras fontes de dados:** [x] Sim
- **Número de campos ou elementos estáticos adicionados:** 3
- **Número de elementos dinâmicos adicionados:** 0
- **Fluxos percorridos pela funcionalidade:**
  - Fluxo de Disparo: O usuário clica em "Enviar Documento".
  - Fluxo de Interrupção: O sistema valida e processa o documento.
- **Descrição do fluxo:** O usuário acessa a interface de upload, seleciona um arquivo e clica em "Enviar". O sistema valida o arquivo e armazena temporariamente.
- **Número de passos após o disparo:** 3
- **Pontos de decisão:** 1
- **É disparado algum processo em segundo plano?:** [x] Sim
- **Total de Story Points:** 5

---

## 2. Upload como Knowledge Source Temporária
**Como um** sistema, **eu quero** armazenar o documento enviado como uma Knowledge Source temporária na StackSpot AI, **para que** as informações possam ser processadas e extraídas de forma eficiente.

- **Tipo:** Funcional
- **Subclassificação:** User Story
- **Story Points:** 8
- **Critérios de Aceitação:**
  - O sistema deve integrar-se com a StackSpot AI para armazenar o documento como uma Knowledge Source temporária.
  - Deve ser garantido que o documento permaneça acessível para processamento por um agente especializado.
  - O sistema deve registrar a metadata do documento, incluindo timestamp e tipo de documento.
  - O sistema deve permitir a consulta temporária das Knowledge Sources armazenadas.
- **Interação com outras fontes de dados:** [x] Sim
- **Número de campos ou elementos estáticos adicionados:** 2
- **Número de elementos dinâmicos adicionados:** 1
- **Fluxos percorridos pela funcionalidade:**
  - Fluxo de Disparo: O documento é enviado para a StackSpot AI.
  - Fluxo de Interrupção: O sistema confirma o armazenamento bem-sucedido.
- **Descrição do fluxo:** Após o upload, o sistema envia o documento para a StackSpot AI e aguarda a confirmação de armazenamento.
- **Número de passos após o disparo:** 2
- **Pontos de decisão:** 0
- **É disparado algum processo em segundo plano?:** [x] Sim
- **Total de Story Points:** 8

---

## 3. Extração de Dados com Agente Especializado
**Como um** usuário, **eu quero** que um agente especializado extraia todas as informações relevantes do documento enviado, **para que** eu tenha acesso a dados precisos e organizados.

- **Tipo:** Funcional
- **Subclassificação:** User Story
- **Story Points:** 13
- **Critérios de Aceitação:**
  - O agente deve ser capaz de processar documentos PDF e PNG e extrair informações relevantes.
  - Os dados extraídos devem ser organizados em um formato estruturado.
  - O usuário deve poder visualizar os dados extraídos em tempo real após a extração.
  - O sistema deve oferecer uma opção de reprocessamento em caso de falha na extração inicial.
- **Interação com outras fontes de dados:** [x] Sim
- **Número de campos ou elementos estáticos adicionados:** 3
- **Número de elementos dinâmicos adicionados:** 5
- **Fluxos percorridos pela funcionalidade:**
  - Fluxo de Disparo: A extração é iniciada após o armazenamento do documento.
  - Fluxo de Interrupção: O sistema apresenta os dados extraídos.
- **Descrição do fluxo:** O agente inicia a extração dos dados assim que o documento é armazenado, e os resultados são apresentados ao usuário.
- **Número de passos após o disparo:** 4
- **Pontos de decisão:** 1
- **É disparado algum processo em segundo plano?:** [x] Sim
- **Total de Story Points:** 13

---

## 4. Apresentação de Dados em Output Estruturado
**Como um** usuário, **eu quero** que as informações extraídas sejam apresentadas em um formato de "structure output", **para que** os dados sejam padronizados e fáceis de entender.

- **Tipo:** Funcional
- **Subclassificação:** User Story
- **Story Points:** 5
- **Critérios de Aceitação:**
  - Os dados extraídos devem ser apresentados em um formato visualmente estruturado.
  - O sistema deve permitir a exportação dos dados em formatos como CSV ou JSON.
  - O usuário deve ter a opção de visualizar os dados diretamente na interface ou baixar o arquivo.
- **Interação com outras fontes de dados:** [x] Sim
- **Número de campos ou elementos estáticos adicionados:** 2
- **Número de elementos dinâmicos adicionados:** 3
- **Fluxos percorridos pela funcionalidade:**
  - Fluxo de Disparo: O usuário solicita a visualização dos dados extraídos.
  - Fluxo de Interrupção: O sistema gera e apresenta o output estruturado.
- **Descrição do fluxo:** O sistema formata e exibe os dados extraídos de forma organizada, permitindo opções de download.
- **Número de passos após o disparo:** 2
- **Pontos de decisão:** 0
- **É disparado algum processo em segundo plano?:** [x] Não
- **Total de Story Points:** 5

---

## 5. Armazenamento em Banco de Dados MongoDB
**Como um** sistema, **eu quero** armazenar as informações extraídas em um banco de dados MongoDB, **para que** os dados processados possam ser recuperados facilmente e evitar retrabalho.

- **Tipo:** Funcional
- **Subclassificação:** User Story
- **Story Points:** 8
- **Critérios de Aceitação:**
  - O sistema deve armazenar todas as informações extraídas em uma coleção específica do MongoDB.
  - Deve ser garantida a integridade dos dados durante o armazenamento.
  - O sistema deve permitir a consulta e recuperação dos dados armazenados de forma eficiente.
- **Interação com outras fontes de dados:** [x] Sim
- **Número de campos ou elementos estáticos adicionados:** 1
- **Número de elementos dinâmicos adicionados:** 0
- **Fluxos percorridos pela funcionalidade:**
  - Fluxo de Disparo: A extração de dados é concluída e os dados são enviados para o MongoDB.
  - Fluxo de Interrupção: O sistema confirma que os dados foram armazenados com sucesso.
- **Descrição do fluxo:** Após a extração, os dados são formatados e enviados para o banco de dados MongoDB para armazenamento.
- **Número de passos após o disparo:** 2
- **Pontos de decisão:** 0
- **É disparado algum processo em segundo plano?:** [x] Sim
- **Total de Story Points:** 8

---
