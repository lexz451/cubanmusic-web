<template>
  <div class="layout">
    <app-header></app-header>
    <app-search></app-search>
    <main>
      <router-view :key="$route.fullPath" v-slot="{ Component }">
        <template v-if="Component">
          <suspense
              timeout="0"
              @resolve="onComponentResolve()"
              @fallback="onComponentLoading()"
            >
              <component :is="Component"></component>
              <template #fallback>
                <loading
                  :is-full-page="false"
                  :active="isLoading"
                  :width="30"
                  :height="30"
                  color="#ef4649"
                >
                  <template #after>
                    <span class="vld-text">Cargando...</span>
                  </template>
                </loading>
              </template>
            </suspense>
        </template>
      </router-view>
    </main>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from './layout/header.vue';
import AppFooter from './layout/footer.vue';
import AppSearch from './layout/search.vue';
import Loading, { useLoading } from 'vue3-loading-overlay';
import { onMounted, ref } from 'vue';

import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

export default {
  components: {
    AppHeader,
    AppFooter,
    AppSearch,
    Loading
  },
  setup() {
    const isLoading = ref(false);

    const onComponentResolve = () => {
      isLoading.value = false;
    };

    const onComponentLoading = () => {
      isLoading.value = true;
    };

    return {
      isLoading,
      onComponentLoading,
      onComponentResolve
    };
  }
};
</script>

<style lang="scss">
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  main {
    position: relative;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .vld-icon {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: var(--primary);
      .vld-text {
        margin-top: 0.5rem;
      }
    }
  }
}
</style>
