
//objeto lanche
function Lanche(ativo ,cat, nome, preco, desc, ingred) {

    this.ativo = (ativo.v == "Sim") ? true : false;
    this.categoria = cat
    this.nome = nome;
    this.preco = preco;
    this.desc = desc;
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

const sheetID = "1xkdn7hRifJxXMjexXxCPMBpbPrMZnwbRC7Tth8RwTS0"
const url = "https://docs.google.com/spreadsheets/d/"
const query1 = `/gviz/tq?gid=990731362`

const endpoint1 = `${url}${sheetID}${query1}`;

console.log(endpoint1);

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
        var ativo = row.c[1];
        //var descr = row.c[5].v;
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

        var lanche = new Lanche(ativo ,categoria, nome, preco, "",listaIngred);
        listaDeLanches.push(lanche);
    });

    var columnWrapper = document.getElementsByClassName("column")[0];

    listaDeLanches.forEach(lanche => {

        if(lanche.ativo){

            var ingredTexto = lanche.ingredientesParaTexto()
            columnWrapper.innerHTML = columnWrapper.innerHTML + `<div class="tile is-ancestor box level mb-5">
                    <div class="tile is-parent">
                      <article class="tile is-child has-text-centered-mobile">
                        <figure class="image is-128x128 is-inline-block-mobile">
                            <img src="https://bulma.io/images/placeholders/128x128.png">
                          </figure>
                      </article>
                    </div>
                    <div class="tile is-parent is-10">
                      <article class="tile is-child">
                        <p class="title">${lanche.nome}</p>
                        <p class="subtitle">${lanche.preco}</p>
                        <div class="content">
                          <p>${ingredTexto}</p>
                        </div>
                      </article>
                    </div>
                    <div class="tile is-parent">
                      <div class="tile is-child">
                        <p class="buttons">
                          <div class="button has-background-primary-dark" onclick="adicionaCarrinho('${lanche.nome}','${lanche.preco}');">
                            <span class="icon is-small">
                              <i class="fas fa-cart-plus has-text-white"></i>
                            </span>
                          </div>
                        </p>
                      </div>
                    </div>
                 </div>` 
        }

    });
    
});


document.addEventListener('DOMContentLoaded', () => {
    

});