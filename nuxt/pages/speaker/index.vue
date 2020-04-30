<template>
  <div></div>
</template>

<script>
  export default {
    name: "index",
    /**
     * @descritption If you need to use a middleware only for a specific page
     * @see https://nuxtjs.org/api/pages-middleware/#anonymous-middleware
     */
    middleware ({ redirect }) {
      return redirect('/')
    }
  }
</script>
