<template>
  <div class="form-control" @click="toggleMenu" v-click-outside="closeMenu">
    <input readonly :placeholder="placeholder" :value="selection" />
    <font-awesome-icon icon="chevron-down" size="lg"></font-awesome-icon>
		<div class="menu" v-show="isOpen">
			<span class="menu-item" v-for="item in options" :key="item.id" @click="onItemSelected(item)">{{item.name}}</span>
		</div>
  </div>
</template>

<script>
export default {
  name: "app-select",
  props: {
    placeholder: String,
    modelValue: Number,
		options: Array
  },
	data() {
		return {
			isOpen: false,
			selection: "",
		}
	},
  emits: ["update:modelValue"],
  methods: {
    onItemSelected(item) {
      this.value = item.id;
			this.selection = item.name;
			this.$emit('update:modelValue', this.value);
    },
		toggleMenu() {
			this.isOpen = !this.isOpen;
		},
		closeMenu() {
			this.isOpen = false;
		}
  },
};
</script>

<style lang="scss" scoped>
.form-control {
  border-radius: 3px;
  background-color: var(--secondary);
	position: relative;
  input {
    background: none;
    border: none;
    outline: none;
    appearance: none;
    padding: 0.8rem 1rem;
		cursor: pointer;
  }
  svg {
    margin-right: 0.8rem;
    color: var(--text-light);
  }
	.menu {
		position: absolute;
		width: 100%;
		background: var(--light);
		box-shadow: 0px 0px 5px 1px rgba($color: #000000, $alpha: 0.1);
		display: flex;
		flex-direction: column;
		border-bottom-left-radius: 3px;
		border-bottom-right-radius: 3px;
		.menu-item {
			cursor: pointer;
			padding: 0.5rem 1rem;
			font-size: 14px;
		}
	}
}
</style>
