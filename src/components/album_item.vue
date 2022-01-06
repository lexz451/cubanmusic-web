<template>
  <router-link class="album_item carousel__item" to="/">
    <img
      class="album_item__image"
      :src="albumImage"
      :alt="'Album artwork for ' + album?.name"
    />
    <div class="album_item__info">
      <span class="album_item__info--name">{{ album?.name }}</span>
      <small class="album_item__info--desc">{{ album?.description }}</small>
      <small class="album_item__info--year">{{ album?.copyrightYear }}</small>
    </div>
  </router-link>
</template>

<script>
import { computed } from '@vue/reactivity';
import { decodeBase64Image } from '../utils';
export default {
  props: ['album'],
  setup({ album }) {
    const albumImage = computed(() => {
      const fallbackImage = new URL(
        '../assets/images/default-image.jpg',
        import.meta.url
      );
      return album.imageFile
        ? decodeBase64Image(album.imageFile.filedata, album.imageFile.filetype)
        : fallbackImage;
    });
    return {
      albumImage
    };
  }
};
</script>

<style lang="scss" scoped>
.album_item {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: center;
  height: 300px;
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
  &__image {
    width: 100%;
    max-height: 75%;
    flex-basis: 80%;
    object-fit: cover;
    object-position: center;
  }
  &__info {
    height: 25%;
    background-color: var(--bs-primary);
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &--name {
      color: var(--bs-light);
      font-weight: 500;
    }
    &--year {
      color: var(--bs-light);
      opacity: 0.8;
    }
    &--desc {
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      color: var(--bs-light);
    }
  }
}
</style>
