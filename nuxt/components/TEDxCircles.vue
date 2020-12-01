<template>
  <div v-if="events.length" class="container px-2-mobile">
<!--    <div v-html="html" />-->
<!--    <img class="my-4" :src="image.source_url" :alt="image.alt_text" />-->
<!--    <h4 class="mb-5" v-html="when" />-->
<!--    <h4 class="mb-5" v-html="where" />-->
<!--    <div class="mb-5" v-html="how" />-->
    <CircleEventTemplate :event="formattedEvents.imminent" />

    <CircleEventTemplate
      v-for="(event, index) in formattedEvents.pasted"
      :key="index"
      :event="event" />
  </div>
</template>

<script>
  import axiosManager from "@/mixins/axiosManager";

  export default {
    mixins:[axiosManager],
    name: "TEDxCircles",
    data: () => ({
      events: []
    }),
    components: {
      CircleEventTemplate: () => import('@/components/CircleEventTemplate')
    },
    async mounted() {
      this.events = await this.AXIOS_getCirclesEvents()
    },
    props: {
      page: {
        type: Object,
        default: () => ({})
      }
    },
    methods: {
      // Filtering ACF fields for non required field.
      // Ex. if "how" is empty, we remove it.
      handleACFField(acfObject) {
        const ACFFields = acfObject && Object.keys(acfObject)

        return ACFFields.reduce((acc, curr) => {
          Boolean(acfObject[curr]) && (acc[curr] = acfObject[curr])
          return acc
        }, {})
      },
      /**
       * @description Turn your strings into dates, and then subtract them
       * to get a value that is either negative, positive, or zero.
       */
      mostRecent(curr, next) {
        const { acf: { when: currentWhen } } = curr
        const { acf: { when: nextWhen } } = next

        return new Date(nextWhen) - new Date(currentWhen);
      }
    },
    computed: {
      formattedEvents() {
        if(!this.events.length) return []

        const sortedEvents = this.events.sort(this.mostRecent)
        const modelEvent = ({ title, content, acf }) => ({
          title: title.rendered,
          content: content.rendered,
          acf: this.handleACFField(acf)
        })

        return {
          imminent: modelEvent(sortedEvents[0]),
          pasted: sortedEvents.slice(1).map(modelEvent)
        }
      },
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
      how() {
        const { acf } = this.page

        return acf && acf.how
      },
    }
  }
</script>
