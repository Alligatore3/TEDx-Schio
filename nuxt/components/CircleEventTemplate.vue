<template>
  <div>
    <h2 class="has-text-weight-semibold is-size-5">
      {{ event.title }}
    </h2>
    <div class="mt-3 mb-5" v-html="event.content" />
    <div :key="field.key" v-for="field in ACFFields" class="mb-3">
      <div v-html="elaboratedHTML(field)"></div>
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
    /**
     * @name formatACFDate
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
     * @returns {string}
     */
    formatACFDate(when) {
      const dateObject = when && new Date(when)
      const hours = dateObject.getHours()
      const minutes = dateObject.getMinutes()
      const dayOfWeek = dateObject.toLocaleString('it-IT', {  weekday: 'long' })
      const dateTimeFormat = dayOfWeek && new Intl.DateTimeFormat('it-IT',
        { weekday: 'long', month: 'long', day: 'numeric' }
      );

      return `${dateTimeFormat.format(dateObject)}, ${hours}:${minutes}`
    },
    elaboratedHTML({ key, value }) {
      return `
        <span class="has-text-weight-semibold is-capitalized" >
            ${ this.$fakeI18N(key) }
        </span>
        <span> ${ value } </span>
      `
    }
  },
  computed: {
    ACFFields() {
      return Object.keys(this.event.acf).reduce(
        (acc, curr) => {
          if(curr === 'live_stream') return acc // Skipping live

          const value = (curr === 'when') ? this.formatACFDate(this.event.acf[curr]) : this.event.acf[curr]
          return (acc.push({ key: curr, value })) && acc
        }, [])
    }
  }
}
</script>
