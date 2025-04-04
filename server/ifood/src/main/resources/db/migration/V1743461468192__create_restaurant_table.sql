CREATE TABLE IF NOT EXISTS restaurant (
    id serial primary key NOT NULL,
    name varchar(50) NOT NULL,
    description varchar(1000) NOT NULL,
    address varchar(200) NOT NULL,
    created_at date NOT NULL
);

DO
$do$
BEGIN
    IF NOT EXISTS (SELECT FROM public.restaurant) THEN
        INSERT INTO public.restaurant("name", "description", "address", "created_at") VALUES ('Burgers', 'Hamburgueria top de londrina', 'Rua Berlém, 13 - Centro', now());
    END IF;
END
$do$
