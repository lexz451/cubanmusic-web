<template>
	<div class="artist-page container">
		<div class="filters">
			<span v-if="loading">Loading...</span>
			<h3>Contamos con {{ count }} artistas</h3>
			<app-input :placeholder="'Buscar'"></app-input>
			<button class="btn btn-primary">
				<font-awesome-icon icon="sliders-h" size="lg"></font-awesome-icon>
			</button>
			<button class="btn btn-primary">
				<font-awesome-icon icon="search" size="lg"></font-awesome-icon>
			</button>
		</div>
		<div class="grid">
			<app-artist v-for="artist in artists" :key="artist.id" :artist="artist"></app-artist>
		</div>
	</div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { fetchArtists } from '../data';
import AppInput from '../components/input.vue';
import AppArtist from '../components/artist.vue';
import { onMounted } from '@vue/runtime-core';
export default {
	components: {
		AppInput,
		AppArtist,
	},
	setup() {
		const artists = ref([]);
		const loading = ref(false);
		const error = ref(null);
		const count = ref(0);

		function fetchData() {
			loading.value = true;
			fetchArtists().then(res => {
				if (!res.ok) {
					const error = new Error(res.statusText);
					error.json = res.json();
					throw error;
				}
				return res.json();
			}).then(res => {
				if (res && res.length) {
					count.value = res.length;
					artists.value = res;
				}
			}).catch(err => {
				error.value = err;
				if (err.json) {
					return err.json.then(json => {
						error.value.message = json.message;
					});
				}
			}).then(() => {
				loading.value = false;
			});
		}

		onMounted(() => {
			fetchData();
		});

		return {
			artists,
			loading,
			count
		}
	}

};
</script>

<style lang="scss" scoped>
.artist-page {
	padding: 2rem;
	.filters {
		display: flex;
		align-items: center;
		h3 {
			margin-right: 2rem;
		}
		.btn {
			margin-left: 0.5rem;
		}
	}
	.grid {
		margin-top: 1rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: stretch;
	}
}
</style>
