<template>
  <router-link to="/" class="org_item">
    <span class="text-dark fw-bold">{{ org.name }}</span>
    <small class="mb-2" v-if="org.description">{{ org.description }}</small>
    <small class="mb-2 text-muted" v-if="!org.description">Sin descripción</small>
    <a href="org.website">Ir al sitio web</a>
  </router-link>
</template>

<script>
import { computed, ref } from '@vue/reactivity';
export default {
  props: ['org'],
  setup(props) {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.org_item {
  height: 100px;
  border-radius: 0.35rem;
  background-color: var(--surface);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}
</style>
