let lista = [];
let alterado = null;
function procure() {
    document.getElementById('btVoltar').style.display = 'none';
    document.getElementById('btVoltar').value = 'Voltar';
    let placa = document.getElementById('inputReferencia').value;
    let item = null;
    if (placa == '') {
        alert('coloque uma referencia');
        return
    }
    document.getElementById('inputReferencia').readOnly = true;
    for (let i = 0; i < lista.length; i++) {
        if (lista[i].placa == placa) {
            item = lista[i];
            document.getElementById('inputmarca').value = item.marca;
            document.getElementById('inputmodelo').value = item.modelo;
            document.getElementById('inputano').value = item.ano;
            document.getElementById('inputpeso').value = item.peso;
            document.getElementById('inputdiaCompra').value = item.diaCompra;
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
    document.getElementById('inputano').readOnly = false;
    document.getElementById('inputpeso').readOnly = false;
    document.getElementById('inputdiaCompra').readOnly = false;
    document.getElementById('btVoltar').style.display = 'inline';
}
function inserir() {
    let referencial = document.getElementById('inputReferencia').value;
    let a1C = document.getElementById('inputmarca').value;
    let a2C = document.getElementById('inputmodelo').value;
    let a3C = parseInt(document.getElementById('inputano').value);
    let a4C = parseFloat(document.getElementById('inputpeso').value);
    let a5C = document.getElementById('inputdiaCompra').value;
    if (referencial == '' || a1C == '' || a2C == '' || isNaN(a3C) || isNaN(a4C) || a5C == '') {
        alert('insira todos os parametros');
        return;
    }
    fInserir(referencial, a1C, a2C, a3C, a4C, a5C, lista)
    document.getElementById('divAviso').innerHTML = 'Produto adicionado';
    exibirLista(lista);
    zerar();
    document.getElementById('btVoltar').style.display = 'none';
}
function fInserir(referencial, a1C, a2C, a3C, a4C, a5C, lista) {
    let itens = new Carro(referencial, a1C, a2C, a3C, a4C, a5C,);
    lista.push(itens);
}
function exibirLista(lista) {
    let string = '';
    document.getElementById('outputSaida').innerHTML = '';
    for (let i = 0; i < lista.length; i++) {
        string += 'placa: ' + lista[i].placa + ' <br> ' + 'marca: ' + lista[i].marca + ' <br> ' + 'modelo: ' + lista[i].modelo + ' <br> ' + 'ano: ' + lista[i].ano + ' <br> ' + 'peso: ' + lista[i].peso + ' <br> ' + 'diaCompra: ' + lista[i].diaCompra + ' <br> ' + '-----------------------------------------------------------------------------<br>';
    }
    document.getElementById('outputSaida').innerHTML = string;
}
function alterar() {
    let referencial = document.getElementById('inputReferencia').value;
    let a1C = document.getElementById('inputmarca').value;
    let a2C = document.getElementById('inputmodelo').value;
    let a3C = parseInt(document.getElementById('inputano').value);
    let a4C = parseFloat(document.getElementById('inputpeso').value);
    let a5C = document.getElementById('inputdiaCompra').value;
    if (a1C == '' || a2C == '' || isNaN(a3C) || isNaN(a4C) || a5C == '') {
        alert('insira todos os parametros');
        return;
    }
    for (let i = 0; i < lista.length; i++) {
        if (referencial == lista[i].placa) {
            let itemQuestao = lista[i];
            itemQuestao.marca = a1C;
            itemQuestao.modelo = a2C;
            itemQuestao.ano = a3C;
            itemQuestao.peso = a4C;
            itemQuestao.diaCompra = a5C;
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
    document.getElementById('inputano').readOnly = true;
    document.getElementById('inputano').value = '';
    document.getElementById('inputpeso').readOnly = true;
    document.getElementById('inputpeso').value = '';
    document.getElementById('inputdiaCompra').readOnly = true;
    document.getElementById('inputdiaCompra').value = '';
    document.getElementById('inputReferencia').readOnly = false;
    document.getElementById('inputReferencia').value = '';
    document.getElementById('btProcure').style.display = 'inline';
    document.getElementById('btExcluir').style.display = 'none';
    document.getElementById('btAlterar').style.display = 'none';
    document.getElementById('btInserir').style.display = 'none';
}
function excluir() {
    let referencial = document.getElementById('inputReferencia').value;
    if (referencial == '') {
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
        if (lista[i].placa != referencial) {
            newlista.push(lista[i]);
        } else {
            alterado = lista[i];
        }
    }
    return newlista;
}
function voltar() {
    if (document.getElementById("btVoltar").value == "Desfazer") {
        fInserir(alterado.placa, alterado.marca, alterado.modelo, alterado.ano, alterado.peso, alterado.diaCompra, lista);
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
    let nomeDoArquivoDestino = 'Carro.csv';
    let textoCSV = '';
    for (let i = 0; i < lista.length; i++) {
        const linha = lista[i];
        textoCSV += linha.placa + ';' + linha.marca + ';' + linha.modelo + ';' + linha.ano + ';' + linha.peso + ';' + linha.diaCompra + '\n';
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
                let novoCarro = new Carro(
                    dados[0],
                    dados[1],
                    dados[2],
                    parseInt(dados[3]),
                    parseFloat(dados[4]),
                    dados[5],
                );
                lista.push(novoCarro);
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
