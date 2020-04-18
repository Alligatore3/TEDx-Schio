<template>
  <div class="my-3">
    <h3 class="title is-3 ted-red has-text-centered">
      {{ subject.title }}
    </h3>
    <h5 v-if="subject.subtitle" class="subtitle has-text-weight-medium ted-red mt-2	is-5">
      {{ subject.subtitle }}
    </h5>
    <div class="mt-1 columns is-multiline">
      <div class="column">
        <figure class="image">
          <img :src="subject.image_url" :alt="subject.name">
        </figure>
      </div>
      <div class="column">
        <div v-html="subject.excerpt"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SubjectBlock",
    props: {
      subject: {
        type: Object,
        default: () => ({})
      }
    }
  }
</script>
