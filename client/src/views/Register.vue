<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="section">
          <div class="container grid-2">
            <div class="columns">
              <div class="column">
                <div class="notification">
                  <h1 class="subtitle">Register</h1>
                  <div class="field">
                    <p class="control has-icons-left has-icons-right">
                      <input
                        class="input"
                        type="text"
                        placeholder="Username"
                        v-model="username"
                      />
                      <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                      </span>
                      <span class="icon is-small is-right">
                        <i class="fas fa-check"></i>
                      </span>
                    </p>
                  </div>
                  <div class="field">
                    <p class="control has-icons-left has-icons-right">
                      <input
                        class="input"
                        type="email"
                        placeholder="Email"
                        v-model="email"
                      />
                      <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                      </span>
                      <span class="icon is-small is-right">
                        <i class="fas fa-check"></i>
                      </span>
                    </p>
                  </div>
                  <div class="field">
                    <p class="control has-icons-left">
                      <input
                        class="input"
                        type="password"
                        placeholder="Password"
                        v-model="password"
                      />
                      <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                      </span>
                    </p>
                  </div>
                  <div class="field">
                    <div class="columns">
                      <div class="column grid">
                        <p class="control">
                          <button
                            class="button hero-section-backg-2"
                            @click.prevent="register()"
                          >
                            Register
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
