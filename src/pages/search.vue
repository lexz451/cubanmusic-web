<template>
  <div class="search-results">
    <small class="search-results-label"
      >Mostrando {{ count }} resultados para: {{ query }}</small
    >
    <div class="search-results-content">
      <template v-for="item in results" :key="item.id + item.name">
        <div v-if="item.type == 'Person'" class="artist-item">
          <img :src="item.image" />
          <div class="artist-info">
            <h3>{{ item.name }}</h3>
            <span class="details">
              {{ placeToString(item.data?.birth_place) }},
              {{ item.data?.birth_date }} |
              {{ placeToString(item.data?.death_place) }}
              {{ item.data?.death_date }}
            </span>
            <small class="occupation">{{ item.data?.job_title }}</small>
          </div>
        </div>
        <div v-if="item.type == 'Group'" class="group-item">
          <img :src="item.image" />
          <div class="group-info">
            <h3>{{ item.name }}</h3>
            <span class="details">
              
            </span>
          </div>
        </div>
        <div class="divider"></div>
      </template>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue-demi';
import { useSearch } from '../componsable/useApi';

import ArtistItem from '../components/artist_item.vue';
import { decodeBase64Image } from '../utils';
import { useBase64 } from '@vueuse/core';

export default {
  props: ['query'],
  async setup({ query }) {
    const { data, search } = useSearch();

    const getImage = (base64, type) => {
      const fallbackImage = new URL(
        '../assets/images/default-image.jpg',
        import.meta.url
      );
      return base64 ? decodeBase64Image(base64, type) : fallbackImage;
    };

    const count = computed(() => data.value?.length);

    const results = computed(
      () =>
        data.value?.map((item) => {
          return {
            type: item[0],
            id: item[1],
            name: item[2],
            image: getImage(item[3], item[4]),
            data: item[5] && item[5] !== 'NULL' ? JSON.parse(item[5]) : null
          };
        }) || []
    );

    const placeToString = (place) => {
      const data = [];
      if (place.city) data.push(place.city);
      if (place.state) data.push(place.state);
      if (place.country) data.push(place.country);
      if (data.length) return data.join(', ');
      return '-';
    };

    await search(query);
    return { results, placeToString, count };
  },
  components: {
    ArtistItem
  }
};
</script>

<style lang="scss" scoped>
.search-results {
  max-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 4rem;
  padding-right: 4rem;
  padding-bottom: 2rem;

  &-label {
    color: rgba($color: #000000, $alpha: 0.6);
    margin-top: 0.5rem;
  }

  &-content {
    margin-top: 1rem;
    margin-left: auto;
    margin-right: auto;
    flex-grow: 1;
    width: 60%;
    .artist-item {
      display: flex;
      overflow: hidden;
      margin-bottom: 1rem;
      margin-top: 1rem;
      img {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        object-fit: cover;
        object-position: center;
      }
      .artist-info {
        margin-left: 3rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        h3 {
          font-size: 24px;
          margin-bottom: 0.5rem;
        }
        .details {
          margin-bottom: 0.2rem;
        }
        .occupation {
          color: var(--primary);
        }
      }
    }
    .group-item {
      img {
        width: 200px;
        height: 200px;
        object-fit: cover;
        object-position: center;
      }
    }
  }
}
</style>
