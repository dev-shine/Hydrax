CREATE TABLE symbol_codes (
    index bigserial primary key,
    symbol varchar(64) NOT NULL, -- symbol name or currency pairs with slash (AAPL, BTC/USD)
    type varchar(64) NOT NULL, -- data type (e.g crypto_currency, FX, Stock, Indices, ETFs)
    exchange varchar(64) NOT NULL, -- data source name with uppercase letters (e.g. NASDAQ)
    service varchar(64) NOT NULL, -- data provider service name with uppercase letters (e.g. EOD)
    created_at timestamp NOT NULL, -- the timestamp record was inserted
    updated_at timestamp NOT NULL -- the last timestamp record was updated
);
