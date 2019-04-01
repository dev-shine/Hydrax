CREATE TABLE symbol_codes (
    index bigserial primary key,
    symbol varchar(64) NOT NULL,
    type varchar(64) NOT NULL,
    exchange varchar(64) NOT NULL,
    service varchar(64) NOT NULL,
    created_at timestamp NOT NULL,
    updated_at timestamp NOT NULL
);
