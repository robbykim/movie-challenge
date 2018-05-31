const express = require('express');
const bodyParser = require('body-parser');
const _ = require('underscore');
const { Pool } = require('pg');

const queries = require('./db/queries');

const app = express();
const port = process.env.PORT || 5000;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://localhost:5432/movies',
  // ssl: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/movies', (req, res) => {
  pool.query(queries.GET_ALL_MOVIES, (err, query) => {
    if (err) {
      console.error(err);
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
  console.log(req.body);

  if (!isMovieValid(movie)) {
    res.sendStatus(400);
  }

  (async () => {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      // Insert Movie
      const insertMovieValues = [movie.title, parseInt(movie.year), parseInt(movie.rating)];
      const movieRes = await client.query(queries.POST_MOVIE, insertMovieValues);
      const movieId = movieRes.rows[0].movie_id;

      await insertActors(client, movie.actors, movieId);
      await insertGenres(client, movie.genres, movieId);
      await client.query('COMMIT');
      const postedMovie = await client.query(queries.GET_MOVIE_BY_ID, [movieId]);
      res.send(postedMovie.rows[0]);
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

app.put('/movies/:id', (req, res) => {
  const movie = req.body;
  const movieId = req.params.id;

  if (!isMovieValid) {
    res.sendStatus(400);
  }

  (async () => {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');
      const insertMovieValues = [movie.title, parseInt(movie.year), parseInt(movie.rating), movieId];
      const movieRes = await client.query(queries.PUT_MOVIE, insertMovieValues);

      await removeMovieActorLinks(client, movie.actors, movieId);
      await removeMovieGenreLinks(client, movie.actors, movieId);
      await insertActors(client, movie.actors, movieId);
      await insertGenres(client, movie.genres, movieId);

      await client.query('COMMIT');
      const updatedMovie = await client.query(queries.GET_MOVIE_BY_ID, [movieId]);
      res.send(updatedMovie.rows[0]);
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  })().catch((e) => {
    console.error(e.stack);
    res.sendStatus(500);
  });
});

app.delete('/movies/:id', (req, res) => {
  const movieId = req.params.id;

  (async () => {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');
      await client.query(queries.DELETE_MOVIE, [movieId]);
      await client.query('COMMIT');

      res.send({ movie_id: movieId });
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

app.get('/genres', (req, res) => {
  pool.query(queries.GET_ALL_GENRES, (err, query) => {
    if (err) {
      res.sendStatus(500);
    }

    if (!query) {
      res.sendStatus(500);
    }

    const genres = _.map(query.rows, (row) => {
      return row.genre;
    });

    res.send(genres);
  });
});

app.get('/actors', (req, res) => {
  pool.query(queries.GET_ALL_ACTORS, (err, query) => {
    if (err) {
      res.sendStatus(500);
    }

    if (!query) {
      res.sendStatus(500);
    }

    const actors = _.map(query.rows, (row) => {
      return row.actor;
    });

    res.send(actors);
  });
});

function isMovieValid(movie) {
  if (!('title' in movie)
      || !('genres' in movie)
      || !('actors' in movie)
      || !('year' in movie)
      || !('rating' in movie)) {

    return false;
  }

  return true;
}

async function asyncForEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    await callback(array[i]);
  }
}

async function insertActors(client, actors, movieId) {
  await asyncForEach(actors, async (actor) => {
    const actorRes = await client.query(queries.POST_ACTOR, [actor]);
    const actorId = actorRes.rows[0].actor_id;
    await client.query(queries.POST_ACTOR_MOVIE, [actorId, movieId]);
  });
}

async function insertGenres(client, genres, movieId) {
  await asyncForEach(genres, async (genre) => {
    const genreRes = await client.query(queries.POST_GENRE, [genre]);
    const genreId = genreRes.rows[0].genre_id;

    await client.query(queries.POST_MOVIE_GENRE, [genreId, movieId]);
  });
}

async function removeMovieActorLinks(client, actors, movieId) {
  const actorsRes = await client.query(queries.GET_ACTORS_BY_MOVIE, [movieId]);
  const currentActors = _.map(actorsRes.rows, (actor) => {
    return actor.actor;
  });

  const combinedActors = _.union(currentActors, actors);
  const removedActors = _.difference(combinedActors, actors);

  await asyncForEach(removedActors, async (actor) => {
    const actorRes = await client.query(queries.GET_ACTOR_BY_NAME, [actor])
    const actorId = actorRes.rows[0].actor_id;

    await client.query(queries.DELETE_ACTOR_MOVIE, [actorId, movieId]);
  });
}

async function removeMovieGenreLinks(client, genres, movieId) {
  const genreRes = await client.query(queries.GET_GENRES_BY_MOVIE, [movieId]);
  const currentGenres = _.map(genreRes.rows, (genre) => {
    return genre.genre;
  });

  const combinedGenres = _.union(currentGenres, genres);
  const removedGenres = _.difference(combinedGenres, genres);

  await asyncForEach(removedGenres, async (genre) => {
    const genreRes = await client.query(queries.GET_GENRE_BY_NAME, [genre])
    const genreId = genreRes.rows[0].genre_id;

    await client.query(queries.DELETE_GENRE_MOVIE, [genreId, movieId]);
  });
}

app.use('/', express.static(`${__dirname}/client/build`));

app.listen(port, () => console.log(`Listening on port ${port}`));
