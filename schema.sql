DROP TABLE IF EXISTS favMovies;

CREATE TABLE IF NOT EXISTS favMovies(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    release_date VARCHAR(255),
    poster_path VARCHAr(300),
    overview VARCHAR(10000)

);