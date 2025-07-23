# Arquitetura em C4 Model

### 1. System Context Diagram (Nível 1)

```plantuml
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Context.puml

Person(dev, "Usuário", "Usuário que faz upload e consulta documentos")
System_Boundary(s1, "Sistema de Extração de Certificados e CNPJ") {
    System(system, "Sistema de Extração", "Extrai e armazena informações de certificados e comprovantes de CNPJ")
}

System_Ext(stackspot, "StackSpot AI", "Plataforma de IA para extração de dados")
System_Ext(mongodb, "MongoDB", "Banco de dados para armazenamento dos dados extraídos")

Rel(dev, system, "Faz upload e consulta documentos")
Rel(system, stackspot, "Envia documento e recebe dados extraídos")
Rel(system, mongodb, "Armazena e consulta dados extraídos")

@enduml
```

---

### 2. Container Diagram (Nível 2)

```plantuml
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Container.puml

Person(dev, "Usuário")

System_Boundary(s1, "Sistema de Extração de Certificados e CNPJ") {
    Container(api, "API Backend", "Nextjs", "Recebe uploads, consulta dados, integra com StackSpot AI e MongoDB")
    Container(web, "Interface Web", "Nextjs", "Permite upload e consulta dos documentos (opcional)")
    ContainerDb(db, "MongoDB", "NoSQL Database", "Armazena dados extraídos")
}

System_Ext(stackspot, "StackSpot AI", "Plataforma de IA para extração de dados")

Rel(dev, web, "Usa via navegador")
Rel(web, api, "Chama API REST")
Rel(dev, api, "Usa via API (upload/consulta)", "JSON/HTTP")
Rel(api, stackspot, "Envia documento e recebe dados extraídos", "REST/HTTP")
Rel(api, db, "Armazena e consulta dados extraídos", "MongoDB Protocol")

@enduml
```

---

### 3. Component Diagram (Nível 3)

```plantuml
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Component.puml

Container(api, "API Backend", "Node.js + Next.js API Routes", "Recebe uploads, consulta dados, integra com StackSpot AI e MongoDB") {
    Component(controller, "DocumentApiRoute", "Next.js API Route", "Gerencia endpoints de upload e consulta")
    Component(service, "DocumentService", "TypeScript Service", "Orquestra envio para StackSpot AI e normalização dos dados")
    Component(auth, "AuthMiddleware", "JWT/OAuth2", "Gerencia autenticação e autorização")
    Component(repo, "MongoRepository", "Mongoose", "Acessa e armazena dados no MongoDB")
    Component(logger, "Logger", "Winston/Pino", "Registra logs e erros")
    Component(stackspot, "StackSpotAgent", "StackSpot API", "Recebe arquivos para processamento e retorna dados extraídos")
}

Rel(controller, auth, "Valida autenticação")
Rel(controller, service, "Solicita extração de dados")
Rel(service, stackspot, "Envia documento e recebe dados extraídos")
Rel(service, repo, "Armazena/consulta dados extraídos")
Rel(service, logger, "Registra logs")
Rel(controller, repo, "Consulta dados extraídos")
Rel(controller, logger, "Registra logs")

@enduml
```

---

## Explicação das Camadas

### 1. System Context (Nível 1)
- Mostra o sistema como um todo, seus usuários (Pessoa desenvolvedora/usuário final), e integrações externas (StackSpot AI e MongoDB).
- O usuário interage com o sistema para upload e consulta de documentos.
- O sistema utiliza StackSpot AI para extração e MongoDB para armazenamento.

### 2. Container (Nível 2)
- Detalha os principais containers do sistema:
  - **API Backend (Next.js API Routes)**: Responsável pela lógica de negócio, recebimento de uploads, integração com StackSpot Agent e acesso ao MongoDB.
  - **Interface Web (Next.js Pages/React)**: (Opcional) Frontend para upload de arquivos e consulta de dados extraídos.
  - **MongoDB**: Banco de dados para armazenar e consultar os dados extraídos dos documentos.
- Mostra como os containers se comunicam entre si (ex: Interface Web faz chamadas para API Backend) e com sistemas externos (ex: API Backend integra com StackSpot Agent e MongoDB).

### 3. Component (Nível 3)
- Detalha os principais componentes dentro do container da API Backend (Next.js):
  - **DocumentApiRoute**: Gerencia os endpoints de upload e consulta de documentos.
  - **DocumentService**: Orquestra o envio de arquivos para o StackSpot Agent e a normalização dos dados extraídos.
  - **AuthMiddleware**: Gerencia autenticação e autorização nas rotas.
  - **MongoRepository**: Realiza o acesso e armazenamento de dados no MongoDB usando Mongoose.
  - **Logger**: Registra logs e trata erros (ex: Winston ou Pino).
  - **StackSpotAgent**: Responsável pelo processamento dos arquivos e extração dos dados.
- Mostra as dependências e interações entre os componentes.

---

Se precisar de um detalhamento maior de algum nível ou de exemplos de código para algum componente, é só pedir! 