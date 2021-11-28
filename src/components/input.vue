<template>
  <div class="form-control">
    <input :type="type" :placeholder="placeholder" :readonly="readonly"  v-model="value" @keyup.enter="onEnter()" />
  </div>
</template>

<script>
import useModelValue from '../componsable/useModel';
export default {
  name: "app-input",
  props: {
    placeholder: String,
    readonly: Boolean,
    type: String,
    modelValue: String,
    icon: String
  },
  setup(props, { emit }) {
    const value = useModelValue(props, emit, 'modelValue');
    const onEnter = () => emit('enter', value);
    return {
      value,
      onEnter
    }
  }
};
</script>

<style lang="scss" scoped>
.form-control {
  background: var(--secondary);
  border-radius: 3px;
  display: flex;
  align-items: center;
  max-width: 600px;

  input {
    padding: 0.8rem 1rem;
    background-color: transparent;
    border: none;
    outline: none;
    flex-grow: 1;
  }
}
</style>
