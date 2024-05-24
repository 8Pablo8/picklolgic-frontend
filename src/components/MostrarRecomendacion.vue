<template>
    <div class="container">
      <div class="row justify-content-center">
        <div v-for="(campeon, index) in campeones.slice(0, 2)" :key="index" class="col-md-3">
          <div class="card text-center mb-4" :class="{'best-choice': index === 0, 'second-choice': index === 1}">
            <div class="image-container">
              <img :src="getFotoPath(campeon.foto)" class="card-img-top" :alt="campeon.nombre">
              <i :class="{'bi-trophy-fill': true, 'gold-trophy': index === 0, 'silver-trophy': index === 1}"></i>
            </div>
            <div class="card-body">
              <h5 class="card-title">{{ campeon.nombre }}</h5>
              <p class="card-text" v-if="index === 0">Es tu mejor elección sin duda</p>
              <p class="card-text" v-else>Es tu segunda mejor elección</p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
    <button class="btn" @click="irAComoFunciona">¿Por qué?</button>
    <button class="btn2" @click="irHerramienta">Volver</button>
  </template>
  
  <script>
  export default {
    name: 'MostrarRecomendacion',
    props: {
      campeones: {
        type: Array,
        required: true,
        default: () => []
      }
    },
    methods: {
      getFotoPath(foto) {
        return `/fotos/${foto}`;
      },
    irAComoFunciona() {
      this.$router.push('/como-funciona');
    },
    irHerramienta() {
      location.reload();
    }
    }
  };
  </script>
  
  <style scoped>
  .container {
    margin-top: 50px;
  }
  .card {
    background-color: #141414;
    color: white;
  }
  .card-img-top {
    width: 100%;
    height: auto;
  }
  .image-container {
    position: relative;
    width: 100%;
  }
  .bi-trophy-fill {
    font-size: 3rem; /* Tamaño del icono */
    position: absolute;
    bottom: -3rem; /* Ajusta esta distancia según sea necesario */
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 20px;
  }
  .gold-trophy {
    color: rgb(252, 215, 7);
  }
  .silver-trophy {
    color: rgba(240, 240, 240, 0.863);
  }
  .best-choice .card-text {
    color: white;
  }
  .second-choice .card-text {
    color: white;
  }
  .btn{
    background-color: #800000;
    color: white;
    border: #800000;
    padding: 10px 20px; /* Incrementa el tamaño del botón */
    font-size: 1.25rem; /* Tamaño de fuente más grande */
    border-radius: 2em;
    width: 200px;
  }
  .btn:hover{
    background-color: #bfaa6c;
  }
  .btn2{
    background-color: #bfaa6c;
    color: white;
    padding: 10px 20px; /* Incrementa el tamaño del botón */
    font-size: 1.25rem; /* Tamaño de fuente más grande */
    border-radius: 2em;
    width: 200px;
    border: none;
    margin-left: 5px;
  }
  </style>
  