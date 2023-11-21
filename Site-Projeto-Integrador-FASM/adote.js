document.addEventListener("DOMContentLoaded", function(){
	document.getElementById("btn-finalizar").addEventListener("click", function(){ 
        // redireciona
        window.location.href = 'https://wa.me/5532984355406?text=' 
             + itens.replaceAll('<br>', '%0A') 
             + '%0A*Total: ' 
             + document.getElementById("total").innerHTML 
             + '*';
    });


});