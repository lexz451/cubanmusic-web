<template>
  <header>
    <router-link :to="{ name: 'home' }" class="brand"
      >|cubanmusic<em>.info</em>|</router-link
    >
    <nav class="navbar" role="navigation">
      <router-link to="/">Quiénes Somos</router-link>
      <router-link to="/">Explorar</router-link>
      <router-link to="/">Búsqueda</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'app-header'
};
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  display: flex;
  align-items: center;
  height: 75px;
  padding-left: 2rem;
  padding-right: 2rem;
  background-color: var(--bs-dark);
  color: var(--bs-light);
  line-height: 1;
  .brand {
    flex-grow: 1;
    font-size: 28px;
    font-weight: 700;
    color: var(--bs-light);
    em {
      color: var(--bs-primary);
    }
  }
  .navbar {
    a {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      color: var(--bs-light);
      &.router-link-active {
        color: var(--bs-primary);
      }
    }
  }
}
</style>
