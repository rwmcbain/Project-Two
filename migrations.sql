create database memory_data;

create table users (
	id int not null auto_increment,
	email varchar(255) not null,
	first_name varchar (30) not null,
	last_name varchar(20) not null,
	password_hash varchar(61) not null,
	primary key (id)
	);

create table journal_entrys (
	id int not null auto_increment,
	comments text not null,
	-- date DATETIME,
	user_id int not null references users(id),
	primary key (id)
	);


grant all privileges on memory_data.* to 'ru55ell'@'localhost';
flush privileges;



-- user ru55ell