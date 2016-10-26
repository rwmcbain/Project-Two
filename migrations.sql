create database cats_fansite;

create table user_accounts (
	id int not null auto_increment,
	email varchar(255) not null,
	password_hash varchar(61) not null,
	primary key (id)
	);

create table news_feed (
	id int not null auto_increment,
	timestamp DATETIME,
	comments text not null,
	primary key (id)
	);

create table cats (
	id int not null auto_increment,
	name varchar(100) not null,
	comments text,
	primary key (id)
	);


user ru55ell