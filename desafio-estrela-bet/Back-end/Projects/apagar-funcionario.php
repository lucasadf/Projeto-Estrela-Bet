<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");

include_once 'conexao.php';

$id = filter_input(INPUT_GET, "id", FILTER_SANITIZE_NUMBER_INT);

$response = "";

$queryRemoverFuncionarios = "DELETE FROM funcionarios WHERE id_funcionario=:id";
$remove_funcionarios = $conn->prepare($queryRemoverFuncionarios);
$remove_funcionarios->bindParam(':id', $id, PDO::PARAM_INT);

if($remove_funcionarios->execute()){
    $response = [
        "erro" => false,
        "msg"  => "Funcionário removido com sucesso!"
    ];
}
else{
    $response = [
        "erro" => true,
        "msg"  => "Falha ao remover funcionário!"
    ];
}


http_response_code(200);
echo json_encode($response);