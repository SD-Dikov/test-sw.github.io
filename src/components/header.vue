<template>
<div>
  <b-navbar class="flex-lg-column" toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand class="mb-2" href="#">
      <img class="d-none d-lg-block" src="../assets/sw_logo_stacked.png" width="293" height="127" alt="star wars logo">
      <img class="d-lg-none img-fluid" src="../assets/sw_logo_horiz.png" width="366" height="38" alt="star wars logo">
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#">Home</b-nav-item>
        <b-nav-item class="active" href="#">characters<span class="sr-only">(current)</span></b-nav-item>
        <b-nav-item href="#">Starships</b-nav-item>
        <b-nav-item href="#">Vehicles</b-nav-item>
        <b-nav-item href="#">Species</b-nav-item>
        <b-nav-item href="#">Planets</b-nav-item>
        <b-nav-item href="#">Films</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>
