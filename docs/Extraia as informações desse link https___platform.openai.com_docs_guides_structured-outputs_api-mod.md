**👤 USER**\
Extraia as informações desse link https://platform.openai.com/docs/guides/structured-outputs?api-mode=responses&type-restrictions=string-restrictions#how-to-use e Gere um structure output para extrair informações de um certificado de cnpj (Comprovante de Inscrição e de Situação Cadastral), extraindo as principais informações

**🤖 AI**\
























Com base na documentação da OpenAI sobre Structured Outputs, é possível definir um esquema JSON para garantir que as respostas do modelo estejam estruturadas conforme a necessidade da aplicação. Para extrair informações de um certificado de CNPJ (Comprovante de Inscrição e de Situação Cadastral), você pode criar um structured output semelhante ao exemplo abaixo, utilizando um modelo Pydantic ou um schema JSON na chamada da API.

Exemplo de Structured Output para extração de dados do certificado de CNPJ:

```python
from pydantic import BaseModel

class CNPJCertificate(BaseModel):
    nome_empresarial: str
    cnpj: str
    data_abertura: str
    natureza_juridica: str
    situacao_cadastral: str
    data_situacao_cadastral: str
    motivo_situacao_cadastral: str
    endereco: str
    municipio: str
    uf: str
    cep: str
    atividade_principal: str
    atividades_secundarias: list[str]
    nome_fantasia: str
    telefone: str
    email: str
```

Principais campos extraídos:
- nome_empresarial
- cnpj
- data_abertura
- natureza_juridica
- situacao_cadastral
- data_situacao_cadastral
- motivo_situacao_cadastral
- endereco
- municipio
- uf
- cep
- atividade_principal
- atividades_secundarias
- nome_fantasia
- telefone
- email

Na chamada da API, defina o schema conforme o exemplo acima e utilize a função de Structured Outputs para garantir que o modelo retorne a resposta no formato especificado.

Fontes e referências:
- [🔗 Introducing Structured Outputs in the API | OpenAI](https://openai.com/index/introducing-structured-outputs-in-the-api/?utm_source=openai)
- [🔗 Introduction to Structured Outputs | OpenAI Cookbook](https://cookbook.openai.com/examples/structured_outputs_intro?utm_source=openai)
- [🔗 Exemplo prático no Medium](https://medium.com/%40emcf1/how-to-use-openais-new-structured-outputs-api-with-code-9159d79da5c4?utm_source=openai)









**👤 USER**\
Preciso dessa informações em JSON SCHEMA

**🤖 AI**\
Resposta:

Com base na documentação oficial da OpenAI sobre Structured Outputs ([OpenAI Structured Outputs Guide](https://platform.openai.com/docs/guides/structured-outputs?api-mode=responses&type-restrictions=string-restrictions#how-to-use)), segue um exemplo de JSON Schema para extração das principais informações de um certificado de CNPJ (Comprovante de Inscrição e de Situação Cadastral):

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "CNPJCertificate",
  "type": "object",
  "properties": {
    "nome_empresarial": {
      "type": "string",
      "description": "Nome empresarial da empresa"
    },
    "cnpj": {
      "type": "string",
      "description": "Número do CNPJ"
    },
    "data_abertura": {
      "type": "string",
      "description": "Data de abertura da empresa"
    },
    "natureza_juridica": {
      "type": "string",
      "description": "Natureza jurídica da empresa"
    },
    "situacao_cadastral": {
      "type": "string",
      "description": "Situação cadastral da empresa"
    },
    "data_situacao_cadastral": {
      "type": "string",
      "description": "Data da situação cadastral"
    },
    "motivo_situacao_cadastral": {
      "type": "string",
      "description": "Motivo da situação cadastral"
    },
    "endereco": {
      "type": "string",
      "description": "Endereço completo da empresa"
    },
    "municipio": {
      "type": "string",
      "description": "Município"
    },
    "uf": {
      "type": "string",
      "description": "Unidade Federativa (UF)"
    },
    "cep": {
      "type": "string",
      "description": "CEP"
    },
    "atividade_principal": {
      "type": "string",
      "description": "Atividade principal"
    },
    "atividades_secundarias": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Lista de atividades secundárias"
    },
    "nome_fantasia": {
      "type": "string",
      "description": "Nome fantasia"
    },
    "telefone": {
      "type": "string",
      "description": "Telefone de contato"
    },
    "email": {
      "type": "string",
      "description": "E-mail de contato"
    }
  },
  "required": [
    "nome_empresarial",
    "cnpj",
    "data_abertura",
    "natureza_juridica",
    "situacao_cadastral",
    "data_situacao_cadastral",
    "endereco",
    "municipio",
    "uf",
    "cep",
    "atividade_principal"
  ]
}
```

Referências:  
- [OpenAI Structured Outputs Guide](https://platform.openai.com/docs/guides/structured-outputs?api-mode=responses&type-restrictions=string-restrictions#how-to-use)  
- [JSON Schema Documentation](https://json-schema.org/understanding-json-schema/)

**👤 USER**\
TENTEI USAR ESSE SCHEMA E TIVE ESSE ERROR
Erro ao salvar os dados do agente. Tente novamente. Schema contains invalid data. com.stackspot.genai.commons.exceptions.BadRequestException: All properties must be listed in 'required'. Missing: [motivo_situacao_cadastral, atividades_secundarias, nome_fantasia, telefone, email]




**🤖 AI**\
Resposta:  
O erro indica que todos os campos definidos em properties do JSON Schema também precisam estar listados em required, conforme a regra de validação da StackSpot EDP. Para resolver, inclua todos os campos presentes em properties no array required.

Segue o JSON Schema corrigido:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "CNPJCertificate",
  "type": "object",
  "properties": {
    "nome_empresarial": {
      "type": "string",
      "description": "Nome empresarial da empresa"
    },
    "cnpj": {
      "type": "string",
      "description": "Número do CNPJ"
    },
    "data_abertura": {
      "type": "string",
      "description": "Data de abertura da empresa"
    },
    "natureza_juridica": {
      "type": "string",
      "description": "Natureza jurídica da empresa"
    },
    "situacao_cadastral": {
      "type": "string",
      "description": "Situação cadastral da empresa"
    },
    "data_situacao_cadastral": {
      "type": "string",
      "description": "Data da situação cadastral"
    },
    "motivo_situacao_cadastral": {
      "type": "string",
      "description": "Motivo da situação cadastral"
    },
    "endereco": {
      "type": "string",
      "description": "Endereço completo da empresa"
    },
    "municipio": {
      "type": "string",
      "description": "Município"
    },
    "uf": {
      "type": "string",
      "description": "Unidade Federativa (UF)"
    },
    "cep": {
      "type": "string",
      "description": "CEP"
    },
    "atividade_principal": {
      "type": "string",
      "description": "Atividade principal"
    },
    "atividades_secundarias": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Lista de atividades secundárias"
    },
    "nome_fantasia": {
      "type": "string",
      "description": "Nome fantasia"
    },
    "telefone": {
      "type": "string",
      "description": "Telefone de contato"
    },
    "email": {
      "type": "string",
      "description": "E-mail de contato"
    }
  },
  "required": [
    "nome_empresarial",
    "cnpj",
    "data_abertura",
    "natureza_juridica",
    "situacao_cadastral",
    "data_situacao_cadastral",
    "motivo_situacao_cadastral",
    "endereco",
    "municipio",
    "uf",
    "cep",
    "atividade_principal",
    "atividades_secundarias",
    "nome_fantasia",
    "telefone",
    "email"
  ]
}
```

Referências:
- [OpenAI Structured Outputs Guide](https://platform.openai.com/docs/guides/structured-outputs?api-mode=responses&type-restrictions=string-restrictions#how-to-use)
- [JSON Schema Documentation](https://json-schema.org/understanding-json-schema/)