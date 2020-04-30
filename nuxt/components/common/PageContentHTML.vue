<template>
  <div class="binder-placeholder my-6" v-html="html" />
</template>

<script>
  export default {
    name: "PageContentHTML",
    props: {
      html: {
        type: String | Boolean,
        default: ''
      }
    }
  }
</script>
