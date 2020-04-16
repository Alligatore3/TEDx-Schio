<template>
  <div>
    <TEDHeader />
    <nuxt />
  </div>
</template>

<script>
  export default {
    components: {
      TEDHeader: () => import('@/components/common/TEDHeader')
    }
  }
</script>
