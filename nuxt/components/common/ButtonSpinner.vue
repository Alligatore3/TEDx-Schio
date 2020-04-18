<template>
  <div class="spinner-container">
    <button class="scoped-spinner button is-loading is-fullwidth"></button>
  </div>
</template>

<script>
  export default {
    name: "ButtonSpinner",
  }
</script>

<style lang="scss" scoped>
  .spinner-container {
    min-height: 30vh;
    .scoped-spinner {
      position: absolute;
      z-index: 100;
      border: none;
      top: 0;
      left: 0;
      top: calc(50% - 20px);

      &:after {
         border-left-color: $ted-red;
         border-bottom-color: $ted-red;
       }
    }
  }
</style>
