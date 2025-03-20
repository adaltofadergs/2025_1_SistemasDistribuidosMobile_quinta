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


function excluir( id ){
    var req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200){       
            objJSON = JSON.parse( this.responseText );
            if( objJSON.resposta ){
                alert( objJSON.resposta );
                lerProdutos();
            }
        }
    }
    req.open( "GET" , "servidor.php?excluir&id=" + id , true );
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
                txt +=   '   <th>Preço</th> ';
                txt +=   '   <th>Excluir</th> ';
                txt +=   '</tr> ';
                produtos = objJSON.produtos;
                produtos.forEach( prod => {
                    txt += '<tr> ';
                    txt += '    <td>' + prod.id + '</td>';
                    txt += '    <td>' + prod.nome + '</td>';
                    txt += '    <td>' + prod.preco + '</td>';
                    txt += '    <td> <button onclick="excluir(' + prod.id + ')"> X </button></td>';
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


function cadastrar(){
    txtNome = document.getElementById("txtNome");
    nome = txtNome.value;
    if( nome == "" ){
        alert("O NOME deve ser preenchido!");
    }else{ 
        txtPreco = document.getElementById("txtPreco");
        preco = txtPreco.value;
        preco = preco.replace( "," , "." )
        if( preco == "" ) preco = 0.0;

        var req = new XMLHttpRequest();
        req.onreadystatechange = function(){
            if( this.readyState == 4 && this.status == 200){       
                objJSON = JSON.parse( this.responseText );
                if( objJSON.resposta ){
                    alert( objJSON.resposta );
                }else{
                    alert( "ID gerado: " + objJSON.id);
                    lerProdutos();
                    txtNome.value = "";
                    txtPreco.value = "";
                }
            }
        }
        req.open( "POST" , "servidor.php?inserir" , true );
        req.setRequestHeader( "Content-type" , "application/x-www-form-urlencoded" );
        req.send("name=" + nome + "&price=" + preco );
    }
}

