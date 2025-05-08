CREATE TABLE IF NOT EXISTS product (
    id serial primary key NOT NULL,
    name varchar(50) NOT NULL,
    description varchar(1000) NOT NULL,
    price decimal(10, 2) NOT NULL,
    available boolean NOT NULL default false,
    restaurant_id bigint NOT NULL,
    created_at date NOT NULL,
    CONSTRAINT fk_restaurant_id 
        FOREIGN KEY(restaurant_id)
        REFERENCES restaurant(id)
        ON DELETE CASCADE
        ON UPDATE NO ACTION
);

DO
$do$
BEGIN
    IF NOT EXISTS (SELECT FROM public.product) THEN
        INSERT INTO public.product("name", "description", "price", "available", "restaurant_id", "created_at") VALUES ('X-tudo', 'X-tudo bomzao', 10.0, true, 1, now());
        INSERT INTO public.product("name", "description", "price", "available", "restaurant_id", "created_at") VALUES ('Vicking', 'Hamburger com pão australiano', 10.0, true, 1, now());
    END IF;
END
$do$
