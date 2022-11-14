//objetos
function LancheCarrinho(id, nome, preco){

    this.id = id;
    this.nome = nome;
    this.preco = preco;
    this.observacao = "";
    this.adicionais = [];
    this.stringAdicionaisGerado = "";
    this.stringPrecoTotal = ""

    this.addAdicionais = function(info){
        //função responsável por manipular os adicionais referentes à este lanche
        this.adicionais.push(JSON.parse(info));

    }
  
    this.setObservacao = function(obs){
        //função responsável por adicionar no objeto a observação especificada pelo cliente.
  
        this.observacao = obs;

    }

    this.custoTotalString = function(){

        var precototal = parseFloat(this.preco.replace("R$ ","").replace(",","."));

        console.log(this.adicionais);

        this.adicionais.forEach(el => {

            precototal += parseFloat(el.preco.replace(",",".").replace("R$",""));

        });

        //console.log(("R$ " + precototal.toString()).replace(".",","));

        this.stringPrecoTotal =  ("R$ " + precototal.toString()).replace(".",",");

    }

    this.stringAdicionais = function() {

        var stringFinal = "Sem Adicionais."

        /* this.adicionais.forEach(el => {

            stringFinal = stringFinal.concat(el.nome);
            stringFinal = stringFinal.concat(", ");

        }); */

        if (this.adicionais.length > 1) {
            stringFinal = "";
            for (let i = 0; i < this.adicionais.length; i++) {

                if (i < (this.adicionais.length - 1)) {
                    stringFinal = stringFinal.concat(this.adicionais[i].nome);
                }    
    
                if ((i+1) == (this.adicionais.length)) {
                    stringFinal = stringFinal.concat("e ");
                    stringFinal = stringFinal.concat(this.adicionais[this.adicionais.length-1].nome);
                    stringFinal = stringFinal.concat(".");
                    break;
                }
                stringFinal = stringFinal.concat(", ");
            }
            
        } else {
            
            stringFinal = this.adicionais[0].nome + ".";

        }
        console.log(stringFinal);

        this.stringAdicionaisGerado = stringFinal;

    }


}

function CarrinhoCompleto(){

    this.lanches = [];

    this.totalPrecoPedido = function (){

        var precoTotal = 0;
        var precoaux = "";
        

        this.lanches.forEach(lanche => {

            precoaux = lanche.preco.replace("R$ ","");
            precoaux = precoaux.replace(",",".");
            precoTotal += parseFloat(precoaux);

        });
        return precoTotal;
    }

    this.adicionaLanche = (lanche) => {

        this.lanches.push(lanche);
        //console.log(this.lanches);

    }

    this.excluiLanche = (itemIndex) => {

        //console.log(this.lanches);
        this.lanches.splice(itemIndex,1);

    }

    this.limpar = () => {

        this.lanches = [];

    }

    this.setLanches = (lanchesJson) =>{

        this.lanches = lanchesJson;

    }

}
//objetos -----------



var carrinhoCompleto;
var idLanche;

if(window.localStorage.getItem('carrinho')){

    carrinhoCompleto = new CarrinhoCompleto();
    carrinhoCompleto.setLanches(JSON.parse(window.localStorage.getItem('carrinho')).lanches);

} else {

    carrinhoCompleto = new CarrinhoCompleto();

}

if(window.localStorage.getItem('ID')){

    idLanche = parseInt(window.localStorage.getItem('ID'));

} else {

    idLanche = 0;
    window.localStorage.setItem('ID', idLanche.toString());

}

//funções
function adicionaCarrinho(nome, preco){

    var idLancheStored = parseInt(window.localStorage.getItem('ID'));
    var novoLanche = new LancheCarrinho(idLancheStored, nome, preco);
    //console.log(carrinhoCompleto);
    
    novoLanche.setObservacao("Sem Observações");
    novoLanche.custoTotalString();
    carrinhoCompleto.adicionaLanche(novoLanche);
    //console.log(carrinhoCompleto);

    window.localStorage.setItem('carrinho', JSON.stringify(carrinhoCompleto));
    idLanche++;
    window.localStorage.setItem('ID',idLanche);

}
function adcCarrinhoComAdicionais(el, nome, preco){

    
    var idLancheStored = parseInt(window.localStorage.getItem('ID'));

    const parentDivCheckBox = el.parentElement.parentElement;
    const childrenElements = parentDivCheckBox.children;
    const checkBoxsElements = childrenElements[0].querySelectorAll('input[type="checkbox"]');
    const textFieldElement = parentDivCheckBox.getElementsByTagName('textarea')[0];
    var novoLanche = new LancheCarrinho(idLancheStored, nome, preco);
    console.log(textFieldElement);

    if (checkBoxsElements.length > 0) {
        checkBoxsElements.forEach(checkBox => {

            if (checkBox.checked) {
                //console.log(JSON.parse(checkBox.value).nome);
                novoLanche.addAdicionais(checkBox.value);
    
            }
            
        });
    }
    novoLanche.setObservacao(textFieldElement.value);
    
    novoLanche.stringAdicionais();
    //console.log(novoLanche.adicionais);
    novoLanche.custoTotalString();

    //console.log(carrinhoCompleto);
    carrinhoCompleto.adicionaLanche(novoLanche);
    //console.log(carrinhoCompleto);

    window.localStorage.setItem('carrinho', JSON.stringify(carrinhoCompleto));
    idLanche++;
    window.localStorage.setItem('ID',idLanche);

    //console.log(novoLanche);
/* 
    novoLanche.custoTotalString();
    novoLanche.stringAdicionais(); */

}

function renderizaCarrinho(){
    
    const carrinhoElem = document.getElementById("carrinho");
    carrinhoElem.innerHTML = "";
    var carrinhoStored = "";
    var precoTotalElement = document.getElementById("precoTotal");
    var precoTotal = 0;

    if(window.localStorage.getItem('carrinho')){//se tiver algo no carrinho

        carrinhoStored = JSON.parse(window.localStorage.getItem('carrinho'));
        //console.log(carrinhoStored);
        carrinhoStored.lanches.forEach(lanche => {
            //console.log(lanche.id);
            carrinhoElem.innerHTML = carrinhoElem.innerHTML + `<article class="message is-dark"">
                                                    <div class="message-header is-flex">
                                                    <p>${lanche.nome}</p>
                                                    <span class="is-align-content-flex-end">${lanche.preco}</span>
                                                    <button class="delete" aria-label="delete" onclick="removeItemUnico(${lanche.id});"></button>
                                                    </div>
                                                    <div class="message-body ">
                                                    <p><strong>Adicional: </strong>${lanche.stringAdicionaisGerado}</p>
                                                    <p><strong>Observações:</strong> ${lanche.observacao}</p>
                                                    <p><strong>Total: </strong> ${lanche.stringPrecoTotal}</p>
                                                    </div>
                                                </article>`;
            precoTotal += parseFloat(lanche.stringPrecoTotal.replace("R$ ","").replace(",","."));
        });
        
        console.log(precoTotal);
        precoTotalElement.innerText ="R$ " + precoTotal.toString().replace(".",",");
    }
}

function removeItemUnico(idRemover){

    const index = carrinhoCompleto.lanches.map(lanche => lanche.id).indexOf(idRemover);
    //console.log(index);
    carrinhoCompleto.excluiLanche(index);
    //console.log(carrinhoCompleto);
    window.localStorage.setItem('carrinho', JSON.stringify(carrinhoCompleto));
    renderizaCarrinho();
}

function limpaCarrinho(){

    const carrinhoElem = document.getElementById("carrinho");
    var precoTotalElement = document.getElementById("precoTotal");
    var precoTotal = 0;
    precoTotalElement.innerText ="R$ " + precoTotal.toString().replace(".",",");
    carrinhoElem.innerHTML = "";
    window.localStorage.removeItem('carrinho');
    carrinhoCompleto.limpar();   
    idLanche = 0; 
    window.localStorage.setItem('ID',idLanche);

}
//Funções ------------
document.addEventListener('DOMContentLoaded', () => { 


});