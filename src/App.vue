<template>
<div id="app">
  <header>
    <app-header></app-header>
  </header>
  <main>
    <section class="cards-section container pt-4">
      <input v-if="!errored" v-model.lazy="filter" v-on:change="getFirstPage" v-debounce="500" class="main-search form-control mb-3" placeholder="Search characters">
      <div v-if="errored" class="alert alert-danger" role="alert">
        We're sorry, we're not able to retrieve this information at the moment, please try back later
      </div>
      <div v-if="loading" class="d-flex justify-content-center">
        <div class="spinner-border text-light people-spinner" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <app-people-list v-if="!errored && !loading" v-bind:people="characters">
      </app-people-list>
      <nav v-if="!errored" aria-label="Page navigation" class="d-flex justify-content-center mb-4">
        <button type="button" class="btn btn-secondary btn-prev" v-bind:disabled="pageNumber <= 1" v-on:click="previousPage">
          Previous
        </button>
        <div class="btn-group flex-wrap justify-content-center" role="group" aria-label="pagination">
          <button v-for="page in pageCount" v-bind:key="page.id" v-on:click="changePage(page)" v-bind:disabled="pageNumber === page" type="button" class="btn btn-secondary btn-number">{{ page }}</button>
        </div>
        <button type="button" class="btn btn-secondary btn-next" v-bind:disabled="pageNumber >= pageCount" v-on:click="nextPage">
          Next
        </button>
      </nav>
    </section>
  </main>
</div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      charactersQuantity: 10,
      pageNumber: 1,
      cardsOnPage: 10,
      characters: [],
      filter: '',
      errored: false,
      loading: true
    }
  },
  methods: {
    getFirstPage(){
      this.pageNumber = 1
      this.getCharacters()
    },
    getSearch() {
      axios
        .get('https://swapi.co/api/people/?search=' + this.filter + '&page=' + this.pageNumber)
        .then(response => {
          this.charactersQuantity = response.data.count
          this.characters = response.data.results
          this.characters.forEach(item => {
            this.getSpecies(item)
          })
        })
        /*eslint-disable no-unused-vars*/
        .catch(error => {
          this.errored = true
        })
        /*eslint-enable no-unused-vars*/
        .finally(() => {
          this.loading = false
        })
    },
    getRequest(){
      axios
        .get('https://swapi.co/api/people/?page=' + this.pageNumber)
        .then(response => {
          this.charactersQuantity = response.data.count
          this.characters = response.data.results
          this.characters.forEach(item => {
            this.getSpecies(item)
          })
        })
        /*eslint-disable no-unused-vars*/
        .catch(error => {
          this.errored = true
        })
        /*eslint-enable no-unused-vars*/
        .finally(() => {
          this.loading = false
        })
    },
    getCharacters() {
      this.loading = true
      if (this.filter) {
        this.getSearch()
      } else {
        this.getRequest()
      }
    },
    nextPage() {
      this.pageNumber++
      this.getCharacters()
    },
    previousPage() {
      this.pageNumber--
      this.getCharacters()
    },
    changePage(number) {
      this.pageNumber = number
      this.getCharacters()
    },
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
    this.getCharacters()
  },
  computed: {
    pageCount() {
      return Math.ceil(this.charactersQuantity / this.cardsOnPage)
    }
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

.people-spinner {
  width: 6rem;
  height: 6rem;
}

.btn-prev {
  max-width: 86px;
  max-height: 38px;
}

.btn-next {
  max-width: 60px;
  max-height: 38px;
}

.btn-number {
  max-width: 44px;
  max-height: 38px;
}
</style>
