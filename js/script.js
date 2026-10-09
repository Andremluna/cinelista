// ===============================
// CineLista - Biblioteca de Filmes
// ===============================

// Relacionado à API de filmes
const TMDB_URL = "https://api.themoviedb.org/3";
const TMDB_IMG = "https://image.tmdb.org/t/p/w154";

const GENEROS_TMDB = {
    28: "Ação",
    12: "Aventura",
    16: "Animação",
    35: "Comédia",
    18: "Drama",
    878: "Ficção científica",
    27: "Terror",
    10749: "Romance",
    53: "Suspense",
    14: "Fantasia",
    99: "Documentário"
};

// Lista de filmes adicionados durante a sessão
let filmes = [];
let proximoId = 1;
let filmeSelecionado = null;

// Pegando os elementos do HTML
const formFilme = document.getElementById("form-filme");
const inputNota = document.getElementById("nota");
const inputAssistido = document.getElementById("assistido");
const mensagemErro = document.getElementById("mensagem-erro");
const filmeSelecionadoElemento = document.getElementById("filme-selecionado");

const filtroGenero = document.getElementById("filtro-genero");
const filtroStatus = document.getElementById("filtro-status");
const busca = document.getElementById("busca");
const listaFilmes = document.getElementById("lista-filmes");
const contador = document.getElementById("contador");

const formBuscaApi = document.getElementById("form-busca-api");
const inputBuscaApi = document.getElementById("busca-api");
const statusApi = document.getElementById("status-api");
const resultadosApi = document.getElementById("resultados-api");

// ===============================
// Integração com a API do TMDB
// ===============================

// Busca filmes na API pelo texto digitado
async function buscarFilmesApi(evento) {
    evento.preventDefault();

    const termo = inputBuscaApi.value.trim();

    if (termo === "") {
        statusApi.textContent = "Digite o nome de um filme para buscar.";
        resultadosApi.innerHTML = "";
        return;
    }

    if (
        typeof TMDB_API_KEY === "undefined" ||
        !TMDB_API_KEY
    ) {
        statusApi.textContent =
            "Chave da API não configurada. Confira o arquivo config.js.";
        return;
    }

    statusApi.textContent = "Buscando...";
    resultadosApi.innerHTML = "";

    try {
        const url =
            `${TMDB_URL}/search/movie?api_key=${TMDB_API_KEY}` +
            `&language=pt-BR&include_adult=false&query=${encodeURIComponent(termo)}`;

        const resposta = await fetch(url);

        if (resposta.status === 401) {
            throw new Error("Chave da API inválida.");
        }

        if (!resposta.ok) {
            throw new Error("Erro HTTP: " + resposta.status);
        }

        const dados = await resposta.json();

        if (dados.results.length === 0) {
            statusApi.textContent = "Nenhum filme encontrado na API.";
            return;
        }

        statusApi.textContent = "";
        mostrarResultadosApi(dados.results.slice(0, 8));

    } catch (erro) {
        console.error(erro);
        statusApi.textContent =
            "Não foi possível buscar os filmes. Confira a chave e a conexão.";
    }
}

// Desenha os resultados da busca
function mostrarResultadosApi(resultados) {
    resultadosApi.innerHTML = "";

    resultados.forEach(function (filmeApi) {
        const li = document.createElement("li");
        li.classList.add("resultado-api");

        if (filmeApi.poster_path) {
            const img = document.createElement("img");
            img.src = TMDB_IMG + filmeApi.poster_path;
            img.alt = "Pôster de " + filmeApi.title;
            img.classList.add("poster");
            li.appendChild(img);
        }

        const texto = document.createElement("div");

        const titulo = document.createElement("h3");
        titulo.textContent = filmeApi.title;

        const info = document.createElement("p");
        info.textContent = filmeApi.release_date
            ? filmeApi.release_date.slice(0, 4)
            : "Ano não informado";

        texto.appendChild(titulo);
        texto.appendChild(info);
        li.appendChild(texto);

        const botao = document.createElement("button");
        botao.type = "button";
        botao.classList.add("botao");
        botao.textContent = "Selecionar";

        botao.addEventListener("click", function () {
            selecionarFilme(filmeApi);
        });

        li.appendChild(botao);
        resultadosApi.appendChild(li);
    });
}

// Prepara o filme selecionado para o cadastro
function selecionarFilme(filmeApi) {
    filmeSelecionado = filmeApi;
    filmeSelecionadoElemento.innerHTML = "";
    resultadosApi.innerHTML = "";
    statusApi.textContent = "";

    if (filmeApi.poster_path) {
        const img = document.createElement("img");
        img.src = TMDB_IMG + filmeApi.poster_path;
        img.alt = "Pôster de " + filmeApi.title;
        img.classList.add("poster");
        filmeSelecionadoElemento.appendChild(img);
    }

    const texto = document.createElement("div");
    const titulo = document.createElement("h3");
    titulo.textContent = filmeApi.title;

    const ano = filmeApi.release_date
        ? filmeApi.release_date.slice(0, 4)
        : "Ano não informado";

    const generos = (filmeApi.genre_ids || [])
        .map(function (id) {
            return GENEROS_TMDB[id];
        })
        .filter(Boolean)
        .join(", ");

    const info = document.createElement("p");
    info.textContent =
        `Ano: ${ano} | Gênero: ${generos || "Não informado"}`;

    texto.appendChild(titulo);
    texto.appendChild(info);
    filmeSelecionadoElemento.appendChild(texto);

    mensagemErro.textContent = "";
}

// Transforma o filme da API no formato usado pela lista
function converterFilmeApi(filmeApi, nota, assistido) {
    let genero = "Outros";

    for (const idGenero of (filmeApi.genre_ids || [])) {
        if (GENEROS_TMDB[idGenero]) {
            genero = GENEROS_TMDB[idGenero];
            break;
        }
    }

    const ano = filmeApi.release_date
        ? Number(filmeApi.release_date.slice(0, 4))
        : "";

    return {
        id: proximoId,
        tmdbId: filmeApi.id,
        titulo: filmeApi.title,
        genero: genero,
        ano: ano,
        nota: nota,
        poster: filmeApi.poster_path || "",
        assistido: assistido,
        favorito: false
    };
}

// Adiciona o filme selecionado à lista
function adicionarFilme(evento) {
    evento.preventDefault();
    mensagemErro.textContent = "";

    if (!filmeSelecionado) {
        mensagemErro.textContent =
            "Pesquise e selecione um filme antes de adicionar.";
        return;
    }

    if (
        inputNota.value === "" ||
        !Number.isFinite(Number(inputNota.value)) ||
        Number(inputNota.value) < 0 ||
        Number(inputNota.value) > 10
    ) {
        mensagemErro.textContent =
            "A nota precisa estar entre 0 e 10.";
        return;
    }

    if (inputAssistido.value !== "sim" &&
        inputAssistido.value !== "nao") {
        mensagemErro.textContent =
            "Informe se você já assistiu ao filme.";
        return;
    }

    const repetido = filmes.some(function (filme) {
        return filme.tmdbId === filmeSelecionado.id;
    });

    if (repetido) {
        mensagemErro.textContent =
            "Esse filme já está na sua lista.";
        return;
    }

    const novoFilme = converterFilmeApi(
        filmeSelecionado,
        Number(inputNota.value),
        inputAssistido.value === "sim"
    );

    filmes.push(novoFilme);
    resultadosApi.innerHTML = "";
    statusApi.textContent = "";
    inputBuscaApi.value = "";
    proximoId++;

    formFilme.reset();
    filmeSelecionado = null;

    filmeSelecionadoElemento.innerHTML =
        "<p>Nenhum filme selecionado.</p>";

    resultadosApi.innerHTML = "";
    statusApi.textContent = "Filme adicionado à sua lista!";
    mensagemErro.textContent = "";

    mostrarFilmes();
}

// Marca ou desmarca o filme como assistido
function alternarAssistido(id) {
    const filme = filmes.find(function (item) {
        return item.id === id;
    });

    if (filme) {
        filme.assistido = !filme.assistido;
    }

    mostrarFilmes();
}

// Marca ou desmarca o filme como favorito
function alternarFavorito(id) {
    const filme = filmes.find(function (item) {
        return item.id === id;
    });

    if (filme) {
        filme.favorito = !filme.favorito;
    }

    mostrarFilmes();
}

// Remove um filme da lista
function removerFilme(id) {
    if (confirm("Tem certeza que deseja remover este filme?")) {
        filmes = filmes.filter(function (filme) {
            return filme.id !== id;
        });

        mostrarFilmes();
    }
}

// Aplica os filtros da lista
function filtrarFilmes() {
    const generoEscolhido = filtroGenero.value;
    const statusEscolhido = filtroStatus.value;
    const termo = busca.value.trim().toLowerCase();

    return filmes.filter(function (filme) {
        const correspondeGenero =
            generoEscolhido === "todos" ||
            filme.genero === generoEscolhido;

        const correspondeStatus =
            statusEscolhido === "todos" ||
            (statusEscolhido === "assistidos" && filme.assistido) ||
            (statusEscolhido === "nao-assistidos" && !filme.assistido);

        const correspondeBusca =
            filme.titulo.toLowerCase().includes(termo);

        return correspondeGenero &&
            correspondeStatus &&
            correspondeBusca;
    });
}

// Cria o item de cada filme
function criarItemFilme(filme) {
    const li = document.createElement("li");
    li.classList.add("filme");

    if (filme.assistido) {
        li.classList.add("assistido");
    }

    const dados = document.createElement("div");
    dados.classList.add("filme-dados");

    if (filme.poster) {
        const img = document.createElement("img");
        img.src = TMDB_IMG + filme.poster;
        img.alt = "Pôster de " + filme.titulo;
        img.classList.add("poster");
        dados.appendChild(img);
    }

    const texto = document.createElement("div");
    const titulo = document.createElement("h3");
    titulo.textContent =
        (filme.favorito ? "⭐ " : "") + filme.titulo;

    const info = document.createElement("p");
    info.classList.add("info");
    info.textContent =
        `${filme.ano || "Ano não informado"} • Nota: ${filme.nota}/10`;

    const etiqueta = document.createElement("span");
    etiqueta.classList.add("etiqueta");
    etiqueta.textContent = filme.genero;

    texto.appendChild(titulo);
    texto.appendChild(info);
    texto.appendChild(etiqueta);
    dados.appendChild(texto);
    li.appendChild(dados);

    const acoes = document.createElement("div");
    acoes.classList.add("acoes");

    const botaoAssistido = document.createElement("button");
    botaoAssistido.type = "button";
    botaoAssistido.classList.add("btn-assistido");
    botaoAssistido.textContent =
        filme.assistido ? "Desmarcar" : "Assisti";

    botaoAssistido.addEventListener("click", function () {
        alternarAssistido(filme.id);
    });

    const botaoFavorito = document.createElement("button");
    botaoFavorito.type = "button";
    botaoFavorito.classList.add("btn-favorito");
    botaoFavorito.textContent =
        filme.favorito ? "Desfavoritar" : "Favoritar";

    botaoFavorito.addEventListener("click", function () {
        alternarFavorito(filme.id);
    });

    const botaoRemover = document.createElement("button");
    botaoRemover.type = "button";
    botaoRemover.classList.add("btn-remover");
    botaoRemover.textContent = "Remover";

    botaoRemover.addEventListener("click", function () {
        removerFilme(filme.id);
    });

    acoes.appendChild(botaoAssistido);
    acoes.appendChild(botaoFavorito);
    acoes.appendChild(botaoRemover);
    li.appendChild(acoes);

    return li;
}

// Atualiza a lista e o contador
function mostrarFilmes() {
    listaFilmes.innerHTML = "";

    const filmesFiltrados = filtrarFilmes();

    if (filmesFiltrados.length === 0) {
        listaFilmes.innerHTML =
            '<li class="lista-vazia">Nenhum filme encontrado.</li>';
    } else {
        filmesFiltrados.forEach(function (filme) {
            listaFilmes.appendChild(criarItemFilme(filme));
        });
    }

    atualizarContador();
}

function atualizarContador() {
    const assistidos = filmes.filter(function (filme) {
        return filme.assistido;
    }).length;

    contador.textContent =
        `Total: ${filmes.length} filmes | ` +
        `Assistidos: ${assistidos} | ` +
        `Quero assistir: ${filmes.length - assistidos}`;
}

// Eventos
formFilme.addEventListener("submit", adicionarFilme);
formBuscaApi.addEventListener("submit", buscarFilmesApi);
filtroGenero.addEventListener("change", mostrarFilmes);
filtroStatus.addEventListener("change", mostrarFilmes);
busca.addEventListener("input", mostrarFilmes);
inputBuscaApi.addEventListener("input", () => {
    if (inputBuscaApi.value.trim() === "") {
        resultadosApi.innerHTML = "";
        statusApi.textContent = "";
    }
});

// Mostra a lista quando a página abre
mostrarFilmes();

// ===============================
// Autocompletar a busca de filmes
// ===============================
const listaSugestoes = document.getElementById("sugestoes-api");

let sugestoes = [];            // filmes sugeridos no momento
let sugestaoAtiva = -1;        // posição destacada (mouse ou teclado)
let temporizadorSugestoes = null;
let numeroBuscaSugestoes = 0;  // serve para ignorar respostas antigas

// Esconde a lista de sugestões
function fecharSugestoes() {
    numeroBuscaSugestoes++;
    clearTimeout(temporizadorSugestoes);
    sugestoes = [];
    sugestaoAtiva = -1;
    listaSugestoes.innerHTML = "";
    listaSugestoes.hidden = true;
    inputBuscaApi.setAttribute("aria-expanded", "false");
    inputBuscaApi.removeAttribute("aria-activedescendant");
}

// Destaca uma sugestão (usado pelo mouse e pelas setas)
function destacarSugestao(posicao) {
    const itens = listaSugestoes.children;
    sugestaoAtiva = posicao;

    for (let i = 0; i < itens.length; i++) {
        const ativo = i === posicao;
        itens[i].setAttribute("aria-selected", ativo ? "true" : "false");

        if (ativo) {
            inputBuscaApi.setAttribute("aria-activedescendant", itens[i].id);
            itens[i].scrollIntoView({ block: "nearest" });
        }
    }
}

// Preenche o campo e já seleciona o filme escolhido
function escolherSugestao(filmeApi) {
    inputBuscaApi.value = filmeApi.title;
    fecharSugestoes();
    selecionarFilme(filmeApi);
}

// Desenha as sugestões abaixo do campo
function mostrarSugestoes(lista) {
    listaSugestoes.innerHTML = "";
    sugestaoAtiva = -1;
    inputBuscaApi.removeAttribute("aria-activedescendant");

    if (lista.length === 0) {
        fecharSugestoes();
        return;
    }

    sugestoes = lista;

    lista.forEach(function (filmeApi, posicao) {
        const li = document.createElement("li");
        li.id = "sugestao-" + posicao;
        li.classList.add("sugestao");
        li.setAttribute("role", "option");
        li.setAttribute("aria-selected", "false");

        if (filmeApi.poster_path) {
            const img = document.createElement("img");
            img.src = TMDB_IMG + filmeApi.poster_path;
            img.alt = "";
            img.classList.add("sugestao-poster");
            li.appendChild(img);
        } else {
            const semPoster = document.createElement("div");
            semPoster.classList.add("sugestao-poster", "sugestao-sem-poster");
            semPoster.textContent = "🎬";
            li.appendChild(semPoster);
        }

        const texto = document.createElement("div");
        texto.classList.add("sugestao-texto");

        const titulo = document.createElement("strong");
        titulo.textContent = filmeApi.title;

        const ano = document.createElement("small");
        ano.textContent = filmeApi.release_date
            ? filmeApi.release_date.slice(0, 4)
            : "Ano não informado";

        texto.appendChild(titulo);
        texto.appendChild(ano);
        li.appendChild(texto);

        // Evita que o campo perca o foco antes do clique
        li.addEventListener("mousedown", function (evento) {
            evento.preventDefault();
        });

        li.addEventListener("mousemove", function () {
            if (sugestaoAtiva !== posicao) {
                destacarSugestao(posicao);
            }
        });

        li.addEventListener("click", function () {
            escolherSugestao(filmeApi);
        });

        listaSugestoes.appendChild(li);
    });

    listaSugestoes.hidden = false;
    inputBuscaApi.setAttribute("aria-expanded", "true");
}

// Busca na API os filmes parecidos com o texto digitado
async function buscarSugestoes(termo) {
    if (
        typeof TMDB_API_KEY === "undefined" ||
        !TMDB_API_KEY
    ) {
        return;
    }

    const numero = ++numeroBuscaSugestoes;

    try {
        const url =
            `${TMDB_URL}/search/movie?api_key=${TMDB_API_KEY}` +
            `&language=pt-BR&include_adult=false&query=${encodeURIComponent(termo)}`;

        const resposta = await fetch(url);

        if (!resposta.ok) {
            throw new Error("Erro HTTP: " + resposta.status);
        }

        const dados = await resposta.json();

        // Se o usuário digitou mais alguma coisa, esta resposta já está velha
        if (numero !== numeroBuscaSugestoes) {
            return;
        }

        mostrarSugestoes(dados.results.slice(0, 6));

    } catch (erro) {
        console.error(erro);

        if (numero === numeroBuscaSugestoes) {
            fecharSugestoes();
        }
    }
}

if (listaSugestoes) {
    // Espera o usuário parar de digitar um instante antes de buscar
    inputBuscaApi.addEventListener("input", function () {
        clearTimeout(temporizadorSugestoes);

        const termo = inputBuscaApi.value.trim();

        if (termo.length < 2) {
            fecharSugestoes();
            return;
        }

        temporizadorSugestoes = setTimeout(function () {
            buscarSugestoes(termo);
        }, 300);
    });

    // Setas, Enter e Esc
    inputBuscaApi.addEventListener("keydown", function (evento) {
        if (listaSugestoes.hidden) {
            return;
        }

        const total = sugestoes.length;

        if (evento.key === "ArrowDown") {
            evento.preventDefault();
            destacarSugestao((sugestaoAtiva + 1) % total);
        } else if (evento.key === "ArrowUp") {
            evento.preventDefault();
            destacarSugestao(sugestaoAtiva <= 0 ? total - 1 : sugestaoAtiva - 1);
        } else if (evento.key === "Enter" && sugestaoAtiva >= 0) {
            evento.preventDefault();
            escolherSugestao(sugestoes[sugestaoAtiva]);
        } else if (evento.key === "Escape") {
            fecharSugestoes();
        }
    });

    // Ao clicar em "Buscar", a busca normal assume
    formBuscaApi.addEventListener("submit", fecharSugestoes);

    // Clicar fora fecha a lista
    document.addEventListener("click", function (evento) {
        if (!evento.target.closest(".busca-api-campo")) {
            fecharSugestoes();
        }
    });
}

// ===============================
// Tema claro / escuro
// ===============================
const botaoTema = document.getElementById("botao-tema");

// Atualiza o texto do botão conforme o tema ativo
function atualizarBotaoTema(tema) {
    botaoTema.textContent =
        tema === "dark" ? "Tema claro" : "Tema escuro";
}

// Aplica o tema na página e guarda a escolha no navegador
function aplicarTema(tema) {
    document.documentElement.setAttribute("data-theme", tema);
    atualizarBotaoTema(tema);

    try {
        localStorage.setItem("cinelista-tema", tema);
    } catch (erro) {
        console.error(erro);
    }
}

// Troca entre claro e escuro
function alternarTema() {
    const atual =
        document.documentElement.getAttribute("data-theme") === "light"
            ? "light"
            : "dark";

    aplicarTema(atual === "dark" ? "light" : "dark");
}

if (botaoTema) {
    atualizarBotaoTema(
        document.documentElement.getAttribute("data-theme") === "light"
            ? "light"
            : "dark"
    );
    botaoTema.addEventListener("click", alternarTema);
}
