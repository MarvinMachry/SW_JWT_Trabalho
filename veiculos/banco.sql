-- Criar um banco de dados chamado veiculos_api 

-- Criar a tabela veiculos

create table veiculos (
codigo serial not null primary key, 
nome varchar(50) not null, 
ano integer not null, 
cor varchar(50) not null, 
placa varchar(7) not null);

-- inserir alguns registros
insert into veiculos (nome, ano, cor, placa) values ('Uno', 2020, 'Vermelho', 'IJD4D22'), ('Astra', 2011, 'Branco', 'IBC5A55');
