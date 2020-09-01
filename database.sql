drop table if exists person;

create table person(
	id serial not null primary key,
	first_name text not null,
	counter int not null
);
