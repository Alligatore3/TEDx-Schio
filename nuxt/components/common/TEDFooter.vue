<template>
  <div class="section black-bg">
    <div class="container">
      <footer class="footer transparent-bg">
        <div class="content">
          <div class="columns is-multiline is-vcentered">
            <div class="column">
              <p class="has-text-left ted-white">
                Trame | Associazione per Tedx Schio | C.F. 94020440247
              </p>
              <p class="has-text-left ted-white">
                Sede legale: Viale Roma, 55 36015 Schio
              </p>
              <p class="has-text-left ted-white">
                Email: <a class="ted-white" href="mailto:tedxschio@gmail.com">tedxschio@gmail.com</a>
              </p>
            </div>
            <div class="column">
              <div class="columns h-100 is-vcentered">
                <div
                  :key="social.name"
                  v-for="social in socials"
                  class="column">
                  <a itemprop="url" rel="noreferrer" :href="social.url" target="_blank">
                    <figure class="image mx-auto is-32x32">
                      <img :src="`icons/${social.name}.png`" :alt="social.name" />
                    </figure>
                  </a>
                </div>
              </div>
            </div>
            <div class="column">
              <p class="has-text-right ted-white">
                © TEDxSchio.
              </p>
              <p class="has-text-right ted-white">
                This independent TEDx event is operated under license from TED.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TEDFooter",
    data: () => ({
      socials: [
        { name: 'facebook', url: 'https://www.facebook.com/TEDxSchio/' },
        { name: 'instagram', url: 'https://www.instagram.com/tedxschio/' },
        { name: 'linkedin', url: 'https://www.linkedin.com/company/tedxschio/' },
      ]
    })
  }
</script>

<style scoped>
  .fa-linkedin:before {
    content: "\f08c";
  }
</style>
