<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");

include_once 'conexao.php';

$query = "SELECT id_funcionario, cpf_funcionario, nome_funcionario, email_funcionario, telefone_funcionario, endereco_funcionario
            FROM funcionarios
           WHERE id_empresa=:id
          ORDER BY nome_funcionario";

//$id = 1;
$id = filter_input(INPUT_GET, 'id');
$result = $conn->prepare($query);
$result->bindParam(':id', $id);
$result->execute();

while($row = $result->fetch(PDO::FETCH_ASSOC)){
    extract($row);
    $lista_result["records"][$id_funcionario] = [
        'id_funcionario' => $id_funcionario,
        'cpf_funcionario'     => $cpf_funcionario,
        'nome_funcionario'     => $nome_funcionario,
        'email_funcionario'    => $email_funcionario,
        'telefone_funcionario' => $telefone_funcionario,
        'endereco_funcionario' => $endereco_funcionario
    ];
}

http_response_code(200);
echo json_encode($lista_result);