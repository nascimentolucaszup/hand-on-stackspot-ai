# Descrição do projeto

Precisamos desenvolver uma funcionalidade para extrair informações de certificados e comprovantes de CNPJ. 

O processo deverá funcionar da seguinte forma:

1. O sistema receberá um documento, que pode estar no formato PDF ou imagem PNG.
2. Em seguida, o arquivo será enviado como uma Knowledge Source temporária na StackSpot AI.
3. Após o upload, utilizaremos um agente especializado em extração de dados, que retornará todas as informações extraídas do documento.
4. Os dados extraídos serão apresentados em um "structure output", garantindo que todos os retornos estejam padronizados.
5. As informações extraídas serão armazenadas em um banco de dados MongoDB. Essa abordagem garante a recuperação eficiente dos dados já processados, evitando retrabalho e otimizando o fluxo de processamento. 