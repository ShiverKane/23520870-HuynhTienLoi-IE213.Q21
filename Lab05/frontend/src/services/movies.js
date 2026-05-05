import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:5000/api/v1/movies',
  headers: {
    'Content-type': 'application/json',
  },
});

export default class MovieDataService {
  static getAll(params) {
    return http.get('/', { params });
  }

  static get(id) {
    return http.get(`/id/${id}`);
  }

  static createReview(data) {
    return http.post('/review', data);
  }

  static updateReview(data) {
    return http.put('/review', data);
  }

  static deleteReview(data) {
    return http.delete('/review', { data });
  }

  static getRatings() {
    return http.get('/ratings');
  }
}
