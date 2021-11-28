<template>
  <section class="search">
    <div class="search-controls">
      <app-input
        v-model="query"
        type="search"
        placeholder="Artistas, Grupos, Bandas o Venues..."
        @enter="doSearch()"
      ></app-input>
      <button class="btn btn-primary" type="button" @click="doSearch()">
        <font-awesome-icon icon="search" size="lg"></font-awesome-icon>
      </button>
    </div>
    <div class="divider"></div>
  </section>
</template>

<script>
import AppInput from '../components/input.vue';

import { ref, watch } from '@vue/runtime-core';
import { useDebounce } from '@vueuse/core';
import { useSearch } from '../componsable/useApi';
import Loading from 'vue3-loading-overlay';
import { useRouter } from 'vue-router';

export default {
  name: 'app-search',
  components: {
    AppInput,
    Loading
  },
  setup() {
    const query = ref('');
    const router = useRouter();
    const doSearch = () => {
      if (query.value) {
        router.push({ name: 'search', params: { query: query.value  } })
      } else {
        // noop
      }
    };
    return { query, doSearch };
  }
};
</script>

<style lang="scss">
.search {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 2rem;
  position: relative;
  .divider {
    max-width: 90%;
    margin-top: 2rem;
  }
  .search-controls {
    max-width: 900px;
    width: 100%;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    .form-control {
      flex-grow: 1;
      margin-right: 0.25rem;
    }
  }
}
</style>
