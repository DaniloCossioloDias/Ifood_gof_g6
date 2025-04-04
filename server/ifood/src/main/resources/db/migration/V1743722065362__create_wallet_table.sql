CREATE TABLE IF NOT EXISTS wallet (
    x smallint not null default 1 UNIQUE CHECK(x = 1),
    balance decimal(10,2) NOT NULL default 0
);

INSERT INTO public.wallet(x, balance) VALUES (1, 0) ON CONFLICT DO NOTHING;
