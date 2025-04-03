function lerXML(){
    var req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200){
            txt = this.responseText + "<hr>";
            var dadosXML = this.responseXML;
            var marcas = dadosXML.getElementsByTagName("marca");
            txt += "Marca: " + marcas[0].childNodes[0].nodeValue;
            txt += "<br>Modelo: " + dadosXML.getElementsByTagName("modelo")[0].childNodes[0].nodeValue
            txt += "<br>Cores: ";
            var tagCores = dadosXML.getElementsByTagName("cores");
            var cores =tagCores[0].getElementsByTagName("cor");
            for( i = 0; i < cores.length ; i++){
                txt += cores[i].childNodes[0].nodeValue + " - ";
            }
            var tagOpcionais = dadosXML.getElementsByTagName("opcionais");
            var opcionais = tagOpcionais[0].getElementsByTagName("opcional");
            txt += "<br>Opcionais: ";
            for( i = 0; i < opcionais.length ; i++){
                nome = opcionais[i].getElementsByTagName("nome")[0].childNodes[0].nodeValue
                marca = opcionais[i].getElementsByTagName("marca")[0].childNodes[0].nodeValue

                txt += "<br> " + nome + " - Marca: " + marca;
            }
            document.getElementById("divXML").innerHTML = txt;
        }
    }
    req.open( "GET" , "dados.xml" , true );
    req.send();

}