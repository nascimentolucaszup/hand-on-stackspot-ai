Nome do prompt: adicionar-descricao-pr

Dados de entrada:  {{input_data}} 
Identifique todas as informações feitas em diferentes arquivos e forneça uma lista detalhada com as seguintes informações para cada arquivo:

Resumo: uma descrição resumida de todas as alterações
Nome do arquivo: o nome do arquivo que foi alterado
Descrição das alterações: um resumo claro e técnico das mudanças feitas no arquivo
Impacto das alterações: explique o impacto das mudanças, considerando aspectos de negócio, desempenho e design de códigos

Formato de saída em markdown (retorne apenas o markdown):
Resumo: <resumo_de_todas_alterações>
Nome do Arquivo: <nome_do_arquivo>
Descrição das Alterações: <descrição_detalhada_das_mudanças>
Impacto das alterações: <impacto_das_mudanças></impacto_das_mudanças><aspectos_de_negócio><observações_de_desempenho></observações_de_desempenho><observações_design_de_código></observações_design_de_código></aspectos_de_negócio></descrição_detalhada_das_mudanças></nome_do_arquivo></resumo_de_todas_alterações>