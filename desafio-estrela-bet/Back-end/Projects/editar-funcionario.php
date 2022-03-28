<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");

include_once 'conexao.php';

$response_json = file_get_contents("php://input");
$dados = json_decode($response_json, true);

if($dados){
    $query = "UPDATE funcionarios 
                SET nome_funcionario= :nome_funcionario, 
                    cpf_funcionario= :cpf_funcionario, 
                    email_funcionario= :email_funcionario,
                    telefone_funcionario= :telefone_funcionario,
                    endereco_funcionario= :endereco_funcionario 
                WHERE id_funcionario= :id";

    
    $editar_funcionario = $conn->prepare($query);

    $editar_funcionario->bindParam(':nome_funcionario', $dados['nome_funcionario'], PDO::PARAM_STR);
    $editar_funcionario->bindParam(':cpf_funcionario', $dados['cpf_funcionario'], PDO::PARAM_STR);
    $editar_funcionario->bindParam(':email_funcionario', $dados['email_funcionario'], PDO::PARAM_STR);
    $editar_funcionario->bindParam(':telefone_funcionario', $dados['telefone_funcionario'], PDO::PARAM_STR);
    $editar_funcionario->bindParam(':endereco_funcionario', $dados['endereco_funcionario'], PDO::PARAM_STR);
    $editar_funcionario->bindParam(':id', $dados['id'], PDO::PARAM_INT);

    $editar_funcionario->execute();
        $response = [
            "erro" => false,
            "msg"  => "Funcionário editado com sucesso!"
        ];
}

else{
    $response = [
        "erro" => true,
        "msg"  => "Falha ao editar o funcionário!"
    ];
}

http_response_code(200);
echo json_encode($response);