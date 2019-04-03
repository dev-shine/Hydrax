CREATE TABLE ohlcvs (
    index bigserial primary key,
    symbol_code_index bigserial NOT NULL,
    period varchar(16) NOT NULL, -- "1m", "5m", "15m", "30m", "1h", "3h", "6h", "12h", "1d", "1w", "1M"
    timestamp timestamp NOT NULL, -- the timestamp this OHLCV starts in
    open numeric NOT NULL,
    high numeric NOT NULL,
    low numeric NOT NULL,
    close numeric NOT NULL,
    volume numeric NOT NULL,
    created_at timestamp NOT NULL, -- the timestamp record was inserted
    updated_at timestamp NOT NULL -- the last timestamp record was updated
);

CREATE INDEX idx_ohlcvs_symbol_code_index
ON ohlcvs(symbol_code_index);

CREATE INDEX idx_ohlcvs_period
ON ohlcvs(period);

CREATE INDEX idx_ohlcvs_timestamp
ON ohlcvs(timestamp);
