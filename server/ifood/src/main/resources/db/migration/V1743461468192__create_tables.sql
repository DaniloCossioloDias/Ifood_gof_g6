CREATE TABLE IF NOT EXISTS restaurant (
    id serial primary key NOT NULL,
    name varchar(50) NOT NULL,
    description varchar(1000) NOT NULL,
    address varchar(200) NOT NULL,
    created_at date NOT NULL,
);
