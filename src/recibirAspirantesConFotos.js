import axios from 'axios';

const apiUrl = process.env.VUE_APP_API_URL;

async function recibirAspirantesConFotos() {
  try {
    console.log('API URL:', apiUrl); // Añadir este log para verificar la URL

    // Hacer la solicitud al servidor para obtener los aspirantes ordenados
    const response = await axios.get(`${apiUrl}/api/enfrentamientos`);
    const resultados = response.data;

    const aspirantesOrdenados = resultados.map(resultado => resultado.aspirante);
    console.log('Aspirantes Ordenados:', aspirantesOrdenados);

    const aspirantesConFotos = await Promise.all(aspirantesOrdenados.map(async nombre => {
      const response = await axios.get(`${apiUrl}/api/campeones/nombre/${nombre}`);
      return response.data;
    }));

    return aspirantesConFotos;
  } catch (error) {
    console.error('Error obteniendo los aspirantes ordenados:', error);
    return [];
  }
}

export default recibirAspirantesConFotos;
