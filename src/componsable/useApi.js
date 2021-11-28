import axios from 'axios';
import { cacheAdapterEnhancer, retryAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions';
import { ref } from 'vue-demi';


export const useFetch = async (url, config = {}) => {
  const data = ref(null);
  const error = ref(null);
  
  try {
    const result = await axios.request({
      url,
      baseURL: process.env.API_URL,
      ...config,
      adapter: retryAdapterEnhancer(axios.defaults.adapter)
    });
    data.value = result.data;
  } catch (e) {
    error.value = e;
    throw e;
  }

  return { data, error };
};

export const useFetchCache = async (url, config = {}) => {
  const data = ref(null);
  const error = ref(null);

  try {
    const result = await axios.request({
      url,
      baseURL: process.env.API_URL,
      headers: { 'Cache-Control': 'no-cache' },
      adapter: retryAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter)),
      ...config,
    });
    data.value = result.data;
  } catch (e) {
    error.value = e;
    throw e;
  }

  return { data, error };
};


export const useSearch = () => {
    const data = ref(null);
    const loading = ref(false);

    const search = async (query) => {
        loading.value = true;


        function later(delay) {
            return new Promise(function(resolve) {
                setTimeout(resolve, delay);
            });
        }

        //await later(555000);

        try {
            const result = await axios.get("/search?keyword=" + query, {
                baseURL: process.env.API_URL
            });
            data.value = result.data;
        } catch (e) {
            error.value = e;
        } finally {
            loading.value = false;
        }
    }

    return { data, loading, search }
};