Step 1

Nome do Prompt:

Prompt: understanding

Instrução:
Compreenda o projeto fornecido no código abaixo, adicione qualquer passo de execução que esteja faltando e defina uma stack de tecnologia incluindo as tecnologias descritas e outras que sejam necessárias.

Entrada:
{{ input_data }}

Saída:
1. Descrição do projeto: [Descrição detalhada do projeto]
2. Passos de execução adicionais: [Lista de passos de execução que estavam faltando]
3. Stack de tecnologia:
   - [Tecnologia 1]
   - [Tecnologia 2]
   - [Tecnologia 3]
   - [Outras tecnologias necessárias]


Step 2

Nome do Prompt: c4-model

Prompt:

Entrada: "" {{entendimento.answer}} ""
Saída: "Com base na resposta acima, gere um modelo de arquitetura C4 Model no formato C4-PlantUML como referência, incluindo: um diagrama de System Context (nível 1), um diagrama de Container (nível 2), e um diagrama de Component (nível 3), e depois explique cada camada."

https://c4model.com/