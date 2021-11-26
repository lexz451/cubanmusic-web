<template>
  <div class="layout">
    <app-header></app-header>
    <main>
      <router-view v-slot="{Component}">
        <suspense timeout="0" @resolve="onResolve()" @fallback="onFallback()">
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
import NProgress from 'nprogress';
import { useRouter } from 'vue-router';
import { onErrorCaptured, onUpdated } from '@vue/runtime-core';

export default {
  components: {
    AppHeader,
    AppFooter,
    Home
  },
  setup() {
    NProgress.configure({ showSpinner: false });
    NProgress.configure({ easing: 'ease', speed: 500 });
    NProgress.configure({ trickleRate: 0.03, trickleSpeed: 800 });
    NProgress.configure({ minimum: 0.3 });
    
    const onFallback = () => {
      NProgress.start();
    }

    const onResolve = () => {
      NProgress.done();
    }

    return {
      onResolve,
      onFallback
    }
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
    flex-direction: column;
    align-items: flex-start;
  }
  .loading-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
