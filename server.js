const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const queries = require('./db/queries');

const app = express();
const port = process.env.PORT || 5000;
const pool = new Pool();

app.use(bodyParser.json());

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/movies', (req, res) => {
  pool.query(queries.GET_ALL_MOVIES, (err, query) => {
    if (err) {
      res.sendStatus(500);
    }

    if (!query) {
      res.sendStatus(500);
    }

    res.send(query.rows);
  });
});

app.post('/movies', (req, res) => {
  const movie = req.body;

  if (!('title' in movie)
      || !('genres' in movie)
      || !('actors' in movie)
      || !('year' in movie)
      || !('rating' in movie)) {

    res.sendStatus(400);
  }

  if (typeof movie.year !== 'number'
      || typeof movie.genres !== 'object'
      || typeof movie.title !== 'string'
      || typeof movie.actors !== 'object'
      || typeof movie.rating !== 'number') {

    res.sendStatus(400);
  }

  (async () => {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      // Insert Movie
      const insertMovieValues = [movie.title, movie.year, movie.rating];
      const movieRes = await client.query(queries.POST_MOVIE, insertMovieValues);
      const movieId = movieRes.rows[0].movie_id;

      async function asyncForEach(array, callback) {
        for (let i = 0; i < array.length; i++) {
          await callback(array[i]);
        }
      }

      const insertActors = async () => {
        await asyncForEach(movie.actors, async (actor) => {
          const actorRes = await client.query(queries.POST_ACTOR, [actor]);
          const actorId = actorRes.rows[0].actor_id;
          await client.query(queries.POST_ACTOR_MOVIE, [actorId, movieId]);
        });
      }

      const insertGenres = async () => {
        await asyncForEach(movie.genres, async (genre) => {
          const genreRes = await client.query(queries.POST_GENRE, [genre]);
          const genreId = genreRes.rows[0].genre_id;

          await client.query(queries.POST_MOVIE_GENRE, [genreId, movieId]);
        });
      }

      await insertActors();
      await insertGenres();
      await client.query('COMMIT');
      res.send(movieRes.rows);
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
      res.sendStatus(400);
    } finally {
      client.release();
    }
  })().catch((e) => {
    console.error(e.stack);
    res.sendStatus(500);
  });
});

app.use('/', express.static(`${__dirname}/client/build`));

app.listen(port, () => console.log(`Listening on port ${port}`));
