
import { useFetch } from "@vueuse/core";
import { computed, reactive, ref } from "vue-demi";

const cacheMap = reactive(new Map());

export const useFetchCache = (key, url, config = {}) => {
    const info = useFetch(ref(url), { immediate: false, ...config });
    const update = () => cacheMap.set(key, info.response.value);
    const clear = () => cacheMap.set(key, undefined);
    const fetch = async () => {
        try {
            await info.execute(true)
            update();
        } catch (e) {
            clear();
        }
    }
    const response = computed(() => cacheMap.get(key));
    const data = computed(() => response.value);
    if (response.value == null) fetch();
    return { ...info, fetch, data, response, clear };
}