<template>
  <div class="my-6">
    <h2 class="has-text-weight-semibold is-size-5">
      {{ event.title }}
    </h2>
    <div class="mt-3 mb-5" v-html="event.content" />
    <div :key="field" v-for="field in Object.keys(event.acf)" class="mb-3">
      <div class="columns">
        <div class="has-text-weight-semibold is-capitalized column">
          {{ field | fakeI18N }}
        </div>
        <div v-html="event.acf[field]" class="column grow-8"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CircleEventTemplate",
  props: {
    event: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
