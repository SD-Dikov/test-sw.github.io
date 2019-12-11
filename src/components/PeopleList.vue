<template>
<div>
  <div class="row cards-list mb-3 justify-content-center" style="min-height: 514px; min-width: 290px">
    <div class="card col-md-3 m-1" v-for="person in portion">
      <div class="card-body">
        <h5 class="card-title">{{ person.name }}</h5>
        <h6 class="card-subtitle mb-2">Species: {{ person.species }}</h6>
        <p>BirthYear: {{ person.birth_year }}</p>
        <a v-bind:href="person.url" class="card-link">More</a>
      </div>
    </div>
  </div>
  <nav aria-label="Page navigation" class="d-flex justify-content-center mb-4">
    <div class="btn-group" role="group" aria-label="pagination">
      <button type="button" class="btn btn-secondary" v-bind:disabled="pageNumber <= 1" v-on:click="previousPage">
        Previous
      </button>
      <button v-for="page in pageCount" v-on:click="changePage(page)" v-bind:disabled="pageNumber === page" type="button" class="btn btn-secondary">{{ page }}</button>
      <button type="button" class="btn btn-secondary" v-bind:disabled="pageNumber >= pageCount" v-on:click="nextPage">
        Next
      </button>
    </div>
  </nav>
</div>
</template>

<script>
export default {
  data() {
    return {
      pageNumber: 1
    }
  },
  props: {
    people: {
      required: true
    },
    filter: {
      type: String,
      required: false
    },
    cardsOnPage: {
      type: Number,
      required: false,
      default: 9
    }
  },
  methods: {
    nextPage() {
      this.pageNumber++
    },
    previousPage() {
      this.pageNumber--
    },
    changePage(number) {
      this.pageNumber = number
    }
  },
  computed: {
    pageCount() {
      var pages = Math.ceil(this.filteredData.length / this.cardsOnPage)
      if (pages < this.pageNumber) {
        this.pageNumber = 1
      }
      return pages
    },
    filteredData() {
      var lowCaseSearch = this.filter.toLowerCase()
      return this.people.filter(function(i) {
        return Object.values(i).some(function(j) {
          return j.toString().toLowerCase().includes(lowCaseSearch)
        })
      })
    },
    portion() {
      var start = (this.cardsOnPage * this.pageNumber) - this.cardsOnPage
      var end = start + this.cardsOnPage
      return this.filteredData.slice(start, end)
    }
  }
}
</script>
