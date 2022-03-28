<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");

include_once 'conexao.php';

$response_json = file_get_contents("php://input");
$dados = json_decode($response_json, true);

if($dados){
    $query = "UPDATE empresas 
                SET nome_empresa= :nome_empresa, 
                    cnpj_empresa= :cnpj_empresa, 
                    email_empresa= :email_empresa,
                    telefone_empresa= :telefone_empresa,
                    endereco_empresa= :endereco_empresa 
                WHERE id= :id";

    
    $editar_empresa = $conn->prepare($query);

    $editar_empresa->bindParam(':nome_empresa', $dados['nome_empresa'], PDO::PARAM_STR);
    $editar_empresa->bindParam(':cnpj_empresa', $dados['cnpj_empresa'], PDO::PARAM_STR);
    $editar_empresa->bindParam(':email_empresa', $dados['email_empresa'], PDO::PARAM_STR);
    $editar_empresa->bindParam(':telefone_empresa', $dados['telefone_empresa'], PDO::PARAM_STR);
    $editar_empresa->bindParam(':endereco_empresa', $dados['endereco_empresa'], PDO::PARAM_STR);
    $editar_empresa->bindParam(':id', $dados['id'], PDO::PARAM_INT);

    $editar_empresa->execute();
        $response = [
            "erro" => false,
            "msg"  => "Empresa editada com sucesso!"
        ];
}

else{
    $response = [
        "erro" => true,
        "msg"  => "Falha ao editar a empresa!"
    ];
}

http_response_code(200);
echo json_encode($response);