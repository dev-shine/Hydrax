CREATE TABLE trades (
    index bigserial primary key,
    symbol_code_index bigserial NOT NULL, -- index in symbol_codes
    trade_id text, -- id in each service
    side varchar(16) NOT NULL, -- "buy" or "sell"
    price numeric NOT NULL,
    equality numeric NOT NULL, -- trade amount
    timestamp timestamp NOT NULL,
    created_at timestamp NOT NULL, -- the timestamp record was inserted
    updated_at timestamp NOT NULL -- the last timestamp record was updated
);

CREATE INDEX idx_trades_symbol_code_index
ON trades(symbol_code_index);

CREATE INDEX idx_trades_timestamp
ON trades(timestamp);
