<template>
  <div class="container">
    <div v-html="html" />
    <img class="my-2" :src="image.source_url" :alt="image.alt_text" />
    <h4 class="my-1" v-html="when" />
    <h4 v-html="where" />
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
            Quando ?
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
            Dove ?
          </span>
          <span class="is-capitalized">
            ${where}
          </span>
        `
      }
    }
  }
</script>
