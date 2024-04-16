var botaoProduto = document.getElementById('botaoProduto');
var buttonCancelar = document.getElementById('butonCancelar');
var produto = document.getElementById('novoEvento');
var formProduto = document.getElementById('formNovoEvento');
var inputProduto = document.getElementById('nomeEvento');
var inputQuantidade = document.getElementById('quantidade');
var tabelaProdutos = document.getElementById('tabelaEventos');
var listaEventos = [];

function removerEvento(event) {
    var posicao = event.target.getAttribute('data-evento');
    listaEventos.splice(posicao, 1);
    atualizarTabelaEvento();
}

function editarEvento(event) {
    var posicao = event.target.getAttribute('data-evento');
    var evento = listaEventos[posicao];

    // Cria um novo elemento <tr> para o evento a ser editado
    var linhaEdicao = document.createElement('tr');

    // Cria um novo elemento <td> para o nome do evento editável
    var celulaNomeEdicao = document.createElement('td');
    var inputNomeEdicao = document.createElement('input');
    inputNomeEdicao.type = 'text';
    inputNomeEdicao.value = evento.nome; // Preenche o input com o nome atual do evento
    celulaNomeEdicao.appendChild(inputNomeEdicao);
    linhaEdicao.appendChild(celulaNomeEdicao);

    // Cria um novo elemento <td> para a quantidade do evento editável
    var celulaQuantidadeEdicao = document.createElement('td');
    var inputQuantidadeEdicao = document.createElement('input');
    inputQuantidadeEdicao.type = 'number';
    inputQuantidadeEdicao.value = evento.quantidade; // Preenche o input com a quantidade atual do evento
    celulaQuantidadeEdicao.appendChild(inputQuantidadeEdicao);
    linhaEdicao.appendChild(celulaQuantidadeEdicao);

    // Cria um novo elemento <td> para os botões de ação
    var celulaAcoesEdicao = document.createElement('td');
    var botaoSalvarEdicao = document.createElement('button');
    botaoSalvarEdicao.innerText = 'Salvar';
    botaoSalvarEdicao.classList.add('btn', 'btn-primary', 'btn-sm');
    botaoSalvarEdicao.addEventListener('click', function() {
        // Atualiza os dados do evento na lista com os valores dos inputs de edição
        evento.nome = inputNomeEdicao.value;
        evento.quantidade = inputQuantidadeEdicao.value;
        atualizarTabelaEvento();
    });
    celulaAcoesEdicao.appendChild(botaoSalvarEdicao);
    linhaEdicao.appendChild(celulaAcoesEdicao);

    // Substitui a linha atual do evento pela linha de edição
    var linhaEvento = event.target.closest('tr');
    linhaEvento.parentNode.replaceChild(linhaEdicao, linhaEvento);
}

function atualizarTabelaEvento() {
    if(listaEventos.length === 0){
        tabelaProdutos.innerHTML = '<tr><td colspan="3">Lista Vazia</td><td colspan="3">Lista Vazia</td></tr>';
        return;
    }
    tabelaProdutos.innerHTML = '';
    for(var i = 0; i<listaEventos.length; i++){
        var evento = listaEventos[i];
        var linha = document.createElement('tr');
        var celulaNome = document.createElement('td');
        var celulaQuantidade = document.createElement('td');
        var celulaAcoes =  document.createElement('td');
        var botaoExcluir = document.createElement('button');
        botaoExcluir.setAttribute('data-evento', i);
        botaoExcluir.classList.add('btn');
        botaoExcluir.classList.add('btn-danger');
        botaoExcluir.classList.add('btn-sm');
        botaoExcluir.addEventListener('click', removerEvento);
        celulaNome.innerText = evento.nome;
        celulaQuantidade.innerText = evento.quantidade;
        botaoExcluir.innerText = "Remover";
        celulaAcoes.appendChild(botaoExcluir);
        var botaoEditar = document.createElement('button');
        botaoEditar.innerText = "Editar";
        botaoEditar.setAttribute('data-evento', i);
        botaoEditar.classList.add('btn');
        botaoEditar.classList.add('btn-warning');
        botaoEditar.classList.add('btn-sm');
        botaoEditar.addEventListener('click', editarEvento);
        celulaAcoes.appendChild(botaoEditar);
        linha.appendChild(celulaNome);
        linha.appendChild(celulaQuantidade);
        linha.appendChild(celulaAcoes);
        tabelaProdutos.appendChild(linha);
    }
}

function limparNovoEvento() {
    inputProduto.value = '';
    inputQuantidade.value = '';
    inputProduto.classList.remove('is-invalid');
    inputQuantidade.classList.remove('is-invalid');
}

function mostrarNovoEvento() {
    produto.classList.remove('d-none');
}

function cancelarNovoEvento() {
    produto.classList.add('d-none');
    limparNovoEvento();
}

function novoEventoValido(nomeEvento, quantidade) {
    var validacao = true;
    var erro = '';
    if (nomeEvento.trim().length === 0) {
        erro = 'Nome do produto é obrigatório';
        inputProduto.classList.add('is-invalid');
        validacao = false;
    } else {
        inputProduto.classList.remove('is-invalid');
    }
    if (quantidade.trim().length === 0) {
        erro = 'Quantidade é obrigatória';
        inputQuantidade.classList.add('is-invalid');
        validacao = false;
    } else {
        inputQuantidade.classList.remove('is-invalid');
    }
    return validacao;
}

function salvarNovoEvento(event) {
    event.preventDefault();
    var nomeEvento = inputProduto.value;
    var quantidade = inputQuantidade.value;
    if (novoEventoValido(nomeEvento, quantidade)) {
        listaEventos.push({
            nome: nomeEvento,
            quantidade: quantidade
        });
        atualizarTabelaEvento();
        cancelarNovoEvento();
    } else {
        console.log('Evento inválido!');
    }
}

botaoProduto.addEventListener('click', mostrarNovoEvento);
buttonCancelar.addEventListener('click', cancelarNovoEvento);
formProduto.addEventListener('submit', salvarNovoEvento);
