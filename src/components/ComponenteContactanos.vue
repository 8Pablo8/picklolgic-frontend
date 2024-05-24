<template>
  <video autoplay muted loop id="myVideo">
      <source src="@/assets/abanico.webm" type="video/mp4">
  </video>
  <div class="contactanos-wrapper">
    <div class="contactanos-container">
      <div class="contactanos-header">
        <i class="bi bi-envelope-open"></i>
      </div>
      <p class="contactanos-text">
        Coméntanos tu problema y te contestaremos lo antes posible:
      </p>
      <textarea v-model="mensaje" class="contactanos-textarea" placeholder="Escribe tu mensaje aquí..."></textarea>
      <p class="contactanos-text">
        Indícanos el correo electrónico al que deseas que te respondamos:
      </p>
      <input type="email" v-model="correo" class="contactanos-input" placeholder="Dirección de correo electrónico" />
      <input type="email" v-model="repetirCorreo" class="contactanos-input" placeholder="Reescribe tu correo electrónico" />
      <button @click="enviar" class="contactanos-button">Enviar</button>
      <p v-if="error" class="error-message">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import emailjs from 'emailjs-com';

export default {
  name: 'ComponenteContactanos',
  data() {
    return {
      mensaje: '',
      correo: '',
      repetirCorreo: '',
      error: ''
    };
  },
  methods: {
    validarCorreo(correo) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(correo);
    },
    enviar() {
      this.error = '';
      if (!this.validarCorreo(this.correo)) {
        this.error = 'El correo electrónico no tiene un formato válido.';
        return;
      }
      if (this.correo !== this.repetirCorreo) {
        this.error = 'Los correos electrónicos no coinciden.';
        return;
      }
      if (this.mensaje.trim() === '') {
        this.error = 'El mensaje no puede estar vacío.';
        return;
      }

      const templateParams = {
        to_email: '0421pllana@e-itaca.es',
        from_email: this.correo,
        message: this.mensaje
      };

      emailjs.send('service_tqzhpjq', 'template_fxwrref', templateParams, '-dAmIRZphGXphwRTr')
        .then(() => {
          alert('Mensaje enviado correctamente.');
          this.mensaje = '';
          this.correo = '';
          this.repetirCorreo = '';
        })
        .catch(error => {
          console.error('Error al enviar el mensaje:', error);  // Añadido para depuración
          this.error = 'Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.';
        });
    }
  }
}
</script>

<style scoped>
.contactanos-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 80vh;
  padding-top: 10vh;
}

.contactanos-container {
  background-color: #333;
  padding: 20px;
  border-radius: 10px;
  width: 500px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.contactanos-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
}

.contactanos-header i {
  font-size: 30px;
  color: white;
}

.contactanos-text {
  color: white;
  margin-bottom: 10px;
  text-align: left;
}

.contactanos-textarea {
  width: 100%;
  height: 300px;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  resize: none;
}

.contactanos-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: none;
}

.contactanos-button {
  background-color: #555;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.contactanos-button:hover {
  background-color: #777;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
