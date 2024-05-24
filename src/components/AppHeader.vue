<template>
  <header class="app-header">
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/herramienta">
          <img src="@/assets/logoBlanco.png" alt="Logo de la App" class="logo">
          
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <i class="bi bi-list"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li :class="{ active: $route.path === '/herramienta' }">
              <router-link to="/herramienta">Herramienta</router-link>
            </li>
            <li :class="{ active: $route.path === '/mejores-picks' }">
              <router-link to="/mejores-picks">Mejores Picks</router-link>
            </li>
            <li :class="{ active: $route.path === '/como-funciona' }">
              <router-link to="/como-funciona">Cómo Funciona</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scooped>
@import '../estilos/estilosHeader.css';
</style>

  