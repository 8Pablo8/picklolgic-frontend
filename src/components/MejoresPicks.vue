<template>
  <div>
    <div v-if="cargando">
      <SpinnerCarga :visible="cargando" />
    </div>
    <div v-else class="mejores-picks">
      <div class="titulo-mejorespicks">
        <h2>Mejores Campeones del parche actual</h2>
      </div>
      <div>
        <label class="etiqueta" for="posicion">Filtrar por linea</label>
        <select id="posicion" v-model="filtroPosicion">
          <option value="">Todas</option>
          <option value="Bottom">Bottom</option>
          <option value="Top">Top</option>
          <option value="Middle">Middle</option>
          <option value="Support">Support</option>
          <option value="Jungle">Jungle</option>
        </select>
      </div>
      <div class="campeones-lista">
        <div class="campeon" v-for="campeon in campeonesFiltradosUnicos" :key="campeon.nombre">
          <img :src="`/fotos/${campeon.foto}`" :alt="campeon.nombre" class="campeon-foto">
          <p id="nombres-c">• {{ campeon.nombre }} •</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DondeSeHaceLaMagia from '@/DondeSeHaceLaMagia';
import SpinnerCarga from '@/components/SpinnerCarga';

export default {
  name: 'MejoresPicks',
  components: {
    SpinnerCarga
  },
  data() {
    return {
      campeonesPorPosicion: {
        Bottom: [],
        Top: [],
        Middle: [],
        Support: [],
        Jungle: []
      },
      filtroPosicion: '',
      cargando: true
    };
  },
  computed: {
    campeonesFiltrados() {
      let todosLosCampeones = [];
      for (const posicion in this.campeonesPorPosicion) {
        todosLosCampeones = todosLosCampeones.concat(this.campeonesPorPosicion[posicion]);
      }
      if (this.filtroPosicion) {
        return todosLosCampeones.filter(campeon => campeon.posicion === this.filtroPosicion);
      }
      return todosLosCampeones;
    },
    campeonesFiltradosUnicos() {
      const nombresUnicos = new Set();
      return this.campeonesFiltrados.filter(campeon => {
        if (nombresUnicos.has(campeon.nombre)) {
          return false;
        } else {
          nombresUnicos.add(campeon.nombre);
          return true;
        }
      });
    }
  },
  async created() {
    const magia = new DondeSeHaceLaMagia();
    const posiciones = ['Bottom', 'Top', 'Middle', 'Support', 'Jungle'];

    try {
      for (const posicion of posiciones) {
        this.campeonesPorPosicion[posicion] = await magia.obtenerTopCincoPorPosicion(posicion);
        // Añadir la posición a cada campeón
        this.campeonesPorPosicion[posicion] = this.campeonesPorPosicion[posicion].map(campeon => ({
          ...campeon,
          posicion: posicion
        }));
      }
    } catch (error) {
      console.error('Error obteniendo los campeones:', error);
    } finally {
      this.cargando = false;
    }
  }
};
</script>

<style scoped>
.mejores-picks {
  margin-top: 50px;
  padding: 20px;
  background-color: #141414;
  color: white;
  border-radius: 10px;
  opacity: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.titulo-mejorespicks {
  text-align: center;
  padding: 5px;
}

label, select {
  display: block;
  margin: 10px 0;
  text-align: center;
  background-color: #141414;
  color: white;
  border: solid 1px rgb(77, 76, 76);
  border-radius: 5px;
  padding: 5px;
}

.campeones-lista {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px;
  background-color: #141414;
  border-radius: 10px;
  justify-content: center;
}

.campeon {
  text-align: center;
  flex: 0 0 20%;
  font-weight: bold; 
}

.etiqueta{
  border: none;
}

#nombres-c{
  padding-top: 10px;
}

.campeon-foto {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.campeon p {
  color: white;
}

#posicion {
  margin-bottom: 20px;
  background-color: #141414;
  color: white;
  padding: 5px;
  margin-left: 12px;
}
</style>
