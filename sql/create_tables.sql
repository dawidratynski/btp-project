CREATE TABLE IF NOT EXISTS quote (
    quote_id BIGINT NOT NULL PRIMARY KEY,
    quote_ticker varchar(50) NOT NULL,
    quote_timestamp TIMESTAMP NOT NULL,
    quote_price DOUBLE PRECISION NOT NULL
);