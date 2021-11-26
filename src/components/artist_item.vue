<template>
  <router-link :to="{ name: 'artist', params: { id: artist.id } }" class="artist_item">
    <img
      class="artist_item__image"
      :src="artistImage"
      :alt="'Picture of ' + artist?.name"
    />
    <span class="artist_item__name">{{ artist?.name }}</span>
		<small class="artist_item__occupation">Ocupacion</small>
  </router-link>
</template>

<script>
import { computed } from '@vue/reactivity';
import { decodeBase64Image } from '../utils';

export default {
  name: 'artist-item',
  props: ['artist', 'shape'],
  setup(props) {
    const artistImage = computed(() => {
      const fallbackImage = new URL(
        '../assets/images/default-image.jpg',
        import.meta.url
      );
      return props.artist.image
        ? decodeBase64Image(props.artist.image.data, props.artist.image.type)
        : fallbackImage;
    });
    return {
      artistImage
    };
  }
};
</script>

<style lang="scss" scoped>
.artist_item {
  position: relative;
  display: flex;
	flex-direction: column;
	align-items: center;
  justify-content: space-evenly;
  width: 100%;
	height: 100%;
  &__image {
		border-radius: 50%;
    width: 200px;
		height: 200px;
    object-fit: cover;
    object-position: center;
		border: 4px solid var(--light);
		box-shadow: 1px 1px 8px 1px rgba(#000, 0.1);
  }
	&__name {
		margin-top: 1rem;
		margin-bottom: 1rem;
		white-space: nowrap;
		width: 100%;
		text-overflow: ellipsis;
		overflow: hidden;
    text-align: center;
	}
	&__occupation {
		color: var(--primary);
		white-space: nowrap;
	}
}
</style>
