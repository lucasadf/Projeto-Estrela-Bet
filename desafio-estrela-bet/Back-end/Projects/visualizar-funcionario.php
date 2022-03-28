<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");

include_once 'conexao.php';

$query = "SELECT id_funcionario, cpf_funcionario, nome_funcionario, email_funcionario, telefone_funcionario, endereco_funcionario, id_empresa
            FROM funcionarios
           WHERE id_funcionario=:id
          ORDER BY nome_funcionario";

$id = filter_input(INPUT_GET, 'id');
//$id = 1;
$result = $conn->prepare($query); 
$result->bindParam(':id', $id);
$result->execute();


$row = $result->fetch(PDO::FETCH_ASSOC);
extract($row);
$response = [
    'id_funcionario'       => $id,
    'cpf_funcionario'      => $cpf_funcionario,
    'nome_funcionario'     => $nome_funcionario,
    'email_funcionario'    => $email_funcionario,
    'telefone_funcionario' => $telefone_funcionario,
    'endereco_funcionario' => $endereco_funcionario,
    'id_empresa'           => $id_empresa
];

http_response_code(200);
echo json_encode($response);