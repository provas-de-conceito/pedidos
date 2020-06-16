<template>
  <header>
    <div class="brand-name">
      <nuxt-link to="/">Pedidos</nuxt-link>
    </div>

    <div class="app-links">
      <links></links>
    </div>
  </header>
</template>

<script lang="ts">
import Links from '@/components/Links.vue';

export default {
  components: { Links }
};
</script>

<style scoped>
header {
  display: grid;
  grid-template: 60px / auto 1fr;
  align-items: center;
  background-color: #333;
}

.app-links {
  justify-self: end;
}

.brand-name {
  margin: 0 10px;
  font-size: 1.3rem;
}

.brand-name a {
  text-decoration: none;
  color: white;
}

.drawer-toggle .bar {
  width: 90%;
  height: 2px;
  background-color: white;
}

.drawer-toggle {
  display: flex;
  justify-self: end;
  flex-direction: column;
  justify-content: space-around;
  height: 50%;
  width: 35px;
  padding-right: 16px;
  cursor: pointer;
}

@media (max-width: 767px) {
  header {
    padding: 0 16px;
  }
  header:nth-child {
    justify-self: end !important;
  }
  .app-links {
    display: none;
  }
}

@media (min-width: 768px) {
  header {
    padding: 0 64px;
  }
  .app-links {
    display: block;
  }
  .drawer-toggle {
    display: none;
  }
}
</style>
