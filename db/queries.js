const GET_ALL_MOVIES = `SELECT
                          movie.movie_id AS id,
                          title,
                          year,
                          rating,
                          array_agg(distinct(actor.actor)) AS actors,
                          array_agg(distinct(genre.genre)) AS genres
                        FROM movie
                        INNER JOIN movie_actor
                        ON movie_actor.movie_id = movie.movie_id
                        INNER JOIN actor
                        ON movie_actor.actor_id = actor.actor_id
                        INNER JOIN genre_movie
                        ON genre_movie.movie_id = movie.movie_id
                        INNER JOIN genre
                        ON genre_movie.genre_id = genre.genre_id
                        GROUP BY movie.movie_id, movie.title, movie.year, movie.rating;`

const GET_ALL_GENRES = `SELECT genre FROM genre;`;

const GET_ALL_ACTORS = `SELECT actor FROM actor;`;

const GET_MOVIE_BY_ID = `WITH tab as (
                         SELECT
                           movie.movie_id,
                           title,
                           year,
                           rating,
                           array_agg(distinct(actor.actor)) AS actors,
                           array_agg(distinct(genre.genre)) AS genres
                         FROM movie
                         INNER JOIN movie_actor
                         ON movie_actor.movie_id = movie.movie_id
                         INNER JOIN actor
                         ON movie_actor.actor_id = actor.actor_id
                         INNER JOIN genre_movie
                         ON genre_movie.movie_id = movie.movie_id
                         INNER JOIN genre
                         ON genre_movie.genre_id = genre.genre_id
                         GROUP BY movie.movie_id, movie.title, movie.year, movie.rating
                         )
                         SELECT * FROM tab WHERE movie_id = $1;`;

const GET_ACTOR_BY_NAME = `SELECT actor_id FROM actor WHERE actor = $1;`

const GET_ACTORS_BY_MOVIE = `WITH tab AS (
                               SELECT
                                 actor,
                                 actor.actor_id,
                                 movie.movie_id
                               FROM actor
                               INNER JOIN movie_actor
                               ON movie_actor.actor_id = actor.actor_id
                               INNER JOIN movie
                               ON movie_actor.movie_id = movie.movie_id
                               GROUP BY actor.actor_id, movie.movie_id
                             )
                             SELECT actor FROM tab WHERE movie_id = $1;`

const GET_GENRES_BY_MOVIE = `WITH tab AS (
                               SELECT
                                 genre,
                                 genre.genre_id,
                                 movie.movie_id
                               FROM genre
                               INNER JOIN genre_movie
                               ON genre_movie.genre_id = genre.genre_id
                               INNER JOIN movie
                               ON genre_movie.movie_id = movie.movie_id
                               GROUP BY genre.genre_id, movie.movie_id
                             )
                             SELECT genre FROM tab WHERE movie_id = $1;`;

const GET_GENRE_BY_NAME = `SELECT genre_id FROM genre WHERE genre = $1;`;

const POST_GENRE = `INSERT INTO genre (genre)
                    SELECT CAST($1 AS VARCHAR)
                    ON CONFLICT (genre)
                    DO UPDATE
                    SET genre=EXCLUDED.genre
                    RETURNING genre_id;`

const POST_ACTOR = `INSERT INTO actor (actor)
                    SELECT CAST($1 AS VARCHAR)
                    ON CONFLICT (actor)
                    DO UPDATE
                    SET actor=EXCLUDED.actor
                    RETURNING actor_id;`

const POST_MOVIE = `INSERT INTO movie (title, year, rating)
                    SELECT CAST($1 AS VARCHAR), $2, $3
                    ON CONFLICT (title, year)
                    DO UPDATE
                    SET title=EXCLUDED.title
                    RETURNING movie_id;`

const POST_MOVIE_GENRE = `INSERT INTO genre_movie (genre_id, movie_id)
                          SELECT $1, $2
                          ON CONFLICT (genre_id, movie_id)
                          DO UPDATE
                          SET movie_id=EXCLUDED.movie_id
                          RETURNING movie_id;`;

const POST_ACTOR_MOVIE = `INSERT INTO movie_actor (actor_id, movie_id)
                          SELECT $1, $2
                          ON CONFLICT (actor_id, movie_id)
                          DO UPDATE
                          SET movie_id=EXCLUDED.movie_id
                          RETURNING movie_id;`;

const PUT_MOVIE = `UPDATE movie
                   SET title = $1,
                       year = $2,
                       rating = $3
                   WHERE
                     movie_id = $4;`;

const DELETE_ACTOR_MOVIE = `DELETE FROM movie_actor
                            WHERE actor_id = $1 AND movie_id = $2;`;

const DELETE_GENRE_MOVIE = `DELETE FROM genre_movie
                            WHERE genre_id = $1 AND movie_id = $2;`;

const DELETE_MOVIE = `DELETE FROM movie
                      WHERE movie_id = $1;`;

module.exports = {
  GET_ALL_MOVIES,
  GET_ALL_ACTORS,
  GET_ALL_GENRES,
  GET_ACTORS_BY_MOVIE,
  GET_ACTOR_BY_NAME,
  GET_GENRE_BY_NAME,
  GET_GENRES_BY_MOVIE,
  GET_MOVIE_BY_ID,
  POST_GENRE,
  POST_ACTOR,
  POST_MOVIE,
  POST_MOVIE_GENRE,
  POST_ACTOR_MOVIE,
  PUT_MOVIE,
  DELETE_ACTOR_MOVIE,
  DELETE_GENRE_MOVIE,
  DELETE_MOVIE,
};