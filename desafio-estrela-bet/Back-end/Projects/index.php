<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");

include_once 'conexao.php';

$query = "SELECT id, cnpj_empresa, nome_empresa, email_empresa, telefone_empresa, endereco_empresa
            FROM empresas
          ORDER BY nome_empresa";

$result = $conn->prepare($query);
$result->execute();

while($row = $result->fetch(PDO::FETCH_ASSOC)){
    extract($row);
    $lista_result["records"][$id] = [
        'id' => $id,
        'cnpj_empresa'     => $cnpj_empresa,
        'nome_empresa'     => $nome_empresa,
        'email_empresa'    => $email_empresa,
        'telefone_empresa' => $telefone_empresa,
        'endereco_empresa' => $endereco_empresa
    ];
}

http_response_code(200);
echo json_encode($lista_result);