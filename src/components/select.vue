<template>
  <div class="select">
      <input readonly :placeholder="placeholder">
  </div>
</template>

<script>
export default {
    name: 'app-select',
    props: {
        placeholder: String
    },
    data() {
        return {
            placeholder: this.placeholder
        }
    }
}
</script>

<style lang="scss" scoped>
.select {
    padding: 0.8rem 1rem;
    background-color: var(--secondary);
    input {
        background: none;
    border: none;
    appearance: none;
    }
}
</style>