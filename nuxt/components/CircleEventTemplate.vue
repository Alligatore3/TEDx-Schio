<template>
  <div>
    <h2 class="has-text-weight-semibold is-size-5">
      {{ event.title }}
    </h2>
    <div class="mt-3 mb-5" v-html="event.content" />
    <div :key="field" v-for="field in getAcfKeys(event.acf)" class="mb-3">
      <div class="columns">
        <div class="has-text-weight-semibold is-capitalized column">
          {{ field | fakeI18N }}
        </div>
        <div v-html="event.acf[field]" class="column grow-8"/>
      </div>
    </div>
    <LiveStreaming :embed="event.acf.live_stream" />
  </div>
</template>

<script>
export default {
  name: "CircleEventTemplate",
  components: {
    LiveStreaming: () => import('@/components/LiveStreaming')
  },
  props: {
    event: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    // Keep as clean as possible.
    getAcfKeys(obj) {
      return Object.keys(obj).filter(
        k => k !== 'live_stream'
      )
    }
  },
  computed: {
    // when() {
    //   const { acf: { when } } = this.page
    //   const dateObject = when && new Date(when)
    //
    //   const hours = dateObject.getHours()
    //   const minutes = dateObject.getMinutes()
    //   const dayOfWeek = dateObject.toLocaleString('it-IT', {  weekday: 'long' })
    //   // @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
    //   const dateTimeFormat = dayOfWeek && new Intl.DateTimeFormat('it-IT',
    //     { weekday: 'long', month: 'long', day: 'numeric' }
    //   );
    //
    //   return `
    //       <span class="has-text-weight-bold">
    //         Quando?
    //       </span>
    //       <span class="is-capitalized">
    //         ${dateTimeFormat.format(dateObject)}, ${hours}:${minutes}
    //       </span>
    //     `
    // },
  }
}
</script>
