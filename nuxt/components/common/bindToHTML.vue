<template>
  <div class="binder-placeholder my-6" v-html="html" />
</template>

<script>
  export default {
    name: "bindToHTML",
    props: {
      html: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped>

</style>
