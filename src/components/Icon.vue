<script>
/* eslint-disable */
</script>

<template lang="html">
  <svg :class="classNames" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path v-if="type === 'add'" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor" />
    <path v-else-if="type === 'close'" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/>
    <path v-else-if="type === 'edit'" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="currentColor"/>
    <path v-else-if="type === 'more'" d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="currentColor"/>
    <path v-else-if="type === 'trash'" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor" />
    <path v-else-if="type === 'person'" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor" />
  </svg>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    modifiers: {
      type: Array,
      required: false,
    },
  },
  computed: {
    classNames() {
      let classNames = ['o-icon'];
      if (this.modifiers) {
        classNames = classNames.concat(this.modifiers);
      }
      return classNames;
    },
  },
};
</script>
