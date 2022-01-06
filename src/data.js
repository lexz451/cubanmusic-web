import axios from "axios";
import { cacheAdapterEnhancer, retryAdapterEnhancer } from "axios-extensions";
import { inject } from "vue";

const API_URL = "https://api.cubanmusic.info/api/v1/public";

const AxiosInstace = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  adapter: retryAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter))
});

export const fetch = async (url, config = {}) => {
  //const Logger = inject('vue3-logger');
  try {
    const response = await AxiosInstace.get(url, config);
    return response.data;
  } catch (e) { 
    //Logger.error(e);
    throw e;
  }
}