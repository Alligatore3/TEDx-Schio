<template>
  <div v-if="embed" class="stream has-text-centered mt-6">
    <div v-html="embed" />
  </div>
</template>

<script>
export default {
name: "LiveStreaming",
  props: {
    embed: {
      type: String,
      default: ''
    }
  }
}
</script>
