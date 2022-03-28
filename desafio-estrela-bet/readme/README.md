PROJETO DESAFIO DESENVOLVEDOR FULL-STACK  - ESTRELABET

Linguagens utilizadas => 
  - Front-End: Html, Css, JS (Utilizado framework react para implementação do front-end, utilizando as respectivas bibliotecas: Material    UI, ReactRouter, ReactIcons)
  - Back-End: Php
  - Database: MySQL com servidor WampServer


Como foi desenvolvido => 
  - No back-end, foi criado uma API, onde cada tela representa uma funcionalidade endpoint para ser consumida pelo front-ent. Os endpoints à serem consumidos são: 'visualizar empresa', 'index' (listar empresas), 'editar empresa', 'deletar empresa', 'criar empresa', 'visualizar funcionario', 'listar funcionario', 'editar funcionario', 'deletar funcionario', 'criar funcionario'. 

  - Foram realizadas criações de duas tabelas via banco de dados MYSQL (empresas e funcionarios). A tabela funcionarios tem como FK a tabela de empresas, unindo pelo ID. 
  
  - O servidor está rodando localmente, pelo WampServer. 

  - No front-end, na pasta 'src', o arquivo 'index.js' renderiza o 'App.js', que por sua vez, possuí todas as rotas criadas para o funcionamento completo do sistema. Dentro da pasta 'src', se encontra a pasta 'pages', e dentro dela, cada tela renderizada possuí uma pasta prória, para melhor entendimento e organização do sistema. 
    Cada pasta própria, possuí o respectivo 'index.js', que será renderizado conforme a rota chamada. Cada um desses 'index.js', possuí as importações necessárias para o funcionamento completo do sistema. 



Como rodas o projeto => 
   - É necessária a instalação do WampServer, rodando o MYSQL na porta 3306
   - Extrair o arquivo Projects dentro da pasta 'www' do WampServer, para conseguir rodar localmente. Ex: C:\wamp64\www\Projects
   - O arquivo extrela_bet.sql já contém os comandos de banco de dados para conseguir importar no WampServer. 
   - Extrair o arquivo 'Projeto Estrela Bet' para qualquer diretório. 
   - Abrir o prompt de comando no diretório escolhido acima, e rodar o comando 'npm start' ou 'yarn start' (É necessário que tenha o node.js instalado). 
   - No diretório 'readme > imgs' estão imagens de como o sistema deve aparentar. 