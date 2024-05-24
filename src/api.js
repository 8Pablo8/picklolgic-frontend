import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL + '/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default {
  getCampeones() {
    return apiClient.get('/campeones');
  },
  getCampeonPorNombre(nombre) {
    return apiClient.get(`/campeones/nombre/${nombre}`);
  },
  autocompletarCampeones(nombre) {
    return apiClient.get(`/campeones/autocompletar/${nombre}`);
  },
  agregarCampeon(campeon) {
    return apiClient.post('/campeones', campeon);
  },
  actualizarCampeon(id, campeon) {
    return apiClient.put(`/campeones/${id}`, campeon);
  },
  eliminarCampeon(id) {
    return apiClient.delete(`/campeones/${id}`);
  }
};
