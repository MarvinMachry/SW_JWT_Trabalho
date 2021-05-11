# MicroServicosNode

Para utilizar o projeto:

Execute o comando npm i dentro das pastas pessoas produtos e apigateway para baixar os módulos dependentes necessários para a execução de cada servico

Crie um banco de dados chamados pessoas_api	e execute os seguintes comandos neles para criar as tabelas e inserir registros:

-- Criar a tabela pessoas

create table pessoas (
codigo serial not null primary key, 
nome varchar(50) not null);

-- inserir alguns registros
insert into pessoas (nome) values ('jorge'),('joão');

Crie um banco de dados chamados produtos_api 	e execute os seguintes comandos neles para criar as tabelas e inserir registros:

-- Criar a tabela produtos

create table produtos (
codigo serial not null primary key, 
nome varchar(50) not null, 
preco decimal(10,2) not null, 
estoque integer not null);

-- inserir alguns registros
insert into produtos (nome, preco, estoque) values ('Monitor 15', 350.00, 8), ('Pen Drive 128GB', 150.00, 10);

- Entre na pasta produtos e inicie o serviço com o seguinte comando:
npm start

- Entre na pasta pessoas e inicie o serviço com o seguinte comando:
npm start

- Entre na pasta apigateway e inicie o serviço com o seguinte comando:
npm start
