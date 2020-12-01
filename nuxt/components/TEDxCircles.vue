<template>
  <div>
    <ButtonSpinner v-if="!events.length" />
    <div v-else class="container px-2-mobile">
      <CircleEventTemplate class="my-6" :event="formattedEvents.imminent" />
      <div v-html="circlesPage.body" />
      <div class="has-text-centered">
        <img
          class="my-6 max-w-half mx-auto"
          :src="circlesPage.thumbnail.source_url"
          :alt="circlesPage.thumbnail.alt_text" />
      </div>

      <p class="has-text-weight-bold is-size-5 is-uppercase mb-3">
        Edizioni passate:
      </p>
      <CircleEventTemplate
        class="mb-6"
        v-for="(event, index) in formattedEvents.pasted"
        :key="index"
        :event="event" />
    </div>
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
      CircleEventTemplate: () => import('@/components/CircleEventTemplate'),
      ButtonSpinner: () => import('@/components/common/ButtonSpinner'),
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
      circlesPage() {
        const { _embedded } = this.page
        const { alt_text, source_url } = _embedded && _embedded["wp:featuredmedia"][0]

        return {
          body: this.page.content && this.page.content.rendered,
          thumbnail: { alt_text, source_url }
        }
      },
    }
  }
</script>
