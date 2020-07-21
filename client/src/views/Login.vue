<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="section">
          <div class="container grid-2">
            <div class="columns">
              <div class="column">
                <div class="notification">
                  <h1 class="subtitle">Login</h1>
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
                            class="button hero-section-backg"
                            @click.prevent="login()"
                          >
                            Login
                          </button>
                        </p>
                      </div>
                      <div class="column">
                        <button
                          v-google-signin-button="clientId"
                          class="google-signin-button"
                        >
                          Continue with Google
                        </button>
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
