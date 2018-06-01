class ApiManager {
  static get(url, cb) {
    $.ajax({
      url
    }).always(cb);
  }

  static post(url, data, cb) {
    $.ajax({
      type: "POST",
      url: url,
      data: data,
      success: cb,
      headers: {},
    });
  }

  static put(url, data, cb) {
    $.ajax({
      type: 'PUT',
      url: url,
      data: data,
      success: cb,
    });
  }

  static delete(url, cb) {
    $.ajax({
      type: 'DELETE',
      url: url,
      success: cb,
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

  static putMovie(movie, id, cb) {
    ApiManager.put(`/movies/${id}`, movie, cb);
  }

  static deleteMovie(id, cb) {
    ApiManager.delete(`/movies/${id}`, cb);
  }
}

export default ApiManager;