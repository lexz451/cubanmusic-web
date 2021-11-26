<template>
  <router-link to="/" class="org_item">
    <img :src="orgImage" class="org_item--image" />
    <div class="org_item--info">
      <span>{{ org.name }}</span>
    </div>
  </router-link>
</template>

<script>
import { computed, ref } from '@vue/reactivity';
export default {
  props: ['org'],
  setup(props) {
    const orgImage = computed(() => {
      const fallbackImage = new URL(
        '../assets/images/default-image.jpg',
        import.meta.url
      );
      return props.org?.image || fallbackImage;
    });
    return {
      orgImage
    };
  }
};
</script>

<style lang="scss" scoped>
.org_item {
  height: 300px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  overflow: hidden;
  &--image {
    flex-grow: 1;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
  &--info {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 20%;
      background-color: var(--secondary);
      color: var(--text-primary);
  }
}
</style>
