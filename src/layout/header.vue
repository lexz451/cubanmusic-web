<template>
  <header>
      <a href="/" class="brand">cubanmusic<strong>.INFO</strong></a>
      <nav class="navbar" role="navigation">
        <router-link to="/">Artistas</router-link>
        <router-link to="/">Instituciones</router-link>
        <router-link to="/">Venues</router-link>
      </nav>
  </header>
</template>

<script>
export default {
    name: 'app-header'
}
</script>

<style lang="scss" scoped>
  header {
    width: 100%;
    display: flex;
    align-items: center;
    height: 84px;
    padding-left: 2rem;
    padding-right: 2rem;
    background-color: var(--navbar-bg);
    color: var(--text-light);
    line-height: 1;
    .brand {
      flex-grow: 1;
      font-size: 32px;
      color: var(--text-light);
    }
    .navbar {
      a {
        padding-left: 1rem;
        padding-right: 1rem;
        color: var(--text-light);
        &.router-link-active {
          color: var(--text-primary);
        }
      }
    }
  }
</style>