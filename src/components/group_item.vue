<template>
  <router-link to="/" class="group_item">
    <img class="group_item--image" :src="groupImage"/>
    <div class="group_item--info">
      <span>{{ group.name }}</span>
    </div>
  </router-link>
</template>

<script>
import { computed } from '@vue/reactivity';
import { decodeBase64Image } from '../utils';
export default {
  props: ['group'],
  setup({group}) {
    const groupImage = computed(() => {
      const fallbackImage = new URL(
        '../assets/images/default-image.jpg',
        import.meta.url
      );
      return group.imageFile
        ? decodeBase64Image(group.imageFile.filedata, group.imageFile.filetype)
        : fallbackImage;
    });
    return {
        groupImage
    };
  }
};
</script>

<style lang="scss" scoped>
.group_item {
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
        height: 20%;
        background-color: var(--bs-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--bs-light);
    }
}
</style>
