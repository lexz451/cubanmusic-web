<template>
  <router-link class="album_item" to="/">
    <img
      class="album_item__image"
      :src="albumImage"
      :alt="'Album artwork for ' + album?.name"
    />
    <div class="album_item__info">
        <span class="album_item__info--name">{{ album?.name }}</span>
        <span class="album_item__info--year">{{ album?.releasedDate }}</span>
    </div>
  </router-link>
</template>

<script>
import { computed } from '@vue/reactivity';
export default {
  props: {
    album: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const albumImage = computed(() => {
      const fallbackImage = new URL(
        '../assets/images/default-image.jpg',
        import.meta.url
      );
      return fallbackImage;
    });
    return {
        albumImage
    }
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
    border-radius: 5px;
    overflow: hidden;
    &__image {
        width: 100%;
        flex-basis: 80%;
        object-fit: cover;
        object-position: center;
    }
    &__info {
        height: 25%;
        background-color: var(--primary);
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        &--name {
            color: var(--text-light);
            font-size: 14px;
        }
        &--year {
            color: var(--text-light);
            opacity: 0.8;
        }
    }
}
</style>
