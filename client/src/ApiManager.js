class ApiManager {
  static get(url, cb) {
    $.ajax({
      url
    }).always(cb);
  }

  static post(url, data, cb) {
    console.log(data);
    $.ajax({
      type: "POST",
      url: url,
      data: data,
      success: cb,
      headers: {},
    });
  }

  static getMovies(cb) {
    ApiManager.get('/movies', cb);
  }

  static getActors(cb) {
    ApiManager.get('/actors', cb);
  }

  static getGenres(cb) {
    ApiManager.get('/genres', cb);
  }

  static postMovie(movie, cb) {
    ApiManager.post('/movies', movie, cb);
  }
}

export default ApiManager;