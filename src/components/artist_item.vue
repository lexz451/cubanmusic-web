<template>
  <router-link v-if="artist.id" :to="{ name: 'artist', params: { id: artist?.id } }" class="artist_item carousel__item" :class="{ 'artist_item--full-width': fullWidth }">
    <img
      class="artist_item__image img-thumbnail mb-2"
      :src="artistImage"
      :alt="'Picture of ' + artist?.name"
    />
    <div class="artist_item__info">
      <h5 class="fw-bold text-dark">{{ artist?.name }}</h5>
		  <small class="text-primary">{{ artist?.jobTitle?.name || "-" }}</small>
      <template v-if="fullWidth">
      </template>
    </div>
  </router-link>
</template>

<script>
import { computed, ref } from '@vue/reactivity';
import { decodeBase64Image } from '../utils';

export default {
  name: 'artist-item',
  props: ['artist', 'fullWidth'],
  setup({artist, fullWidth = false}) {
    const artistImage = computed(() => {
      const fallbackImage = new URL(
        '../assets/images/default-image.jpg',
        import.meta.url
      );
      return artist.imageFile
        ? decodeBase64Image(artist.imageFile.filedata, artist.imageFile.filetype)
        : fallbackImage;
    });
    return {
      artistImage,
      fullWidth
    };
  }
};
</script>

<style lang="scss" scoped>
.artist_item {
  display: flex;
  flex-direction: column;
  align-items: center;
  &--full-width {
    flex-direction: row;
    .artist_item__image {
      margin-right: 2rem;
    }
    .artist_item__info {
      align-items: flex-start;
    }
  }
  .artist_item__info {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .artist_item__image {
    width: 220px;
    height: 220px;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
  }
}
</style>
