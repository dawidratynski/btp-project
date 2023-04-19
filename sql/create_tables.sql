CREATE TABLE IF NOT EXISTS quote (
    id SERIAL PRIMARY KEY,
    ticker varchar(50) NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    price DOUBLE PRECISION NOT NULL
);