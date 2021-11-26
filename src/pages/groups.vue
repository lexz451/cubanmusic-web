<template>
  <div class="groups-page">
    <search></search>
    <div class="divider"></div>
    <div class="group-list">
      <group-item
        v-for="item in groups"
        :key="item.id"
        :group="item"
      ></group-item>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { fetchList } from '../data';

import GroupItem from '../components/group_item.vue';
import AppInput from '../components/input.vue';
import Search from '../components/search.vue';

export default {
  components: {
    GroupItem,
    AppInput,
    Search
  },
  async setup() {
    const groups = ref([]);
    const fetchData = async () => {
      const res = await fetchList('/groups');
      if (res) {
        groups.value = res;
      }
    };
    await fetchData();
    return {
      groups
    };
  }
};
</script>

<style lang="scss" scoped>
.groups-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1 0 auto;
  align-items: stretch;
  padding: 2rem;
  position: relative;
  .group-list {
	  padding: 2rem;
	  display: flex;
	  align-items: center;
	  flex-wrap: wrap;
	  justify-content: space-evenly;
	  *{
		  width: 25%;
	  }
  }
}
</style>
