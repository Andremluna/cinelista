# CineLista: Biblioteca de Filmes

Projeto Integrador da disciplina **Front-End Frameworks (2026.2)**, que avalia as Unidades I e II.

## Integrantes

| Nome completo | GitHub |
|---|---|
| Integrante 1 | [@usuario1](https://github.com/usuario1) |
| Integrante 2 | [@usuario2](https://github.com/usuario2) |
| Integrante 3 | [@usuario3](https://github.com/usuario3) |
| Integrante 4 | [@usuario4](https://github.com/usuario4) |
| Integrante 5 | [@usuario5](https://github.com/usuario5) |
| Integrante 6 | [@usuario6](https://github.com/usuario6) |

## Descrição

Muita gente começa a assistir filmes por indicação e depois esquece o que já viu, o que queria ver e o que achou de cada um. Normalmente essas informações ficam espalhadas pelo bloco de notas do celular, pelo WhatsApp ou só na memória.

A **CineLista** é uma aplicação web simples para organizar filmes num só lugar. O usuário cadastra os filmes, marca quais já assistiu, favorita os de que mais gostou e encontra qualquer filme pela busca ou pelos filtros.

**Quem vai usar:** estudantes e pessoas que gostam de cinema e querem uma lista pessoal de filmes, sem precisar criar conta nem instalar nada.

**Cenário escolhido:** Cenário D: Biblioteca de filmes.

### Necessidades identificadas

- Guardar título, gênero, ano e nota de cada filme
- Separar o que já foi assistido do que ainda se quer assistir
- Achar um filme rápido quando a lista crescer
- Destacar os filmes favoritos
- Usar tanto no computador quanto no celular

## Funcionalidades

- [x] Lista inicial com 4 filmes de exemplo
- [x] Cadastro de filme (título, gênero, ano e nota)
- [x] Validação do formulário (título e gênero obrigatórios, nota entre 0 e 10)
- [x] Pesquisa por título em tempo real
- [x] Filtro por gênero
- [x] Filtro por status (todos / assistidos / quero assistir)
- [x] Marcar e desmarcar como assistido (o card muda de cor)
- [x] Favoritar e desfavoritar (aparece uma ⭐ no título)
- [x] Remover filme, com confirmação
- [x] Contador de filmes totais, assistidos e não assistidos
- [x] Mensagem quando nenhum filme é encontrado
- [x] Layout responsivo para celular

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Git
- GitHub

## Estrutura do projeto

```
/
├── index.html      → estrutura da página (cabeçalho, formulário, filtros, lista e rodapé)
├── css/
│   └── style.css   → estilos, cores em variáveis CSS e regras responsivas (@media)
├── js/
│   └── script.js   → dados (array de filmes), funções e eventos
└── README.md       → documentação do projeto
```

### Como o JavaScript está organizado

| Parte | O que faz |
|---|---|
| `filmes` (array de objetos) | Guarda todos os filmes. Cada filme é um objeto com `id`, `titulo`, `genero`, `ano`, `nota`, `assistido` e `favorito` |
| `adicionarFilme()` | Lê o formulário, valida os dados e adiciona o filme no array |
| `alternarAssistido()` / `alternarFavorito()` | Trocam o valor `true`/`false` do filme clicado |
| `removerFilme()` | Remove o filme do array usando `filter` |
| `filtrarFilmes()` | Aplica a busca e os dois filtros ao mesmo tempo |
| `criarItemFilme()` | Cria o `<li>` de um filme e adiciona os eventos dos botões |
| `mostrarFilmes()` | Limpa a lista e desenha de novo na tela (atualização do DOM) |
| `atualizarContador()` | Conta os filmes assistidos e os não assistidos |

A ideia principal é: **o usuário faz uma ação → o array é alterado → a função `mostrarFilmes()` redesenha a tela**. Assim a tela sempre mostra o que está no array.

## Como executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/SEU-USUARIO/cinelista.git
   ```
2. Abra a pasta do projeto.
3. Dê dois cliques no arquivo `index.html` para abrir no navegador.

Não é preciso instalar nada. Também dá para usar a extensão **Live Server** do VS Code.

> Observação: os dados ficam só na memória do navegador. Ao recarregar a página, a lista volta para os 4 filmes iniciais.

## Decisões de desenvolvimento

- **Separação em 3 arquivos:** HTML, CSS e JS ficaram em arquivos diferentes, como vimos em aula, para facilitar a organização e para cada integrante trabalhar numa parte sem dar conflito.
- **Array de objetos como "fonte da verdade":** em vez de mexer direto nos elementos da tela, sempre alteramos o array e depois chamamos `mostrarFilmes()`. Isso evitou vários bugs de a tela mostrar uma coisa e o array ter outra.
- **Cada filme tem um `id`:** no começo removíamos pelo índice, mas com o filtro ativo o índice da tela não batia com o índice do array. Com o `id`, a remoção ficou correta.
- **Filmes de exemplo:** colocamos 4 filmes iniciais para a aplicação não abrir vazia e dar para testar a busca e os filtros logo de cara.
- **Variáveis CSS (`:root`):** as cores ficaram num lugar só, o que facilita trocar a paleta.
- **`<select>` para gênero:** usamos uma lista fixa de gêneros para evitar que o usuário escreva "drama", "Drama" e "DRAMA" e o filtro deixe de funcionar.
- **Mobile:** com `@media (max-width: 600px)`, os campos e os botões ficam empilhados no celular.

## Comparação tecnológica

### 6.1 Por que HTML, CSS e JavaScript foram suficientes para esta primeira versão?

Porque a aplicação é pequena: tem uma página só, um formulário, uma lista e alguns botões. Tudo o que precisávamos já existe nas tecnologias básicas:

- **HTML** para a estrutura (formulário, campos, `select`, lista `ul/li`)
- **CSS** para o visual, as cores e a responsividade
- **JavaScript** para guardar os dados em array, tratar eventos (`submit`, `click`, `input`, `change`) e atualizar o DOM com `createElement`, `appendChild` e `innerHTML`

Não tem login, banco de dados nem várias telas, então não houve necessidade de framework.

### 6.2 O que poderia mudar se a aplicação fosse desenvolvida com React?

1. **Componentização:** cada filme poderia virar um componente `<CardFilme />`, e o formulário um `<FormFilme />`. O código ficaria dividido em partes reutilizáveis, em vez de uma função `criarItemFilme()` montando HTML em string.
2. **Atualização automática da tela:** no nosso código temos que lembrar de chamar `mostrarFilmes()` depois de toda mudança. No React, ao mudar o estado (`useState`), a tela é atualizada sozinha.
3. **Menos manipulação manual do DOM:** não precisaríamos de `getElementById`, `innerHTML = ""` nem `addEventListener` em cada botão. O React cuida disso com o Virtual DOM.
4. **Facilidade para crescer:** se o projeto tivesse várias páginas (detalhes do filme, perfil, listas separadas), o React com componentes e rotas organizaria melhor.

### 6.3 React seria necessariamente a melhor escolha?

**Não para esta versão.** O projeto tem uma tela e poucas funcionalidades. Usar React exigiria Node.js, npm, configuração do projeto e aprender JSX e hooks, e isso tomaria mais tempo do que construir a aplicação em si, com o prazo de uma semana.

Pensando em **tamanho e complexidade**, JavaScript puro resolve bem. Já pensando em **manutenção e evolução futura**, se a CineLista crescesse (salvar dados, várias telas, muitos componentes repetidos, mais pessoas no time), o React passaria a valer a pena, porque a reutilização de componentes e a organização do estado ficariam mais importantes. Ou seja, depende do momento do projeto.

### 6.4 E Vue ou Angular?

- **Vue:** seria uma alternativa válida e talvez a mais fácil para este caso. Ele pode ser adicionado direto no HTML por um `<script>`, sem configuração, e a sintaxe (`v-for`, `v-if`, `v-model`) é parecida com HTML. Para um projeto pequeno como o nosso, encaixa bem.
- **Angular:** seria exagerado. Ele é um framework completo, com TypeScript, uma estrutura bem rígida e muitos arquivos já no começo. Faz mais sentido em sistemas grandes, de empresa, com equipes maiores, e não numa lista de filmes de uma tela.

**Conclusão:** para esta primeira versão, HTML, CSS e JS puro foi a escolha certa. Se o projeto crescer, Vue ou React seriam os próximos passos naturais.

## Dificuldades e soluções

| Dificuldade | Como resolvemos |
|---|---|
| A página recarregava ao enviar o formulário e o filme sumia | Descobrimos o `evento.preventDefault()` no evento `submit` |
| Ao remover um filme com o filtro ativo, o filme errado era apagado | Trocamos a remoção por índice por remoção pelo `id` do filme |
| Os botões criados pelo JavaScript não funcionavam | Passamos a adicionar o `addEventListener` dentro da função que cria o `<li>`, logo depois de criar o elemento |
| A busca não achava "interestelar" escrito com letra minúscula | Usamos `toLowerCase()` no texto da busca e no título |
| Fazer a busca e os dois filtros funcionarem juntos | Criamos uma função só, a `filtrarFilmes()`, que verifica as três condições com `&&` |
| No celular, os campos ficavam espremidos lado a lado | Adicionamos `@media` mudando o `flex-direction` para `column` |
| Conflito no Git ao juntar as branches de CSS e de interface | Resolvemos o conflito manualmente no VS Code e combinamos de dar `git pull` antes de começar a trabalhar |

## Divisão do trabalho

| Integrante | Contribuição |
|---|---|
| Integrante 1 | Criação do repositório, estrutura base do HTML (cabeçalho, main, rodapé), merges dos Pull Requests |
| Integrante 2 | HTML do formulário de cadastro e da seção de busca/filtros/lista |
| Integrante 3 | CSS: variáveis de cor, layout principal, formulário e botões |
| Integrante 4 | CSS: cards de filmes, estado "assistido" e responsividade (`@media`) |
| Integrante 5 | JavaScript: array de filmes, cadastro, validação e renderização da lista |
| Integrante 6 | JavaScript: busca, filtros, assistido/favorito/remover e contador |
| Todos | Testes no computador e no celular, revisão do código e escrita do README (cada um documentou a sua parte) |

## Histórico do desenvolvimento

- **Dia 1:** escolha do cenário D, definição das funcionalidades e criação do repositório
- **Dia 2:** estrutura HTML da página (`feature/html`)
- **Dia 3:** estilização com CSS e cards (`feature/css`)
- **Dia 4:** array de filmes, cadastro e renderização da lista (`feature/javascript`)
- **Dia 5:** busca, filtros, assistido, favorito e remover (`feature/interface`)
- **Dia 6:** responsividade, contador, correção de bugs (`feature/melhoria`)
- **Dia 7:** README completo, testes finais e merge na `main`

## Melhorias futuras

- Salvar os filmes com `localStorage` para não perder a lista ao recarregar a página
- Editar as informações de um filme já cadastrado
- Ordenar por nota, ano ou título
- Mostrar o pôster do filme
- Evitar o cadastro de filmes repetidos
- Trocar o `innerHTML` com o título digitado pelo `textContent`, por segurança
- Modo escuro
- Migrar para React ou Vue, transformando os cards em componentes

## Uso de IA

| Data | Modelo utilizado | Prompt utilizado | Onde foi usado |
|---|---|---|---|
| DD/MM/2026 | Claude (Anthropic) | "Explique por que a página recarrega quando envio um formulário em JavaScript" | `script.js`, função `adicionarFilme()`. **Revisamos:** entendemos o `preventDefault()` e aplicamos no nosso código. |
| DD/MM/2026 | Claude (Anthropic) | "Como filtrar um array de objetos por texto e por categoria ao mesmo tempo em JavaScript?" | `script.js`, função `filtrarFilmes()`. **Adaptamos:** a sugestão usava uma linha só. Separamos em `if`s com variáveis (`passouBusca`, `passouGenero`, `passouStatus`) para ficar mais fácil de entender. |
| DD/MM/2026 | Claude (Anthropic) | "Me ajude a comparar React, Vue e Angular para uma aplicação pequena de lista de filmes" | README, seção Comparação tecnológica. **Revisamos:** conferimos com o material da Unidade II e reescrevemos com as nossas palavras. |

> ⚠️ Preencher com as datas, os modelos e os prompts que o grupo realmente usou.
