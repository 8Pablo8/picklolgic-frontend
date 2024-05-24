<template>
  <footer class="app-footer">
    <div class="contact-info">
      <li :class="{ active: $route.path === '/componente-contactanos' }">
        <router-link to="/componente-contactanos">
          Contáctanos
          <i :class="{'bi bi-envelope': $route.path !== '/componente-contactanos', 'bi bi-envelope-open': $route.path === '/componente-contactanos'}"></i>
        </router-link>
      </li>
    </div>
  </footer>
</template>

<style scooped>
  @import '../estilos/estilosFooter.css';
</style>
