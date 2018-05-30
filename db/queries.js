const GET_ALL_MOVIES = `SELECT
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
                        GROUP BY movie.title, movie.year, movie.rating;`

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


module.exports = {
  GET_ALL_MOVIES,
  POST_GENRE,
  POST_ACTOR,
  POST_MOVIE,
  POST_MOVIE_GENRE,
  POST_ACTOR_MOVIE,
}