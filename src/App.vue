<template>
<div id="app">
  <header>
    <app-header></app-header>
  </header>
  <main>
    <section class="cards-section container pt-4">
      <input v-if="!errored" v-model.lazy="filter" v-debounce="500"  class="main-search form-control mb-3" placeholder="Search characters">
      <div v-if="errored" class="alert alert-danger" role="alert">
        We're sorry, we're not able to retrieve this information at the moment, please try back later
      </div>
      <div v-if="loading" class="d-flex justify-content-center">
        <div class="spinner-border text-light" style="width: 6rem; height: 6rem;" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <app-people-list v-if="!errored" v-bind:filter="filter" v-bind:people="characters">
      </app-people-list>
    </section>
  </main>
</div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      characters: [],
      filter: '',
      errored: false,
      loading: true
    }
  },
  methods: {
    getSpecies(i) {
      if (i.species[0]) {
        axios.get(i.species[0])
          .then(response => {
            i.species = response.data.name
          })
      } else {
        i.species = 'unknown'
      }
    }
  },
  mounted() {
    axios.all([
        axios.get('https://swapi.co/api/people/'),
        axios.get('https://swapi.co/api/people/?page=2'),
        axios.get('https://swapi.co/api/people/?page=3'),
        axios.get('https://swapi.co/api/people/?page=4'),
        axios.get('https://swapi.co/api/people/?page=5'),
        axios.get('https://swapi.co/api/people/?page=6'),
        axios.get('https://swapi.co/api/people/?page=7'),
        axios.get('https://swapi.co/api/people/?page=8'),
        axios.get('https://swapi.co/api/people/?page=9'),
      ])
      .then(axios.spread((page_1, page_2, page_3, page_4, page_5, page_6, page_7, page_8, page_9) => {
        this.characters = page_1.data.results.concat(page_2.data.results, page_3.data.results,
          page_4.data.results, page_5.data.results, page_6.data.results, page_7.data.results,
          page_8.data.results, page_9.data.results)
        this.characters.forEach(item => {
          this.getSpecies(item)
        })
      }))
      /*eslint-disable no-unused-vars*/
      .catch(error => {this.errored = true
      })
      /*eslint-enable no-unused-vars*/
      .finally(() => {
        this.loading = false
      })
  }
}
</script>

<style>
body {
  color: #ffffff;
  background-color: #000000;
  background: url('./assets/zvezdnoe_nebo_zvezdy_chernyj_blesk_118255_2560x1440.jpg') repeat;
  background-attachment: fixed;
}

.btn-search-open {
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-search-open:hover,
.btn-search-open:active {
  background-color: #343a40;
  border-color: rgba(255, 255, 255, 0.1);
}

.nav-item {
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 10px;
}

.navbar .form-inline {
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 10px;
  min-height: 61.5px;
}

.main-search {
  color: #ffffff;
  background-color: rgba(52, 58, 64, 0.8);
  border-color: rgba(52, 58, 64, 1);
}

.main-search:focus {
  background-color: #6c757d;
  color: #ffffff;
}

.cards-list .card {
  border-color: rgba(52, 58, 64, 1);
  background-color: rgba(52, 58, 64, 0.8);
}
</style>
