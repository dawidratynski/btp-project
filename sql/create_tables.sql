CREATE TABLE IF NOT EXISTS tickers (
    id SERIAL PRIMARY KEY,
    ticker varchar(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS quotes (
    id SERIAL PRIMARY KEY,
    ticker_id INTEGER REFERENCES tickers (id),
    timestamp TIMESTAMP NOT NULL,
    price DOUBLE PRECISION NOT NULL
);
