<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");

include_once 'conexao.php';

$response_json = file_get_contents("php://input");
$dados = json_decode($response_json, true);

if($dados){

    $query = "INSERT INTO funcionarios (nome_funcionario, cpf_funcionario, email_funcionario, telefone_funcionario, endereco_funcionario, id_empresa)
              VALUES (:nome_funcionario, :cpf_funcionario, :email_funcionario, :telefone_funcionario, :endereco_funcionario, :id_empresa)";

    $cadastrarFuncionario = $conn->prepare($query);
    
    $cadastrarFuncionario->bindParam(':nome_funcionario', $dados['funcionario']['nome_funcionario'], PDO::PARAM_STR);
    $cadastrarFuncionario->bindParam(':cpf_funcionario', $dados['funcionario']['cpf_funcionario'], PDO::PARAM_STR);
    $cadastrarFuncionario->bindParam(':email_funcionario', $dados['funcionario']['email_funcionario'], PDO::PARAM_STR);
    $cadastrarFuncionario->bindParam(':telefone_funcionario', $dados['funcionario']['telefone_funcionario'], PDO::PARAM_STR);
    $cadastrarFuncionario->bindParam(':endereco_funcionario', $dados['funcionario']['endereco_funcionario'], PDO::PARAM_STR);
    $cadastrarFuncionario->bindParam(':id_empresa', $dados['id']);

    $cadastrarFuncionario->execute();

    if($cadastrarFuncionario->rowCount()){
        $response = [
            "erro" => false,
            "msg"  => "Funcionário cadastrado com sucesso!"
        ];
    }

}
else{
    $response = [
        "erro" => true,
        "msg"  => "Faltam dados para o cadastro!"
    ];
}

http_response_code(200);
echo json_encode($response);