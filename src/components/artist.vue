<template>
  <div class="artist">
      <img :src="artistImage">
      <div class="content">
          <span class="name">{{ artist?.name }}</span>
          <small class="type">Tipo</small>
      </div>
  </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core';
import { decodeBase64Image } from '../utils';
export default {
    name: 'app-artist',
    props: ['artist'],
    setup({artist}) {
        const defaultImage = new URL("../assets/images/default-image.jpg", import.meta.url);
        const artistImage = computed(() => {
            if (artist.image) return decodeBase64Image(artist.image.data, artist.image.type);
            return defaultImage;
        })
        return {
            artistImage
        }
    }
}
</script>

<style lang="scss" scoped>
.artist {
    flex-basis: calc(33.3333% - 0.5rem);
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    background-color: var(--primary);
    display: flex;
    flex-direction: column;

    img {
        max-width: 100%;
        height: 250px;
        object-fit: cover;
        object-position: center;
    }
    .content {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        .type {
            margin-top: 0.5rem;
            color: var(--text-light);
        }
    }
}
</style>