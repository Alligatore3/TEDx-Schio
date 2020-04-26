<template>
  <div>
    <div class="columns is-vcentered is-desktop is-multiline m-0">
      <div class="column p-0 h-100 is-half-desktop">
        <figure class="image h-100">
          <img class="h-100" :src="matrix.lt.image" :alt="matrix.lt.alt" >
        </figure>
      </div>
      <div class="column p-2 is-half-desktop">
        <h2 class="ted-red title is-4 mt-1 px-1">
          Cos'è TED?
        </h2>
        <div v-html="matrix.rt.text"></div>
      </div>
    </div>
    <div class="columns is-vcentered is-desktop is-multiline m-0 reverse-columns-mobile">
      <div class="column p-2 is-half-desktop">
        <h2 class="ted-red title is-4 mt-1 px-1">
          Cos'è TEDxSchio?
        </h2>
        <div v-html="matrix.lb.text"></div>
      </div>
      <div class="column p-0 is-half-desktop">
        <figure class="image">
          <img :src="matrix.rb.image" :alt="matrix.rb.alt" >
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BottomMatrix",
    props: {
      matrix: {
        type: Object,
        default: () => ({})
      }
    }
  }
</script>
