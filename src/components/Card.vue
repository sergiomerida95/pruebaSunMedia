<template>
  <div class="col flex-grow-0">
    <div :to="'/individual'" class="card card-container">
      <div class="card-header">
        <!--   Si la imagen da error, ponemos una por defecto -->
        <img
          
          class="card-img-top"
          :src="inheritData.logos[0]"
          @error="
            $event.target.src =
              'http://a.espncdn.com/i/teamlogos/ncaa/500/2747.png'
          "
        />
      </div>
      <div
        class="card-body text-center d-flex flex-column justify-content-center align-items-center"
      >
        <router-link :to="{name:'Individual', params:{id:inheritData.id, team:inheritData}}">{{ inheritData.school }}</router-link>
        <h5 class="card-title">{{ inheritData.mascot }}</h5>
        <!--  Vemos si existe color -->
        <div
          v-if="inheritData.color"
          class="circle"
          :style="{ backgroundColor: inheritData.color }"
        ></div>
        <!--  Si no existe color, pintamos el color alternativo -->
        <div
          v-else-if="inheritData.alt_color"
          class="circle"
          :style="{ backgroundColor: inheritData.alt_color }"
        ></div>
        <!--  Si no existe ninguno, no pintamos nada -->
        <div v-else>
          <p>Equipo sin color</p>
        </div>
      </div>
      <div class="card-footer text-center">
        <button
          v-if="this.favorite === false"
          class="btn btn-success mb-3"
          @click="addFavorites"
          type="button"
        >
          Añadir a favoritos
        </button>
        <div v-if="this.favorite === true">
          <button
          
          class="btn btn-danger mb-3"
          @click="deleteFavorites"
          type="button"
        >
          Eliminar de favoritos
        </button>
       
          <input
         
            class="form-control"
            id="inputFav"
            type="text"
            placeholder="Añada un comentario"
          />
          <button
          
            type="button"
            class="btn btn-info mt-1"
          >
            Añadir comentario
          </button>
        </div>
        
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    inheritData: Object,
  },

  data() {
    return {
      favorite: false,
    };
  },

  created() {},
  computed: {},

  methods: {
    addFavorites() {
      this.favorite = true;
    },

    deleteFavorites() {
      this.favorite = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
  font-size: 1.8rem;
}
.card {
  max-width: 15rem;
  min-width: 15rem;
  margin-top: 2rem;
  transition-duration: 0.4s;
}
.card:hover {
  background-color: #c8ccd2;
  color: white;
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
}

.circle {
  display: flex;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid;
}

.coment {
  display: none;
}
</style>
