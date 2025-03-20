function lerJSON(){

    var req = new XMLHttpRequest();

    req.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200){
            var objJSON = JSON.parse( this.responseText );
            var conteudo = "Marca: " + objJSON.marca;
            conteudo += "<br>Modelo: " + objJSON.modelo;
            conteudo += "<br>Cores: ";
            objJSON.cor.forEach( color => {
                conteudo += color + " - ";
            });
            conteudo += "<br>Opcionais: ";
            objJSON.opcionais.forEach( op => {
                conteudo += "<br>Nome: " + op.nome + " | Marca: " + op.marca;
            });
            document.getElementById("divJSON").innerHTML = conteudo;
        }
    }

    req.open( "GET" , "dados.json" , true );
    req.send();

}


function lerProdutos(){
    var req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200){       
            objJSON = JSON.parse( this.responseText );
            if( objJSON.resposta ){
                alert( objJSON.resposta );
            }else{
                txt = '<table border="1"> ';
                txt +=   '<tr> ';
                txt +=   '   <th>Id</th> ';
                txt +=   '   <th>Nome</th> ';
                txt +=   '   <th>Preco</th> ';
                txt +=   '</tr> ';
                produtos = objJSON.produtos;
                produtos.forEach( prod => {
                    txt += '<tr> ';
                    txt += '    <td>' + prod.id + '</td>';
                    txt += '    <td>' + prod.nome + '</td>';
                    txt += '    <td>' + prod.preco + '</td>';
                    txt += '</tr> ';
                });
                txt += '</table> ';
                document.getElementById("divProdutos").innerHTML = txt;
            }
        }
    }
    req.open( "GET" , "servidor.php?buscar" , true );
    req.send();
}

