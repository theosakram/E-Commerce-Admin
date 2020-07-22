<template>
  <div class="hero-head">
    <nav class="navbar">
      <div class="container">
        <div class="navbar-brand">
          <router-link to="/" class="navbar-item">
            <h1 class="title has-text-white">CWR</h1>
          </router-link>
          <span class="navbar-burger burger" data-target="navbarMenuHeroB">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div id="navbarMenuHeroB" class="navbar-menu">
          <div class="navbar-end">
            <router-link to="/login" class="navbar-item has-text-white">
              Login
            </router-link>
            <a
              href="https://github.com/theosakram/Ecommerce-CMS"
              class="navbar-item has-text-white"
              target="_blank"
            >
              Documentation
            </a>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
