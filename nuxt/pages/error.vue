<template>
  <section class="section error">
    <div class="container">
      <h1 class="title has-text-centered is-2 is-size-3-mobile ted-red">
        Oops! Ci siamo persi.
      </h1>
      <h2 class="subtitle has-text-centered ted-red is-3 is-size-4-mobile mb-2">
        Non ti preoccupare, abbiamo qualcosa per te.
      </h2>
      <div style="position:relative;height:0;padding-bottom:56.25%">
        <iframe
          src="https://embed.ted.com/talks/renny_gleeson_404_the_story_of_a_page_not_found"
          width="854"
          height="480"
          style="position:absolute;left:0;top:0;width:100%;height:100%"
          frameborder="0"
          scrolling="no"
          allowfullscreen>
        </iframe>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    /**
     * @description As mentioned above, this layout is special,
     * since you should not include <nuxt/> inside its template.
     * @see https://nuxtjs.org/guide/views/#error-page
     */
    props: ['error'],
    name: "error"
  }
</script>

<style scoped>

</style>
