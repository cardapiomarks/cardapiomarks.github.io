

function msgPedido() {

    var carrinhoStored = "";

    if(window.localStorage.getItem('carrinho')){//se tiver algo no carrinho

        carrinhoStored = JSON.parse(window.localStorage.getItem('carrinho'));
        var nomeCliente = document.getElementById("nomeCliente");
        //console.log(carrinhoStored);

        //console.log(carrinhoStored);

        var initMsg = ""
        var prelink = "https://wa.me/55";

        var result = ""; 
        var msg = "";
        var precoTotal = 0;

        
        carrinhoStored.lanches.forEach(element => {
            
            console.log(element);
            //prelink + String(62982723635) + "?text=" + String(texto.value).replaceAll(" ","%20");
            if(element.observacao == "Sem Observações" && element.stringAdicionaisGerado == ""){
                //Sem adicionais ou observações
                msg = msg.concat("%0A----%0A");
                msg = msg.concat(`*${element.nome}%0A*`);
                

            } else if(element.observacao == "Sem Observações"){
                //Possui apenas adicionais
                msg = msg.concat("%0A----%0A");
                msg = msg.concat(`*${element.nome}%0A*`);
                msg = msg.concat(`Com estes adicionais: ${element.stringAdicionaisGerado}%0A`);

            } else if(element.stringAdicionaisGerado == ""){
                //Possui apenas obsevação
                msg = msg.concat("%0A----%0A");
                msg = msg.concat(`*${element.nome}%0A*`);
                msg = msg.concat(`Observações: ${element.observacao}%0A`);

            } else {
                //Possui adicionais e observações
                msg = msg.concat("%0A----%0A");
                msg = msg.concat(`*${element.nome}%0A*`);
                msg = msg.concat(`Com estes adicionais: ${element.stringAdicionaisGerado}%0A`);
                msg = msg.concat(`Observações: ${element.observacao}%0A`);


            }
            precoTotal += parseFloat(element.stringPrecoTotal.replace("R$ ","").replace(",","."));
        });

        
        

        if (nomeCliente.value != "") {
            //Realiza pedido
            initMsg = `Olá, tudo bem?%0AMeu nome é *${nomeCliente.value}* gostaria de fazer o seguinte pedido:%0A`;
            result = (prelink + String(62982723635) + "?text=" + initMsg + String(msg));
            result = result.concat("%0ATotal do meu pedido: " + "R$ " + precoTotal.toString().replace(".",",")).replaceAll(" ","%20");
            //console.log(result);
            window.open(result);
        } else {

            alert("Por favor, digite seu nome.")

        }

    } else {

        alert("Carrinho vazio... Por favor, adicione algo antes de realizar o pedido.");

    }
    
}