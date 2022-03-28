-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 28-Mar-2022 às 16:12
-- Versão do servidor: 5.7.36
-- versão do PHP: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `estrela_bet`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `empresas`
--

DROP TABLE IF EXISTS `empresas`;
CREATE TABLE IF NOT EXISTS `empresas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cnpj_empresa` varchar(220) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nome_empresa` varchar(220) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_empresa` varchar(220) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefone_empresa` varchar(220) COLLATE utf8mb4_unicode_ci NOT NULL,
  `endereco_empresa` varchar(220) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `empresas`
--

INSERT INTO `empresas` (`id`, `cnpj_empresa`, `nome_empresa`, `email_empresa`, `telefone_empresa`, `endereco_empresa`) VALUES
(1, '11.222.333/0001-44', 'Estrela Bet', 'estrelabet@gmail.com', '(31) 9999-9999', 'Rua Pernambuco, 444'),
(15, '11.222.333/0001-55', 'Teste nova empresa', 'testenovaempresa@gmail.com', '(55) 8888-8888', 'EndereÃ§o empresa, nÃºmero 59');

-- --------------------------------------------------------

--
-- Estrutura da tabela `funcionarios`
--

DROP TABLE IF EXISTS `funcionarios`;
CREATE TABLE IF NOT EXISTS `funcionarios` (
  `id_funcionario` int(11) NOT NULL AUTO_INCREMENT,
  `cpf_funcionario` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome_funcionario` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_funcionario` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefone_funcionario` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `endereco_funcionario` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_empresa` int(11) NOT NULL,
  PRIMARY KEY (`id_funcionario`),
  KEY `fk_id` (`id_empresa`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `funcionarios`
--

INSERT INTO `funcionarios` (`id_funcionario`, `cpf_funcionario`, `nome_funcionario`, `email_funcionario`, `telefone_funcionario`, `endereco_funcionario`, `id_empresa`) VALUES
(1, '154.151.451-62', 'JoÃ£o Fernandes', 'joaofernandes@hotmail.com', '(31) 9888-4432', 'rua paracatÃº, 601, apt 301', 1),
(7, '432.685.695-55', 'Caio Rocha', 'caio.rocha@gmail.com', '(55) 9543-5356', 'rua fernandes tourinho 649, apartamento 606', 15),
(10, '123.465.464-77', 'Fernanda Silva', 'fernandasilva@gmail.com', '(31) 7738-9430', 'rua alberto cintra, 325', 1);

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `funcionarios`
--
ALTER TABLE `funcionarios`
  ADD CONSTRAINT `fk_id` FOREIGN KEY (`id_empresa`) REFERENCES `empresas` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
