<template>
<div>
  <div class="row cards-list mb-3 justify-content-center" style="min-height: 514px; min-width: 290px">
    <div class="card col-md-3 m-1" v-for="person in portion" v-bind:key="person.id">
      <div class="card-body">
        <h5 class="card-title">{{ person.name }}</h5>
        <h6 class="card-subtitle mb-2">Species: {{ person.species }}</h6>
        <p>BirthYear: {{ person.birth_year }}</p>
        <a v-bind:href="person.url" class="card-link">More</a>
      </div>
    </div>
  </div>
  <nav aria-label="Page navigation" class="d-flex justify-content-center mb-4">
    <button style="max-width: 86px; max-height: 38px;" type="button" class="btn btn-secondary" v-bind:disabled="pageNumber <= 1" v-on:click="previousPage">
      Previous
    </button>
    <div class="btn-group flex-wrap justify-content-center" role="group" aria-label="pagination">
      <button style="max-width: 44px; max-height: 38px;" v-for="page in pageCount" v-bind:key="page.id" v-on:click="changePage(page)" v-bind:disabled="pageNumber === page" type="button" class="btn btn-secondary">{{ page }}</button>
    </div>
    <button style="max-width: 60px; max-height: 38px;" type="button" class="btn btn-secondary" v-bind:disabled="pageNumber >= pageCount" v-on:click="nextPage">
      Next
    </button>
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
    },
    getFirstPage() {
      if (this.pageCount < this.pageNumber) {
        this.pageNumber = 1
      }
    }
  },
  computed: {
    pageCount() {
      var pages = Math.ceil(this.filteredData.length / this.cardsOnPage)
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
      this.getFirstPage()
      var start = (this.cardsOnPage * this.pageNumber) - this.cardsOnPage
      var end = start + this.cardsOnPage
      return this.filteredData.slice(start, end)
    }
  }
}
</script>
