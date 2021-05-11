-- Criar um banco de dados chamado marcas_api	

-- Criar a tabela marcas

create table marcas (
codigo serial not null primary key, 
nome varchar(50) not null,
cnpj varchar(14) not null);

-- inserir alguns registros
insert into marcas (nome, cnpj) values ('Chevrolet', '12345678912345'),('Fiat', '98765432109876'), ('Kawasaki', '56432109870321');