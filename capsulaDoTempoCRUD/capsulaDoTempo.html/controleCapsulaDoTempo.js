let lista = [];
let alterado = null;
function procure() {
    let idCapsula = parseFloat(document.getElementById('inputReferencia').value);
    let item = null;
    if (isNaN(idCapsula)) {
        alert('coloque uma referencia');
        return
    }
    document.getElementById('inputReferencia').readOnly = true;
    for (let i = 0; i < lista.length; i++) {
        if (lista[i].idCapsula == idCapsula) {
            item = lista[i];
            document.getElementById('inputtitulo').value = item.titulo;
            document.getElementById('inputlocalEnterro').value = item.localEnterro;
            document.getElementById('inputprofundidadeMetros').value = item.profundidadeMetros;
            document.getElementById('inputdataAbertura').value = item.dataAbertura;
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
    document.getElementById('inputtitulo').readOnly = false;
    document.getElementById('inputlocalEnterro').readOnly = false;
    document.getElementById('inputprofundidadeMetros').readOnly = false;
    document.getElementById('inputdataAbertura').readOnly = false;
    document.getElementById('btVoltar').style.display = 'inline';
}
function inserir() {
    let referencial = document.getElementById('inputReferencia').value;
    let a1C = document.getElementById('inputtitulo').value;
    let a2C = document.getElementById('inputlocalEnterro').value;
    let a3C = parseFloat(document.getElementById('inputprofundidadeMetros').value);
    let a4C = document.getElementById('inputdataAbertura').value;
    if (referencial == '' || isNaN(referencial) || a1C == '' || a2C == '' || isNaN(a3C) || a4C == '') {
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
    let itens = new CapsulaDoTempo(referencial, a1C, a2C, a3C, a4C,);
    lista.push(itens);
}
function exibirLista(lista) {
    let string = '';
    document.getElementById('outputSaida').innerHTML = '';
    for (let i = 0; i < lista.length; i++) {
        string += 'idCapsula: ' + lista[i].idCapsula + ' <br> ' + 'titulo: ' + lista[i].titulo + ' <br> ' + 'localEnterro: ' + lista[i].localEnterro + ' <br> ' + 'profundidadeMetros: ' + lista[i].profundidadeMetros + ' <br> ' + 'dataAbertura: ' + lista[i].dataAbertura + ' <br> ' + '-----------------------------------------------------------------------------<br>';
    }
    document.getElementById('outputSaida').innerHTML = string;
}
function alterar() {
    let referencial = document.getElementById('inputReferencia').value;
    let a1C = document.getElementById('inputtitulo').value;
    let a2C = document.getElementById('inputlocalEnterro').value;
    let a3C = parseFloat(document.getElementById('inputprofundidadeMetros').value);
    let a4C = document.getElementById('inputdataAbertura').value;
    if (a1C == '' || a2C == '' || isNaN(a3C) || a4C == '') {
        alert('insira todos os parametros');
        return;
    }
    for (let i = 0; i < lista.length; i++) {
        if (referencial == lista[i].idCapsula) {
            let itemQuestao = lista[i];
            itemQuestao.titulo = a1C;
            itemQuestao.localEnterro = a2C;
            itemQuestao.profundidadeMetros = a3C;
            itemQuestao.dataAbertura = a4C;
            break
        }
    }
    exibirLista(lista);
    zerar();
    document.getElementById('btVoltar').style.display = 'none';
    document.getElementById('divAviso').innerHTML = 'Produto Alterado';
}
function zerar() {
    document.getElementById('inputtitulo').readOnly = true;
    document.getElementById('inputtitulo').value = '';
    document.getElementById('inputlocalEnterro').readOnly = true;
    document.getElementById('inputlocalEnterro').value = '';
    document.getElementById('inputprofundidadeMetros').readOnly = true;
    document.getElementById('inputprofundidadeMetros').value = '';
    document.getElementById('inputdataAbertura').readOnly = true;
    document.getElementById('inputdataAbertura').value = '';
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
        if (lista[i].idCapsula != referencial) {
            newlista.push(lista[i]);
        } else {
            alterado = lista[i];
        }
    }
    return newlista;
}
function voltar() {
    if (alterado != null) {
        fInserir(alterado.idCapsula, alterado.titulo, alterado.localEnterro, alterado.profundidadeMetros, alterado.dataAbertura, lista);
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
    let nomeDoArquivoDestino = 'CapsulaDoTempo.csv';
    let textoCSV = '';
    for (let i = 0; i < lista.length; i++) {
        const linha = lista[i];
        textoCSV += linha.idCapsula + ';' + linha.titulo + ';' + linha.localEnterro + ';' + linha.profundidadeMetros + ';' + linha.dataAbertura + '\n';
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
                let novoCapsulaDoTempo = new CapsulaDoTempo(
                    parseFloat(dados[0]),
                    dados[1],
                    dados[2],
                    parseFloat(dados[3]),
                    dados[4],
                );
                lista.push(novoCapsulaDoTempo);
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