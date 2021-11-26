<template>
  <section class="search">
      <div class="search-controls">
        <app-input
          v-model="query"
          type="search"
          placeholder="Artistas, Grupos, Bandas o Venues..."
        ></app-input>
        <button class="btn btn-primary" type="button">
          <font-awesome-icon icon="search" size="lg"></font-awesome-icon>
        </button>
      </div>
    </section>
</template>

<script>
import AppInput from './input.vue';

import { ref, watch } from '@vue/runtime-core';
import { useDebounce } from '@vueuse/core';
import { useNProgress } from '@vueuse/integrations'


export default {
    components: {
        AppInput
    },
    setup() {
        const query = ref("");
        watch(useDebounce(query, 300), (newValue, oldValue) => {
            
        })
        return {query};
    }
}
</script>

<style lang="scss" scoped>
.search {
    display: flex;
    justify-content: center;
    width: 100%;
    .search-controls {
      max-width: 900px;
      width: 100%;
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      .form-control {
        flex-grow: 1;
        margin-right: 0.5rem;
      }
    }
  }
</style>