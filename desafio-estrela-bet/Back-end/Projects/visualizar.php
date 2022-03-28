<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");

include_once 'conexao.php';

$query = "SELECT id, cnpj_empresa, nome_empresa, email_empresa, telefone_empresa, endereco_empresa
            FROM empresas
           WHERE id=:id
          ORDER BY nome_empresa";

$id = filter_input(INPUT_GET, 'id');
//$id = 1;
$result = $conn->prepare($query); 
$result->bindParam(':id', $id);
$result->execute();


$row = $result->fetch(PDO::FETCH_ASSOC);
extract($row);
$response = [
    'id' => $id,
    'cnpj_empresa'     => $cnpj_empresa,
    'nome_empresa'     => $nome_empresa,
    'email_empresa'    => $email_empresa,
    'telefone_empresa' => $telefone_empresa,
    'endereco_empresa' => $endereco_empresa
];

http_response_code(200);
echo json_encode($response);