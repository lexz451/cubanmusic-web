<template>
  <router-link to="/" class="venue_item">
    <img :src="venueImage" class="venue_item--image" />
    <div class="venue_item--info">
      <span class="venue_item--info_name">{{ venue.name }}</span>
      <small class="venue_item--info_type">{{ venue.venueType }}</small>
    </div>
  </router-link>
</template>

<script>
import { computed } from '@vue/reactivity';
import { decodeBase64Image } from '../utils';
export default {
  props: ['venue'],
  setup(props) {
    const venueImage = computed(() => {
      const fallbackImage = new URL(
        '../assets/images/default-image.jpg',
        import.meta.url
      );
      return props.venue?.imageFile ?
        decodeBase64Image(props.venue.imageFile.filedata, props.venue.imageFile.filetype)
        : fallbackImage;
    });
    return {
      venueImage
    };
  }
};
</script>

<style lang="scss" scoped>
.venue_item {
  height: 300px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  overflow: hidden;
  &--image {
    width: 100%;
    flex-grow: 1;
    object-fit: cover;
    object-position: center;
  }
  &--info {
    background-color: var(--surface);
    height: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &_name {
        color: var(--bs-primary);
    }
    &_type {
        margin-top: 0.5rem;
        color: var(--bs-dark);
    }
  }
}
</style>
