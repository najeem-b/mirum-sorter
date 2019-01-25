<template lang="html">
  <div class="u-bg-gray">
    <div :class="['o-ar', `o-ar--${aspectRatio}`]">
      <img class="o-ar__item" v-lazy="lazyObj" :alt="imgAlt" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    aspectRatio: {
      type: String,
      default: '16:9',
    },
    imgSrc: {
      type: String,
      required: true,
    },
    imgAlt: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      lazyObj: {
        src: `/img/l/${this.imgSrc}`,
        loading: `/img/s/${this.imgSrc}`,
      },
    };
  },
};
</script>
