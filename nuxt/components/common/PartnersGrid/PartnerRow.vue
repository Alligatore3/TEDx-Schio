<template>
  <pre>
    {{ partner }}
  </pre>
</template>

<script>
  export default {
    name: "PartnerRow",
    props: {
      partner: {
        type: Object,
        default: () => ({})
      }
    }
  }
</script>

<style scoped>

</style>
