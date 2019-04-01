CREATE TABLE trades (
    index bigserial primary key,
    symbol_code_index bigserial NOT NULL,
    trade_id text,
    side varchar(16) NOT NULL,
    price numeric NOT NULL,
    equality numeric NOT NULL,
    timestamp timestamp NOT NULL,
    created_at timestamp NOT NULL,
    updated_at timestamp NOT NULL
);

CREATE INDEX idx_trades_symbol_code_index
ON trades(symbol_code_index);

CREATE INDEX idx_trades_timestamp
ON trades(timestamp);
