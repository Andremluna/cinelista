# CineLista: Biblioteca de Filmes

Projeto Integrador da disciplina **Front-End Frameworks (2026.2)**, que avalia as Unidades I e II.

## Integrantes

| Nome completo | Matrícula | GitHub |
|---|---|---|
| André Manoel Medeiros de Luna | 01912149 | [@Andremluna](https://github.com/Andremluna) |
| Gabriel Ramalho Moura | 01885151 | [@gabrielrmti](https://github.com/gabrielrmti) |
| Júlio César da Silva Oliveira Machado | 01905654 | [@julio-cesar41](https://github.com/julio-cesar41) |
| Matheus Felipe Oliveira Cirne de Azevedo | 01905796 | [@Matheus-Cirne](https://github.com/Matheus-Cirne) |
| Kevyn Rhyan de Barros Silva | 01921438 | @[KevynRhyan](https://github.com/kevrhy) |
| Integrante 6 | — | @usuario |
| Marco Vinícius Trindade Reis Lins | 01906614 | @[Mv-008](https://github.com/Mv-008) |

## Descrição

Muitas pessoas começam a assistir a filmes por indicação e depois esquecem o que já viram, o que querem ver e o que acharam de cada título. A **CineLista** é uma aplicação web para organizar esses filmes em um só lugar.

A aplicação utiliza a API do **The Movie Database (TMDB)** para pesquisar filmes online. Depois de selecionar um resultado, o usuário informa sua nota pessoal e se já assistiu ou se deseja assistir. Os filmes adicionados aparecem em uma lista que pode ser pesquisada e filtrada.

**Quem vai usar:** estudantes e pessoas que gostam de cinema e querem organizar sua lista pessoal sem precisar criar uma conta.

**Cenário escolhido:** Cenário D — Biblioteca de filmes.

## Necessidades identificadas

- Encontrar filmes por meio de uma pesquisa online.
- Visualizar informações do filme, como título, ano, gênero e pôster, quando disponível.
- Registrar uma nota pessoal de 0 a 10.
- Separar os filmes já assistidos daqueles que ainda se deseja assistir.
- Encontrar rapidamente um filme na lista pessoal.
- Marcar filmes como favoritos.
- Usar a página em computadores e celulares.

## Funcionalidades

- [x] Pesquisar filmes pela API do TMDB.
- [x] Exibir resultados da pesquisa para o usuário escolher um filme.
- [x] Mostrar o filme selecionado antes de adicioná-lo à lista.
- [x] Registrar uma nota pessoal de 0 a 10.
- [x] Informar se o filme já foi assistido ou se o usuário quer assistir.
- [x] Exibir o pôster do filme quando houver imagem disponível na API.
- [x] Ocultar os resultados da pesquisa depois que um filme é selecionado.
- [x] Limpar os resultados quando o campo de pesquisa for apagado.
- [x] Limpar a pesquisa e os resultados depois que o filme for adicionado com sucesso.
- [x] Pesquisar títulos na lista pessoal.
- [x] Filtrar a lista por gênero e status.
- [x] Marcar e desmarcar filmes como assistidos.
- [x] Favoritar e desfavoritar filmes.
- [x] Remover filmes da lista.
- [x] Exibir um contador de filmes, incluindo assistidos e não assistidos.
- [x] Mostrar uma mensagem quando não houver filmes correspondentes aos filtros.
- [x] Apresentar um layout responsivo para telas menores.

## Tecnologias utilizadas

- **HTML5:** estrutura da página e formulários.
- **CSS3:** estilos, layout, cores e responsividade.
- **JavaScript:** requisições à API, validações, eventos, filtros e atualização da interface.
- **API do TMDB:** pesquisa de filmes e obtenção de informações e pôsteres.
- **Git e GitHub:** controle de versão e hospedagem do repositório.

## API do TMDB

A aplicação consulta o endpoint de pesquisa de filmes do TMDB:

`https://api.themoviedb.org/3/search/movie`

As imagens dos pôsteres são carregadas a partir do serviço de imagens do TMDB. A chave de acesso à API fica no arquivo `js/config.js`, que deve ser carregado antes de `js/script.js` no HTML.

**Configuração necessária:** inserir uma chave válida do TMDB na variável `TMDB_API_KEY` dentro de `js/config.js`. Não publique uma chave privada em um repositório público; siga as orientações da documentação do TMDB para proteger as credenciais.

Documentação oficial: [developer.themoviedb.org](https://developer.themoviedb.org/)

## Estrutura do projeto

```text
/
├── index.html       # Estrutura da página, formulários, filtros e lista
├── css/
│   └── style.css    # Estilos e regras responsivas
├── js/
│   ├── config.js    # Configuração da chave da API do TMDB
│   └── script.js    # Requisições, eventos, dados e renderização
└── README.md        # Documentação do projeto
```

## Como o JavaScript está organizado

| Parte | O que faz |
|---|---|
| `buscarFilmesApi()` | Consulta a API do TMDB usando o texto digitado na pesquisa. |
| `mostrarResultadosApi()` | Exibe os resultados encontrados e as opções para selecionar um filme. |
| `selecionarFilme()` | Guarda o filme escolhido e mostra suas informações no formulário. Também oculta os demais resultados. |
| `converterFilmeApi()` | Converte os dados recebidos da API para o formato utilizado pela aplicação, incluindo nota e status informados pelo usuário. |
| `adicionarFilme()` | Valida a nota e o status, evita duplicatas e adiciona o filme selecionado ao array. Após o sucesso, limpa a pesquisa e os resultados. |
| `alternarAssistido()` / `alternarFavorito()` | Atualizam o status de assistido e de favorito de um filme. |
| `removerFilme()` | Remove um filme da lista pelo seu identificador. |
| `filtrarFilmes()` | Combina a busca pelo título com os filtros de gênero e status. |
| `criarItemFilme()` | Cria os elementos da interface de cada filme e configura os botões correspondentes. |
| `mostrarFilmes()` | Atualiza a lista exibida na página. |
| `atualizarContador()` | Atualiza a contagem dos filmes cadastrados, assistidos e não assistidos. |

A ideia principal é: **o usuário realiza uma ação → os dados em memória são atualizados → a interface é renderizada novamente**.

## Como executar

1. Clone o repositório:

   ```bash
   git clone https://github.com/SEU-USUARIO/cinelista.git
   ```

2. Abra a pasta do projeto no VS Code.
3. Configure a chave do TMDB em `js/config.js`.
4. Abra o `index.html` no navegador ou execute o projeto com a extensão **Live Server** do VS Code.
5. No site, digite o nome de um filme e clique em **Buscar**.
6. Selecione um dos resultados, informe sua nota de 0 a 10 e escolha se já assistiu ou se deseja assistir.
7. Clique em **Adicionar à minha lista** para incluir o filme.

Não é necessário instalar dependências para a versão atual. É necessário ter uma chave válida da API para pesquisar filmes online.

> **Observação:** os filmes adicionados ficam apenas na memória da página. Ao recarregar ou fechar a página, a lista volta ao estado inicial e os filmes adicionados durante a sessão são perdidos. A aplicação não utiliza `localStorage`.

## Decisões de desenvolvimento

- **Separação em arquivos:** HTML, CSS, configuração da API e JavaScript ficam separados para facilitar a organização e manutenção.
- **Array como fonte dos dados da sessão:** a lista é mantida em um array JavaScript e a interface é atualizada a partir dele.
- **Identificador por filme:** cada filme recebe um `id` para que ações como remoção continuem corretas mesmo quando filtros estão ativos.
- **Pesquisa externa:** os filmes disponíveis para cadastro são encontrados por meio da pesquisa do TMDB, em vez de serem digitados manualmente no formulário.
- **Validação da nota:** a aplicação aceita notas pessoais de 0 a 10.
- **Busca e filtros combinados:** título, gênero e status podem ser usados em conjunto.
- **Limpeza dos resultados:** ao selecionar um resultado, apagar o texto da pesquisa ou adicionar o filme, a lista de resultados é ocultada para deixar a interface mais clara.
- **Responsividade:** regras CSS adaptam os campos e botões para telas menores.

## Comparação tecnológica

### Por que HTML, CSS e JavaScript foram suficientes para esta primeira versão?

A aplicação possui uma página, formulários, uma lista e alguns controles de interface. O HTML organiza o conteúdo, o CSS cuida do visual e da responsividade, e o JavaScript controla os eventos, as validações, a comunicação com a API e a atualização do DOM. Para o escopo atual, essas tecnologias permitem implementar as funcionalidades sem exigir um framework.

### O que poderia mudar se a aplicação fosse desenvolvida com React?

1. **Componentização:** cada filme poderia ser representado por um componente reutilizável.
2. **Atualização da interface:** mudanças no estado poderiam atualizar a tela automaticamente.
3. **Organização:** formulários, resultados e cards poderiam ficar divididos em componentes menores.
4. **Evolução:** React poderia ajudar caso o projeto passasse a ter várias telas ou funcionalidades mais complexas.

React não seria necessariamente melhor para a versão atual: adicionaria configuração e conceitos novos a um projeto relativamente pequeno. A escolha depende do tamanho e das necessidades futuras da aplicação.

### E Vue ou Angular?

- **Vue:** seria uma alternativa para organizar a interface com componentes e diretivas.
- **Angular:** oferece uma estrutura mais completa e pode ser mais do que o necessário para uma aplicação pequena como esta.

**Conclusão:** HTML, CSS e JavaScript puro atendem às necessidades da primeira versão. React ou Vue podem ser avaliados se o projeto crescer.

## Dificuldades e soluções

| Dificuldade | Solução |
|---|---|
| A página recarregava ao enviar o formulário. | Usar `event.preventDefault()` no evento `submit`. |
| A chave da API precisava estar disponível para o script. | Separar a configuração em `js/config.js` e carregá-la antes de `js/script.js`. |
| Os dados recebidos da API tinham um formato diferente do usado na lista. | Converter o resultado selecionado para o formato de objeto utilizado pela aplicação. |
| Os resultados da pesquisa continuavam visíveis depois da seleção. | Limpar a lista de resultados quando um filme é selecionado. |
| A pesquisa continuava preenchida depois de adicionar o filme. | Limpar o campo e os resultados depois que a inclusão é concluída com sucesso. |
| A busca e os filtros precisavam funcionar juntos. | Reunir as condições em `filtrarFilmes()`. |
| A interface precisava funcionar em celulares. | Utilizar regras responsivas com `@media`. |

## Divisão do trabalho

| Integrante | Contribuição |
|---|---|
| Integrante 1 | Criação do repositório, estrutura base do HTML e integração de alterações. |
| Integrante 2 | HTML dos formulários, pesquisa, filtros e lista. |
| Integrante 3 | CSS: variáveis de cor, layout principal, formulários e botões. |
| Integrante 4 | CSS: cards, status de assistido e responsividade. |
| Integrante 5 | JavaScript: dados, cadastro, validações e renderização. |
| Integrante 6 | JavaScript: pesquisa, filtros, status, favoritos, remoção e contador. |
| Todos | Testes, revisão do código e documentação. |

> Ajustem a tabela acima para refletir a divisão real do trabalho do grupo.

## Histórico do desenvolvimento

- Definição do cenário e das funcionalidades.
- Criação da estrutura HTML.
- Estilização da página com CSS.
- Implementação da lista, eventos e filtros com JavaScript.
- Integração da API do TMDB para pesquisa de filmes.
- Ajustes na seleção dos resultados, validações e limpeza da pesquisa.
- Revisão da responsividade, testes e documentação.

## Melhorias futuras

- Permitir editar as informações de um filme já cadastrado.
- Ordenar os filmes por nota, ano ou título.
- Melhorar o tratamento de erros e mensagens da API.
- Adicionar persistência de dados, caso isso faça parte do escopo futuro.
- Avaliar a migração para React ou Vue se a aplicação crescer.

## Uso de IA

A IA foi utilizada como apoio para compreender a integração com a API do TMDB, investigar erros de JavaScript e revisar a documentação. O grupo deve registrar abaixo as ferramentas, datas, prompts e alterações que realmente utilizou.

| Data | Ferramenta/modelo | Uso | Revisão realizada |
|---|---|---|---|
| DD/MM/2026 | Preencher com a ferramenta utilizada | Apoio na integração da API do TMDB. | Registrar o que foi conferido, testado e adaptado pelo grupo. |
| DD/MM/2026 | Preencher com a ferramenta utilizada | Apoio na depuração de erros e no comportamento da pesquisa. | Registrar as alterações realmente realizadas. |

> **Importante:** substituam os campos de exemplo pelas informações reais do grupo antes de entregar o projeto.


## Uso de IA

| Data | Modelo utilizado | Prompt utilizado | Onde foi usado |
|---|---|---|---|
| DD/MM/2026 | Claude (Anthropic) | "Explique por que a página recarrega quando envio um formulário em JavaScript" | `script.js`, função `adicionarFilme()`. **Revisamos:** entendemos o `preventDefault()` e aplicamos no nosso código. |
| DD/MM/2026 | Claude (Anthropic) | "Como filtrar um array de objetos por texto e por categoria ao mesmo tempo em JavaScript?" | `script.js`, função `filtrarFilmes()`. **Adaptamos:** a sugestão usava uma linha só. Separamos em `if`s com variáveis (`passouBusca`, `passouGenero`, `passouStatus`) para ficar mais fácil de entender. |
| DD/MM/2026 | Claude (Anthropic) | "Me ajude a entender os erros que aparecem durante a integração com a API de filmes." | script.js e config.js. Utilizamos: a IA para auxiliar na integração da API, compreender alguns erros encontrados durante o desenvolvimento e entender como corrigi-los. |
| DD/MM/2026 | Claude (Anthropic) | "Me ajude a comparar React, Vue e Angular para uma aplicação pequena de lista de filmes" | README, seção Comparação tecnológica. **Revisamos:** conferimos com o material da Unidade II e reescrevemos com as nossas palavras. | 

