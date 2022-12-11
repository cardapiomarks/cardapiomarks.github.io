
//objeto lanche
function Lanche(categoriaAtiva,ingredientesAtivo ,cat, nome, preco, imgUrl, ingred) {

    this.ativo = ((categoriaAtiva.v == "Sim") && (ingredientesAtivo.v == "Sim")) ? true : false;
    this.categoria = cat
    this.nome = nome;
    this.preco = preco;
    this.imgUrl = imgUrl;
    this.ingredientes = ingred;


    this.ingredientesParaTexto = function(){

        var textoIngredientes="";

        this.ingredientes.forEach(el => {
            
            textoIngredientes = textoIngredientes.concat(el);
            textoIngredientes = textoIngredientes.concat(", ");
            //console.log(el);

        });

        textoIngredientes = textoIngredientes.substring(0,textoIngredientes.length-2)+".";


        //console.log(textoIngredientes);

        return textoIngredientes;

    }

    

}

//busca adicionais

function getAdicionaisPlanilha(){

  const sheetID = "1xkdn7hRifJxXMjexXxCPMBpbPrMZnwbRC7Tth8RwTS0"
  const url = "https://docs.google.com/spreadsheets/d/"
  const query1 = `/gviz/tq?gid=1343709077`

  const endpoint1 = `${url}${sheetID}${query1}`;
  
  var adicionaisElement = "";

  //console.log(endpoint1);

  fetch(endpoint1)
  .then(response => response.text())
  .then(data => {

    //console.log(data);
    const temp = data.substring(47).slice(0,-2);
    //console.log(temp);
    const json = JSON.parse(temp);
    //console.log(json);
    const rows = json.table.rows;
    //console.log(rows);
    const dropWrapper = document.getElementsByClassName("dropWrapper");

    //console.log(dropWrapper);

    rows.forEach(element => {

      if (element.c[7] != null && element.c[8] != null && element.c[9] != null) {
        //significa que tem todas as informações do adicional
        if(element.c[8].v != "Não"){
          //significa que o adicional está disponível e pode aparecer para o cliente
          //console.log(element.c[7].v);

          adicionaisElement = adicionaisElement + `<label class="checkbox is-flex is-justify-content-space-between">
          <input type="checkbox" value='{"nome": "${element.c[7].v}", "preco": "${element.c[9].v}"}'>
          <span class="ml-1">${element.c[7].v}</span>
          <span class=" ml-auto">${element.c[9].f}</span>
        </label>`;

        

        }
      }

    });

    for (let i = 0; i < dropWrapper.length; i++) {
      dropWrapper[i].innerHTML = adicionaisElement;
      
    }
  });
 

}

const sheetID = "1xkdn7hRifJxXMjexXxCPMBpbPrMZnwbRC7Tth8RwTS0"
const url = "https://docs.google.com/spreadsheets/d/"
const query1 = `/gviz/tq?gid=990731362`

const endpoint1 = `${url}${sheetID}${query1}`;

console.log(endpoint1);

getAdicionaisPlanilha();

fetch(endpoint1)
.then(response => response.text())
.then(data => {

    //console.log(data);
    const temp = data.substring(47).slice(0,-2);
    //console.log(temp);
    const json = JSON.parse(temp);
    //console.log(json);
    const rows = json.table.rows;
    //console.log(rows);
    var listaDeLanches = [];

    rows.forEach(row => {
        
        var i = 6;
        var listaIngred = [];
        var categoria = row.c[2].v;
        var nome = row.c[3].v;
        var preco = row.c[4].f;
        var categoriaAtiva = row.c[1];
        var ingredientesAtivo = row.c[0];
        var imgUrl = row.c[5].v;
        //console.log(row.c[2].v);//Categoria
        //console.log(row.c[3].v);//Nome
        //console.log(row.c[4].f);//Preço
        //console.log(row.c[5].v);//Descrição

        //A partir daqui é a lista de ingredientes.
        while(row.c[i]){
            
            listaIngred.push(row.c[i].v);
            //console.log(row.c[i].v);
            i++;
        }
        //console.log(listaIngred);

        var lanche = new Lanche(categoriaAtiva,ingredientesAtivo ,categoria, nome, preco, imgUrl,listaIngred);
        listaDeLanches.push(lanche);
    });

    var columnWrapper = document.getElementsByClassName("column")[0];

    listaDeLanches.forEach(lanche => {

        if(lanche.ativo){

            var ingredTexto = lanche.ingredientesParaTexto()
            columnWrapper.innerHTML = columnWrapper.innerHTML + `
                 <div class="tile is-ancestor box level mb-5 lanches">
                    <div class="tile is-parent">
                      <article class="tile is-child has-text-centered-mobile">
                        <figure class="image is-inline-block-mobile" >
                            <img class="is-rounded" src="${lanche.imgUrl}">
                          </figure>
                      </article>
                    </div>
                    <div class="tile is-parent is-8 is-flex is-align-items-center">
                      <article class="tile is-child">
                        <p class="title titulo-lanche mb-5">
  
                        <span class="icon">
                          <i class="fa-solid fa-burger"></i>
                        </span>
                      ${lanche.nome}</p>
                        <p class="subtitle preco-lanche mb-1">
                          

                          ${lanche.preco}
                        </p>
                        <div class="content ingredientes-lanche">
                          <p>
                          <span class="icon">
                            <i class="fa-solid fa-utensils"></i>
                          </span>${ingredTexto}
                          <span class="icon">
                            <i class="fa-solid fa-utensils"></i>
                          </span></p>
                        </div>
                      </article>
                    </div>
                    
                    <div class="tile is-parent is-flex is-align-items-center ">
                      <div class="tile is-child is-flex is-flex-direction-column">
                        <div class="dropdown is-justify-content-center" style="height: 40px;width: 100%;">
                          <div class="dropdown-trigger" onclick="activateDrop(this);" style="height: 40px;width: 100%;"  >
                            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu2" style="width: 100%;">
                              <span>Adicionais e Observação</span>
                              <span class="icon is-small">
                                <i class="fas fa-angle-down" aria-hidden="true"></i>
                              </span>
                            </button>
                          </div>
                          <div class="dropdown-menu" id="dropdown-menu2" role="menu" style="width: 100%;">
                            <div class="dropdown-content">
                              <div class="dropdown-item dropWrapper">
                                
                                
                              </div>
                              <hr class="dropdown-divider">
                              <div class="dropdown-item">
                                <textarea class="textarea is-primary" rows="2" placeholder="Observações?"></textarea>
                              </div>
                              <div class="is-flex is-justify-content-center">
                                <button class="button is-success" onclick="adcCarrinhoComAdicionais(this, '${lanche.nome}', '${lanche.preco}' )">Adicionar ao Carrinho</button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p class="buttons">
                          <div class="button has-background-danger-dark	" onclick="adicionaCarrinho('${lanche.nome}','${lanche.preco}');">
                            <span class="icon is-small">
                              <i class="fas fa-cart-plus has-text-white"></i>
                            </span>
                          </div>
                        </p>
                        
                      </div>
                    </div>
                 </div>
                 
                 ` 
        }
        
    });
    
    getAdicionaisPlanilha();
});


document.addEventListener('DOMContentLoaded', () => {
    

});