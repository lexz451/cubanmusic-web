<template>
  <input class="form-control" :placeholder="placeholder" :readonly="readonly"  v-model="value" />
</template>

<script>
import useModelValue from '../componsable/useModel';
export default {
  name: "app-input",
  props: {
    placeholder: String,
    readonly: Boolean,
    modelValue: String
  },
  setup(props, { emit }) {
    return {
      value: useModelValue(props, emit, 'modelValue')
    }
  }
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
