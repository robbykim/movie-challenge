class ApiManager {
  static get(url, cb) {
    $.ajax({
      url
    }).always(cb);
  }

  static getMovies(cb) {
    ApiManager.get('/movies', cb);
  }
}

export default ApiManager;