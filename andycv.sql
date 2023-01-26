-- Databese para portafolio andycv --
create database andycv;

-- selecciono la Database --
use andycv;

-- creamos la tabla usuarios- andycv-portafolio --
create table usuarios(
idUsuarios int unsigned not null auto_increment,
nombre varchar(100) not null,
email varchar(200) not null,
phone bigint not null,
mensaje varchar(500) not null,
primary key (idUsuarios)
);
