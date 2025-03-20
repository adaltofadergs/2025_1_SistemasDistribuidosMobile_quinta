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


    if( isset( $_REQUEST["inserir"] )){
        try{
            $conn = mysqli_connect($local, $user, $senha, $banco);
            if( $conn ){

                $nome = $_POST["name"];
                $preco = $_POST["price"];

                $query = "INSERT INTO produto ( nome , preco ) VALUES ( '$nome' , $preco ) ";

                mysqli_query( $conn , $query );
                $id = mysqli_insert_id( $conn );
                
                mysqli_close( $conn );

                echo ' { "id" : '.$id.'  } ';

            }else{
                // Mensagem de erro
                echo ' { "resposta" : "Erro ao conectar ao banco"  } ';
            }
        }catch( \Throwable $th){
            // Mensagem de erro
            echo ' { "resposta" : "Erro no servidor"  } ';
        } 
    }

    if( isset( $_REQUEST["excluir"] )){
        try{
            $conn = mysqli_connect($local, $user, $senha, $banco);
            if( $conn ){

                $id = $_GET["id"];
               
                $query = "DELETE FROM produto WHERE  id = $id ";

                mysqli_query( $conn , $query );
                
                mysqli_close( $conn );

                echo ' { "resposta" : "Produto excluído com sucesso!"  } ';
                
            }else{
                // Mensagem de erro
                echo ' { "resposta" : "Erro ao conectar ao banco"  } ';
            }
        }catch( \Throwable $th){
            // Mensagem de erro
            echo ' { "resposta" : "Erro no servidor"  } ';
        } 
    }