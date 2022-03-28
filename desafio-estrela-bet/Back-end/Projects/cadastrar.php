<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");

include_once 'conexao.php';

$response_json = file_get_contents("php://input");
$dados = json_decode($response_json, true);

if($dados){

    $query = "INSERT INTO empresas (nome_empresa, cnpj_empresa, email_empresa, telefone_empresa, endereco_empresa)
              VALUES (:nome_empresa, :cnpj_empresa, :email_empresa, :telefone_empresa, :endereco_empresa)";

    $cadastrarEmpresa = $conn->prepare($query);
    
    $cadastrarEmpresa->bindParam(':nome_empresa', $dados['empresa']['nome_empresa'], PDO::PARAM_STR);
    $cadastrarEmpresa->bindParam(':cnpj_empresa', $dados['empresa']['cnpj_empresa'], PDO::PARAM_STR);
    $cadastrarEmpresa->bindParam(':email_empresa', $dados['empresa']['email_empresa'], PDO::PARAM_STR);
    $cadastrarEmpresa->bindParam(':telefone_empresa', $dados['empresa']['telefone_empresa'], PDO::PARAM_STR);
    $cadastrarEmpresa->bindParam(':endereco_empresa', $dados['empresa']['endereco_empresa'], PDO::PARAM_STR);

    $cadastrarEmpresa->execute();

    if($cadastrarEmpresa->rowCount()){
        $response = [
            "erro" => false,
            "msg"  => "Empresa cadastrada com sucesso!"
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