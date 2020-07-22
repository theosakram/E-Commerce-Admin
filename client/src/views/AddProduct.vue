<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="section">
          <div class="container grid-4">
            <div class="columns">
              <div class="column">
                <div class="notification ">
                  <h1 class="subtitle">Add Product</h1>
                  <div class="field">
                    <p class="control has-icons-left has-icons-right">
                      <input
                        class="input"
                        type="text"
                        placeholder="Name"
                        v-model="name"
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
                        type="text"
                        placeholder="URL"
                        v-model="image_url"
                      />
                      <span class="icon is-small is-left">
                        <i class="fas fa-link"></i>
                      </span>
                    </p>
                  </div>
                  <div class="field">
                    <div class="control">
                      <div class="select is-icon">
                        <select v-model="category">
                          <option>Figma</option>
                          <option>Funko</option>
                          <option>Nendoroid</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="field">
                    <p class="control has-icons-left">
                      <input
                        class="input"
                        type="number"
                        placeholder="Price"
                        v-model="price"
                      />
                      <span class="icon is-small is-left">
                        <i class="fas fa-money-bill-wave"></i>
                      </span>
                    </p>
                  </div>
                  <div class="field">
                    <p class="control has-icons-left">
                      <input
                        class="input"
                        type="number"
                        placeholder="Stock"
                        v-model="stock"
                      />
                      <span class="icon is-small is-left">
                        <i class="fas fa-warehouse"></i>
                      </span>
                    </p>
                  </div>
                  <div class="field">
                    <div class="columns">
                      <div class="column grid">
                        <p class="control">
                          <button class="button has-text-white background">
                            Add
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
