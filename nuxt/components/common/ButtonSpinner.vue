<template>
  <button class="scoped-spinner button is-loading is-fullwidth"></button>
</template>

<script>
  export default {
    name: "ButtonSpinner",
  }
</script>

<style lang="scss" scoped>
  .scoped-spinner {
    position: absolute;
    z-index: 100;
    border: none;
    top: 0;
    left: 0;

    &:after {
       border-left-color: $ted-red;
       border-bottom-color: $ted-red;
     }
  }
</style>
