//objetos
function LancheCarrinho(id, nome, preco, obs, adic){

    this.id = id;
    this.nome = nome;
    this.preco = preco;
    this.observacao = obs;
    this.adicionais = adic;


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
        console.log(this.lanches);

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
    console.log(carrinhoCompleto);
    carrinhoCompleto.adicionaLanche(new LancheCarrinho(idLancheStored, nome, preco, "", ""));
    console.log(carrinhoCompleto);

    window.localStorage.setItem('carrinho', JSON.stringify(carrinhoCompleto));
    idLanche++;
    window.localStorage.setItem('ID',idLanche);

}

function renderizaCarrinho(){
    
    const carrinhoElem = document.getElementById("carrinho");
    carrinhoElem.innerHTML = "";
    var carrinhoStored = "";

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
                                                    <p><strong>Adicional:</strong> Frango, maionese e Bacon.</p>
                                                    <p><strong>Observações:</strong> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est, nesciunt.</p>
                                                    </div>
                                                </article>`;
        });

    }
}

function removeItemUnico(idRemover){

    const index = carrinhoCompleto.lanches.map(lanche => lanche.id).indexOf(idRemover);
    console.log(index);
    carrinhoCompleto.excluiLanche(index);
    console.log(carrinhoCompleto);
    window.localStorage.setItem('carrinho', JSON.stringify(carrinhoCompleto));
    renderizaCarrinho();
}

function limpaCarrinho(){

    const carrinhoElem = document.getElementById("carrinho");
    carrinhoElem.innerHTML = "";
    window.localStorage.removeItem('carrinho');
    carrinhoCompleto.limpar();   
    idLanche = 0; 
    window.localStorage.setItem('ID',idLanche);

}
//Funções ------------
document.addEventListener('DOMContentLoaded', () => { 


});