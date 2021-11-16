<template>
  <div class="layout">
    <app-header></app-header>
    <main>
      <router-view></router-view>
    </main>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from "./layout/header.vue";
import AppFooter from "./layout/footer.vue";

export default {
  components: {
      AppHeader,
      AppFooter
  },
};
</script>

<style lang="scss" scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  main {
    flex-grow: 1;
  }
}
</style>