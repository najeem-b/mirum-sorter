<template lang="html">
  <div class="c-site-main__container">
    <slot></slot>
    <footer class="u-p-vert-xl u-p-horiz u-bg-gray-light">
      <nav>
        <ul class="o-list-bare">
          <li v-for="link in links" :key="link.route" class="o-list-bare__item">
            <router-link :to="{ name: link.route }">
              {{ link.name }}
            </router-link>
          </li>
        </ul>
      </nav>
    </footer>
  </div>
</template>

<script>
import siteNav from '@/mixins/siteNav';

export default {
  mixins: [
    siteNav,
  ],
};
</script>
