// ===============================
// CineLista - Biblioteca de Filmes
// ===============================

// Lista inicial de filmes (array de objetos)
let filmes = [
  { id: 1, titulo: "Central do Brasil", genero: "Drama", ano: 1998, nota: 9, assistido: true, favorito: true },
  { id: 2, titulo: "Interestelar", genero: "Ficção científica", ano: 2014, nota: 10, assistido: true, favorito: false },
  { id: 3, titulo: "O Auto da Compadecida", genero: "Comédia", ano: 2000, nota: 10, assistido: false, favorito: false },
  { id: 4, titulo: "Divertida Mente", genero: "Animação", ano: 2015, nota: 8, assistido: false, favorito: false }
];

// variável usada para gerar o id dos próximos filmes
let proximoId = 5;

// Pegando os elementos do HTML
const form = document.getElementById("form-filme");
const inputTitulo = document.getElementById("titulo");
const selectGenero = document.getElementById("genero");
const inputAno = document.getElementById("ano");
const inputNota = document.getElementById("nota");
const mensagemErro = document.getElementById("mensagem-erro");

const inputBusca = document.getElementById("busca");
const filtroGenero = document.getElementById("filtro-genero");
const filtroStatus = document.getElementById("filtro-status");
const listaFilmes = document.getElementById("lista-filmes");
const contador = document.getElementById("contador");


// Função que adiciona um novo filme no array
function adicionarFilme(evento) {
  evento.preventDefault(); // impede a página de recarregar

  const titulo = inputTitulo.value.trim();
  const genero = selectGenero.value;
  const ano = Number(inputAno.value);
  const nota = Number(inputNota.value);

  // Validações
  if (titulo === "" || genero === "") {
    mensagemErro.textContent = "Preencha pelo menos o título e o gênero.";
    return;
  }

  if (inputNota.value !== "" && (nota < 0 || nota > 10)) {
    mensagemErro.textContent = "A nota precisa estar entre 0 e 10.";
    return;
  }

  mensagemErro.textContent = "";

  const novoFilme = {
    id: proximoId,
    titulo: titulo,
    genero: genero,
    ano: ano,
    nota: nota,
    assistido: false,
    favorito: false
  };

  filmes.push(novoFilme);
  proximoId++;

  form.reset();
  inputTitulo.focus();
  mostrarFilmes();
}


// Marca ou desmarca o filme como assistido
function alternarAssistido(id) {
  for (let i = 0; i < filmes.length; i++) {
    if (filmes[i].id === id) {
      filmes[i].assistido = !filmes[i].assistido;
    }
  }
  mostrarFilmes();
}


// Marca ou desmarca o filme como favorito
function alternarFavorito(id) {
  const filme = filmes.find(function (f) {
    return f.id === id;
  });

  if (filme) {
    filme.favorito = !filme.favorito;
  }
  mostrarFilmes();
}


// Remove um filme do array
function removerFilme(id) {
  const confirmar = confirm("Tem certeza que deseja remover este filme?");

  if (confirmar) {
    filmes = filmes.filter(function (filme) {
      return filme.id !== id;
    });
    mostrarFilmes();
  }
}


// Retorna só os filmes que passam na busca e nos filtros
function filtrarFilmes() {
  const textoBusca = inputBusca.value.toLowerCase();
  const generoEscolhido = filtroGenero.value;
  const statusEscolhido = filtroStatus.value;

  return filmes.filter(function (filme) {
    const passouBusca = filme.titulo.toLowerCase().includes(textoBusca);

    let passouGenero = true;
    if (generoEscolhido !== "todos") {
      passouGenero = filme.genero === generoEscolhido;
    }

    let passouStatus = true;
    if (statusEscolhido === "assistidos") {
      passouStatus = filme.assistido === true;
    } else if (statusEscolhido === "nao-assistidos") {
      passouStatus = filme.assistido === false;
    }

    return passouBusca && passouGenero && passouStatus;
  });
}


// Cria o <li> de um filme
function criarItemFilme(filme) {
  const li = document.createElement("li");
  li.classList.add("filme");

  if (filme.assistido) {
    li.classList.add("assistido");
  }

  // monta o texto de informações
  let info = "";
  if (filme.ano) {
    info += filme.ano;
  }
  if (filme.nota || filme.nota === 0) {
    info += " • Nota: " + filme.nota + "/10";
  }

  const estrela = filme.favorito ? "⭐ " : "";

  li.innerHTML = `
    <div>
      <h3>${estrela}${filme.titulo}</h3>
      <p class="info">${info}</p>
      <span class="etiqueta">${filme.genero}</span>
    </div>
    <div class="acoes">
      <button class="btn-assistido">${filme.assistido ? "Desmarcar" : "Assisti"}</button>
      <button class="btn-favorito">${filme.favorito ? "Desfavoritar" : "Favoritar"}</button>
      <button class="btn-remover">Remover</button>
    </div>
  `;

  // eventos dos botões
  li.querySelector(".btn-assistido").addEventListener("click", function () {
    alternarAssistido(filme.id);
  });

  li.querySelector(".btn-favorito").addEventListener("click", function () {
    alternarFavorito(filme.id);
  });

  li.querySelector(".btn-remover").addEventListener("click", function () {
    removerFilme(filme.id);
  });

  return li;
}


// Mostra os filmes na tela (atualiza o DOM)
function mostrarFilmes() {
  listaFilmes.innerHTML = "";

  const filmesFiltrados = filtrarFilmes();

  if (filmesFiltrados.length === 0) {
    listaFilmes.innerHTML = '<li class="lista-vazia">Nenhum filme encontrado.</li>';
  } else {
    filmesFiltrados.forEach(function (filme) {
      listaFilmes.appendChild(criarItemFilme(filme));
    });
  }

  atualizarContador();
}


// Mostra quantos filmes tem e quantos foram assistidos
function atualizarContador() {
  let assistidos = 0;

  for (const filme of filmes) {
    if (filme.assistido) {
      assistidos++;
    }
  }

  contador.textContent = `Total: ${filmes.length} filmes | Assistidos: ${assistidos} | Quero assistir: ${filmes.length - assistidos}`;
}


// ===== Eventos =====
form.addEventListener("submit", adicionarFilme);
inputBusca.addEventListener("input", mostrarFilmes);
filtroGenero.addEventListener("change", mostrarFilmes);
filtroStatus.addEventListener("change", mostrarFilmes);

// mostra a lista quando a página abre
mostrarFilmes();
