<template>
  <div class="column">
    <aside class="menu">
      <p class="menu-label has-text-white">
        Product
      </p>
      <ul class="menu-list">
        <li>
          <router-link to="/add" class="this-hover has-text-white"
            >Add</router-link
          >
        </li>
      </ul>
      <p class="menu-label has-text-white">
        Category
      </p>
      <ul class="menu-list has-text-white">
        <li>
          <a class="this-hover has-text-white"> Figma</a>
        </li>
        <li>
          <a href="#" class="this-hover has-text-white"> Funko </a>
        </li>
        <li>
          <a href="#" class="this-hover has-text-white"> Nendoroid </a>
        </li>
      </ul>
      <p class="menu-label has-text-white">
        Actions
      </p>
      <ul class="menu-list">
        <li>
          <router-link to="/" class="this-hover has-text-white"
            >Logout</router-link
          >
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
