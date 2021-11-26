import { computed } from "@vue/reactivity"

const useModelValue = (props, emit, name = 'modelValue') => {
    return computed({
        get: () => props[name],
        set: (value) => emit(`update:${name}`, value)
    })
}

export default useModelValue;