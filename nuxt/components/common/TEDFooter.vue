<template>
  <div id="footerContainer" class="section black-bg">
    <div class="container">
      <footer class="footer transparent-bg">
        <div class="content">
          <div class="columns is-multiline is-vcentered">
            <div class="column mb-2-mobile">
              <TEDLogo color="#fff"/>
            </div>
            <div class="column mb-2-mobile">
              <div class="columns is-mobile h-100 is-vcentered">
                <div
                  :key="social.name"
                  v-for="social in socials"
                  class="column is-one-third-mobile">
                  <a itemprop="url" rel="noreferrer" :href="social.url" target="_blank">
                    <figure class="image mx-auto is-32x32">
                      <img :src="`/icons/${social.name}.png`" :alt="social.name" />
                    </figure>
                  </a>
                </div>
              </div>
            </div>
            <div class="column">
              <p class="mt-1 has-text-left ted-white">
                Trame | Associazione per Tedx Schio | C.F. 94020440247
              </p>
              <p class="has-text-left ted-white">
                Sede legale: Viale Roma, 55 36015 Schio
              </p>
              <p class="has-text-left ted-white">
                Email: <a class="ted-white" href="mailto:tedxschio@gmail.com">tedxschio@gmail.com</a>
              </p>
            </div>
          </div>
          <div class="divider w-100 my-2"></div>
          <div class="columns">
            <div class="column">
              <p class="has-text-left has-text-left-mobile ted-white">
                © TEDxSchio.
              </p>
            </div>
            <div class="column">
              <p class="has-text-right has-text-left-mobile ted-white">
                This independent TEDx event is operated under license from TED.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
    <div @click="scrollToTop" class="arrow-top pointer" :class="{ 'none' : hideArrow }">
      <img src="/icons/arrow.png" alt="arrow-top" />
    </div>
  </div>
</template>

<script>
  export default {
    name: "TEDFooter",
    data: () => ({
      hideArrow: true,
      socials: [
        { name: 'facebook', url: 'https://www.facebook.com/TEDxSchio/' },
        { name: 'instagram', url: 'https://www.instagram.com/tedxschio/' },
        { name: 'linkedin', url: 'https://www.linkedin.com/company/tedxschio/' },
      ]
    }),
    components: {
      TEDLogo: () => import('@/components/common/TEDLogo'),
    },
    methods: {
      /**
       * @see https://developer.mozilla.org/en-US/docs/Web/API/ScrollToOptions#Properties
       * @see https://stackoverflow.com/a/50456738
       */
      scrollToTop() {
        const opts = { left: 0, top: 0, behavior: 'smooth' }
        window && window.scrollTo(opts);
      },
      handleScrollToTop() {
        this.hideArrow = document.documentElement.scrollTop <= 200
      },
    },
    mounted() {
      window.addEventListener("scroll", this.handleScrollToTop, { passive: true });
    },
    destroyed() {
      window.removeEventListener("scroll", this.handleScrollToTop);
    }
  }
</script>

<style lang="scss" scoped>
  .divider {
    display: block;
    height: 2px;
    background-color: $ted-light-grey;
  }
  .arrow-top {
    border-radius: 100%;
    background-color: $ted-white;
    border: 2px solid $ted-dark-black;
    width: 60px;
    height: 60px;
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 50;

    img {
      max-width: 75%;
      transform: rotate(180deg);
      left: 8px;
      position: absolute;
      top: 7px;
    }
  }
</style>
