import axios from 'axios';

class DondeSeHaceLaMagia {
  constructor() {
    this.posicion = '';
    this.topCincoAspirantes = [];
    this.aliados = [];
    this.rivales = [];
    this.aspirantesOrdenados = [];
    this.topDosAspirantesSinergia = [];
    this.apiUrl = process.env.VUE_APP_API_URL;
  }

  async recibirDatos(posicion, aliados, rivales) {
    this.posicion = posicion;
    this.aliados = aliados;
    this.rivales = rivales;
    console.log('Datos recibidos:', { posicion, aliados, rivales });
  
    try {
      console.log('API URL:', this.apiUrl); // Añadir este log para verificar la URL

      // Obtener recomendaciones
      const response = await axios.post(`${this.apiUrl}/api/recomendaciones`, { posicion });
      const recomendaciones = response.data;
      this.actualizarTopCincoAspirantes(recomendaciones);
      console.log('Top cinco aspirantes por posición:', recomendaciones);
  
      // Almacenar recomendaciones y rivales
      await axios.post(`${this.apiUrl}/api/storeData`, {
        topCincoAspirantes: this.topCincoAspirantes,
        rivales: this.rivales
      });
      console.log('Datos almacenados correctamente');
  
      // Obtener resultados de enfrentamientos
      const responseEnfrentamientos = await axios.get(`${this.apiUrl}/api/enfrentamientos`);
      const resultadosEnfrentamientos = responseEnfrentamientos.data;
      this.aspirantesOrdenados = resultadosEnfrentamientos.map(resultado => resultado.aspirante);
      console.log('Aspirantes ordenados obtenidos:', this.aspirantesOrdenados);
  
      // Almacenar resultados de enfrentamientos y aliados
      await axios.post(`${this.apiUrl}/api/storeEnfrentamientos`, {
        aspirantesOrdenados: this.aspirantesOrdenados,
        aliados: this.aliados
      });
      console.log('Resultados de enfrentamientos almacenados correctamente');
  
      // Buscar sinergias
      const responseSinergia = await axios.post(`${this.apiUrl}/api/buscarSinergia`, {
        aspirantes: this.aspirantesOrdenados,
        aliados: this.aliados
      });
      this.topDosAspirantesSinergia = responseSinergia.data;
      console.log('Top dos aspirantes con sinergia:', this.topDosAspirantesSinergia);
  
    } catch (error) {
      console.error('Error en el proceso:', error.response ? error.response.data : error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request data:', error.request);
      }
    }
  }
  
  async obtenerTopCincoPorPosicion(posicion) {
    try {
      const response = await axios.post(`${this.apiUrl}/api/recomendaciones`, { posicion });
      const recomendaciones = response.data;
      return recomendaciones.map(nombre => ({
        nombre,
        foto: `${nombre.toLowerCase().replace(/[^a-z0-9]/g, '')}.png`
      }));
    } catch (error) {
      console.error(`Error obteniendo recomendaciones para ${posicion}:`, error);
      return [];
    }
  }

  actualizarTopCincoAspirantes(aspirantes) {
    this.topCincoAspirantes = aspirantes;
  }
}

export default DondeSeHaceLaMagia;
