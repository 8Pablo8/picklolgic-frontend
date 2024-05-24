<template>
  <div id="app">
    <video autoplay muted loop id="myVideo">
      <source src="@/assets/animatedChamps.webm" type="video/webm">
      Your browser does not support the video tag.
    </video>
    <div id="header" class="container-fluid">
      <app-header></app-header>
    </div>
    <div id="content" class="container-fluid d-flex flex-column justify-content-center">
      <router-view></router-view>
    </div>
    <div id="footer" class="container-fluid">
      <app-footer></app-footer>
    </div>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

export default {
  name: 'App',
  components: {
    AppHeader, 
    AppFooter
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#header, #footer {
  position: relative;
  z-index: 2;
  width: 100%;
}
#myVideo {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -1;
  overflow: hidden;
  background: url('@/assets/animatedZed.mp4') no-repeat center center;
  background-size: cover;
}
#content {
  position: relative;
  z-index: 1;
  padding-top: 20px; /* Ajusta según sea necesario */
  padding-bottom: 20px; /* Ajusta según sea necesario */
  flex: 1; /* Asegura que el contenido crezca para llenar el espacio disponible */
}
#header, #footer {
  padding-right: 0 !important;
  padding-left: 0 !important;
}

</style>