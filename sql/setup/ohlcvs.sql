CREATE TABLE ohlcvs (
    index bigserial primary key,
    symbol_code_index bigserial NOT NULL,
	period varchar(16) NOT NULL,
	timestamp timestamp NOT NULL,
    open numeric NOT NULL,
	high numeric NOT NULL,
	low numeric NOT NULL,
	close numeric NOT NULL,
	volume numeric NOT NULL,
	created_at timestamp NOT NULL,
    updated_at timestamp NOT NULL
);

CREATE INDEX idx_ohlcvs_symbol_code_index
ON ohlcvs(symbol_code_index);

CREATE INDEX idx_ohlcvs_period
ON ohlcvs(period);

CREATE INDEX idx_ohlcvs_timestamp
ON ohlcvs(timestamp);
