<template>
  <div id="app">
    <Navbar id="nav"></Navbar>
    <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Register</router-link> |
      <router-link to="/landingPage">Landing Page</router-link> -->
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar,
  },
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
  background: #353335;
}

.backg-header {
  background: #584b4f;
}

.header-text-color {
  color: #729f7f;
}

.hero-section-backg {
  background: #7baf9f;
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
  grid-column: 1/3;
}

.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.grid-2 * {
  grid-column: 2/3;
}

.grid-3 {
  display: grid;
  grid-template-columns: 1fr;
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
</style>
