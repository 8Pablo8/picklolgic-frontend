<template>
  <div class="container-fluid d-flex justify-content-center align-items-center" style="position: relative;">
    <div id="circulo" class="rounded-circle d-flex justify-content-center align-items-center" style="width: 1000px; height: 1000px; position: relative;">
      <div class="w-100 px-5" style="max-width: 960px; position: relative;">
        <template v-if="!mostrarRecomendaciones">
          <h1 class="text-white text-center mb-5">Campeones elegidos</h1>
          <div class="row">
            <div class="col-2"></div>
            <div class="col-3">
              <div class="mb-3" style="position: relative;">
                <h2 class="text-white">Aliados</h2>
                <p class="subtitle">Introduce los campeones <b>aliados </b>ya seleccionados</p>
                <div>
                  <div v-for="(aliado, index) in aliados" :key="'aliado-' + index" class="position-relative mb-2">
                    <input
                      class="form-control"
                      type="text"
                      placeholder="Aliado"
                      v-model="aliados[index]"
                      @input="buscarCampeones(index, 'aliados')"
                    />
                    <ul v-if="aliadoSugerencias.length && aliadoInputIndex === index" class="list-group position-absolute w-100 autocomplete-suggestions">
                      <li v-for="sugerencia in aliadoSugerencias" :key="sugerencia.nombre" 
                          @click="seleccionarSugerencia(sugerencia.nombre, index, 'aliados')"
                          class="list-group-item">
                        {{ sugerencia.nombre }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-2"></div>
            <div class="col-3">
              <div class="mb-3" style="position: relative;">
                <h2 class="text-white">Rivales</h2>
                <p class="subtitle">Introduce los <b>enemigos </b>ya seleccionados</p>
                <div>
                  <div v-for="(rival, index) in rivales" :key="'rival-' + index" class="position-relative mb-2">
                    <input
                      class="form-control"
                      type="text"
                      placeholder="Rival"
                      v-model="rivales[index]"
                      @input="buscarCampeones(index, 'rivales')"
                    />
                    <ul v-if="rivalSugerencias.length && rivalInputIndex === index" class="list-group position-absolute w-100 autocomplete-suggestions">
                      <li v-for="sugerencia in rivalSugerencias" :key="sugerencia.nombre"
                          @click="seleccionarSugerencia(sugerencia.nombre, index, 'rivales')"
                          class="list-group-item">
                        {{ sugerencia.nombre }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-2"></div>
          <div class="d-flex justify-content-center align-items-center mt-4">
            <div class="me-5">
              <select v-model="selectedPosition" class="form-select">
                <option disabled value="">Posición</option>
                <option>Top</option>
                <option>Middle</option>
                <option>Bottom</option>
                <option>Support</option>
                <option>Jungle</option>
              </select>
            </div>
            <div>
              <button :disabled="!isFormValid" @click="obtenerRecomendacion" 
                      :class="[isFormValid ? 'btn-granate' : 'btn-secondary']">
                Obtener recomendación
              </button>
            </div>
          </div>
        </template>
        <template v-else>
          <MostrarRecomendacion :campeones="recomendaciones" />
        </template>
      </div>
    </div>
    <SpinnerCarga :visible="cargando" />
  </div>
</template>

<script>
import api from '@/api';
import DondeSeHaceLaMagia from '@/DondeSeHaceLaMagia';
import MostrarRecomendacion from '@/components/MostrarRecomendacion';
import SpinnerCarga from '@/components/SpinnerCarga';

export default {
  name: 'HerramientaPicklolgic',
  components: {
    MostrarRecomendacion,
    SpinnerCarga
  },
  data() {
    return {
      aliados: Array(4).fill(''),
      rivales: Array(5).fill(''),
      selectedPosition: '',
      aliadoSugerencias: [],
      aliadoInputIndex: -1,
      rivalSugerencias: [],
      rivalInputIndex: -1,
      validAliados: Array(4).fill(false),
      validRivales: Array(5).fill(false),
      magia: new DondeSeHaceLaMagia(),
      mostrarRecomendaciones: false,
      recomendaciones: [],
      cargando: false
    };
  },
  computed: {
    isFormValid() {
      const atLeastOneValidInput = this.validAliados.some(Boolean) || this.validRivales.some(Boolean);
      return this.selectedPosition !== '' && atLeastOneValidInput;
    }
  },
  methods: {
    async obtenerRecomendacion() {
      this.cargando = true;
      try {
        await this.magia.recibirDatos(this.selectedPosition, this.aliados, this.rivales);
        this.recomendaciones = this.magia.topDosAspirantesSinergia.map(nombre => {
          return {
            nombre,
            foto: `${nombre.toLowerCase().replace(/[^a-z0-9]/g, '')}.png`
          };
        });
        this.mostrarRecomendaciones = true;
      } catch (error) {
        console.error('Error obteniendo recomendaciones:', error);
      } finally {
        this.cargando = false;
      }
    },
    buscarCampeones(index, tipo) {
      const query = tipo === 'aliados' ? this.aliados[index] : this.rivales[index];
      if (query.length >= 2) {
        api.autocompletarCampeones(query)
          .then(response => {
            const sugerencias = response.data;
            if (tipo === 'aliados') {
              this.aliadoSugerencias = sugerencias;
              this.aliadoInputIndex = index;
              this.validAliados[index] = sugerencias.some(s => s.nombre === query);
            } else {
              this.rivalSugerencias = sugerencias;
              this.rivalInputIndex = index;
              this.validRivales[index] = sugerencias.some(s => s.nombre === query);
            }
          })
          .catch(error => {
            console.error('Error al buscar campeones:', error);
            if (tipo === 'aliados') {
              this.validAliados[index] = false;
            } else {
              this.validRivales[index] = false;
            }
          });
      } else {
        if (tipo === 'aliados') {
          this.aliadoSugerencias = [];
          this.aliadoInputIndex = -1;
          this.validAliados[index] = false;
        } else {
          this.rivalSugerencias = [];
          this.rivalInputIndex = -1;
          this.validRivales[index] = false;
        }
      }
    },
    seleccionarSugerencia(nombre, index, tipo) {
      if (tipo === 'aliados') {
        this.aliados[index] = nombre;
        this.aliadoSugerencias = [];
        this.aliadoInputIndex = -1;
        this.validAliados[index] = true;
      } else {
        this.rivales[index] = nombre;
        this.rivalSugerencias = [];
        this.rivalInputIndex = -1;
        this.validRivales[index] = true;
      }
    }
  }
};
</script>

<style>
@import '../estilos/estilosHerramienta.css';
</style>
