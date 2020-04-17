<template>
  <div class="speakers">
    <h1 class="title is-2 ted-red has-text-centered my-2">
      Gli Speaker di TEDxSchio {{ year }}
    </h1>
  </div>
</template>

<script>
  import axiosManager from "@/mixins/axiosManager";

  export default {
    name: "SpeakersGrid",
    mixins: [axiosManager],
    components: {
      Card: () => import('./Card')
    },
    props: {
      year: {
        type: Number,
        default: new Date().getFullYear()
      }
    }
  }
</script>

