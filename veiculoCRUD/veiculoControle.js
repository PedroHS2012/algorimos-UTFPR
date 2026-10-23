let listaVeiculos = [];
let oQueEstaFazendo = '';
let alterado = null;


function procure() {
    let placaC = document.getElementById("inputPlaca").value;
    let carro = null;
    if (placaC == "") {
        alert("coloque uma placa");
        return
    }
    document.getElementById("inputPlaca").readOnly = true;
    for (let i = 0; i < listaVeiculos.length; i++) {
        if (listaVeiculos[i].placa == placaC) {
            carro = listaVeiculos[i];
            document.getElementById("inputMarca").value = carro.marca;
            document.getElementById("inputAno").value = carro.ano;
            document.getElementById("inputModelo").value = carro.modelo;
            document.getElementById("divAviso").innerHTML = "Produto encontrado, clique Alterar para alterar";
            document.getElementById("btAlterar").style.display = "inline";
            document.getElementById("btExcluir").style.display = "inline";
            break
        }

    }
    if (carro == null) {
        document.getElementById("divAviso").innerHTML = "Produto nao encontrado, clique inserir para adicionar";
        document.getElementById("btInserir").style.display = "inline";

    }

    carro = null;
    document.getElementById("btProcure").style.display = "none";
    document.getElementById("inputAno").readOnly = false;
    document.getElementById("inputModelo").readOnly = false;
    document.getElementById("inputMarca").readOnly = false;
    document.getElementById("btVoltar").style.display = "inline";


}

function inserir() {
    let placaC = document.getElementById("inputPlaca").value;
    let marcaC = document.getElementById("inputMarca").value;
    let modeloC = document.getElementById("inputModelo").value;
    let anoC = parseInt(document.getElementById("inputAno").value);
    if (marcaC == "" || modeloC == "" || placaC == "" || isNaN(anoC)) {
        alert("insira todos os parametros");
        return
    }
    fInserir(placaC, marcaC, modeloC, anoC, listaVeiculos)

    document.getElementById("divAviso").innerHTML = "Produto adicionado";
    exibirLista(listaVeiculos);
    zerar();
    document.getElementById("btVoltar").style.display = "none";

}
function fInserir(placaC, marcaC, modeloC, anoC, listaVeiculos) {
    let veiculo = new Veiculo(placaC, marcaC, modeloC, anoC);
    listaVeiculos.push(veiculo);

}

function exibirLista(listaVeiculos) {
    let string = "";
    document.getElementById("outputSaida").innerHTML = "";
    for (let i = 0; i < listaVeiculos.length; i++) {
        string += listaVeiculos[i].placa + " // " + listaVeiculos[i].marca + " " + listaVeiculos[i].modelo + " " + listaVeiculos[i].ano + "<br>";
    }
    document.getElementById("outputSaida").innerHTML = string;
}

function alterar() {
    let placaC = document.getElementById("inputPlaca").value;
    let marcaC = document.getElementById("inputMarca").value;
    let modeloC = document.getElementById("inputModelo").value;
    let anoC = parseInt(document.getElementById("inputAno").value);
    if (marcaC == "" || modeloC == "" || placaC == "" || isNaN(anoC)) {
        alert("insira todos os parametros");
        return
    }

    for (let i = 0; i < listaVeiculos.length; i++) {
        if (placaC == listaVeiculos[i].placa) {
            let carroQuestao = listaVeiculos[i];
            carroQuestao.marca = marcaC;
            carroQuestao.modelo = modeloC;
            carroQuestao.ano = anoC;
            break
        }
    }
    exibirLista(listaVeiculos);
    zerar();
    document.getElementById("btVoltar").style.display = "none";
            document.getElementById("divAviso").innerHTML = "Produto Alterado";

}

function zerar() {
    document.getElementById("inputAno").readOnly = true;
    document.getElementById("inputPlaca").readOnly = false;
    document.getElementById("inputModelo").readOnly = true;
    document.getElementById("inputMarca").readOnly = true;
    document.getElementById("inputMarca").value = "";
    document.getElementById("inputAno").value = "";
    document.getElementById("inputModelo").value = "";
    document.getElementById("inputPlaca").value = "";
    document.getElementById("btProcure").style.display = "inline";
    document.getElementById("btExcluir").style.display = "none";
    document.getElementById("btAlterar").style.display = "none";
    document.getElementById("btInserir").style.display = "none";


}

function excluir() {
    let placaC = document.getElementById("inputPlaca").value;
    listaVeiculos = fExcluir(placaC, listaVeiculos);
    exibirLista(listaVeiculos);
    zerar();
        document.getElementById("btVoltar").style.display = "inline";
            document.getElementById("divAviso").innerHTML = "Produto EXCLUIDO, clique VOLTAR para desfazer";
                document.getElementById("btVoltar").value = "Desfazer";

}
function fExcluir(placaC, lista) {
    let newlista = [];
    for (let i = 0; i < lista.length; i++) {
        if (lista[i].placa != placaC) {
            newlista.push(lista[i]);
        } else {
           alterado = lista[i];
        }
    }
    return newlista;
}

function voltar() {
    if(alterado != null){
        fInserir(alterado.placa, alterado.marca, alterado.modelo, alterado.ano ,listaVeiculos);
                    document.getElementById("divAviso").innerHTML = "Produto reenserido";

    }
    exibirLista(listaVeiculos);
        zerar();
                document.getElementById("btVoltar").style.display = "none";
                document.getElementById("btVoltar").value = "Voltar";

        alterado = null;
}