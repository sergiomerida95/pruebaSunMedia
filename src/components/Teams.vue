<template>
  <div class="container">
    <div class="row d-flex justify-content-center align-items-center">
      <div class="input-group">
        <button class="btn btn-success" type="button">
          {{ this.filterBy.value }}
        </button>
        <button
          type="button"
          class="btn btn-success dropdown-toggle dropdown-toggle-split"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        ></button>

        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <button class="dropdown-item" @click="changeFilter(filterBy.byTeam)">
            {{ this.filterBy.byTeam }}
          </button>
          <button
            class="dropdown-item"
            @click="changeFilter(filterBy.byMascot)"
          >
            {{ this.filterBy.byMascot }}
          </button>
        </div>
        <input
          class="form-control"
          id="inputTable"
          type="text"
          placeholder="Escriba lo que desee buscar correspondiente al filtro..."
          v-model="search"
        />
        <button type="button" class="btn btn-success" v-on:click="filterCards">
          Buscar
        </button>
        
      </div>
      
        <div class="input-group d-flex justify-content-center align-items-center mt-3">
          <button class="btn btn-success" type="button">
            {{ this.sortBy.value }}
          </button>
          <button
            type="button"
            class="btn btn-success dropdown-toggle dropdown-toggle-split"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          ></button>

          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <button
              class="dropdown-item"
              @click="sortLower"
            >
              {{ this.sortBy.lower}}
            </button>
            <button
              class="dropdown-item"
              @click="sortHigher"
            >
              {{ this.sortBy.higher }}
            </button>
          </div>
        </div>
      
      <div v-if="this.loading === false" class="row">
        <Card v-for="todo in todos" :key="todo.id" :inheritData="todo" />
      </div>

      <div v-else class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Card from "@/components/Card.vue";
export default {
  name: "Teams",
  components: {
    Card,
  },
  props: {},

  data() {
    return {
      todos: [],
      loading: Boolean,
      copyTodos: [],
      tableColumns: [],
      search: "",
      filterBy: {
        value: "",
        byTeam: "Equipo",
        byMascot: "Mascota",
        filter: "",
        enableSearch: null,
      },
      sortBy: {
        value: "Elija por lo que quiera ordenar",
        higher: "A-Z",
        lower: "Z-A"

      },
    };
  },

  created() {
    this.loading = true;
    this.getTodos();
    this.filterBy.value = "Elija un filtro antes de buscar";
  },

  methods: {
    /* Services */
    getTodos() {
      axios
        .get("https://api.collegefootballdata.com/teams")
        .then((r) => {
          this.todos = r.data;
          //rellenamos un nuevo array de objetos que será el que vamos a ir modificando al filtrar
          this.copyTodos = this.todos;
          this.loading = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    /* Events */
    filterCards: function () {
      if (this.enableSearch) {
        this.todos = this.copyTodos;
        this.todos = this.todos.filter((todo) => {
          let self = this;
          //Switch para cambiar el filtro que vamos a usar al pulsar el botón buscar dependiendo de lo que haya en el dropdown
          switch (self.filterBy.value) {
            case "Equipo":
              if (todo.school) {
                return todo.school
                  .toLowerCase()
                  .match(self.search.toLowerCase());
              }
              break;
            case "Mascota":
              if (todo.mascot) {
                return todo.mascot
                  .toLowerCase()
                  .match(self.search.toLowerCase());
              }
              break;
          }
        });
      }
    },

    changeFilter(filterBy) {
      //Activamos el buscar
      this.enableSearch = true;
      //Cambiamos el valor del dropdown
      this.filterBy.value = filterBy;
    },

    sortHigher(){
      this.sortBy.value = this.sortBy.higher;
      
      this.todos = this.todos.sort((a,b) => a.school > b.school ? 1 : -1);
    },
    sortLower(){
      this.sortBy.value = this.sortBy.lower;
      
      this.todos = this.todos.sort((a,b) => a.school < b.school ? 1 : -1);
    },
  },
};
</script>

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
}
.spinner-border {
  width: 3rem;
  height: 3rem;
  margin-top: 4rem;
}
</style>
