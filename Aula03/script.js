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

        }
    }

    req.open( "GET" , "dados.json" , true );
    req.send();

}