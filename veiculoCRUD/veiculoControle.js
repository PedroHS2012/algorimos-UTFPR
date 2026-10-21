let listaVeiculos = [];
let oQueEstaFazendo = '';
let carro = null;
//bloquearAtributos(true);
function procure() {
    let placaC = document.getElementById("inputPlaca").value;
    if(placaC == ""){
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
 }
       
    }
    if(carro == null){
       document.getElementById("divAviso").innerHTML = "Produto nao encontrado, clique inserir para adicionar";
       document.getElementById("btInserir").style.display = "inline";

    }
     carro = null;

}
function inserir(){
        let placaC = document.getElementById("inputPlaca").value;
    let marcaC = document.getElementById("inputMarca").value;
    let modeloC = document.getElementById("inputModelo").value;
    let anoC = parseInt(document.getElementById("inputAno").value);
    if(marcaC == "" || modeloC == "" || placaC == "" || isNaN(anoC)){
        alert("insira todos os parametros");
        return
    }
    let veiculo = new Veiculo(placaC, marcaC, modeloC, anoC)
    listaVeiculos.push(veiculo);
    document.getElementById("divAviso").innerHTML = "Produto adicionado";
       document.getElementById("btInserir").style.display = "none";

exibirLista(listaVeiculos);
        document.getElementById("inputPlaca").readOnly = false;
              document.getElementById("inputMarca").value = "";
            document.getElementById("inputAno").value = "";
            document.getElementById("inputModelo").value = "";
                        document.getElementById("inputPlaca").value = "";


}

function exibirLista(listaVeiculos){
    let string = "";
        document.getElementById("outputSaida").innerHTML = "";
    for(let i = 0; i<listaVeiculos.length; i++){
string += listaVeiculos[i].placa + " // " + listaVeiculos[i].marca + " " + listaVeiculos[i].modelo + " " + listaVeiculos[i].ano + "<br>";
    }
    document.getElementById("outputSaida").innerHTML = string;
}