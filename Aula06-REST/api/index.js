var express = require("express");
var http = require("http");
var mysql = require("mysql");

var conn = mysql.createConnection( {
    host : "localhost" ,
    user : "root" ,
    password : "" ,
    database : "loja"
});

try{
    if( conn.state != "authenticated"){
        conn.connect( function(erro) {
            if( erro ){
                console.log( erro )
            }
        } );
    }
}catch(error){
    console.log( error )
}

var app = express();

app.get( "/"  , (req, res) => { 
    res.status( 200 ).send( "Bem-vindo(a) à nossa API REST" );
});

app.get( "/produto"  , (req, res) => { 
    res.statusCode = 200;
    res.setHeader('Content-type' , 'application/json' );
    var sql = 'SELECT * FROM produto ORDER BY nome';
    conn.query( sql , function( err, result, fields ){
        if( err ){
            res.send( ' { "resposta" : "Erro executar a consulta"  } ' )
        }else{
            res.send( JSON.stringify( result ) );
        }
    } );
});

//Exercício: Criar no banco de dados a tabela cliente
// que deve conter as colunas id, nome, altura
// criar um endpoint para retornar os clientes ordenados pela altura

http.createServer(app).listen( 8001 , ()=>{
    console.log( 'Servidor iniciado em http://localhost:8001' );
} );