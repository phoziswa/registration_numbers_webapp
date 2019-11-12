create table town(
	id serial not null primary key,
	town_name text not null,
	plate_code text not null
);
create table registrations(
	id serial not null primary key,
    registration_num text not null,
	town_id int,
	foreign key (town_id) references town(id)
);





