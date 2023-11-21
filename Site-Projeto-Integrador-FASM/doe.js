document.addEventListener("DOMContentLoaded", function(){

    
    let botoes = document.querySelectorAll(".btn-adicionar");

 
    botoes.forEach(function(botao){

       
        botao.addEventListener("click", function(btn){

      
            let itens = "";

            let total = 0;

            let texto = botao.textContent;

          
            let inputQuantidade = botao.parentNode.parentNode
                .querySelector(".quantidade");

            if (texto === "Adicionar") {

     
                botao.textContent = "Remover";

                inputQuantidade.value.trim() === "" ? inputQuantidade.value = 1 : "";
                
            } else {

 
                botao.textContent = "Adicionar";

              
                inputQuantidade.value = "";
            }

           
            let produtos = document.querySelectorAll(".produto");


            produtos.forEach(function(produto){

               
                let nome = produto.getAttribute("data-nome");

                
                let preco = parseFloat(produto.getAttribute("data-preco"));

  
                let quantidade = parseFloat(
                    produto.children[2].querySelector(".quantidade").value
                );

              
                let textoBotao = produto.children[2]
                    .querySelector(".btn-adicionar").textContent;

                
                if (textoBotao === "Remover") {

                    total += preco * quantidade;

                    let subtotal = preco * quantidade;

                    itens += quantidade + " - " + nome + " x " + preco.toFixed(2)
                        + " = R$ " +  subtotal + "<br>";
                }
            });

            document.getElementById("carrinho").innerHTML = itens;

            document.getElementById("total").innerHTML = "R$ " + total.toFixed(2);

            // caso tenha algum item selecionado
            if (total > 0) {
                document.getElementById("btn-finalizar").style.display = "block";
            } else {
                document.getElementById("btn-finalizar").style.display = "none";
            }
        });
        

        let quantidades = document.querySelectorAll(".quantidade");

        quantidades.forEach(function(input){

            input.addEventListener("change", function(){
                
                let botao = input.parentNode.parentNode.querySelector(".btn-adicionar");

                if (input.value > 0) {
                    botao.textContent = "Adicionar";
                } else {
                    botao.textContent = "Remover";
                }
                botao.click();
            });
        });
    });


    // ação de clique no botão finalizar
    document.getElementById("btn-finalizar").addEventListener("click", function(){
        // limpa o conteúdo da div qrcode
        document.getElementById("qrcode").innerHTML = "";

        // determina o valor da doação
        let total = document.getElementById("total").innerHTML.replace("R$ ", "");

        // cria um objeto da classe Pix disponível no arquivo montapix.js
        let px = new Pix(
            'ajudapetmuriae@gmail.com', 'Doe para esse pobre', 'Vinicius S Monteiro', 'MURIAE', '***', total
        );

        // cria um qrcode com base na string do pix copia e cola
        new QRCode(
            document.getElementById("qrcode"), px.getPayload()
        );
    });
});