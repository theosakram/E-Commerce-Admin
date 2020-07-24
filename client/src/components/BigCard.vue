<template>
  <div class="column is-one-third">
    <div class="card">
      <div class="card-image" v-if="category === 'Figma'">
        <figure class="image is-4by3">
          <img
            src="https://images.goodsmile.info/cgm/images/product/20191028/8936/64934/large/270e119cbb4d109067d92aad96db8fa8.jpg"
            alt="Edelgard von Hresvelg"
          />
        </figure>
      </div>

      <div class="card-image" v-else-if="category === 'Funko'">
        <figure class="image is-4by3">
          <img
            src="https://ecs7.tokopedia.net/img/cache/700/product-1/2020/3/3/220746630/220746630_62dc182b-120c-451e-85fd-0bd9bb540953_2048_2048.jpg"
            alt="Saitama"
          />
        </figure>
      </div>

      <div class="card-image" v-else-if="category === 'Nendoroid'">
        <figure class="image is-4by3">
          <img
            src="https://images.goodsmile.info/cgm/images/product/20200401/9401/68844/large/160358f71b8c627f85c4364ac3bffae8.jpg"
            alt="Hatsune Miku"
          />
        </figure>
      </div>

      <div class="card-image" v-else-if="category === 'PPP'">
        <figure class="image is-4by3">
          <img
            src="https://images.goodsmile.info/cgm/images/product/20200310/9337/68177/large/eb4fcbecdd69c598cdfdc5af03267bc5.jpg"
            alt="Hina Amano"
          />
        </figure>
      </div>

      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <router-link
              :to="'/dashboard/' + category"
              class="title is-4 has-text-black"
              ><button class="button is-info is-outlined">
                {{ category }}
              </button></router-link
            >
          </div>
        </div>

        <div class="content" v-if="category === 'Figma'">
          Figmas size is between 10-24 centimeters. One of the biggest
          distributors of this figures is Good Smile Company and Max Factory to
          be the first to create the Figma line.
          <a href="#">#Figures</a> <br />
          <a href="#">#Figma</a>
          <br />
        </div>

        <div class="content" v-else-if="category === 'Funko'">
          Created by the company of the same, Funko may fall under the Nendoroid
          design but the line has been so popular that it deserves to be mention
          as a different type of figure.
          <a href="#">#Figures</a> <br />
          <a href="#">#Funko</a>
          <br />
        </div>

        <div class="content" v-else-if="category === 'Nendoroid'">
          Nendoroid is the most famous lines of Chibi figurines, created by Good
          Smile Company and the other one that is quite recent would be the
          Cu-Poche by Kotobukiya.
          <a href="#">#Figures</a> <br />
          <a href="#">#Nendoroid</a>
          <br />
        </div>

        <div class="content" v-else-if="category === 'PPP'">
          POP UP PARADE is a new series of figures that stands around 17-18cm in
          height and the series features a vast selection of characters from
          popular anime and game series.
          <a href="#">#Figures</a> <br />
          <a href="#">#PPP</a>
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["category"],
};
</script>

<style></style>
