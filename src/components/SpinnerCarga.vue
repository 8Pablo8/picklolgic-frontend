<template>
  <div class="spinner-overlay" v-if="visible">
    <video autoplay muted loop id="videoJinx">
      <source src="@/assets/animatedJinx.webm" type="video/mp4">
    </video>
    <div class="spinner-container">
      <div class="spinner"></div>
      <h1 class="texto">Estamos cocinando</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpinnerCarga',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.spinner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.spinner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(128, 128, 128, 0.7); /* Fondo gris transparente */
  padding: 20px;
  border-radius: 10px; /* Bordes redondeados */
  z-index: 1000;
}

.texto {
  margin-top: 10px;
  color: #bfaa6c;
  z-index: 1000;
}

#videoJinx{
  position: absolute;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
}

.spinner {
  border: 8px solid rgb(255, 255, 255);
  border-radius: 50%;
  border-top: 8px solid #bfaa6c;
  width: 60px;
  height: 60px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
