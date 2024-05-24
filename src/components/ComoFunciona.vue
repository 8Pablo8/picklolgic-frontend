<template>
  <div class="container py-5 pt-2 ronded">
    <div class="row justify-content-center" >
      <div class="col-md-10 col-lg-8 bg-dark text-white rounded shadow p-4" id="contenedor-texto"> 
        <div class="text-center">
          <i class="bi bi-patch-question-fill display-4"></i>
        </div>
        <h1 class="text-center mb-4">¿ Cómo funciona nuestra <b class="subraya-campeon">Herramienta</b> ?</h1>
<p>
  El algoritmo de PickLoLgic se nutre de las estadísticas de la página <a href="https://lolalytics.com/" class="link-lolalytics">"Lolalytics.com"</a> y utiliza la información que el usuario proporciona para contrastarla al detalle con los datos más actualizados del parche actual.
</p>
<p>
  Concretamente, comienza filtrando los cinco campeones más fuertes del parche actual según la posición que el usuario selecciona desde nuestra <b>'Herramienta'</b>. A partir de ahí, el algoritmo los enfrenta uno a uno contra cada uno de los campeones indicados por el usuario en el bloque <b>'Rivales'</b>. Esto se consigue programando una búsqueda masiva al siguiente link: <br>➞ https://lolalytics.com/lol/<b class="subraya-campeon">campeon</b>/vs/<b class="subraya-campeon">campeon</b>/build/ ⬅
</p>
<p>
  Tras estos enfrentamientos, se saca el 'winrate' de cada uno de los 5 mejores por posición y se reordenan según efectividad.
</p>
<p>
  Además, el algoritmo no se detiene ahí. Usando otro script de scraping, consulta si alguno de los dos campeones mejor posicionados tiene una sinergia especial con alguno o varios de los aliados seleccionados. Si se detecta que el segundo campeón tiene mejores sinergias con los aliados, se reordena a la primera posición.
</p>
<p>
  Por último, el jugador recibe una selección de los dos campeones más óptimos: el mejor y el segundo mejor según las estadísticas y sinergias. Esto le ofrece al usuario una experiencia de juego óptima y una ventaja analítica considerable antes de haber entrado en la partida.
</p>
        <video autoplay muted loop playsinline class="w-100 mt-2 rounded" id="video-heimmer">
          <source src="../assets/heimmer.mp4" type="video/mp4">
          Tu navegador no soporta el elemento de video.
        </video>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComoFunciona'
}
</script>

<style scooped>
  @import '../estilos/estilosComoFunciona.css';
</style>
