\c movies;

DROP TABLE IF EXISTS "genre" CASCADE;
DROP TABLE IF EXISTS "actor" CASCADE;
DROP TABLE IF EXISTS "movie" CASCADE;
DROP TABLE IF EXISTS "movie_actor" CASCADE;
DROP TABLE IF EXISTS "genre_movie" CASCADE;

CREATE TABLE genre (
  genre_id SERIAL PRIMARY KEY,
  genre VARCHAR NOT NULL UNIQUE
);

CREATE TABLE actor (
  actor_id SERIAL PRIMARY KEY,
  actor VARCHAR NOT NULL UNIQUE
);

CREATE TABLE movie (
  movie_id SERIAL PRIMARY KEY,
  title VARCHAR(40) NOT NULL,
  year INT NOT NULL,
  rating INT NOT NULL,
  UNIQUE (title, year)
);

CREATE TABLE movie_actor (
  actor_id INT REFERENCES actor(actor_id) ON UPDATE CASCADE,
  movie_id INT REFERENCES movie(movie_id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT movie_actor_id PRIMARY KEY (actor_id, movie_id)
);

CREATE TABLE genre_movie (
  genre_id INT REFERENCES genre(genre_id) ON UPDATE CASCADE,
  movie_id INT REFERENCES movie(movie_id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT movie_genre_id PRIMARY KEY (genre_id, movie_id)
);


INSERT INTO genre(genre)
  VALUES ('Horror'), ('Action'), ('Comedy'), ('Romantic'), ('Drama');

INSERT INTO actor(actor)
  VALUES ('Chris Hemsworth'), ('Chris Evans'), ('Chris Pratt'), ('Ryan Reynolds');

INSERT INTO movie(title, year, rating)
  VALUES ('Avengers: Infinity War', 2018, 92), ('Deadpool 2', 2018, 90);

INSERT INTO movie_actor(actor_id, movie_id)
  VALUES (1, 1), (2, 1), (3, 1), (4, 2);

INSERT INTO genre_movie(genre_id, movie_id)
  VALUES (2, 1), (3, 1), (5, 1), (2, 2), (3, 2), (4, 2);