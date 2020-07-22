<template>
  <div id="app" class="background is-family-code">
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "App",
  components: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.background {
  background: #702632;
}

.text-color {
  color: #702632;
}

.backg-header {
  background: #584b4f;
}

.header-text-color {
  color: #3298dc;
}

.hero-section-backg {
  background: #3298dc;
}

.hero-section-backg-2 {
  background: #ffd152;
}

.main-title-text {
  color: #eed9b7;
}

.center {
  justify-content: center;
  align-items: center;
  text-align: center;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.grid * {
  grid-column: 1/2;
}

.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.grid-2 * {
  grid-column: 1/3;
}

.grid-3 {
  display: grid;
  grid-template-columns: 1fr;
}

.grid-4 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.grid-4 * {
  grid-column: 2/3;
}

.google-signin-button {
  color: white;
  background-color: red;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.navbar-item.has-text-white:hover {
  color: #702632 !important;
}

.this-hover.has-text-white:hover {
  color: #702632 !important;
}
</style>
