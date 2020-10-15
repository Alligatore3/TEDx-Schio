<template>
  <div class="container px-2-mobile">
    <div v-html="html" />
    <img class="my-4" :src="image.source_url" :alt="image.alt_text" />
    <div class="mb-5" v-html="what" />
    <h4 class="mb-5" v-html="when" />
    <h4 class="mb-5" v-html="where" />
    <div class="mb-5" v-html="how" />
    <a
      class="has-text-centered is-size-2 is-block my-6 ted-red is-size-3-mobile	"
      :href="page.acf.gform"
      alt="Iscrivit al TED Circle"
      target="_blank"
      rel="nofollow">
      Iscriviti al TED Circle
    </a>
  </div>
</template>

<script>
  export default {
    name: "TEDxCircles",
    props: {
      page: {
        type: Object,
        default: () => ({})
      }
    },
    computed: {
      dateObject() {
        const { acf: { when } } = this.page
        return when && new Date(when)
      },
      html() {
        return this.page.content && this.page.content.rendered
      },
      image() {
        const { _embedded } = this.page
        const { alt_text, source_url } = _embedded && _embedded["wp:featuredmedia"][0]

        return { alt_text, source_url }
      },
      when() {
        const hours = this.dateObject.getHours()
        const minutes = this.dateObject.getMinutes()
        const dayOfWeek = this.dateObject.toLocaleString('it-IT', {  weekday: 'long' })
        // @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
        const dateTimeFormat = dayOfWeek && new Intl.DateTimeFormat('it-IT',
          { weekday: 'long', month: 'long', day: 'numeric' }
        );

        return `
          <span class="has-text-weight-bold">
            Quando?
          </span>
          <span class="is-capitalized">
            ${dateTimeFormat.format(this.dateObject)}, ${hours}:${minutes}
          </span>
        `
      },
      where() {
        const { acf: { where } } = this.page

        return `
          <span class="has-text-weight-bold">
            Dove?
          </span>
          <span class="is-capitalized">
            ${where}
          </span>
        `
      },
      what() {
        const { acf } = this.page

        return acf && acf.what
      },
      how() {
        const { acf } = this.page

        return acf && acf.how
      },
    }
  }
</script>
