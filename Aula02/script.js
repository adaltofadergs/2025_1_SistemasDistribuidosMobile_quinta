pessoa = {
    nome : "Maria" ,
    idade : 25 ,
    altura : 1.75 ,
    endereco  : null,
    formacoes : [ "Técnico", "Graduação" , "Mestrado"] ,
    anoDeFormacao : [ 2006 , 2013 , 2017 ] ,
    conjuge : {
        nome : "João" ,
        idade : 26
    },
    temFilhos : true ,
    filhos : [
        { nome : "Júlia" , idade : 16 } ,
        { nome : "Pedrinho" , idade : 5 } ,
    ] ,
    getAno : function(){
        return 2025 - this.idade
    }
}

function imprimir(){
    var divDados = document.getElementById("divDados")

    divDados.innerHTML = "Nome: " + pessoa.nome + "<br>Idade: " + pessoa.idade
    divDados.innerHTML += "<br>Formações: " 
    pessoa.formacoes.forEach( curso => {
        divDados.innerHTML += curso + " - "
    })
    divDados.innerHTML += "<br>Cônjuge: " + pessoa.conjuge.nome + " Idade: " + pessoa.conjuge.idade
    if( pessoa.temFilhos ){
        divDados.innerHTML += "<br>Tem filhos?: Sim " 

        pessoa.filhos.forEach( filho => {
            divDados.innerHTML += "<br>Nome: " + filho.nome + " Idade: " + filho.idade
        })

    }else{
        divDados.innerHTML += "<br>Tem filhos?: Não " 
    }
    divDados.innerHTML += "<br>Ano de nascimento: " + pessoa.getAno() 
}