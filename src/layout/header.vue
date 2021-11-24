<template>
  <header>
      <router-link to="/" class="brand">|cubanmusic<em>.info</em>|</router-link>
      <nav class="navbar" role="navigation">
        <router-link to="/x">Quiénes Somos</router-link>
        <router-link to="/y">Explorar</router-link>
        <router-link to="/z">Búsqueda</router-link>
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
    height: 75px;
    padding-left: 2rem;
    padding-right: 2rem;
    background-color: var(--navbar-bg);
    color: var(--text-light);
    line-height: 1;
    .brand {
      flex-grow: 1;
      font-size: 32px;
      font-weight: 700;
      color: var(--text-light);
      em {
        color: var(--primary);
      }
    }
    .navbar {
      a {
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        color: var(--text-light);
        &.router-link-active {
          color: var(--text-primary);
        }
      }
    }
  }
</style>