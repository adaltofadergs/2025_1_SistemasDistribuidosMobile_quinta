<?php
    header("Content-type: application/json");
    $local = "localhost";
    $user = "root";
    $senha = "";
    $banco = "loja";

    if( isset( $_REQUEST["buscar"] )){
        try{
            $conn = mysqli_connect($local, $user, $senha, $banco);
            if( $conn ){
                $query = "SELECT * FROM produto ORDER BY nome";
                $result = mysqli_query( $conn , $query );
                $linhas = array();
                while( $row = mysqli_fetch_assoc( $result ) ){
                    $linhas[] = $row;
                }
                mysqli_close( $conn );
                echo ' { "produtos" : '.json_encode($linhas).'  } ';
            }else{
                // Mensagem de erro
                echo ' { "resposta" : "Erro ao conectar ao banco"  } ';
            }
        }catch( \Throwable $th){
            // Mensagem de erro
            echo ' { "resposta" : "Erro no servidor"  } ';
        } 
    }