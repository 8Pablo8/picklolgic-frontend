// src/router.js
import { createRouter, createWebHashHistory } from 'vue-router';
import HerramientaPicklolgic from './components/HerramientaPicklolgic.vue';
import MejoresPicks from './components/MejoresPicks.vue';
import ComoFunciona from './components/ComoFunciona.vue';
import ComponenteContactanos from './components/ComponenteContactanos.vue';
import MostrarRecomendacion from './components/MostrarRecomendacion.vue';

const routes = [
  { path: '/', component: HerramientaPicklolgic }, // Ruta predeterminada
  { path: '/herramienta', component: HerramientaPicklolgic },
  { path: '/mejores-picks', component: MejoresPicks },
  { path: '/como-funciona', component: ComoFunciona },
  { path: '/componente-contactanos', component: ComponenteContactanos },
  { path: '/mostrar-recomendacion', component: MostrarRecomendacion, props: route => ({ campeones: route.params.campeones }) }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
