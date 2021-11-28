<template>
  <div class="artist-page">
    <div class="artist-list">
      <artist-item
        v-for="item in artists"
        :key="item.id"
        :artist="item"
      ></artist-item>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { fetchList } from '../data';

import ArtistItem from '../components/artist_item.vue';
import AppInput from '../components/input.vue';
import { useFetchCache } from '../componsable/useApi';

export default {
  components: {
    ArtistItem,
    AppInput,
  },
  async setup() {
    const artists = ref([]);
    const error = ref(null);
    try {
      const _artists = await useFetchCache("/artists");
      artists.value = _artists.data.value;
    } catch (e) {
      error.value = e;
    }
    return {
      artists,
      error
    };
  }
};
</script>

<style lang="scss" scoped>
.artist-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1 0 auto;
  align-items: stretch;
  padding: 2rem;
  position: relative;
  .artist-list {
	  padding: 2rem;
	  display: flex;
	  align-items: center;
	  flex-wrap: wrap;
	  justify-content: space-evenly;
	  *{
		  width: 25%;
		  padding: 1rem;
	  }
  }
}
</style>
