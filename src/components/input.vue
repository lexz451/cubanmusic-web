<template>
  <input class="form-control" :placeholder="placeholder" :readonly="readonly" />
</template>

<script>
export default {
  name: "app-input",
  props: {
    placeholder: String,
    readonly: Boolean,
  },
};
</script>

<style lang="scss" scoped>
input {
  background: var(--secondary);
  padding: 0.8rem 1rem;
  border: none;
  outline: none;
  border-radius: 3px;
}
</style>
