<template>
  <div class="layout">
    <app-header></app-header>
    <main>
      <router-view v-slot="{Component}">
        <suspense timeout="0">
          <component :is="Component"/>
          <template #fallback>
            <div class="loading-container">
              <h3>Cargando contenido...</h3>
            </div>
          </template>
        </suspense>
      </router-view>
    </main>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from './layout/header.vue';
import AppFooter from './layout/footer.vue';
import Home from './pages/home.vue';

export default {
  components: {
    AppHeader,
    AppFooter,
    Home
  }
};
</script>

<style lang="scss" scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  main {
    flex-grow: 1;
    display: flex;
  }
  .loading-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
