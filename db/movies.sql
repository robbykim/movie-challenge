\c movies;

DROP TABLE IF EXISTS "genre" CASCADE;
DROP TABLE IF EXISTS "actor" CASCADE;
DROP TABLE IF EXISTS "movie" CASCADE;
DROP TABLE IF EXISTS "movie_actor" CASCADE;

CREATE TABLE genre (
  genre_id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL
);

CREATE TABLE actor (
  actor_id SERIAL PRIMARY KEY,
  actor_name VARCHAR NOT NULL
);

CREATE TABLE movie (
  movie_id SERIAL PRIMARY KEY,
  title VARCHAR(40) NOT NULL,
  year INT NOT NULL,
  genre INT REFERENCES genre(genre_id),
  rating INT NOT NULL
);

CREATE TABLE movie_actor (
  actor_id INT REFERENCES actor(actor_id) ON UPDATE CASCADE,
  movie_id INT REFERENCES movie(movie_id) ON UPDATE CASCADE,
  CONSTRAINT movie_actor_id PRIMARY KEY (actor_id, movie_id)
);


INSERT INTO genre (name)
  VALUES ('Horror'), ('Action'), ('Comedy'), ('Romantic'), ('Drama');
