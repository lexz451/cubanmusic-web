<template>
  <div class="home-page">
      <div class="welcome">
        <h3>Directorio de la industria musical cubana</h3>
      </div>
      <h1 class="lead">
        Hola. ¿Qué estás buscando?
      </h1>
      <div class="search">
        <div class="search-controls">
          <input type="search" placeholder="Escribe aquí">
          <app-select :placeholder="'Elige una categoría'">
          </app-select>
          <button class="btn btn-primary" type="button">
            <i>Search</i>
          </button>
        </div>
      </div>
  </div>
</template>

<script>
import AppSelect from '../components/select.vue';
export default {
  components: {
    AppSelect
  }
}
</script>

<style lang="scss" scoped>
.home-page {
  display: flex;
  align-items: stretch;
  padding: 2rem;
  min-height: 400px;
  position: relative;
  .welcome {
    background-color: var(--primary);
    flex-basis: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5rem;
    h3 {
      color: var(--text-light);
      text-transform: uppercase;
      font-size: 28px;
      text-align: center;
    }
  }
  .lead {
    font-size: 68px;
    position: absolute;
    left: 46%;
    width: 35%;
  }
  .search {
    flex-basis: 50%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    .search-controls {
      padding: 1rem;
      display: flex;
      align-items: center;
      input,
      select {
        margin-right: 1rem;
      }
    }
  }
}
</style>