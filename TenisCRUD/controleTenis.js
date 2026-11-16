let lista = [];
let alterado = null;
function procure() {
    let idTenis = parseFloat(document.getElementById('inputReferencia').value);
    let item = null;
    if (isNaN(idTenis)) {
        alert('coloque uma referencia');
        return
    }
    document.getElementById('inputReferencia').readOnly = true;
    for (let i = 0; i < lista.length; i++) {
        if (lista[i].idTenis == idTenis) {
            item = lista[i];
            document.getElementById('inputmarca').value = item.marca;
            document.getElementById('inputmodelo').value = item.modelo;
            document.getElementById('inputtamanho').value = item.tamanho;
            document.getElementById('inputprecoRevenda').value = item.precoRevenda;
            document.getElementById('divAviso').innerHTML = 'Produto encontrado, clique Alterar para alterar';
            document.getElementById('btAlterar').style.display = 'inline';
            document.getElementById('btExcluir').style.display = 'inline';
            break
        }
    }
    if (item == null) {
        document.getElementById('divAviso').innerHTML = 'Produto nao encontrado, clique inserir para adicionar';
        document.getElementById('btInserir').style.display = 'inline';
    }
    item = null;
    document.getElementById('btProcure').style.display = 'none';
    document.getElementById('inputmarca').readOnly = false;
    document.getElementById('inputmodelo').readOnly = false;
    document.getElementById('inputtamanho').readOnly = false;
    document.getElementById('inputprecoRevenda').readOnly = false;
    document.getElementById('btVoltar').style.display = 'inline';
}
function inserir() {
    let referencial = document.getElementById('inputReferencia').value;
    let a1C = document.getElementById('inputmarca').value;
    let a2C = document.getElementById('inputmodelo').value;
    let a3C = parseFloat(document.getElementById('inputtamanho').value);
    let a4C = parseFloat(document.getElementById('inputprecoRevenda').value);
    if (referencial == '' || isNaN(referencial) || a1C == '' || a2C == '' || isNaN(a3C) || isNaN(a4C)) {
        alert('insira todos os parametros');
        return;
    }
    fInserir(referencial, a1C, a2C, a3C, a4C, lista)
    document.getElementById('divAviso').innerHTML = 'Produto adicionado';
    exibirLista(lista);
    zerar();
    document.getElementById('btVoltar').style.display = 'none';
}
function fInserir(referencial, a1C, a2C, a3C, a4C, lista) {
    let itens = new Tenis(referencial, a1C, a2C, a3C, a4C,);
    lista.push(itens);
}
function exibirLista(lista) {
    let string = '';
    document.getElementById('outputSaida').innerHTML = '';
    for (let i = 0; i < lista.length; i++) {
        string += 'idTenis: ' + lista[i].idTenis + ' <br> ' + 'marca: ' + lista[i].marca + ' <br> ' + 'modelo: ' + lista[i].modelo + ' <br> ' + 'tamanho: ' + lista[i].tamanho + ' <br> ' + 'precoRevenda: ' + lista[i].precoRevenda + ' <br> ' + '-----------------------------------------------------------------------------<br>';
    }
    document.getElementById('outputSaida').innerHTML = string;
}
function alterar() {
    let referencial = document.getElementById('inputReferencia').value;
    let a1C = document.getElementById('inputmarca').value;
    let a2C = document.getElementById('inputmodelo').value;
    let a3C = parseFloat(document.getElementById('inputtamanho').value);
    let a4C = parseFloat(document.getElementById('inputprecoRevenda').value);
    if (a1C == '' || a2C == '' || isNaN(a3C) || isNaN(a4C)) {
        alert('insira todos os parametros');
        return;
    }
    for (let i = 0; i < lista.length; i++) {
        if (referencial == lista[i].idTenis) {
            let itemQuestao = lista[i];
            itemQuestao.marca = a1C;
            itemQuestao.modelo = a2C;
            itemQuestao.tamanho = a3C;
            itemQuestao.precoRevenda = a4C;
            break
        }
    }
    exibirLista(lista);
    zerar();
    document.getElementById('btVoltar').style.display = 'none';
    document.getElementById('divAviso').innerHTML = 'Produto Alterado';
}
function zerar() {
    document.getElementById('inputmarca').readOnly = true;
    document.getElementById('inputmarca').value = '';
    document.getElementById('inputmodelo').readOnly = true;
    document.getElementById('inputmodelo').value = '';
    document.getElementById('inputtamanho').readOnly = true;
    document.getElementById('inputtamanho').value = '';
    document.getElementById('inputprecoRevenda').readOnly = true;
    document.getElementById('inputprecoRevenda').value = '';
    document.getElementById('inputReferencia').readOnly = false;
    document.getElementById('inputReferencia').value = '';
    document.getElementById('btProcure').style.display = 'inline';
    document.getElementById('btExcluir').style.display = 'none';
    document.getElementById('btAlterar').style.display = 'none';
    document.getElementById('btInserir').style.display = 'none';
}
function excluir() {
    let referencial = document.getElementById('inputReferencia').value;
    if (referencial == '' || isNaN(referencial)) {
        alert('coloque uma referencia valida');
        return;
    }
    lista = fExcluir(referencial, lista);
    exibirLista(lista);
    zerar();
    document.getElementById('btVoltar').style.display = 'inline';
    document.getElementById('divAviso').innerHTML = 'Produto EXCLUIDO, clique VOLTAR para desfazer';
    document.getElementById('btVoltar').value = 'Desfazer';
}
function fExcluir(referencial, lista) {
    let newlista = [];
    for (let i = 0; i < lista.length; i++) {
        if (lista[i].idTenis != referencial) {
            newlista.push(lista[i]);
        } else {
            alterado = lista[i];
        }
    }
    return newlista;
}
function voltar() {
    if (alterado != null) {
        fInserir(alterado.idTenis, alterado.marca, alterado.modelo, alterado.tamanho, alterado.precoRevenda, lista);
        document.getElementById('divAviso').innerHTML = 'Produto reenserido';
    }
    exibirLista(lista);
    zerar();
    document.getElementById('btVoltar').style.display = 'none';
    document.getElementById('btVoltar').value = 'Voltar';
    alterado = null;
}
function persistirEmLocalPermanente(arquivoDestino, conteudo) {
    const blob = new Blob([conteudo], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = arquivoDestino;
    link.click();
    URL.revokeObjectURL(link.href);
}
function abrirArquivoSalvoEmLocalPermanente() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = function (event) {
        const arquivo = event.target.files[0];
        if (arquivo) {
            converterDeCSVparaListaObjeto(arquivo);
        }
    };
    input.click();
}
function prepararESalvarCSV() {
    let nomeDoArquivoDestino = 'Tenis.csv';
    let textoCSV = '';
    for (let i = 0; i < lista.length; i++) {
        const linha = lista[i];
        textoCSV += linha.idTenis + ';' + linha.marca + ';' + linha.modelo + ';' + linha.tamanho + ';' + linha.precoRevenda + '\n';
    }
    persistirEmLocalPermanente(nomeDoArquivoDestino, textoCSV);
}
function converterDeCSVparaListaObjeto(arquivo) {
    const leitor = new FileReader();
    leitor.onload = function (e) {
        const conteudo = e.target.result;
        const linhas = conteudo.split('\n');
        lista = [];
        for (let i = 0; i < linhas.length; i++) {
            const linha = linhas[i].trim();
            if (linha) {
                const dados = linha.split(';');
                let novoTenis = new Tenis(
                    parseFloat(dados[0]),
                    dados[1],
                    dados[2],
                    parseFloat(dados[3]),
                    parseFloat(dados[4]),
                );
                lista.push(novoTenis);
            }
        }
        exibirLista(lista);
        document.getElementById('divAviso').innerHTML = 'Arquivo carregado com sucesso!';
    };
    leitor.readAsText(arquivo);
}
function listar() {
    exibirLista(lista);
}
function filtrarMarca() {
    let marcaFiltro = document.getElementById("inputFiltroMarca").value;
    let listaFiltro = [];
    for (let i = 0; i < lista.length; i++) {
        if (lista[i].marca == marcaFiltro) {
            listaFiltro.push(lista[i])
        }
    }
    exibirLista(listaFiltro)
}
function filtrarPreco() {
    let aux;
    for (let i = lista.length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            let agr = lista[j].precoRevenda;
            let prox = lista[j + 1].precoRevenda;
            if (agr > prox) {
                aux = lista[j];
                lista[j] = lista[j + 1];
                lista[j + 1] = aux;
            }
        }
    }
    exibirLista(lista);
}
