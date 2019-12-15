<template>
<div>
  <div class="row cards-list mb-3 justify-content-center">
    <div class="card col-md-3 m-1" v-for="person in people" v-bind:key="person.id">
      <div class="card-body">
        <h5 class="card-title">{{ person.name }}</h5>
        <h6 class="card-subtitle mb-2">Species: {{ person.species }}</h6>
        <p>BirthYear: {{ person.birth_year }}</p>
        <a v-bind:href="person.url" class="card-link">More</a>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    people: {
      required: true
    }
  }
}
</script>
